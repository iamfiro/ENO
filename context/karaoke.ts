import { create } from 'zustand';

interface KaraokeData {
    coin: number;
    km: number;
    setKm: (km: number) => void;
    decreaseCoin: () => void;
    increaseCoin: (coin: number) => void;
}

export const useKaraokeData = create<KaraokeData>((set) => ({
    coin: 0,
    km: 0,
    setKm: (km: number) => set({ km }),
    decreaseCoin: () => set((state) => ({ coin: state.coin - 1 })),
    increaseCoin: (coin) => set(() => ({ coin })),
}));