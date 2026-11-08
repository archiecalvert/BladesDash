import { create } from "zustand";
import { BLADE_COUNT, STARTING_BLADE } from "../../utils/constants";

export const fromGlobalStore = create((set) => ({
    currentPage: STARTING_BLADE,
    bladeBackgroundRef: null,
    initialAnimationCompleted: false,
    wings: Array.apply(null, Array(BLADE_COUNT)).map(function () {}),

    setCurrentPage: (pageNumber) => set((state) => ({
        currentPage: typeof pageNumber === "function"
            ? pageNumber(state.currentPage)
            : pageNumber
        })
    ),
    setInitialAnimationCompleted: () => set({initialAnimationCompleted: true}),
    setBladeBackgroundRef: (ref) => set({bladeBackgroundRef: ref}),
    setWing: (index, wing) =>
        set((state) => ({
            wings: state.wings.map((w, i) => i === index ? wing : w),
        })
    ),
}))
