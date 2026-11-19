import type { ReactElement } from "react"
import { MenuDataState } from "../stores/menuStore"

export interface MenuType {
    getNextMenu: (tabIndex: number) => MenuDataState | null | undefined
    // triggerLeft:  (tahIndex: number) => void
    // triggerRight: (tahIndex: number) => void
}

export type MenuComponent = (() => ReactElement) & MenuType