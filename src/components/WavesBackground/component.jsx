
import React from "react";
import "./component.css";
import { WAVES_BACKGROUND_Z_INDEX } from "../../utils/constants";

const layers = [
    {
        name: "mix",
        speed: 0.23,
        opacity: 0.105882,
        rotation: 0,
        blend: "normal",
        scale: 1
    },
    {
        name: "add",
        speed: 0.29,
        opacity: 0.096078,
        rotation: 0,
        blend: "screen",
        scale: 1
    },
    {
        name: "sub",
        speed: -0.37,
        opacity: 0.1282353,
        rotation: 0,
        blend: "exclusion",
        scale: 1
    },
    {
        name: "add2",
        speed: -0.51,
        opacity: 0.925098,
        rotation: 0,
        blend: "screen",
        scale: 1
    },
];

export function WavesBackground({
    texture,
    baseColor = "#776c6c",
    opacity = 1,
    speed = 1,
    className = "",
    isVisible=true
}) {
    if(!isVisible) return null

    return (
        <div
            className={`blades-background`}
            style={{
                "--blades-base": baseColor,
                "--blades-opacity": opacity,
                "--wave-background-z-index": WAVES_BACKGROUND_Z_INDEX
            }}
        >
            <div className="blades-background__layers">
                {layers.map((layer) => (
                    <div
                        key={layer.name}
                        className="blades-background__layer"
                        style={{
                            "--start-rotation": `${layer.rotation}deg`,
                            opacity: layer.opacity * opacity,
                            mixBlendMode: layer.blend,
                            animationDuration: `${Math.abs(360 / layer.speed / speed)}s`,
                            scale: layer.scale,
                            
                        }}
                    >
                        <img
                            src={texture}
                            alt=""
                            draggable={false}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}


