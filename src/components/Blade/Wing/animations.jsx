/**
 * Function which plays the start animation where the blades go from behind the background to in-front
 * and stacked.
 * @param left
 */
async function InitSetBladesInfrontOfBackground(controls, bladeWidth, left) {
	const DURATION = 0.2;
	if (left) {
		await controls.start({
			zIndex: 0,
			x: -bladeWidth,
			transition: { duration: DURATION, ease: "easeInOut" },
		});
		await sleep(BLADE_BACKGROUND_SWIPEIN_TIME * 1000 + 10);
		await controls.start({
			zIndex: 5,
			x: 0,
			transition: { duration: DURATION, ease: "easeInOut" },
		});
	} else {
		await controls.start({
			zIndex: 0,
			x: bladeWidth,
			scaleX: -1,
			transition: { duration: DURATION, ease: "easeInOut" },
		});
		await sleep(BLADE_BACKGROUND_SWIPEIN_TIME * 1000 + 10);
		await controls.start({
			zIndex: 5,
			x: 0,
			scaleX: -1,
			transition: { duration: DURATION, ease: "easeInOut" },
		});
	}
}

async function SetBladePosition(duration = 0.2, width) {
	let offsetX = (currentIndex - 1) * width;
	let offsetY = (activeIndex - currentIndex) * 12;

	if (currentIndex <= activeIndex) {
		offsetX = (currentIndex - 1) * width;
		offsetY = (activeIndex - currentIndex) * 12;
	} else {
		offsetX = -(maximumIndex - currentIndex) * width;
		offsetY = currentIndex * 12 - activeIndex * 12;
	}
	await controls.start({
		x: offsetX,
		y: offsetY,
		scaleX: currentIndex <= activeIndex ? 1 : -1,
		transition: { duration: duration, ease: "easeInOut" },
	});
}
