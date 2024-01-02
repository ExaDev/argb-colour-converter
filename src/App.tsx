import { DataType, Property } from "csstype";
import {
	ChangeEvent,
	ChangeEventHandler,
	ReactElement,
	useEffect,
	useState,
} from "react";
import "./App.css";

type ArgbColour = {
	alpha: number;
	red: number;
	green: number;
	blue: number;
};

type ArgbPreset = ArgbColour & {
	name?: string;
};

function Heading(): ReactElement {
	return (
		<>
			<h1>Simple ARGB Signed Integer Colour Converter</h1>
			<p>
				Convert between integer and hexadecimal ARGB colour values.
				Useful for Android development.
			</p>
			<p>
				For more details, see the{" "}
				<a
					href="https://developer.android.com/reference/android/graphics/Color"
					target="_blank"
					rel="noopener noreferrer"
				>
					Android Colour Documentation
				</a>
				.
			</p>
		</>
	);
}

function Swatch({
	backgroundColor,
}: {
	backgroundColor: Property.BackgroundColor;
}): ReactElement {
	return (
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
						backgroundColor,
					}}
				></div>
			</div>
		</div>
	);
}

function ColorInput({
	label,
	value,
	onChange,
}: {
	label: string;
	value: number;
	onChange: ChangeEventHandler;
}) {
	return (
		<div>
			<div>
				<label>{label}:</label>
				<input type="number" value={value} onChange={onChange} />
			</div>
			<div>
				<input
					type="range"
					value={value}
					onChange={onChange}
					min="0"
					max="255"
				/>
			</div>
		</div>
	);
}

function ArgbInput(props: {
	alpha: number;
	onAlphaChange: ChangeEventHandler;
	red: number;
	onRedChange: ChangeEventHandler;
	green: number;
	onGreenChange: ChangeEventHandler;
	blue: number;
	onBlueChange: ChangeEventHandler;
}) {
	return (
		<>
			<div style={{
				display: "flex",
				justifyContent: "center",
				gap: "10px"
			}}>
				<ColorInput
					label="Alpha"
					value={props.alpha}
					onChange={props.onAlphaChange}
				/>
				<ColorInput
					label="Red"
					value={props.red}
					onChange={props.onRedChange}
				/>
				<ColorInput
					label="Green"
					value={props.green}
					onChange={props.onGreenChange}
				/>
				<ColorInput
					label="Blue"
					value={props.blue}
					onChange={props.onBlueChange}
				/>
			</div>
		</>
	);
}

function IntegerInput(props: { value: number; onChange: ChangeEventHandler; }) {
	return (
		<div>
			<label>Integer:</label>
			<input
				type="number"
				value={props.value}
				onChange={props.onChange}
			/>
		</div>
	);
}

function HexInput(props: { value: string; onChange: ChangeEventHandler; }) {
	return (
		<div>
			<label>Hex:</label>
			<input type="text" value={props.value} onChange={props.onChange} />
		</div>
	);
}

function ColourControl(props: {
	alpha: number;
	onAlphaChange: ChangeEventHandler;
	red: number;
	onRedChange: ChangeEventHandler;
	green: number;
	onGreenChange: ChangeEventHandler;
	blue: number;
	onBlueChange: ChangeEventHandler;
	intColour: number;
	onIntChange: ChangeEventHandler;
	hexColour: string;
	onHexChange: ChangeEventHandler;
}): ReactElement {
	return (
		<div
			style={{
				display: "grid",
				gap: "10px",
				marginBottom: "20px",
			}}
		>
			{/* ARGB Inputs */}
			<ArgbInput
				alpha={props.alpha}
				onAlphaChange={props.onAlphaChange}
				red={props.red}
				onRedChange={props.onRedChange}
				green={props.green}
				onGreenChange={props.onGreenChange}
				blue={props.blue}
				onBlueChange={props.onBlueChange}
			/>

			{/* Integer Input */}
			<IntegerInput
				value={props.intColour}
				onChange={props.onIntChange}
			/>

			{/* Hex Input */}
			<HexInput value={props.hexColour} onChange={props.onHexChange} />
		</div>
	);
}

function Presets(props: {
	presets: ArgbPreset[];
	callbackFn: (preset: ArgbPreset, index: number) => ReactElement;
}): ReactElement {
	return (
		<div>
			<h2>Presets</h2>
			{props.presets.map(props.callbackFn)}
		</div>
	);
}

const InitialColour: ArgbColour = {
	alpha: 128,
	red: 128,
	green: 255,
	blue: 128,
};

function ArgbToRgba(colour: ArgbColour): DataType.Color {
	return `rgba(${colour.red}, ${colour.green}, ${colour.blue}, ${colour.alpha / 255
		})`;
}

function ArgbToRgbaBackgroundColour(
	colour: ArgbColour
): Property.BackgroundColor {
	return ArgbToRgba(colour);
}

