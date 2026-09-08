
import "./component.css"

export function StandardButton({height="5vh", iconImage=null, children}) {

    return(
        <div className="standard-button-container" style={{height: height}}>
            {iconImage && <img style={{height: "80%"}} src={iconImage} />}
            {children}
        </div>
    )
}