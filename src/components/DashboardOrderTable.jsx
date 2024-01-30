/* eslint-disable react/prop-types */
import { useNavigate, Link } from 'react-router-dom';
import Table from './Table';
import getOrderStatus from '../hooks/getOrderStatus';
const DashboardOrderTable = ({ data, isLoading }) => {
	const navigate = useNavigate();
	const columns = [
		{
			Header: 'Name',
			accessor: 'name',
			Cell: ({ row }) => {
				const order = row.original;
				return (
					<Link
						to={order._id}
						className="font-medium text-heading text-hover-primary"
					>
						{order.name || order.firstName}
					</Link>
				);
			},
		},
		{
			Header: 'Order Id',
			accessor: '',
			Cell: ({ row }) => {
				const order = row.original;
				return (
					<span className="px-3 py-3 font-normal text-slate-600">
						#{order._id.slice(-6)}
					</span>
				);
			},
		},
		{
			Header: 'Price',
			accessor: 'totalPrice',
			Cell: ({ value }) => (
				<span className="px-3 py-3 font-normal text-slate-600">${value}</span>
			),
		},
		{
			Header: 'Status',
			accessor: 'isDelivered',
			Cell: ({ value }) => getOrderStatus(value),
		},
		{
			Header: 'Actions',
			accessor: 'actions',
			Cell: ({ row }) => {
				const order = row.original;
				return (
					<button
						onClick={() => navigate(`orders/${order._id}`)}
						className="bg-info/10 text-info hover:bg-info hover:text-white inline-block text-center leading-5 text-tiny font-medium py-2 px-4 rounded-md "
					>
						View
					</button>
				);
			},
		},
	];
	
	return (
		<div className="overflow-scroll 2xl:overflow-visible">
			<div className="w-[700px] 2xl:w-full">
				<Table
					data={data}
					columns={columns}
					pageSize={10}
					isLoading={isLoading}
				/>
			</div>
		</div>
	);
};

export default DashboardOrderTable;
