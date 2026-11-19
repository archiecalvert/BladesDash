
import { useEffect } from "react";
import { motion, useAnimationControls } from "motion/react"
import { BLADE_SWIPE_ANIMATION_DURATION } from "../../utils/constants";
import { fromGlobalStore } from "../../stores/globalStore";
import { fromMenuStore } from "../../stores/menuStore";
import { BaseMenuData } from "../../data/baseMenuData";

import "./component.css"
import { MenuUnderlay } from "../MenuUnderlay/component";

export function MenuManager() {
    const controlsFilters = useAnimationControls();
    const currentOpenPage = fromGlobalStore(state => state.currentPage)
    const currentMenuState = fromMenuStore(state => {
    const content = state.menuData[currentOpenPage - 1]?.content
        return content?.[content.length - 1]
    })
    const CurrentMenu = currentMenuState.content
    useEffect(() => {
        async function f() {
            await controlsFilters.start({x: -window.innerWidth * (currentOpenPage - 1), transition: {duration: BLADE_SWIPE_ANIMATION_DURATION, ease: "linear"}})
        }
        f()
        window.addEventListener("resize", () => {
            controlsFilters.set({x: -window.innerWidth * (currentOpenPage - 1)})
        })
    }, [currentOpenPage])

    return (
        <>
        <motion.div initial={{x: -window.innerWidth * (currentOpenPage - 1)}} animate={controlsFilters} className="menu-manager-filter-grid">
            {Object.values(BaseMenuData).map((menu) => {
                return menu.filter
            })}
        </motion.div>

        <div className="menu-manager-content-grid">
            <CurrentMenu/>
            <MenuUnderlay offset={currentOpenPage - 1}/>
        </div>
        </>
    )
}