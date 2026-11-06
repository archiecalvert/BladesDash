import {Thing1} from "./thing1/component"
import {Thing2} from "./thing2/component"
import {Thing3} from "./thing3/component"
import {Thing4} from "./thing4/component"
import {Bg} from "./bg/component"
import "./component.css"

export function BackgroundRipped() {
    return (
        <div className="background-container">
            <Thing3/>
            <Thing1/>
            <Thing2/>
        </div>
    )
}