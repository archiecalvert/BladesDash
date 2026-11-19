import "./component.css"
import bootAnim from "../../assets/boot.mp4"
import bootAnimOriginal from "../../assets/boot-original.mp4"
import { fromGlobalStore } from "../../stores/globalStore";
import { USE_XBOX_ORIGINAL_BOOT_ANIMATION } from "../../utils/constants";

export function BootAnimationComponent() {
    const isVisible = fromGlobalStore(state => state.bootAnimationPlaying)
    const setBootAnimationPlaying = fromGlobalStore(state => state.setBootAnimationPlaying)
    const isOnWeb = fromGlobalStore(state => state.isOnWeb)

    if(isVisible)  return (
        <video
            autoPlay
            muted = {isOnWeb ? true : false}
            playsInline
            preload="auto"
            disablePictureInPicture
            className="boot-animation-container"
            onEnded={() => setBootAnimationPlaying(false)}
        >
            {
                USE_XBOX_ORIGINAL_BOOT_ANIMATION || window.localStorage["use-original-boot-anim"] === "true"?
                <source src={bootAnimOriginal} type="video/mp4" /> :
                <source src={bootAnim} type="video/mp4" />
            
            }
            
        </video>

    )

    return null;
}