/* eslint-disable react/prop-types */
// import { useState } from 'react';

const SelectOptions = ({ options, selected, handleSelectOptionChange }) => {
	return (
		<div className="category-add-select select-bordered">
			<select
				value={selected}
				onChange={handleSelectOptionChange}
				className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
			>
				<option value="">parent categories</option>
				{options?.length > 0 &&
					options.map((item) => {
						return (
							<option key={item._id} value={item._id}>
								{item.name}
							</option>
						);
					})}
			</select>
		</div>
	);
};

export default SelectOptions;
