import { getCurrentWindow } from '@tauri-apps/api/window';
import { useRef, useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { BootAnimationComponent } from "./components/BootAnim/component";
import { WavesBackground } from "./components/WavesBackground/component"
import { BladeBackground } from './components/Blade/Background/component';
import "./App.css";
import { Wing } from './components/Blade/Wing/component';
import { OpenApplication } from './utils/tauriWrapper';
import { ENABLE_BOOT_ANIMATION, FORCE_FULLSCREEN } from './utils/constants';
import { GamesMenu } from './compositions/Menus/Games';

function App() {
	const [greetMsg, setGreetMsg] = useState("");
	const [name, setName] = useState("");
	const [booting, setIsBooting] = useState(ENABLE_BOOT_ANIMATION)
	const backgroundWing = useRef(null)
	
	const [currentlyOpenIndex, setCurrentlyOpenIndex] = useState(3)

	if(FORCE_FULLSCREEN) getCurrentWindow().setFullscreen(true);
	
		
	const heldKeys = useRef({})
	const repeatTimer = useRef(null)
	const repeatInterval = useRef(null)

	useEffect(() => {
		function move(key) {
			if (key === "d") setCurrentlyOpenIndex(prev => Math.min(5, prev + 1))
			if (key === "a") setCurrentlyOpenIndex(prev => Math.max(1, prev - 1))
		}

		function handleKeyDown(e) {
			if (e.key !== "a" && e.key !== "d") return
			if (heldKeys.current[e.key]) return // already held

			heldKeys.current[e.key] = true

			// Immediate move
			move(e.key)

			// Start repeating after 300ms
			repeatTimer.current = setTimeout(() => {
				repeatInterval.current = setInterval(() => {
					if (heldKeys.current[e.key]) move(e.key)
				}, 120) // repeat speed
			}, 300)
		}

		function handleKeyUp(e) {
			if (e.key !== "a" && e.key !== "d") return

			heldKeys.current[e.key] = false
			clearTimeout(repeatTimer.current)
			clearInterval(repeatInterval.current)
		}

		window.addEventListener("keydown", handleKeyDown)
		window.addEventListener("keyup", handleKeyUp)

		return () => {
			window.removeEventListener("keydown", handleKeyDown)
			window.removeEventListener("keyup", handleKeyUp)
			clearTimeout(repeatTimer.current)
			clearInterval(repeatInterval.current)
		}
	}, [])


	return (
		<div className="content-container">
			<BootAnimationComponent isVisible={booting} setVideoDone={b => setIsBooting(!b)}/>
			<WavesBackground isVisible={!booting} texture="/bg_spin_hq.jpg" speed={20} />
			{!booting &&
				<>
					<GamesMenu/>
					<BladeBackground backgroundSide={backgroundWing} side="left"></BladeBackground>
					<BladeBackground side="right"></BladeBackground>
					<Wing backgroundRef={backgroundWing} isSelected={false} index={1} openPageIndex={currentlyOpenIndex} maximumIndex={5} title={"marketplace"}></Wing>
					<Wing backgroundRef={backgroundWing} isSelected={false} index={2} openPageIndex={currentlyOpenIndex} maximumIndex={5} title={"xbox live"}></Wing>
					<Wing backgroundRef={backgroundWing} isSelected={false} index={3} openPageIndex={currentlyOpenIndex} maximumIndex={5} title={"games"}></Wing>
					<Wing backgroundRef={backgroundWing} isSelected={false} index={4} openPageIndex={currentlyOpenIndex} maximumIndex={5} isLeft={false} title={"media"}></Wing>
					<Wing backgroundRef={backgroundWing} isSelected={false} index={5} openPageIndex={currentlyOpenIndex} maximumIndex={5}  isLeft={false} title={"system"}></Wing>
				</>
			}
		</div>
	);
}

export default App;
