mod input;
mod audio;

use std::process::Command;
use tauri::Manager;
use crate::input::init_controller_listener;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn launch_app(location: &str) {
    Command::new("open")
        .arg(location)
        .output()
        .expect("failed to launch application");
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let handle = app.handle().clone();

            init_controller_listener(handle.clone());

            app.manage(audio::AudioManager::new(handle));

            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            launch_app,
            audio::play_audio
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}