import type { ReactElement } from "react"
import { GlobalState } from "../stores/globalStore"
import { MenuState } from "../stores/menuStore"

// information required to make action
export interface StateMachineData {
    globalStore: GlobalState
    menuStore: MenuState
    tabIndexX: number
    tabIndexY: number
}

// interface defining user actions
export interface MenuStateMachineActions {
    triggerUpInput: (context: StateMachineData) => void | undefined
    triggerDownInput: (context: StateMachineData) => void | undefined
    triggerLeftInput: (context: StateMachineData) => void | undefined
    triggerRightInput: (context: StateMachineData) => void | undefined
    triggerEnterInput: (context: StateMachineData) => void | undefined
    triggerBackInput: (context: StateMachineData) => void | undefined
}

export interface MenuType {
    stateMachine: MenuStateMachineActions
}

export type MenuComponent = (() => ReactElement) & MenuType