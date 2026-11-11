import { getCurrentWindow } from '@tauri-apps/api/window';
import { useState, useEffect } from "react";
import { BootAnimationComponent } from "./components/BootAnim/component";
import { WavesBackground } from "./components/WavesBackground/component"
import { BladeBackground } from './components/Blade/Background/component';
import "./App.css";
import { OpenApplication, PlaySound, SOUNDS } from './utils/tauriWrapper';
import { ENABLE_BOOT_ANIMATION, FORCE_FULLSCREEN } from './utils/constants';
import { MenuManager } from './components/MenuManager/component';
import { Wing } from './components/Wing/component';
import { BackgroundRipped } from './components/Background2/component';
import { fromGlobalStore } from './stores/globalStore';
import { InputManager } from './utils/inputManager';
import { InitialFadeIn } from './components/InitialFadeIn/component';
import { BackgroundAnimationComponent } from './components/BackgroundTest/component';

function App() {

	const currentPage = fromGlobalStore((state) => state.currentPage)
	const bootAnimationPlaying = fromGlobalStore(state => state.bootAnimationPlaying)
	const setBootAnimationPlaying = fromGlobalStore(state => state.setBootAnimationPlaying)
	
	useEffect(() => {
		const isOnWeb = typeof window.__TAURI_INTERNALS__ === "undefined"
		if(isOnWeb) {
			setBootAnimationPlaying(false)
		} else {	
			if (FORCE_FULLSCREEN) {
				getCurrentWindow().setFullscreen(true);
			}
		}
	}, []);

	useEffect(() => {
		PlaySound(SOUNDS.BLADE_SWOOSH[currentPage - 1])
	}, [currentPage])

	return (
		<div className="content-container ">
			<InputManager/>
			<BootAnimationComponent/>
			{
				!bootAnimationPlaying && <>
					<InitialFadeIn/>
					<BackgroundAnimationComponent/>
					<BladeBackground side="left"></BladeBackground>
					<BladeBackground side="right"></BladeBackground>
					<Wing color="rgb(248, 133, 50)" index={1} title={"marketplace"}/>
					<Wing color="rgb(235, 156, 58)" index={2} title={"xbox live"}/>
					<Wing color="rgb(42, 208, 20)" index={3} title={"games"}/>
					<Wing color="rgb(75, 137, 208)" index={4} isLeft={false} title={"media"}/>
					<Wing color="rgb(152, 108, 193)" index={5}  isLeft={false} title={"system"}/>
					<MenuManager currentOpenPage={currentPage}/>
				</>
			}
		</div>
	);
}

export default App;
