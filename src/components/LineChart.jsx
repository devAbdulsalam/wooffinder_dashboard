/* eslint-disable react/prop-types */
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	LinearScale,
	CategoryScale,
	BarElement,
	PointElement,
	LineElement,Filler,
	Legend,
	Tooltip,
} from 'chart.js';
const LineChart = ({ data }) => {
	const options = {
		plugins: {
			legend: {
				labels: {
					usePointStyle: true,
				},
			},
		},
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	};
	ChartJS.register(
		LinearScale,
		CategoryScale,
		BarElement,
		PointElement,
		LineElement,
		Filler,
		Legend,
		Tooltip
	);
	// const [sales, setSales] = useState({});
	// const labels = data.map((item) => item.year);

	

	return <Line data={data} options={options} />;
};

export default LineChart;
