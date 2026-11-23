import { CSSProperties, ReactNode } from "react"
import "./component.css"

interface ButtonGroupProps {
    children: ReactNode
    style?: CSSProperties
}

export function ButtonGroup({children, style}: ButtonGroupProps) {
    return (
        <div className="button-group" style={{...style, width: "100%", display: "flex", flexDirection: "column"}}>
            {children}
        </div>
    )
}