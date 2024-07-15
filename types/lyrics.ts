export interface Lyrics {
    time: number;
    text: string;
}

export type LyricsList = {
    [key in any]: Lyrics[];
}