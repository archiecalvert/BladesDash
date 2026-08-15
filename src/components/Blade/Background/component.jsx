import imgAsset from "../../../assets/Blade/background.png"
import "./component.css"
import { SIDES } from "../../../utils/enums"

export function BladeBackground({side = SIDES.LEFT}) {
    const ANIMATION_DURATION_SECONDS = "1s"
    const MAX_BLADE_SCALE = 10

    return (
        <img
            style={{
                "--blade-background-duration": ANIMATION_DURATION_SECONDS,
                "--blade-background-max-scale": MAX_BLADE_SCALE
            }}
            className={`blade-background-${side}`}
            src={imgAsset}>
        </img>
    )

}