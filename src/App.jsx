import { getCurrentWindow } from '@tauri-apps/api/window';
import { useRef, useState, useEffect } from "react";
import { BootAnimationComponent } from "./components/BootAnim/component";
import { WavesBackground } from "./components/WavesBackground/component"
import { BladeBackground } from './components/Blade/Background/component';
import "./App.css";
import { OpenApplication, PlaySound, SOUNDS } from './utils/tauriWrapper';
import { BLADE_SWIPE_ANIMATION_DURATION, ENABLE_BOOT_ANIMATION, FORCE_FULLSCREEN, THROTTLE_INPUTS, BLADE_COUNT } from './utils/constants';
import { MenuManager } from './components/MenuManager/component';
import { Wing } from './components/Wing/component';
import { BackgroundRipped } from './components/Background2/component';
import throttle from "lodash/throttle"
import { useGlobalStore } from './stores/globalStore';

function App() {
	const currentPage = useGlobalStore((state) => state.currentPage)
	const setCurrentPage = useGlobalStore((state) => state.setCurrentPage)
	const [booting, setIsBooting] = useState(ENABLE_BOOT_ANIMATION)
	
	const backgroundWing = useRef(null)
	const heldKeys = useRef({})
	const repeatTimer = useRef(null)
	const repeatInterval = useRef(null)
	
	useEffect(() => {
		if (FORCE_FULLSCREEN) {
			getCurrentWindow().setFullscreen(true);
		}
	}, []);

	useEffect(() => {
		PlaySound(SOUNDS.BLADE_SWOOSH[currentPage - 1])
	}, [currentPage])

	useEffect(() => {
		function move(key) {
			if (key === "d") {
				setCurrentPage(prev => Math.min(BLADE_COUNT, prev + 1))
			}
			if (key === "a") setCurrentPage(prev => Math.max(1, prev - 1))
		}

		const throttleMove = throttle(move, THROTTLE_INPUTS ? BLADE_SWIPE_ANIMATION_DURATION * 1000 * 1.75 : 0)

		function handleKeyDown(e) {
			if (e.key !== "a" && e.key !== "d") return
			if (heldKeys.current[e.key]) return

			heldKeys.current[e.key] = true

			throttleMove(e.key)

			repeatTimer.current = setTimeout(() => {
				repeatInterval.current = setInterval(() => {
					if (heldKeys.current[e.key]) throttleMove(e.key)
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
		<div className="content-container">
			<BootAnimationComponent isVisible={booting} setVideoDone={b => setIsBooting(!b)}/>
			<BackgroundRipped/>
			{
				!booting &&
				<>
						<BladeBackground side="left"></BladeBackground>
						<BladeBackground side="right"></BladeBackground>
						<Wing color="rgb(223, 123, 36)" index={1} title={"marketplace"}/>
						<Wing color="rgb(227, 152, 14)" index={2} title={"xbox live"}/>
						<Wing color="rgb(52, 187, 34)" index={3} title={"games"}/>
						<Wing color="rgb(56, 112, 176)" index={4} isLeft={false} title={"media"}/>
						<Wing color="rgb(134, 87, 177)" index={5}  isLeft={false} title={"system"}/>
						<MenuManager currentOpenPage={currentPage}/>
					</>
			}
		</div>
	);
}

export default App;
