import { getCurrentWindow } from '@tauri-apps/api/window';
import {  useEffect } from "react";
import { BootAnimationComponent } from "./components/BootAnim/component";
import { BladeBackground } from './components/Blade/Background/component';
import {  PlaySound, SOUNDS } from './utils/tauriWrapper';
import {  FORCE_FULLSCREEN } from './utils/constants';
import { MenuManager } from './components/MenuManager/component';
import { Wing } from './components/Wing/component';
import { fromGlobalStore } from './stores/globalStore';
import { useInputManager } from './hooks/useInputManager';
import { InitialFadeIn } from './components/InitialFadeIn/component';
import { BackgroundAnimationComponent } from './components/BackgroundVideo/component';
import "./App.css";

function App() {

	const currentPage = fromGlobalStore((state) => state.currentPage)
	const bootAnimationPlaying = fromGlobalStore(state => state.bootAnimationPlaying)
	const isOnWeb = fromGlobalStore(state => state.isOnWeb)

	useInputManager()

	useEffect(() => {
		if (FORCE_FULLSCREEN && !isOnWeb) getCurrentWindow().setFullscreen(true)
	}, []);

	useEffect(() => {
		PlaySound(SOUNDS.BLADE_SWOOSH[currentPage - 1])
	}, [currentPage])

	return (
		<div className="content-container ">
			<BootAnimationComponent/>
			<BackgroundAnimationComponent/>
			{
				!bootAnimationPlaying && <>
					<InitialFadeIn/>
					<BladeBackground side="left"></BladeBackground>
					<BladeBackground side="right"></BladeBackground>
					<Wing color="linear-gradient(rgba(222, 109, 2, 1) 00.0000%, rgba(222, 109, 2, 1) 34.9020%, rgba(233, 53, 3, 1) 67.4510%, rgba(233, 45, 3, 1) 100%)" index={1} title={"marketplace"}/>
					<Wing color="rgb(235, 156, 58)" index={2} title={"xbox live"}/>
					<Wing color="rgb(42, 208, 20)" index={3} title={"games"}/>
					<Wing color="rgb(75, 137, 208)" index={4} title={"media"}/>
					<Wing color="rgb(152, 108, 193)" index={5} title={"system"}/>
					<MenuManager/>
				</>
			}
		</div>
	);
}

export default App;
