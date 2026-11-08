// ============== | SETTINGS | ===============
export const FORCE_FULLSCREEN = false
export const ENABLE_BOOT_ANIMATION = false;
export const THROTTLE_INPUTS = true;

// ============== | Z-INDEXES | ==============
export const WAVES_BACKGROUND_Z_INDEX = 0           // base background image
export const COLOURED_BACKGROUND_Z_INDEX = 1        // coloured backgrounds
export const MENU_Z_INDEX = 2                       // blending filter for background
export const UI_Z_INDEX = 3                         // buttons, menus, images, etc...
export const BLADE_SLIDER_BACKGROUND_Z_INDEX = 100  // blades solid background

// ============ | KEY SETTINGS | =============
export const RIGHT_KEYS = ["d", "D", "ArrowRight"]
export const LEFT_KEYS = ["a", "A", "ArrowLeft"]
export const UP_KEYS = ["w", "W", "ArrowUp"]
export const DOWN_KEYS = ["s", "S", "DOWN"]

// ============ | BLADE SIZING | =============
export const BLADE_WHITESPACE_LEFT = 0.403
export const BLADE_WHITESPACE_RIGHT = 0.18548387

// =========== | BLADE CONSTANTS | ===========
// time taken for the blades to go from the center of the screen
// to the side
export const BLADE_COUNT = 5
export const BLADE_BACKGROUND_SWIPEIN_DURATION = 0.6
export const BLADE_SWIPE_ANIMATION_DURATION = 0.1