function App() {
	const [alpha, setAlpha] = useState(InitialColour.alpha);
	const [red, setRed] = useState(InitialColour.red);
	const [green, setGreen] = useState(InitialColour.green);
	const [blue, setBlue] = useState(InitialColour.blue);
	const [intColour, setIntColour] = useState(convertArgbToInt(InitialColour));
	const [backgroundColor, setBackgroundColor] = useState(
		ArgbToRgbaBackgroundColour(InitialColour)
	);
	const [hexColour, setHexColour] = useState(convertArgbToHex(InitialColour));

	useEffect(() => {
		updateBackgroundColor();
	}, [alpha, red, green, blue]);

	function updateBackgroundColor() {
		const rgbaColor = `rgba(${red}, ${green}, ${blue}, ${alpha / 255})`;
		setBackgroundColor(rgbaColor);
	}

	function handleHexChange(e: ChangeEvent<HTMLInputElement>) {
		const value = e.target.value.toUpperCase();
		setHexColour(value);

		if (
			/^#?([A-F\d]{2})([A-F\d]{2})([A-F\d]{2})([A-F\d]{2})$/i.test(value)
		) {
			const argb = convertHexToArgb(value);
			if (!argb) {
				return;
			}
			setArgb(argb);
			setIntColour(convertArgbToInt(argb));
		}
	}

	function updateFromARGB() {
		setHexColour(convertArgbToHex({ alpha, red, green, blue }));
		setIntColour(convertArgbToInt({ alpha, red, green, blue }));
	}

	function setArgb({ alpha, red, green, blue }: ArgbColour) {
		setAlpha(alpha);
		setRed(red);
		setGreen(green);
		setBlue(blue);
	}

	function updateFromInt(intValue: number) {
		const argb = convertIntToArgb(intValue);
		setArgb(argb);
		setHexColour(convertArgbToHex(argb));
	}

	function handleIntChange(e: ChangeEvent<HTMLInputElement>) {
		const value = e.target.value;
		if (value === "") {
			// Reset the color values when the input is empty
			setIntColour(0);
			setAlpha(0);
			setRed(0);
			setGreen(0);
			setBlue(0);
		} else {
			const intValue = parseInt(value, 10);
			if (!isNaN(intValue)) {
				setIntColour(intValue);
				updateFromInt(intValue);
			}
		}
	}

	function handleArgbChange(
		color: "alpha" | "red" | "green" | "blue",
		e: ChangeEvent<HTMLInputElement>
	) {
		const value = parseInt(e.target.value, 10);

		switch (color) {
			case "alpha":
				setAlpha(value);
				break;
			case "red":
				setRed(value);
				break;
			case "green":
				setGreen(value);
				break;
			case "blue":
				setBlue(value);
				break;
			default:
				throw new Error("Invalid color channel");
		}

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

		setIntColour(convertArgbToInt(preset));

		setHexColour(convertArgbToHex(preset));
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
			border: "1px solid black",
		};
	}

	function getColorOverlayStyle(preset: ArgbPreset) {
		return {
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			backgroundColor: ArgbToRgba(preset),
		};
	}

	function getPresetButton(): (
		preset: ArgbPreset,
		index: number
	) => ReactElement {
		return (preset, index) => (
			<button
				key={index}
				onClick={() => applyPreset(preset)}
				style={{
					fontFamily: "monospace",
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
		);
	}

	return (
		<div>
			<Heading />
			<Swatch backgroundColor={backgroundColor} />
			<ColourControl
				alpha={alpha}
				onAlphaChange={(e: ChangeEvent<HTMLInputElement>) =>
					handleArgbChange("alpha", e)
				}
				red={red}
				onRedChange={(e: ChangeEvent<HTMLInputElement>) =>
					handleArgbChange("red", e)
				}
				green={green}
				onGreenChange={(e: ChangeEvent<HTMLInputElement>) =>
					handleArgbChange("green", e)
				}
				blue={blue}
				onBlueChange={(e: ChangeEvent<HTMLInputElement>) =>
					handleArgbChange("blue", e)
				}
				intColour={intColour}
				onIntChange={handleIntChange}
				hexColour={hexColour}
				onHexChange={handleHexChange}
			/>
			<Presets presets={presets} callbackFn={getPresetButton()} />
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

function convertArgbToInt({ alpha, red, green, blue }: ArgbColour): number {
	return ((alpha << 24) | (red << 16) | (green << 8) | blue) >>> 0;
}

function convertArgbToHex({ alpha, red, green, blue }: ArgbColour): string {
	return (
		"#" +
		[alpha, red, green, blue]
			.map((x) => x.toString(16).padStart(2, "0"))
			.join("")
			.toUpperCase()
	);
}

function convertHexToArgb(
	hex: string
): { alpha: number; red: number; green: number; blue: number; } | null {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
		hex
	);
	return result
		? {
			alpha: parseInt(result[1], 16),
			red: parseInt(result[2], 16),
			green: parseInt(result[3], 16),
			blue: parseInt(result[4], 16),
		}
		: null;
}
