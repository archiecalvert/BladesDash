import { invoke } from "@tauri-apps/api/core";

export const SOUNDS = {
    BLADE_SWOOSH: ["Blades/blades_swoosh_1.wav", 
                   "Blades/blades_swoosh_2.wav", 
                   "Blades/blades_swoosh_3.wav", 
                   "Blades/blades_swoosh_4.wav", 
                   "Blades/blades_swoosh_5.wav",],
    MENU_NAVIGATION: "Menus/menus_up_down.wav",
    SELECT: "Rips/btn_Select.wav",
    BACK: "Rips/btn_Back.wav",
}

/**
 * Launches an application at the specified location.
 * @param url Absolute url of the application being launched
 */
export async function OpenApplication(url: string) {
    await invoke("launch_app", { location: url });
}

export async function PlaySound(sound: string) {
    await invoke("play_audio", { filename: sound });
}