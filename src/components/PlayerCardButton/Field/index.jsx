import "../component.css"

export function Field({label, value}) {
    return (
        <span style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
            <p>{label}</p>
            <p>{value}</p>
        </span>
    )
}