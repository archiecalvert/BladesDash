import { create } from "zustand";
import { BLADE_COUNT } from "../../utils/constants";

export const useGlobalStore = create((set) => ({
    currentPage: 3,
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
