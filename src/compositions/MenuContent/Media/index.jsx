import { MENU_Z_INDEX } from "../../../utils/constants"
import { MenuUnderlay } from "../../../components/MenuUnderlay/component"
import { MenuTitle } from "../../../components/MenuTitle/component"
import { MenuContentContainer } from "../../../components/MenuContentContainer/component"
import "./index.css"

export function MediaMenuContent() {
    return (
        <div className="media-menu-content" style={{"--menu-z-index": MENU_Z_INDEX}}>
            <MenuUnderlay/>
            <MenuContentContainer  index={1} offsetIndex={4}>
                <MenuTitle title="Media"/>
            </MenuContentContainer>
        </div>
    )
}