
import {
    Children,
    cloneElement,
    CSSProperties,
    isValidElement,
    ReactElement,
    useEffect,
    useRef,
    useState
} from "react"

import { GameTileButtonProps } from "../GameTileButton/component"

interface LimitedButtonGroupProps {
    children: ReactElement<GameTileButtonProps>[]
    style?: CSSProperties
    limit?: number
    tabIndex: number
}


export function LimitedButtonGroup({
    children,
    style,
    limit = 8,
    tabIndex
}: LimitedButtonGroupProps) {

    const [scrollOffset, setScrollOffset] = useState(0)

    const previousPosition = useRef({ tabIndex, scrollOffset: 0 })

    if (!children) return null

    const childArray = Children.toArray(children) as ReactElement<GameTileButtonProps>[]

    const maxOffset = Math.max(0, childArray.length - limit)

    const nextOffset = Math.max(
        0,
        Math.min(
            tabIndex >= scrollOffset + limit
                ? tabIndex - limit + 1
                : tabIndex < scrollOffset
                    ? tabIndex
                    : scrollOffset,
            maxOffset
        )
    )

    useEffect(() => {
        if (nextOffset !== scrollOffset) {
            setScrollOffset(nextOffset)
        }
    }, [nextOffset, scrollOffset])

    const previousAtTop = previousPosition.current.tabIndex === previousPosition.current.scrollOffset

    const previousAtBottom =
        previousPosition.current.tabIndex ===
        Math.min(
            previousPosition.current.scrollOffset + limit - 1,
            childArray.length - 1
        )

    const currentAtTop = tabIndex === nextOffset

    const currentAtBottom = tabIndex === Math.min(nextOffset + limit - 1, childArray.length - 1)

    const forceInstantAnimation =
        (previousAtTop && currentAtTop) ||
        (previousAtBottom && currentAtBottom) ||
        (Math.abs(previousPosition.current.tabIndex - tabIndex) > 1)

    useEffect(() => {
        previousPosition.current = {
            tabIndex,
            scrollOffset: nextOffset
        }
    }, [tabIndex, nextOffset])

    const visibleChildren = childArray.slice(
        scrollOffset,
        scrollOffset + limit
    )

    return (
        <div
            className="button-group"
            style={{
                ...style,
                width: "100%",
                display: "flex",
                flexDirection: "column"
            }}
        >
            {visibleChildren.map((child, index) => {
                if (!isValidElement(child)) return child

                return cloneElement(child, {
                    selected: scrollOffset + index === tabIndex,
                    forceInstantAnimation: forceInstantAnimation
                })
            })}
        </div>
    )
}
