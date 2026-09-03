use gilrs::{Button, Event, EventType, Gilrs};
use tauri::{AppHandle, Emitter};

pub fn init_controller_listener(app: AppHandle) {
    let mut gilrs = Gilrs::new().unwrap();
    let mut active_gamepad = None;

    std::thread::spawn(move || {
        loop {
            while let Some(Event { id, event, time, .. }) = gilrs.next_event() {
                println!("{:?} New event from {}: {:?}", time, id, event);
                active_gamepad = Some(id);
            }
        }
    });
}