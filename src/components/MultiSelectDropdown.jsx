/* eslint-disable react/prop-types */
const MultiSelectDropdown = ({ selectedOptions, setSelectedOptions }) => {
	const handleSelectChange = (e) => {
		const selectedValues = Array.from(
			e.target.selectedOptions,
			(option) => option.value
		);
		setSelectedOptions(() => selectedValues);
		console.log(selectedOptions);
	};

	return (
		<div className="category-add-select select-bordered">
			<select
				multiple
				value={selectedOptions}
				onChange={handleSelectChange}
				className="input w-full rounded-md border border-gray py-2 px-6 text-base"
			>
				<option value="option1">Option 1</option>
				<option value="option2">Option 2</option>
				<option value="option3">Option 3</option>
				<option value="option4">Option 4</option>
				<option value="option5">Option 5</option>
			</select>
		</div>
	);
};

export default MultiSelectDropdown;
