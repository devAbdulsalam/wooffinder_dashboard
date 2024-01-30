/* eslint-disable react/prop-types */
import { useMemo } from 'react';
import BarChart from './BarChart';
const SellingCategory = ({ sales }) => {
	const labels = useMemo(() => sales.map((item) => item.name), [sales]);
	const data = useMemo(() => sales.map((item) => item.quantity), [sales]);
	const result = {
		labels,
		datasets: [
			{
				label: 'Sales Count',
				data,
				hoverOffset: 4,
				borderWidth: 1,
				backgroundColor: ['#50CD89', '#F1416C', '#3E97FF', '#ff9800'],
				borderColor: ['#50CD89', '#F1416C', '#3E97FF', '#ff9800'],
			},
		],
		options: {
			responsive: true,
		},
	};
	return <BarChart data={result} />;
};

export default SellingCategory;
