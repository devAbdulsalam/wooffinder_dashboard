/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import {
	useTable,
	useGlobalFilter,
	useSortBy,
	usePagination,
} from 'react-table';

const Table = ({ data, columns, globalFilter, pageSize, isLoading }) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		// rows,
		prepareRow,
		setGlobalFilter,
		page,
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0, pageSize },
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	);
	useEffect(() => {
		setGlobalFilter(globalFilter);
	}, [globalFilter, setGlobalFilter]);
	return (
		<table
			{...getTableProps()}
			className="w-full text-base text-left text-gray-500"
		>
			<thead className="bg-white">
				{headerGroups.map((headerGroup, index) => (
					<tr
						key={index}
						{...headerGroup.getHeaderGroupProps()}
						className="border-b border-gray  text-tiny"
					>
						{headerGroup.headers.map((column, index) => (
							<th
								key={index}
								{...column.getHeaderProps(column.getSortByToggleProps())}
								scope="col"
								className="px-3 py-3 text-tiny text-text uppercase font-semibold "
							>
								{column.render('Header')}
								<span className="">
									{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
								</span>
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{!isLoading ? (
					page.length ? (
						page.map((row, index) => {
							prepareRow(row);
							return (
								<tr
									key={index}
									{...row.getRowProps()}
									className="bg-white border-b border-gray last:border-0 text-start"
								>
									{row.cells.map((cell, index) => (
										<td
											key={index}
											{...cell.getCellProps()}
											className="px-3 py-3 font-normal text-slate-600"
										>
											{cell.render('Cell')}
										</td>
									))}
								</tr>
							);
						})
					) : (
						<tr className="text-center">
							<td className="text-2xl p-4 text-red-500" colSpan={12}>
								No Record Found!
							</td>
						</tr>
					)
				) : (
					<tr className="text-center">
						<td className="text-2xl p-4 text-blue-500" colSpan={12}>
							Loading Table!
						</td>
					</tr>
				)}
			</tbody>
		</table>
	);
};
export default Table;
