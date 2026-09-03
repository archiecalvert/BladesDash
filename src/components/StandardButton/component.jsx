
import "./component.css"

export function StandardButton({width="300px", height="50px", disableShine=false, children}) {

    return(
        <div className="standard-button-container" style={{width: width, height: height}}>
            {children}
        </div>
    )
}