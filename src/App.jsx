import { getCurrentWindow } from '@tauri-apps/api/window';
import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { BootAnimationComponent } from "./components/BootAnim/component";
import { WavesBackground } from "./components/Background/component"
import { BladeBackground } from './components/Blade/Background/component';
import "./App.css";
import { Wing } from './components/Blade/Wing/component';
import { OpenApplication } from './utils/tauriWrapper';

const FORCE_FULLSCREEN = false

function App() {
	const [greetMsg, setGreetMsg] = useState("");
	const [name, setName] = useState("");
	const [booting, setIsBooting] = useState(false)

	if(FORCE_FULLSCREEN) getCurrentWindow().setFullscreen(true);
	
	return (
		<div className="content-container">
			<BootAnimationComponent isVisible={booting} setVideoDone={b => setIsBooting(!b)}/>
			<WavesBackground isVisible={!booting} texture="/bg_spin_hq.jpg" speed={20} />
			{!booting &&
				<>
					<BladeBackground side="left"></BladeBackground>
					<BladeBackground side="right"></BladeBackground>
					<Wing isSelected={false} startIndex={1} pageActiveIndex={3} maximumIndex={5} title={"marketplace"}></Wing>
					<Wing isSelected={false} startIndex={2} pageActiveIndex={3} maximumIndex={5} title={"xbox live"}></Wing>
					<Wing isSelected={false} startIndex={3} pageActiveIndex={3} maximumIndex={5} title={"games"}></Wing>
					<Wing isSelected={false} startIndex={4} pageActiveIndex={3} maximumIndex={5} isLeft={false} title={"media"}></Wing>
					<Wing isSelected={false} startIndex={5} pageActiveIndex={3} maximumIndex={5}  isLeft={false} title={"system"}></Wing>

				</>
			}
		</div>
	);
}

export default App;
