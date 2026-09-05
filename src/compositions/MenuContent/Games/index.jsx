import { MenuUnderlay } from "../../../components/MenuUnderlay/component"
import { MENU_Z_INDEX } from "../../../utils/constants"
import "./index.css"

export function GamesMenuContent(isOpen=false) {


    return (
        <div className="game-menu-content" style={{"--menu-z-index": MENU_Z_INDEX}}>
            <MenuUnderlay/>
        </div>
    )
}