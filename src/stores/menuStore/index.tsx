
import { create } from "zustand"
import type { ReactElement } from "react"
import { BaseMenuData } from "../../data/baseMenuData"

interface MenuState {
    menuData: BladeData[]
    pushMenuData: (page: number, maxTabIndex: number, subMenu: ReactElement, startTabIndex?: number,) => void
    peekTopMenu: (page: number) => MenuDataState
    incrementTabIndex: (page: number) => void
    decrementTabIndex: (page: number) => void
}

export interface BladeData {
    content: MenuDataState[]
    filter: ReactElement
}

export interface MenuDataState {
    tabIndex: number
    maxTabIndex: number
    content: ReactElement
}

export const fromMenuStore = create<MenuState>((set, get) => ({
    menuData: Object.values(BaseMenuData),

    pushMenuData: (page, maxTabIndex, subMenu, startTabIndex = 0) => {
        set((state) => ({
            menuData: state.menuData.map((menu, index) =>
                index !== page
                    ? menu
                    : {
                        ...menu,
                        content: [...menu.content, {
                            content: subMenu,
                            tabIndex: startTabIndex,
                            maxTabIndex,
                        }]
                    }
            )
        }))
    },
    peekTopMenu: (page) => {
        const menuData = get().menuData[page - 1].content
        const len = menuData.length ?? 0
        return menuData[len - 1]
    },
    incrementTabIndex: (page) => {
        set((state) => ({
            menuData: state.menuData.map((menu, index) =>
                index !== page - 1
                    ? menu
                    : {
                        ...menu,
                        content: menu.content.map((subMenu, subIndex) =>
                            subIndex !== menu.content.length - 1
                                ? subMenu
                                : {
                                    ...subMenu,
                                    tabIndex: Math.min( subMenu.tabIndex + 1, subMenu.maxTabIndex )
                                }
                        )
                    }
            )
        }))
    },
    decrementTabIndex: (page) => {
        set((state) => ({
            menuData: state.menuData.map((menu, index) =>
                index !== page - 1
                    ? menu
                    : {
                        ...menu,
                        content: menu.content.map((subMenu, subIndex) =>
                            subIndex !== menu.content.length - 1
                                ? subMenu
                                : {
                                    ...subMenu,
                                    tabIndex: Math.max( subMenu.tabIndex - 1, 0 )
                                }
                        )
                    }
            )
        }))
    }
}))

