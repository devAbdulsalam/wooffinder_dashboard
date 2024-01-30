/* eslint-disable react/prop-types */
const RadioInput = ({ options, selectedOption, onChange }) => {
	const handleRadioChange = (event) => {
		onChange(event.target.value);
	};

	return (
		<>
			{options.map((type, index) => (
				<div key={index} className="tp-checkbox-secondary mb-4">
					<label
						htmlFor="discountType"
						className=" inline-block border border-gray px-4 sm:px-10 py-5 rounded-md hover:cursor-pointer"
					>
						<small className="flex items-center">
							<input
								id="discountType"
								name="discountType"
								type="radio"
								value={type}
								checked={
									type === selectedOption ||
									(index === 0 && selectedOption === '')
								}
								onChange={handleRadioChange}
							/>
							<span className="text-base font-medium px-1 capitalize">
								{type}
							</span>
						</small>
					</label>
				</div>
			))}
		</>
	);
};

export default RadioInput;
