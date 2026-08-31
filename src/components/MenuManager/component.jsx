import { MarketplaceMenu } from "../../compositions/Menus/Marketplace";
import { XboxLiveMenu } from "../../compositions/Menus/XboxLive";
import { GamesMenu } from "../../compositions/Menus/Games";
import { SettingsMenu } from "../../compositions/Menus/Settings";
import { easeIn, motion, useAnimationControls } from "motion/react"

import "./component.css"
import { useEffect } from "react";
import { BLADE_SWIPE_ANIMATION_DURATION } from "../../utils/constants";
import { MediaMenu } from "../../compositions/Menus/Media";

export function MenuManager({currentOpenPage=1}) {
    const controls = useAnimationControls();

    useEffect(() => {
        async function f() {
            await controls.start({x: -window.innerWidth * (currentOpenPage), transition: {duration: BLADE_SWIPE_ANIMATION_DURATION, ease: "linear"}})
        }
        f()
    }, [currentOpenPage])


    return (
        <motion.div initial={{x: -window.innerWidth * (currentOpenPage)}} animate={controls} className="menu-manager-grid">
            <div></div>
            <MarketplaceMenu/> {/* Here just to stop visual glitches. Never used*/}
            <MarketplaceMenu/>
            <XboxLiveMenu/>
            <GamesMenu/>
            <MediaMenu/>
            <SettingsMenu/>
        </motion.div>
    )
}