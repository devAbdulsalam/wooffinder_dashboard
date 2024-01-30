/* eslint-disable react/prop-types */
import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	LinearScale,
	CategoryScale,
	BarElement,
	PointElement,
	LineElement,
	Legend,
	Tooltip,
} from 'chart.js';
const BarChart = ({ data }) => {
	ChartJS.register(
		LinearScale,
		CategoryScale,
		BarElement,
		PointElement,
		LineElement,
		Legend,
		Tooltip
	);
	

	return <Bar data={data} />;
};

export default BarChart;
