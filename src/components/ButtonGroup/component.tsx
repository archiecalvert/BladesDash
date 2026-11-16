import { ReactNode } from "react"
import "./component.css"

interface ButtonGroupProps {
    children: ReactNode
}

export function ButtonGroup({children}: ButtonGroupProps) {
    return (
        <div style={{width: "50%", gap: "-1vh", display: "flex", flexDirection: "column"}}>
            {children}
        </div>
    )
}