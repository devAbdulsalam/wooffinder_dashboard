/* eslint-disable react/prop-types */
import { useState, useMemo } from 'react';
import Table from './Table';
import DownloadButton from './DownloadXlsx';
import DebouncedInput from './DebouncedInput';

const ParentTable = ({ data, handelEdit, handelDelete }) => {
	const [selectedStatus, setSelectedStatus] = useState('');
	const [globalFilter, setGlobalFilter] = useState('');

	const assetsColumns = [
		{ Header: 'Name', accessor: 'name' },
		{ Header: 'Purchase Price', accessor: 'purchasePrice' },
		{ Header: 'Additional Costs', accessor: 'additionalCosts' },
		{ Header: 'Total Amount', accessor: 'totalAmount' },
		{
			Header: 'Status',
			accessor: 'status',
			Cell: ({ value }) => (
				<span className={`text-[11px] ${getStatusStyle(value)}`}>{value}</span>
			),
		},
		{
			Header: 'Actions',
			accessor: 'actions',
			Cell: ({ row }) => {
				return (
					<div className="flex items-center space-x-2">
						<button
							onClick={() => handelEdit(row.original)}
							className="bg-success hover:bg-green-600 text-white inline-block text-center leading-5 text-tiny font-medium pt-2 pb-[6px] px-4 rounded-md"
						>
							<span className="text-[9px] inline-block -translate-y-[1px] mr-[1px]">
								Edit
							</span>
						</button>
						<button
							onClick={() => handelDelete(row.original)}
							className="bg-white text-slate-700 border border-slate-200 hover:bg-danger hover:border-danger hover:text-white inline-block text-center leading-5 text-tiny font-medium pt-[6px] pb-[5px] px-4 rounded-md"
						>
							<span className="text-[9px] inline-block -translate-y-[1px] mr-[1px]">
								Delete
							</span>
						</button>
					</div>
				);
			},
		},
	];
	const getStatusStyle = (status) => {
		switch (status) {
			case 'Active':
				return 'text-success';
			case 'Pending':
				return 'text-warning';
			case 'Delivered':
				return 'text-primary';
			default:
				return '';
		}
	};
	const filteredData = useMemo(() => {
		if (selectedStatus === '') {
			return data;
		}
		return data.filter((items) => items.status === selectedStatus);
	}, [data, selectedStatus]);
	data = useMemo(() => filteredData, [filteredData]);
	return (
		<div className="overflow-scroll 2xl:overflow-visible">
			<div className="w-[700px] 2xl:w-full">
				<div className="flex">
					<div className="search-input relative">
						<DebouncedInput
							className="input h-[44px] w-full pl-14"
							value={globalFilter ?? ''}
							onChange={(value) => setGlobalFilter(String(value))}
							type="text"
							placeholder="Search..."
						/>
					</div>
					<div>
						<span className="text-tiny font-normal text-slate-400 mr-2">
							Status
						</span>
						<select
							value={selectedStatus}
							onChange={(e) => setSelectedStatus(e.target.value)}
						>
							<option value="">Show All</option>
							<option value="Active">Active</option>
							<option value="Pending">Pending</option>
							<option value="Delivered">Delivered</option>
						</select>
					</div>
					<DownloadButton
						data={data}
						fileName={'testing'}
						className="tp-btn px-5 py-2"
					/>
				</div>
				<Table
					data={data}
					columns={assetsColumns}
					globalFilter={globalFilter}
					pageSize={10}
				/>
			</div>
		</div>
	);
};

export default ParentTable;
