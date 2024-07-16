import { create } from 'zustand';

interface KaraokeData {
    coin: number;
    decreaseCoin: () => void;
    increaseCoin: () => void;
}

export const useKaraokeData = create<KaraokeData>((set) => ({
    coin: 320,
    decreaseCoin: () => set((state) => ({ coin: state.coin - 1 })),
    increaseCoin: () => set((state) => ({ coin: state.coin + 1  })),
}));