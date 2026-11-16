import "./component.css"

interface MenuTitleProps {
    title: string,
}

export function MenuTitle({title="<placeholder>"}: MenuTitleProps) {
    return (
        <h1 className="menu-title">{title}</h1>
    )
}