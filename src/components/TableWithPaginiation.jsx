/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import Pagination from './Pagination';
import {
	useTable,
	useGlobalFilter,
	useSortBy,
	usePagination,
} from 'react-table';

const Table = ({ data, columns, globalFilter, pageSize, name, isLoading }) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		// rows,
		prepareRow,
		state,
		setGlobalFilter,
		page,
		nextPage,
		gotoPage,
		pageCount,
		previousPage,
		canNextPage,
		canPreviousPage,
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
		<div className="relative overflow-x-auto  mx-8">
			{/* Table */}
			<table {...getTableProps()} style={{ width: '100%' }}>
				<thead className="bg-white">
					{headerGroups.map((headerGroup, index) => (
						<tr
							key={index}
							{...headerGroup.getHeaderGroupProps()}
							className="border-b border-gray 6 text-tiny"
						>
							{headerGroup.headers.map((column, index) => (
								<th
									key={index}
									{...column.getHeaderProps(column.getSortByToggleProps())}
									scope="col"
									className="px-3 py-3 text-tiny text-text uppercase font-semibold text-start"
								>
									{column.render('Header')}
									<span>
										{column.isSorted
											? column.isSortedDesc
												? ' 🔽'
												: ' 🔼'
											: ''}
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
			{/* Pagination */}
			<Pagination
				state={state}
				pageCount={pageCount}
				previousPage={previousPage}
				canPreviousPage={canPreviousPage}
				canNextPage={canNextPage}
				nextPage={nextPage}
				gotoPage={gotoPage}
				name={name}
			/>
		</div>
	);
};

export default Table;
