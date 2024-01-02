import "./App.css";

import { useEffect, useState } from "react";

function App() {
	const [alpha, setAlpha] = useState(128);
	const [red, setRed] = useState(128);
	const [green, setGreen] = useState(255);
	const [blue, setBlue] = useState(128);
	const [intColor, setIntColor] = useState(0);
	const [backgroundColor, setBackgroundColor] = useState("rgba(0,0,0,1)");
	const [hexColor, setHexColor] = useState("#80808080");

	useEffect(() => {
		updateBackgroundColor();
	}, [alpha, red, green, blue]);

	function updateBackgroundColor() {
		const rgbaColor = `rgba(${red}, ${green}, ${blue}, ${alpha / 255})`;
		setBackgroundColor(rgbaColor);
	}

	function handleHexChange(e: { target: { value: string; }; }) {
		const value = e.target.value.toUpperCase();
		setHexColor(value);

		if (/^#?([A-F\d]{2})([A-F\d]{2})([A-F\d]{2})([A-F\d]{2})$/i.test(value)) {
			const argb = convertHexToArgb(value);
			if (!argb) {
				return;
			}
			setAlpha(argb.alpha);
			setRed(argb.red);
			setGreen(argb.green);
			setBlue(argb.blue);
			updateBackgroundColor();
			setIntColor(convertArgbToInt(argb.alpha, argb.red, argb.green, argb.blue));
		}
	}


	function updateFromARGB() {
		const hexValue = convertArgbToHex(alpha, red, green, blue);
		setHexColor(hexValue);
		const intValue = convertArgbToInt(alpha, red, green, blue);
		setIntColor(intValue);
	}

	function updateFromInt(intValue: number) {
		const { alpha, red, green, blue } = convertIntToArgb(intValue);
		setAlpha(alpha);
		setRed(red);
		setGreen(green);
		setBlue(blue);
		const hexValue = convertArgbToHex(alpha, red, green, blue);
		setHexColor(hexValue);
	}

	function handleIntChange(e: { target: { value: any; }; }) {
		const value = e.target.value;
		if (value === "") {
			// Reset the color values when the input is empty
			setIntColor(0);
			setAlpha(0);
			setRed(0);
			setGreen(0);
			setBlue(0);
		} else {
			const intValue = parseInt(value, 10);
			if (!isNaN(intValue)) {
				setIntColor(intValue);
				updateFromInt(intValue);
			}
		}
	}

	function handleAlphaChange(e: { target: { value: string; }; }) {
		setAlpha(parseInt(e.target.value, 10));
		updateFromARGB();
	}

	function handleRedChange(e: { target: { value: string; }; }) {
		setRed(parseInt(e.target.value, 10));
		updateFromARGB();
	}

	function handleGreenChange(e: { target: { value: string; }; }) {
		setGreen(parseInt(e.target.value, 10));
		updateFromARGB();
	}

	function handleBlueChange(e: { target: { value: string; }; }) {
		setBlue(parseInt(e.target.value, 10));
		updateFromARGB();
	}

	const presets: ArgbPreset[] = [
		{ name: "Red", alpha: 255, red: 255, green: 0, blue: 0 },
		{ name: "Green", alpha: 255, red: 0, green: 255, blue: 0 },
		{ name: "Blue", alpha: 255, red: 0, green: 0, blue: 255 },
		{ name: "Yellow", alpha: 255, red: 255, green: 255, blue: 0 },
		{ name: "Cyan", alpha: 255, red: 0, green: 255, blue: 255 },
		{ name: "Magenta", alpha: 255, red: 255, green: 0, blue: 255 },
		{ name: "White", alpha: 255, red: 255, green: 255, blue: 255 },
		{ name: "Black", alpha: 255, red: 0, green: 0, blue: 0 },
		{ name: "Grey", alpha: 255, red: 128, green: 128, blue: 128 },
		{ name: "Light Grey", alpha: 255, red: 192, green: 192, blue: 192 },
		{ name: "Dark Grey", alpha: 255, red: 64, green: 64, blue: 64 },
		{ name: "Transparent", alpha: 0, red: 0, green: 0, blue: 0 },
		{ name: "Semi-Transparent", alpha: 128, red: 0, green: 0, blue: 0 },
	];

	function applyPreset(preset: ArgbPreset) {
		setAlpha(preset.alpha);
		setRed(preset.red);
		setGreen(preset.green);
		setBlue(preset.blue);

		setIntColor(convertArgbToInt(
			preset.alpha,
			preset.red,
			preset.green,
			preset.blue
		));

		setHexColor(convertArgbToHex(
			preset.alpha,
			preset.red,
			preset.green,
			preset.blue
		));
	}

	function getColorStyle() {
		return {
			background: `linear-gradient(45deg, #808080 25%, transparent 25%, transparent 75%, #808080 75%, #808080),linear-gradient(45deg, #808080 25%, transparent 25%, transparent 75%, #808080 75%, #808080)`,
			backgroundSize: "10px 10px",
			backgroundPosition: "0 0, 5px 5px",
			width: "20px",
			height: "20px",
			display: "inline-block",
			marginRight: "10px",
			border: "1px solid black"
		};
	}

	type ArgbColour = {
		alpha: number;
		red: number;
		green: number;
		blue: number;
	};

	type ArgbPreset = ArgbColour & {
		name?: string;
	};

	function getColorOverlayStyle(preset: ArgbPreset) {
		return {
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			backgroundColor: `rgba(${preset.red}, ${preset.green}, ${preset.blue}, ${preset.alpha / 255})`,
		};
	}


	return (
		<div>
			<h1>ARGB Color Converter</h1>
			<p>
				Convert between integer and hexadecimal ARGB color values.
				Useful for Android development.
			</p>
			<p>
				For more details, see the{" "}
				<a
					href="https://developer.android.com/reference/android/graphics/Color"
					target="_blank"
					rel="noopener noreferrer"
				>
					Android Color Documentation
				</a>
				.
			</p>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "150px",
				}}
			>
				<div
					style={{
						background: `linear-gradient(45deg, #808080 25%, transparent 25%, transparent 75%, #808080 75%, #808080),linear-gradient(45deg, #808080 25%, transparent 25%, transparent 75%, #808080 75%, #808080)`,
						backgroundSize: "20px 20px",
						backgroundPosition: "0 0, 10px 10px",
						width: "100px",
						height: "100px",
						border: "1px solid black",
					}}
				>
					<div
						style={{
							width: "100%",
							height: "100%",
							backgroundColor: backgroundColor,
						}}
					></div>
				</div>
			</div>
			<div>
				<label>
					Alpha:
					<input
						type="number"
						value={alpha}
						onChange={handleAlphaChange}
						min="0"
						max="255"
					/>
				</label>
				<label>
					Red:
					<input
						type="number"
						value={red}
						onChange={handleRedChange}
						min="0"
						max="255"
					/>
				</label>
				<label>
					Green:
					<input
						type="number"
						value={green}
						onChange={handleGreenChange}
						min="0"
						max="255"
					/>
				</label>
				<label>
					Blue:
					<input
						type="number"
						value={blue}
						onChange={handleBlueChange}
						min="0"
						max="255"
					/>
				</label>
			</div>
			<div>
				<label>
					Integer Color:
					<input
						type="number"
						value={intColor}
						onChange={handleIntChange}
					/>
				</label>
			</div>
			<div>
				<label>
					HEX Color:
					<input
						type="text"
						value={hexColor}
						onChange={handleHexChange}
					/>
				</label>
			</div>

			<div>
				<h2>Presets</h2>
				{presets.map((preset, index) => (
					<button
						key={index}
						onClick={() => applyPreset(preset)}
						style={{
							marginRight: "10px",
							padding: "5px",
							position: "relative",
						}}
					>
						<div style={getColorStyle()}>
							<div style={getColorOverlayStyle(preset)}></div>
						</div>
						{preset.name}
					</button>
				))}
			</div>
		</div>
	);
}

export default App;

function convertIntToArgb(intValue: number): {
	alpha: number;
	red: number;
	green: number;
	blue: number;
} {
	const alpha = (intValue >> 24) & 0xff;
	const red = (intValue >> 16) & 0xff;
	const green = (intValue >> 8) & 0xff;
	const blue = intValue & 0xff;
	return { alpha, red, green, blue };
}

function convertArgbToInt(
	alpha: number,
	red: number,
	green: number,
	blue: number
): number {
	return ((alpha << 24) | (red << 16) | (green << 8) | blue) >>> 0;
}

function convertArgbToHex(alpha: number, red: number, green: number, blue: number) {
	return '#' + [alpha, red, green, blue].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
}

function convertHexToArgb(hex: string): { alpha: number; red: number; green: number; blue: number; } | null {
	let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		alpha: parseInt(result[1], 16),
		red: parseInt(result[2], 16),
		green: parseInt(result[3], 16),
		blue: parseInt(result[4], 16)
	} : null;
}
