
import { create } from "zustand"
import type { SetStateAction } from "react"
import { BLADE_COUNT, ENABLE_BOOT_ANIMATION, STARTING_BLADE } from "../../utils/constants"

interface GlobalState {
    currentPage: number
    bladeBackgroundRef: HTMLElement | null
    initialAnimationCompleted: boolean
    menuTransitionInProgress: boolean
    wings: (HTMLElement | null)[]
    bootAnimationPlaying: boolean

    setCurrentPage: (pageNumber: SetStateAction<number>) => void
    setMenuTransitionInProgress: (value: boolean) => void
    setInitialAnimationCompleted: () => void
    setBladeBackgroundRef: (ref: HTMLElement | null) => void
    setWing: (index: number, wing: HTMLElement | null) => void
    setBootAnimationPlaying: (value: boolean) => void
}

export const fromGlobalStore = create<GlobalState>((set) => ({
    currentPage: STARTING_BLADE,
    bladeBackgroundRef: null,
    initialAnimationCompleted: false,
    menuTransitionInProgress: false,
    wings: Array.from({ length: BLADE_COUNT }, () => null),
    bootAnimationPlaying: ENABLE_BOOT_ANIMATION,

    setCurrentPage: (pageNumber) => set((state) => ({
        currentPage: typeof pageNumber === "function"
            ? pageNumber(state.currentPage)
            : pageNumber
    })),
    setMenuTransitionInProgress: (value) => set({ menuTransitionInProgress: value }),
    setInitialAnimationCompleted: () => set({ initialAnimationCompleted: true }),
    setBladeBackgroundRef: (ref) => set({ bladeBackgroundRef: ref }),
    setWing: (index, wing) =>
        set((state) => ({
            wings: state.wings.map((w, i) => i === index ? wing : w)
        })),
    setBootAnimationPlaying: (value) => set({ bootAnimationPlaying: value })
}))
