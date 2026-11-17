import { CSSProperties } from "react"
import "./component.css"

interface DiscDriveProps {
    title?: string,
    style: CSSProperties,
}

export function DiscDrive({title="Open Tray", style}: DiscDriveProps) {
    return (
        <div style={style}>
            <div className="disc-drive-container">
                <div className="disc-drive-circle"></div>
            </div>
            <div className="disc-drive-content-container">
                <div className="disc-drive-icon"/>
                <p style={{transform: "translateY(-0.2vh)"}}>Open Tray</p>
            </div>
        </div>
    )
}