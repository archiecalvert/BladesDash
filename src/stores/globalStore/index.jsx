import { create } from "zustand";
import { BLADE_COUNT, ENABLE_BOOT_ANIMATION, STARTING_BLADE } from "../../utils/constants";

export const fromGlobalStore = create((set) => ({
    currentPage: STARTING_BLADE,
    bladeBackgroundRef: null,
    initialAnimationCompleted: false,
    menuTransitionInProgress: false,
    wings: Array.apply(null, Array(BLADE_COUNT)).map(function () {}),
    bootAnimationPlaying: ENABLE_BOOT_ANIMATION,
    
    setCurrentPage: (pageNumber) => set((state) => ({
            currentPage: typeof pageNumber === "function"
            ? pageNumber(state.currentPage)
            : pageNumber
        })
    ),
    setMenuTransitionInProgress: (value) => set({menuTransitionInProgress: value}),
    setInitialAnimationCompleted: () => set({initialAnimationCompleted: true}),
    setBladeBackgroundRef: (ref) => set({bladeBackgroundRef: ref}),
    setWing: (index, wing) =>
        set((state) => ({
            wings: state.wings.map((w, i) => i === index ? wing : w),
        })
    ),
    setBootAnimationPlaying: value => set({bootAnimationPlaying: value})
}))
