#include <SPI.h>
#include <Ethernet.h>
#include <ArduinoJson.h>
#include <SocketIoClient.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// 이더넷 설정
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED }; // MAC 주소
IPAddress ip(192, 168, 1, 177); // 고정 IP 주소 (필요에 따라 수정)

// Socket.IO 서버 설정
const char* host = "socket.devfiro.com";
const int port = 3000;

SocketIOClient webSocket;

LiquidCrystal_I2C lcd(0x27, 16, 2);

int coins = 0;
int distance = 0;
int timeLeft = 30000;
const int distanceForCoin = 500;
const int frameRate = 10;
bool roundEnded = false;
#define TRIG 9
#define ECHO 8

unsigned long previousMillis = 0;
const long interval = 5000; // 5초 간격

bool added = false;

void setup() {
  Serial.begin(9600);
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  lcd.init();
  lcd.backlight();
  lcdPrint();

  // 이더넷 초기화
  Ethernet.begin(mac, ip);
  delay(1000);
  if (Ethernet.hardwareStatus() == EthernetNoHardware) {
    Serial.println("Ethernet shield was not found.");
    while (true) {}
  }
  if (Ethernet.linkStatus() == LinkOFF) {
    Serial.println("Ethernet cable is not connected.");
  }

  Serial.print("My IP address: ");
  Serial.println(Ethernet.localIP());

  // Socket.IO 초기화
  if (!webSocket.connect(host, port)) {
    Serial.println("Connection failed.");
    return;
  }

  webSocket.send("message", "\"Hello Server\"");

  // 이벤트 핸들러 등록
  webSocket.on("coin-decrease-client", decreaseCoin);
}

void loop() {
  if(roundEnded) return;
  webSocket.monitor();

  // 초음파 센서로 거리 측정
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  int a = pulseIn(ECHO, HIGH);
  if (a > 0 && a < 200) {
    if (!added) {
      distance += 20;
      added = true;
      if (distance >= distanceForCoin) {
        distance = 0;
        coins++;
      }
    }
  } else {
    added = false;
  }


  // 주기적으로 서버에 데이터 전송
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;
    sendDataToServer();
  }

  delay(frameRate);
  timeLeft -= frameRate;
  if(timeLeft <= 0){
    endRound();
  }
  else if(timeLeft%1000 == 0) lcdPrint();
}

void lcdPrint() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Distance: ");
  lcd.print(distance);
  lcd.print("m");
  lcd.setCursor(0, 1);
  lcd.print("Coin: ");
  lcd.print(coins);
  lcd.print("|Time: ");
  lcd.print(timeLeft/1000);
}
void endRound(){
  roundEnded = true;
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Time Over!");
  lcd.setCursor(0, 1);
  lcd.print("Coins earned: ");
  lcd.print(coins);
}

void sendDataToServer() {
  DynamicJsonDocument doc(1024);
  doc["value"] = coins; // 데이터를 "value" 키로 설정

  String output;
  serializeJson(doc, output);

  webSocket.send("coin-increase-arduino", output.c_str());
}

// coin-decrease-client 이벤트 처리 함수
void decreaseCoin(const char* payload, size_t length) {
  DynamicJsonDocument doc(1024);
  DeserializationError error = deserializeJson(doc, payload);

  if (error) {
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(error.f_str());
    return;
  }

  // 코인 감소
  int value = doc["value"];
  if (coins > 0) {
    coins -= value;
    lcdPrint();
    sendDataToServer(); // 서버에 업데이트된 데이터 전송
  }
}