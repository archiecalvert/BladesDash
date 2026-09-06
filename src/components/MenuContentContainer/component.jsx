import { useEffect, useState } from "react"
import { BLADE_WHITESPACE_LEFT, BLADE_WHITESPACE_RIGHT, MENU_Z_INDEX } from "../../utils/constants"

import "./component.css"

export function MenuContentContainer({index=2, offsetIndex=2, children}) {
    const [width, setWidth] = useState(0)
    const [offset, setOffset] = useState(0)

     /**
     * 
     * @param i the index which we want to calculate the offset for
     * @param cur the currently active page index
     */
    function getOffsetPosition(i) {
        function getSelfWidth() {
            return document.getElementById(`blade-wing-image-` + index).getBoundingClientRect().width;
        }
        const bladeWidth = getSelfWidth() * ((1 - BLADE_WHITESPACE_LEFT) - BLADE_WHITESPACE_RIGHT)

        return (i - 1) * bladeWidth
    }

    function waitForLayout() {
        return new Promise(resolve => {
            const check = () => {
                if (
                    document.getElementById("blade-wing-image-" + index).getBoundingClientRect() &&
                    document.getElementById("blade-background-left").getBoundingClientRect()
                ) {
                    resolve()
                } else {
                    requestAnimationFrame(check)
                }
            }

            check()
        })
    }

    useEffect(() => {
        waitForLayout()
        const backgroundWidth = document.getElementById("blade-background-left").getBoundingClientRect().width;
        const final = window.innerWidth - 2 * backgroundWidth - window.innerWidth * 0.15;
        setWidth(final)
        setOffset(getOffsetPosition(offsetIndex))
    }, [])
    return (
        <div style={{width: width, marginLeft: offset}} className="menu-content-container">
            {children}
        </div>
    )
}