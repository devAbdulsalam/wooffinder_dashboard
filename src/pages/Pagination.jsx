import { useState, useEffect } from 'react';

const PaginationExample = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [data, setData] = useState([]);
	const itemsPerPage = 5;

	// Simulated data fetching function
	const fetchData = async () => {
		// Assuming fetchData returns an array of data
		const response = await fetch(
			`https://api.example.com/data?page=${currentPage}`
		);
		const newData = await response.json();
		setData(newData);
	};

	// Effect to fetch data when currentPage changes
	useEffect(() => {
		fetchData();
	}, [currentPage]);

	const totalPages = Math.ceil(data.length / itemsPerPage);

	const handleNextPage = () => {
		setCurrentPage((prevPage) => prevPage + 1);
	};

	const handlePrevPage = () => {
		setCurrentPage((prevPage) => prevPage - 1);
	};

	return (
		<div>
			<ul>
				{data
					.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
					.map((item) => (
						<li key={item.id}>{item.name}</li>
					))}
			</ul>

			<button onClick={handlePrevPage} disabled={currentPage === 1}>
				Previous Page
			</button>
			<button onClick={handleNextPage} disabled={currentPage === totalPages}>
				Next Page
			</button>
		</div>
	);
};

export default PaginationExample;
