import "./component.css"
import bg from "../../assets/bg.mp4"

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
}