import { getCurrentWindow } from '@tauri-apps/api/window';
import { useRef, useState, useEffect } from "react";
import { BootAnimationComponent } from "./components/BootAnim/component";
import { WavesBackground } from "./components/WavesBackground/component"
import { BladeBackground } from './components/Blade/Background/component';
import "./App.css";
import { Wing } from './components/Blade/Wing/component';
import { OpenApplication } from './utils/tauriWrapper';
import { BLADE_SWIPE_ANIMATION_DURATION, ENABLE_BOOT_ANIMATION, FORCE_FULLSCREEN } from './utils/constants';
import { MenuManager } from './components/MenuManager/component';

function App() {
	const BLADE_COUNT = 5

	const [booting, setIsBooting] = useState(ENABLE_BOOT_ANIMATION)
	const [currentlyOpenIndex, setCurrentlyOpenIndex] = useState(3)
	
	const backgroundWing = useRef(null)
	const heldKeys = useRef({})
	const repeatTimer = useRef(null)
	const repeatInterval = useRef(null)
	
	if(FORCE_FULLSCREEN) getCurrentWindow().setFullscreen(true);

	useEffect(() => {
		function move(key) {
			if (key === "d") setCurrentlyOpenIndex(prev => Math.min(BLADE_COUNT, prev + 1))
			if (key === "a") setCurrentlyOpenIndex(prev => Math.max(1, prev - 1))
		}

		function handleKeyDown(e) {
			if (e.key !== "a" && e.key !== "d") return
			if (heldKeys.current[e.key]) return

			heldKeys.current[e.key] = true

			move(e.key)

			repeatTimer.current = setTimeout(() => {
				repeatInterval.current = setInterval(() => {
					if (heldKeys.current[e.key]) move(e.key)
				}, BLADE_SWIPE_ANIMATION_DURATION * 1000 + 100) // repeat speed
			}, BLADE_SWIPE_ANIMATION_DURATION * 1000 + 100) // time taken to repeat
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
		<div className="content-container sixteenbynine">
			<BootAnimationComponent isVisible={booting} setVideoDone={b => setIsBooting(!b)}/>
			<WavesBackground isVisible={!booting} texture="/bg_spin_hq.jpg" speed={20} />
			{!booting &&
				<>
					<MenuManager/>
					<BladeBackground backgroundSide={backgroundWing} side="left"></BladeBackground>
					<BladeBackground side="right"></BladeBackground>
					<Wing backgroundRef={backgroundWing} isSelected={false} index={1} openPageIndex={currentlyOpenIndex} maximumIndex={BLADE_COUNT} title={"marketplace"}></Wing>
					<Wing backgroundRef={backgroundWing} isSelected={false} index={2} openPageIndex={currentlyOpenIndex} maximumIndex={BLADE_COUNT} title={"xbox live"}></Wing>
					<Wing backgroundRef={backgroundWing} isSelected={false} index={3} openPageIndex={currentlyOpenIndex} maximumIndex={BLADE_COUNT} title={"games"}></Wing>
					<Wing backgroundRef={backgroundWing} isSelected={false} index={4} openPageIndex={currentlyOpenIndex} maximumIndex={BLADE_COUNT} isLeft={false} title={"media"}></Wing>
					<Wing backgroundRef={backgroundWing} isSelected={false} index={5} openPageIndex={currentlyOpenIndex} maximumIndex={BLADE_COUNT}  isLeft={false} title={"system"}></Wing>
				</>
			}
		</div>
	);
}

export default App;
