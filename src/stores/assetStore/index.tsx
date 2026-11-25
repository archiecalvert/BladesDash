import { create } from "zustand";
import BladesBackground from "../../assets/bg.mp4"

// Blades Runner Assets
import runnerImage from "../../assets/Blade/background.png"
import runnerExtension from "../../assets/Blade/background_gradient.png"

// Blade Wings


// 

interface AssetStore {
    loaded: boolean;
    preload: (assets: string[]) => Promise<void>;
}

export const useAssetStore = create<AssetStore>((set) => ({
    loaded: false,

    preload: async (assets) => {
        await Promise.all(
            assets.map(async (src) => {
                const img = new Image();
                img.src = src;

                try {
                    await img.decode();
                } catch {
                    console.warn(`Failed to preload: ${src}`);
                }
            })
        );

        set({ loaded: true });
    }
}));