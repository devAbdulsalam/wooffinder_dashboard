/* eslint-disable react/prop-types */
import * as XLSX from 'xlsx/xlsx.mjs';
const DownloadXlsx = ({ data = [], fileName, ...props }) => {
	return (
		<button
			onClick={() => {
				data = data?.length ? data : [];
				const worksheet = XLSX.utils.json_to_sheet(data);
				const workbook = XLSX.utils.book_new();
				XLSX.utils.book_append_sheet(workbook, worksheet, 'Dates');
				XLSX.writeFile(workbook, fileName ? `${fileName}.xlsx` : 'data.xlsx');
			}}
			{...props}
		>
			Download
		</button>
	);
};

export default DownloadXlsx;
