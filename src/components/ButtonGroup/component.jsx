import "./component.css"

export function ButtonGroup({children}) {
    return (
        <div style={{width: "50%", gap: "-1vh", display: "flex", flexDirection: "column"}}>
            {children}
        </div>
    )
}