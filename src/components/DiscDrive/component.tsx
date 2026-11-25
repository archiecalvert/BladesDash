import { CSSProperties, useEffect } from "react"
import { motion, useAnimationControls } from "motion/react"
import EjectIcon from "../../assets/Rips/bl/$flash_dash/ico_32x_Eject.png"
import "./component.css"

interface DiscDriveProps {
    title?: string,
    style: CSSProperties,
    selected: boolean,
}

export function DiscDrive({
    title = "Open Tray",
    style,
    selected
}: DiscDriveProps) {
    const controls = useAnimationControls()

    useEffect(() => {
        async function f() {
            const D = 0.25
            if(selected) {
                await controls.start({opacity: 1, transition: {duration: D, ease: "linear"}})
            } else {
                await controls.start({opacity: 0, transition: {duration: D, ease: "linear"}})
            }
        }
        f()
    }, [selected])

    return (
        <div style={style}>
            <div className="disc-drive-container">
                <motion.div initial={{ opacity: 0 }} animate={controls} className="disc-drive-selected"/>
                <div className="disc-drive-circle" />
            </div>

            <div className="disc-drive-content-container">
                <img className="disc-drive-icon" src={EjectIcon}/>
                <p style={{ transform: "translateY(-0.2vh)" }}>
                    {title}
                </p>
            </div>
        </div>
    )
}