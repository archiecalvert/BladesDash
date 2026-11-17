
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
    isOnWeb: boolean

    setCurrentPage: (pageNumber: SetStateAction<number>) => boolean
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
    isOnWeb: typeof window.__TAURI_INTERNALS__ === "undefined",

    setCurrentPage: (pageNumber) => {
        let updated = false

        set((state) => {
            const nextPage = typeof pageNumber === "function"
                ? pageNumber(state.currentPage)
                : pageNumber

            updated = nextPage !== state.currentPage

            return { currentPage: nextPage }
        })

        return updated
    },
    setMenuTransitionInProgress: (value) => set({ menuTransitionInProgress: value }),
    setInitialAnimationCompleted: () => set({ initialAnimationCompleted: true }),
    setBladeBackgroundRef: (ref) => set({ bladeBackgroundRef: ref }),
    setWing: (index, wing) =>
        set((state) => ({
            wings: state.wings.map((w, i) => i === index ? wing : w)
        })),
    setBootAnimationPlaying: (value) => set({ bootAnimationPlaying: value })
}))
