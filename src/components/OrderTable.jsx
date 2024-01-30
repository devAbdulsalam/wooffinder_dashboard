/* eslint-disable react/prop-types */
import { useState, useMemo } from 'react';
import Table from './TableWithPaginiation';
import { Link } from 'react-router-dom';
import DebouncedInput from './DebouncedInput';

const ProductTable = ({ data }) => {
	const [selectedStatus, setSelectedStatus] = useState('');
	const [globalFilter, setGlobalFilter] = useState('');
	const name = 'Products';

	const handelEdit = (value) => {
		console.log(value);
	};
	const assetsColumns = [
		{
			Header: 'Name',
			accessor: 'name',
			Cell: ({ row }) => {
				const product = row.original;
				return (
					<Link
						to={`/products/${product?._id}`}
						className="flex items-center space-x-5"
					>
						<img
							className="w-[60px] h-[60px] rounded-md"
							src={
								product?.image?.url ||
								product?.image ||
								'assets/img/product/prodcut-1.jpg'
							}
							alt={product?.name}
						/>
						<span className="font-medium text-heading text-hover-primary transition">
							{product?.name}
						</span>
					</Link>
				);
			},
		},
		{ Header: 'SKU', accessor: 'sku' },
		{
			Header: 'QTY',
			accessor: 'quantity',

			Cell: ({ row }) => {
				const product = row.original;
				return (
					<>
						{product?.quantity <= 0 && (
							<span className="text-[11px] -translate-y-[1px] inline-block text-danger px-3 py-1 rounded-md leading-none bg-danger/10 font-medium text-end">
								Out Of Stock
							</span>
						)}
						{product?.quantity > 0 && product?.quantity < 10 && (
							<span className="text-[11px] -translate-y-[1px] inline-block text-warning px-3 py-1 rounded-md leading-none bg-warning/10 font-medium text-end">
								Low Stock
							</span>
						)}{' '}
						{product?.quantity}
					</>
				);
			},
		},

		{ Header: 'Price', accessor: 'price' },
		{ Header: 'Rating', accessor: 'rating' },
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
						<button className="bg-white text-slate-700 border border-slate-200 hover:bg-danger hover:border-danger hover:text-white inline-block text-center leading-5 text-tiny font-medium pt-[6px] pb-[5px] px-4 rounded-md">
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
		<>
			<div className="tp-search-box flex items-center justify-between px-8 py-8">
				<div className="search-input relative">
					<DebouncedInput
						className="input h-[44px] w-full pl-14"
						value={globalFilter ?? ''}
						onChange={(value) => setGlobalFilter(String(value))}
						type="text"
						placeholder="Search..."
					/>
					<button className="absolute top-1/2 left-5 translate-y-[-50%] hover:text-theme">
						<svg
							width="16"
							height="16"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							></path>
							<path
								d="M18.9999 19L14.6499 14.65"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							></path>
						</svg>
					</button>
				</div>
				<div className="flex justify-end space-x-6">
					<div className="search-select mr-3 flex items-center space-x-3 ">
						<span className="text-tiny inline-block leading-none -translate-y-[2px]">
							Status
						</span>
						<select
							value={selectedStatus}
							onChange={(e) => setSelectedStatus(e.target.value)}
						>
							<option value="">Show All</option>
							<option value="active">Active</option>
							<option value="inActive">In Active</option>
							<option value="schedule">Scheduled</option>
							<option value="lowStock">Low Stock</option>
							<option value="outOfStock">Out of Stock</option>
						</select>
					</div>
					<div className="product-add-btn flex ">
						<Link to={'/add-product'} className="tp-btn">
							Add {name}
						</Link>
					</div>
				</div>
			</div>
			<Table
				data={data}
				columns={assetsColumns}
				globalFilter={globalFilter}
				pageSize={2}
				name={name}
			/>
		</>
	);
};

export default ProductTable;
