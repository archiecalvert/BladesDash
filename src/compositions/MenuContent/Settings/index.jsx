import { MENU_Z_INDEX } from "../../../utils/constants"
import { MenuUnderlay } from "../../../components/MenuUnderlay/component"
import "./index.css"

export function SettingsMenuContent() {
    return (
        <div className="settings-menu-content" style={{"--menu-z-index": MENU_Z_INDEX}}>
            <MenuUnderlay/>
        </div>
    )
}