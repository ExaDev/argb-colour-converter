import { useState } from 'react';
import './App.css';

function App() {
	const [alpha, setAlpha] = useState(255);
	const [red, setRed] = useState(0);
	const [green, setGreen] = useState(0);
	const [blue, setBlue] = useState(0);
	const [intColor, setIntColor] = useState(0);

	const updateFromARGB = () => {
		const hexValue = (alpha << 24 | red << 16 | green << 8 | blue) >>> 0;
		setIntColor(hexValue);
	};

	const updateFromInt = (intValue) => {
		setAlpha((intValue >> 24) & 0xFF);
		setRed((intValue >> 16) & 0xFF);
		setGreen((intValue >> 8) & 0xFF);
		setBlue(intValue & 0xFF);
	};

	const handleIntChange = (e) => {
		const intValue = parseInt(e.target.value, 10);
		if (!isNaN(intValue)) {
			setIntColor(intValue);
			updateFromInt(intValue);
		}
	};

	const handleAlphaChange = (e) => {
		setAlpha(parseInt(e.target.value, 10));
		updateFromARGB();
	};

	const handleRedChange = (e) => {
		setRed(parseInt(e.target.value, 10));
		updateFromARGB();
	};

	const handleGreenChange = (e) => {
		setGreen(parseInt(e.target.value, 10));
		updateFromARGB();
	};

	const handleBlueChange = (e) => {
		setBlue(parseInt(e.target.value, 10));
		updateFromARGB();
	};

	return (
		<div>
			<h1>ARGB Color Converter</h1>
			<div>
				<label>
					Alpha:
					<input type="number" value={alpha} onChange={handleAlphaChange} min="0" max="255" />
				</label>
				<label>
					Red:
					<input type="number" value={red} onChange={handleRedChange} min="0" max="255" />
				</label>
				<label>
					Green:
					<input type="number" value={green} onChange={handleGreenChange} min="0" max="255" />
				</label>
				<label>
					Blue:
					<input type="number" value={blue} onChange={handleBlueChange} min="0" max="255" />
				</label>
			</div>
			<div>
				<label>
					Integer Color:
					<input type="number" value={intColor} onChange={handleIntChange} />
				</label>
			</div>
		</div>
	);
}

export default App;
