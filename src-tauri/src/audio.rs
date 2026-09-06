use std::fs::File;
use std::io::BufReader;

use rodio::{Decoder, OutputStreamBuilder, Sink};
use tauri::{AppHandle, Manager};

pub fn play_sound(app: &AppHandle, filename: String) {
    let path = app
        .path()
        .resolve(
            format!("resources/{}", filename),
            tauri::path::BaseDirectory::Resource,
        )
        .expect("Failed to resolve audio path");

    let stream = OutputStreamBuilder::open_default_stream()
        .expect("Failed to open audio output");

    let sink = Sink::connect_new(stream.mixer());

    let file = File::open(path)
        .expect("Failed to open audio file");

    let source = Decoder::try_from(BufReader::new(file))
        .expect("Failed to decode audio");

    sink.append(source);

    sink.detach();

    std::mem::forget(stream);
}

#[tauri::command]
pub fn play_audio(app: AppHandle, filename: String) {

    play_sound(&app, filename);

}