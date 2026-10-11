use gilrs::{Button, Event, EventType, Gilrs};
use tauri::{AppHandle, Emitter};
use device_query::{DeviceEvents, DeviceEventsHandler, Keycode};

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

pub fn init_keyboard_listener() {
    std::thread::spawn(move || {
        loop {
            let device_state = DeviceEventsHandler::new(std::time::Duration::from_millis(10));
            
            // let _guard = device_state.on_key_down(|key| {

            // });

            loop {}
        }
    });
}

fn map_keyboard_key(key: &Keycode) -> Option<&'static str> {
    match key {
        Keycode::W | 
        Keycode::Up 
            => Some("up"),

        Keycode::S |
        Keycode::Down 
            => Some("down"),

        Keycode::A | 
        Keycode::Left 
            => Some("left"),

        Keycode::D |
        Keycode::Right 
            => Some("right"),

        Keycode::Enter
            => Some("A"),

        Keycode::B |
        Keycode::Space
            => Some("B"),

        Keycode::X
            => Some("X"),

        Keycode::Y
            => Some("Y"),

        _ => None,
    }
}