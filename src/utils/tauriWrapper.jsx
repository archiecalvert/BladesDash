import { invoke } from "@tauri-apps/api/core";

export const SOUNDS = {
    BLADE_SWOOSH: ["blades_swoosh_1.wav", "blades_swoosh_2.wav", "blades_swoosh_3.wav", "blades_swoosh_4.wav", "blades_swoosh_5.wav"],
}

/**
 * Launches an application at the specified location.
 * @param url Absolute url of the application being launched
 */
export async function OpenApplication(url) {
    await invoke("launch_app", { location: url });
}

export async function PlaySound(sound) {
    await invoke("play_audio", { filename: sound });
}