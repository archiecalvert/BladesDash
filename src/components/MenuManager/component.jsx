import { MarketplaceMenu } from "../../compositions/MenuFilters/Marketplace";
import { XboxLiveMenu } from "../../compositions/MenuFilters/XboxLive";
import { GamesMenu } from "../../compositions/MenuFilters/Games";
import { SettingsMenu } from "../../compositions/MenuFilters/Settings";
import { MarketplaceMenuContent } from "../../compositions/MenuContent/Marketplace";
import { XboxLiveMenuContent } from "../../compositions/MenuContent/XboxLive";
import { GamesMenuContent } from "../../compositions/MenuContent/Games";
import { SettingsMenuContent } from "../../compositions/MenuContent/Settings";
import { MediaMenuContent } from "../../compositions/MenuContent/Media";
import { easeIn, motion, useAnimationControls } from "motion/react"

import "./component.css"
import { useEffect } from "react";
import { BLADE_SWIPE_ANIMATION_DURATION } from "../../utils/constants";
import { MediaMenu } from "../../compositions/MenuFilters/Media";
import { BlankMenu } from "../../compositions/MenuFilters/Blank";

export function MenuManager({currentOpenPage=1}) {
    const controlsFilters = useAnimationControls();
    
    useEffect(() => {
        async function f() {
            await controlsFilters.start({x: -window.innerWidth * (currentOpenPage), transition: {duration: BLADE_SWIPE_ANIMATION_DURATION, ease: "linear"}})
        }
        f()
    }, [currentOpenPage])


    return (
        <>
        <motion.div initial={{x: -window.innerWidth * (currentOpenPage)}} animate={controlsFilters} className="menu-manager-filter-grid">
            <BlankMenu/>
            <MarketplaceMenu/>
            <XboxLiveMenu/>
            <GamesMenu/>
            <MediaMenu/>
            <SettingsMenu/>
        </motion.div>

        <div className="menu-manager-content-grid">
            {
                currentOpenPage == 1 && <MarketplaceMenuContent/> ||
                currentOpenPage == 2 && <XboxLiveMenuContent/> ||
                currentOpenPage == 3 && <GamesMenuContent isOpen={currentOpenPage==3}/> ||
                currentOpenPage == 4 && <MediaMenuContent/> ||
                currentOpenPage == 5 && <SettingsMenuContent/>
            }
        </div>
        </>
    )
}