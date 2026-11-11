import "./component.css"
import bg from "../../assets/bg.mp4"
import { fromGlobalStore } from "../../stores/globalStore";

export function BackgroundAnimationComponent({}) {

    return (
        <video
            autoPlay
            playsInline
            preload="auto"
            className="background-container"
            loop
        >
            <source src={bg} type="video/mp4" />
            
        </video>

    )

    return null;
}