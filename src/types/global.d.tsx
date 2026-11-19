import { GlobalState } from "../stores/globalStore"
import { MenuState } from "../stores/menuStore"

export {}

declare global {
    interface Window {
        __TAURI_INTERNALS__?: unknown
        menuStore?: MenuState
        globalStore?: GlobalState
    }
}