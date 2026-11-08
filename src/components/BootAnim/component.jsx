import "./component.css"
import bootAnim from "../../assets/boot.mp4"
import { fromGlobalStore } from "../../stores/globalStore";

export function BootAnimationComponent({}) {
    const isVisible = fromGlobalStore(state => state.bootAnimationPlaying)
    const setBootAnimationPlaying = fromGlobalStore(state => state.setBootAnimationPlaying)

    if(isVisible)  return (
        <video
            autoPlay
            playsInline
            preload="auto"
            className="boot-animation-container"
            onEnded={() => setBootAnimationPlaying(false)}
        >
            <source src={bootAnim} type="video/mp4" />
            
        </video>

    )

    return null;
}