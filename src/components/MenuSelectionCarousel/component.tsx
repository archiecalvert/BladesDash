
import { motion } from "motion/react"
import { fromGlobalStore } from "../../stores/globalStore"
import { fromMenuStore } from "../../stores/menuStore"
import "./component.css"
import { useLayoutEffect, useRef, useState } from "react"

interface MenuSelectionCarouselProps {
    menuNames: string[]
}

const VISIBLE_ITEMS = 11
const ITEMS_BEFORE = 2
const ITEMS_AFTER = VISIBLE_ITEMS - ITEMS_BEFORE - 1

export function MenuSelectionCarousel({ menuNames }: MenuSelectionCarouselProps) {
    const currentOpenPage = fromGlobalStore(state => state.currentPage)

    const currentMenuState = fromMenuStore(state => {
        const content = state.menuData[currentOpenPage - 1]?.content
        return content?.[content.length - 1]
    })

    const tabIndexX = currentMenuState?.tabIndexX ?? 0

    const trackRef = useRef<HTMLDivElement>(null)
    const [trackOffset, setTrackOffset] = useState(0)

    const visibleItems = Array.from(
        { length: VISIBLE_ITEMS },
        (_, i) => tabIndexX + i - ITEMS_BEFORE
    )

    const getMenuName = (index: number) => {
        const wrappedIndex =
            ((index % menuNames.length) + menuNames.length) % menuNames.length

        return menuNames[wrappedIndex]
    }

    useLayoutEffect(() => {
        const track = trackRef.current
        if (!track) return

        const selectedItem = track.children[ITEMS_BEFORE] as HTMLElement
        if (!selectedItem) return

        const trackStyle = getComputedStyle(track)
        const itemStyle = getComputedStyle(selectedItem)

        const trackPaddingLeft = parseFloat(trackStyle.paddingLeft) || 0
        const itemMarginLeft = parseFloat(itemStyle.marginLeft) || 0

        setTrackOffset( selectedItem.offsetLeft - trackPaddingLeft - itemMarginLeft )
    }, [tabIndexX, menuNames])

    if (!menuNames.length) return null

    return (
        <div className="menu-selection-carousel">
            <motion.div
                ref={trackRef}
                className="menu-selection-carousel-track"
                animate={{ x: -trackOffset }}
                transition={{
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1]
                }}
            >
                {visibleItems.map(index => {
                    const selected = index === tabIndexX

                    return (
                        <motion.p
                            key={index}
                            layout="position"
                            transition={{
                                layout: {
                                    duration: 0.3,
                                    ease: [0.22, 1, 0.36, 1]
                                }
                            }}
                            className={`menu-selection-carousel-item ${
                                selected
                                    ? "menu-selection-carousel-selected"
                                    : "menu-selection-carousel-deselected"
                            }`}
                        >
                            {getMenuName(index)}
                        </motion.p>
                    )
                })}
            </motion.div>
        </div>
    )
}
