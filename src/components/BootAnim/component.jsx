import "./component.css"
import bootAnim from "../../assets/boot.mp4"

export function BootAnimationComponent({setVideoDone=false, isVisible=true}) {

    if(isVisible)  return (
        <video
            autoPlay
            playsInline
            preload="auto"
            className="boot-animation-container"
            onEnded={() => setVideoDone(true)}
        >
            <source src={bootAnim} type="video/mp4" />
            
        </video>

    )

    return null;
}