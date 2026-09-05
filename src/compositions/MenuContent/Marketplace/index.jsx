import { MENU_Z_INDEX } from "../../../utils/constants"
import { MenuUnderlay } from "../../../components/MenuUnderlay/component"
import "./index.css"

export function MarketplaceMenuContent() {
    return (
        <div className="marketplace-menu-content" style={{"--menu-z-index": MENU_Z_INDEX}}>
            <MenuUnderlay/>
        </div>
    )
}