import { ReactNode } from "react"
import "../component.css"

interface FieldProps {
    label: ReactNode,
    value: string,
}

export function Field({label, value}: FieldProps) {
    return (
        <span style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
            <p>{label}</p>
            <p>{value}</p>
        </span>
    )
}