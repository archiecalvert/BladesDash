import "./component.css"

export function DiscDrive({title="Open Tray", style}) {
    return (
        <div style={style} className="disc-drive-container">
            <div className="disc-drive-circle"></div>
        </div>
    )
}