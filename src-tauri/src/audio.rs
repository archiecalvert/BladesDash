use std::fs::File;
use std::io::BufReader;
use std::sync::mpsc::{self, Sender};
use std::thread;

use rodio::{Decoder, OutputStreamBuilder, Sink};
use tauri::{AppHandle, Manager};

pub struct AudioManager {
    sender: Sender<String>,
}

impl AudioManager {
    pub fn new(app: AppHandle) -> Self {
        let (sender, receiver) = mpsc::channel::<String>();

        thread::spawn(move || {
            let stream = OutputStreamBuilder::open_default_stream()
                .expect("Failed to open audio output");

            while let Ok(filename) = receiver.recv() {
                let path = app
                    .path()
                    .resolve(
                        format!("resources/{}", filename),
                        tauri::path::BaseDirectory::Resource,
                    )
                    .expect("Failed to resolve audio path");

                let file = File::open(path)
                    .expect("Failed to open audio file");

                let source = Decoder::try_from(BufReader::new(file))
                    .expect("Failed to decode audio");

                let sink = Sink::connect_new(stream.mixer());

                sink.append(source);
                sink.detach();
            }
        });

        Self { sender }
    }

    pub fn play_sound(&self, filename: String) {
        self.sender
            .send(filename)
            .expect("Failed to send audio command");
    }
}

#[tauri::command]
pub fn play_audio(
    audio_manager: tauri::State<'_, AudioManager>,
    filename: String,
) {
    audio_manager.play_sound(filename);
}