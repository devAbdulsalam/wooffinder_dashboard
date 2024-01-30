/* eslint-disable react/prop-types */
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Table from './Table';
import DebouncedInput from './DebouncedInput';
import EditTooltip from './EditTooltip';
import DeleteTooltip from './DeleteToolTip';
const DashboardProductTable = ({
	data,
	isLoading,
	handleEdit,
	handleDelete,
}) => {
	const [selectedStatus, setSelectedStatus] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');
	const [globalFilter, setGlobalFilter] = useState('');
	const columns = [
		{
			Header: () => (
				<span className="pr-8 py-3 text-tiny  uppercase font-semibold">
					Item
				</span>
			),
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
		{
			Header: 'Product Id',
			accessor: '',
			Cell: ({ row }) => {
				const product = row.original;
				return (
					<span className="px-3 py-3 font-normal text-slate-600">
						#{product._id.slice(-6)}
					</span>
				);
			},
		},
		{
			Header: 'Category',
			accessor: 'category',
		},
		{
			Header: 'Price',
			accessor: 'price',
			Cell: ({ value }) => (
				<span className="px-3 py-3 font-normal text-slate-600">${value}</span>
			),
		},
		{
			Header: 'Status',
			accessor: 'status',
			Cell: ({ value, row }) => {
				const product = row.original;
				return (
					<span className="px-3">
						{product.quantity <= 0 && (
							<span className="text-[11px] -translate-y-[1px] inline-block text-danger px-3 py-1 rounded-md leading-none bg-danger/10 font-medium text-end">
								Out Of Stock
							</span>
						)}
						{product?.quantity > 0 && product?.quantity < 10 && (
							<span className="text-[11px] -translate-y-[1px] inline-block text-warning px-3 py-1 rounded-md leading-none bg-warning/10 font-medium text-end">
								Low Stock
							</span>
						)}
						{getStatusStyle(value)}
					</span>
				);
			},
		},
		{
			Header: 'Actions',
			accessor: 'actions',
			Cell: ({ row }) => {
				return (
					<div className="flex items-center justify-end space-x-2">
						<EditTooltip handleEdit={handleEdit} data={row.original} />
						<DeleteTooltip handleDelete={handleDelete} data={row.original} />
					</div>
				);
			},
		},
	];
	const filteredData = useMemo(() => {
		let filteredData = data;
		if (selectedStatus !== '') {
			filteredData = filteredData.filter(
				(items) => items.status === selectedStatus
			);
		}
		if (selectedCategory !== '') {
			filteredData = filteredData.filter(
				(items) =>
					items.category?.toLowerCase() === selectedCategory.toLowerCase()
			);
		}

		return filteredData;
	}, [data, selectedStatus, selectedCategory]);
	data = useMemo(() => filteredData, [filteredData]);
	const getStatusStyle = (status) => {
		switch (status) {
			case 'processing':
				return (
					<span className="text-[11px]  text-warning px-3 py-1 rounded-md leading-none bg-warning/10 font-medium">
						{status}
					</span>
				);
			case 'shipped':
				return (
					<span className="text-[11px]  text-info px-3 py-1 rounded-md leading-none bg-info/10 font-medium">
						{status}
					</span>
				);
			case 'show':
				return (
					<span className="text-[11px]  text-success px-3 py-1 rounded-md leading-none bg-success/10 font-medium">
						{status}
					</span>
				);

			case 'cancelled':
				return (
					<span className="text-[11px] text-danger px-3 py-1 rounded-md leading-none bg-danger/10 font-medium">
						{status}
					</span>
				);
			default:
				return (
					<span className="text-[11px]  px-3 py-1 rounded-md leading-none font-medium">
						{status}
					</span>
				);
		}
	};
	return (
		<div className="overflow-scroll 2xl:overflow-visible">
			<div className="w-[1400px] 2xl:w-full">
				<div className="grid grid-cols-12 border-b border-gray rounded-t-md bg-white px-10 py-5">
					<div className="table-information col-span-4">
						<h3 className="font-medium tracking-wide text-slate-800 text-lg mb-0 leading-none">
							Product List
						</h3>
						<p className="text-slate-500 mb-0 text-tiny">
							Avg. 57 orders per day
						</p>
					</div>
					<div className="table-actions space-x-9 flex justify-end items-center col-span-8">
						<div className="table-action-item">
							<div className="show-category flex items-center  category-select">
								<span className="text-tiny font-normal text-slate-400 mr-2">
									Category
								</span>
								<select
									value={selectedCategory}
									onChange={(e) => setSelectedCategory(e.target.value)}
								>
									<option value="">Show All</option>
									<option value="Breakfast">Breakfast</option>
									<option value="Organic Food">Organic Food</option>
									<option value="Beauty & Health">Beauty & Health</option>
								</select>
							</div>
						</div>
						<div className="table-action-item">
							<div className="show-category flex items-center status-select">
								<span className="text-tiny font-normal text-slate-400 mr-2">
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
						</div>
						<div className="w-[250px]">
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
						</div>
					</div>
				</div>
				<div className="relative rounded-b-md bg-white px-10 py-7 ">
					<Table
						data={data}
						columns={columns}
						globalFilter={globalFilter}
						pageSize={10}
						isLoading={isLoading}
					/>
				</div>
			</div>
		</div>
	);
};

export default DashboardProductTable;
