// lib/socket.js
import { io } from 'socket.io-client';

const socket = io('/'); // 서버 URL을 설정하세요

export default socket;