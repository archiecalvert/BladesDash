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

function App() {

	const currentPage = fromGlobalStore((state) => state.currentPage)
	const [booting, setIsBooting] = useState(ENABLE_BOOT_ANIMATION)
		
	useEffect(() => {
		if (FORCE_FULLSCREEN) {
			getCurrentWindow().setFullscreen(true);
		}
	}, []);

	useEffect(() => {
		PlaySound(SOUNDS.BLADE_SWOOSH[currentPage - 1])
	}, [currentPage])

	return (
		<div className="content-container">
			<InputManager/>
			<BootAnimationComponent isVisible={booting} setVideoDone={b => setIsBooting(!b)}/>
			{
				!booting &&
				<>
					<BackgroundRipped/>
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
