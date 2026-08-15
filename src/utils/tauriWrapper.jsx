import { invoke } from "@tauri-apps/api/core";

/**
 * Launches an application at the specified location.
 * @param url Absolute url of the application being launched
 */
export async function OpenApplication(url) {
    await invoke("launch_app", { location: url });
}