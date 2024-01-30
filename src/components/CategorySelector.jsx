/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
// import axios from 'axios';
const CategorySelector = ({
	categories,
	selectedCategory,
	setSelectedCategory,
	selectedSubcategory,
	setSelectedSubcategory,
}) => {
	const [subcategories, setSubcategories] = useState([]);

	// Update subcategories when the selected category changes
	useEffect(() => {
		// console.log(selectedCategory);
		// fetch subcategories based on the selected category
		const result = categories.filter((item) => selectedCategory === item.name);
		// console.log(result);
		setSubcategories(() => result[0]?.subCategories);
	}, [selectedCategory, categories]);

	return (
		<>
			{/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5"> */}
			<div className="category-select select-bordered">
				<label htmlFor="category" className="text-tiny mb-1">
					Category:
				</label>
				<select
					id="category"
					value={selectedCategory}
					onChange={(e) => setSelectedCategory(e.target.value)}
				>
					<option value="">Select Category</option>
					{categories?.map((category, index) => (
						<option key={category._id || index} value={category.name}>
							{category.name}
						</option>
					))}
				</select>
			</div>
			<div className="sub-category-select select-bordered">
				<label htmlFor="subcategory">
					<h5 className="text-tiny mb-1">Sub Category:</h5>
				</label>
				<select
					id="subcategory"
					value={selectedSubcategory}
					onChange={(e) => setSelectedSubcategory(e.target.value)}
				>
					<option value="">Subcategory</option>
					{subcategories?.map((subcategory, index) => (
						<option key={subcategory._id || index} value={subcategory.name}>
							{subcategory.name}
						</option>
					))}
				</select>
			</div>
		</>
	);
};

export default CategorySelector;
