import { useState } from 'react';

const RangeSlider = () => {
	const [value, setValue] = useState(50);

	const handleChange = (e) => {
		setValue(e.target.value);
	};

	return (
		<div className="w-full mx-auto mt-10">
			<input
				type="range"
				min="0"
				max="100"
				value={value}
				className="slider appearance-none w-full h-3 rounded bg-gray-300 focus:outline-none focus:ring focus:border-blue-300"
				onChange={handleChange}
			/>
			<div className="text-center mt-3">
				<span className="text-lg font-bold">Value: {value}</span>
			</div>
		</div>
	);
};

export default RangeSlider;

{
	/* <!-- range slider --> */
}
{
	/* <div className="mt-10">
	<div className="w-full">
		<div
			className="relative h-5 w-full"
			id="my-slider"
			data-se-min="00"
			data-se-step="1"
			data-se-min-value="0"
			data-se-max-value="40"
			data-se-max="100"
		>
			<div className="slider-touch-left w-5 h-5 rounded-md absolute z-10 hover:cursor-pointer">
				<span className="block w-full h-full bg-white rounded-full shadow-sm"></span>
			</div>
			<div className="slider-touch-right w-5 h-5 rounded-md absolute z-10 hover:cursor-pointer">
				<span className="block w-full h-full bg-white rounded-full shadow-sm"></span>
			</div>
			<div className="slider-line absolute w-[calc(100%-5rem)] h-1 left-[18px] top-[7px] rounded bg-[#f9f9f9] overflow-hidden">
				<span className="block h-full w-0 bg-theme"></span>
			</div>
		</div>
	</div>
	<div id="result" className="">
		Min: 0 Max: 100
	</div>
</div>; */
}
