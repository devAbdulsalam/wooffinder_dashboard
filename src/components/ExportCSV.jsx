/* eslint-disable react/prop-types */
import { CSVLink } from 'react-csv';

const ExportCSV = ({ data, filename }) => {
	const headers = [
		{ label: 'Name', key: 'name' },
		{ label: 'Category', key: 'category' },
		{ label: 'Price', key: 'price' },
	];

	return (
		<CSVLink data={data} headers={headers} filename={filename}>
			Export to CSV
		</CSVLink>
	);
};

export default ExportCSV;
