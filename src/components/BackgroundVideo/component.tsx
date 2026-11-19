import "./component.css"
import bg from "../../assets/bg.mp4"

export function BackgroundAnimationComponent() {
    return (
        <video
            autoPlay
            muted
            playsInline
            preload="auto"
            className="background-container"
            loop
            disablePictureInPicture
        >
            <source src={bg} type="video/mp4" className="bg-video-render"/>
        </video>
    )
}