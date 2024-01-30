// import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { fetchTransactions } from '../hooks/axiosApis';
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/authContext';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import getError from '../hooks/getError';
const Transaction = () => {
	const { user, setSelectedProduct } = useContext(AuthContext);
	const { data, isLoading, error } = useQuery(['transactions'], async () =>
		fetchTransactions(user)
	);
	useEffect(() => {
		if (data) {
			console.log(data);
			// navigate('/');/
		}
		if (error) {
			console.log(error);
			const message = getError(error);
			toast.error(message);
		}
	}, [data, error]);
	const [showEditTooltip, setShowEditTooltip] = useState(false);

	const handleMouseEnterEdit = (index) => {
		setShowEditTooltip(index);
	};

	const handleMouseLeaveEdit = () => {
		setShowEditTooltip(null);
	};
	const handleClick = (category) => {
		setSelectedProduct(category);
	};
	return (
		<>
			<div className="body-content px-8 py-8 bg-slate-100">
				<div className="flex justify-between mb-10">
					<div className="page-title">
						<h3 className="mb-0 text-[28px]">Transaction</h3>
						<ul className="text-tiny font-medium flex items-center space-x-3 text-text3">
							<li className="breadcrumb-item text-muted">
								<Link to={'product-list'} className="text-hover-primary">
									{' '}
									Home
								</Link>
							</li>
							<li className="breadcrumb-item flex items-center">
								<span className="inline-block bg-text3/60 w-[4px] h-[4px] rounded-full"></span>
							</li>
							<li className="breadcrumb-item text-muted">Transaction List</li>
						</ul>
					</div>
				</div>
				{/* <!-- table --> */}
				<div className="bg-white rounded-t-md rounded-b-md shadow-xs py-4">
					<div className="tp-search-box flex items-center justify-between px-8 py-8 flex-wrap">
						<div className="search-input relative">
							<input
								className="input h-[44px] w-full pl-14"
								type="text"
								placeholder="Search by Id, amount or date"
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
						<div className="flex justify-end space-x-6 flex-wrap">
							<div className="search-select mr-3 flex items-center space-x-3 ">
								<span className="text-tiny inline-block leading-none -translate-y-[2px]">
									Status :{' '}
								</span>
								<select>
									<option>Paid</option>
									<option>Cash</option>
									<option>Declined</option>
									<option>Pending</option>
								</select>
							</div>
						</div>
					</div>
					<div className="relative overflow-x-auto mx-8 mb-3">
						<table className="w-full 3xl:text-red text-base text-left text-gray-500">
							<thead className="bg-white">
								<tr className="border-b border-gray6 text-tiny">
									<th
										scope="col"
										className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold w-[12%]"
									>
										Transaction ID
									</th>
									<th
										scope="col"
										className="px-3 py-3 text-tiny text-text2 uppercase font-semibold"
									>
										Method
									</th>
									<th
										scope="col"
										className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[250px] text-end"
									>
										Amount
									</th>
									<th
										scope="col"
										className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[250px] text-end"
									>
										Date
									</th>
									<th
										scope="col"
										className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
									>
										Status
									</th>
									<th
										scope="col"
										className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
									>
										Action
									</th>
								</tr>
							</thead>
							<tbody className="w-full">
								{data?.length > 0 &&
									data?.map((transaction) => (
										<tr
											key={transaction._id}
											className="bg-white border-b border-gray6 last:border-0 text-start mx-9"
										>
											<td className="px-3 py-3 font-normal text-[#55585B]">
												#{transaction._id.slice(-6)}
											</td>
											<td className="px-3 py-3 font-normal text-[#55585B] text-end">
												<div className="flex items-center space-x-5">
													<img
														className="max-w-[44px] border border-gray6"
														src="assets/img/payment/master-card.png"
														alt=""
													/>
													<span className="font-medium text-heading">
														MasterCard
													</span>
												</div>
											</td>
											<td className="px-3 py-3 font-normal text-[#55585B] text-end">
												${transaction.cost}
											</td>
											<td className="px-3 py-3 font-normal text-[#55585B] text-end">
												Jan 21, 2023 08:30 AM
											</td>
											<td className="px-3 py-3 text-end">
												<span className="text-[11px]  text-success px-3 py-1 rounded-md leading-none bg-success/10 font-medium text-end">
													Paid
												</span>
											</td>
											<td className="pl-9 py-3 text-end">
												<div className="flex items-center justify-end space-x-2">
													<div className="relative">
														<button
															className="h-10 px-4 leading-10 text-tiny bg-white text-black border border-slate-300 rounded-md hover:bg-green-600 hover:text-white hover:border-green-600"
															onMouseEnter={() =>
																handleMouseEnterEdit(transaction._id)
															}
															onMouseLeave={handleMouseLeaveEdit}
															onClick={handleClick}
														>
															View Details
														</button>
														{showEditTooltip === transaction._id && (
															<div className="flex flex-col items-center z-50 absolute left-1/2 -translate-x-1/2 bottom-full mb-1">
																<span className="relative z-10 p-2 text-tiny leading-none font-medium text-white whitespace-no-wrap w-max bg-slate-800 rounded py-1 px-2 inline-block">
																	Details
																</span>
																<div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
															</div>
														)}
													</div>
												</div>
											</td>
										</tr>
									))}
								{/* <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
									<td className="px-3 py-3 font-normal text-[#55585B]">
										#94267415
									</td>
									<td className="px-3 py-3 font-normal text-[#55585B] text-end">
										<div className="flex items-center space-x-5">
											<img
												className="max-w-[44px] border border-gray6"
												src="assets/img/payment/visa.png"
												alt=""
											/>
											<span className="font-medium text-heading">Visa</span>
										</div>
									</td>
									<td className="px-3 py-3 font-normal text-[#55585B] text-end">
										$2145.00
									</td>
									<td className="px-3 py-3 font-normal text-[#55585B] text-end">
										Jan 25, 2023 10:25 PM
									</td>
									<td className="px-3 py-3 text-end">
										<span className="text-[11px]  text-warning px-3 py-1 rounded-md leading-none bg-warning/10 font-medium text-end">
											Pending
										</span>
									</td>
									<td className="pl-9 py-3 text-end">
										<div className="flex items-center justify-end space-x-2">
											<div className="relative" x-data="{ editTooltip: false }">
												<button
													className="h-10 px-4 leading-10 text-tiny bg-white text-black border border-slate-300 rounded-md hover:bg-green-600 hover:text-white hover:border-green-600"
													x-on:mouseenter="editTooltip = true"
													x-on:mouseleave="editTooltip = false"
												>
													View Details
												</button>
												<div
													x-show="editTooltip"
													className="flex flex-col items-center z-50 absolute left-1/2 -translate-x-1/2 bottom-full mb-1"
												>
													<span className="relative z-10 p-2 text-tiny leading-none font-medium text-white whitespace-no-wrap w-max bg-slate-800 rounded py-1 px-2 inline-block">
														Details
													</span>
													<div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
												</div>
											</div>
										</div>
									</td>
								</tr> */}
							</tbody>
						</table>
					</div>
					<div className="flex justify-between items-center flex-wrap mx-8">
						<p className="mb-0 text-tiny">Showing 10 Result of 20</p>
						<div className="pagination py-3 flex justify-end items-center  mx-8">
							<Link
								to={'#'}
								className="inline-block rounded-md w-10 h-10 text-center leading-[33px] border border-gray mr-2 last:mr-0 hover:bg-theme hover:text-white hover:border-theme"
							>
								<svg
									className="-translate-y-[2px] -translate-x-px"
									width="12"
									height="12"
									viewBox="0 0 12 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M11.9209 1.50495C11.9206 1.90264 11.7623 2.28392 11.4809 2.56495L3.80895 10.237C3.57673 10.4691 3.39252 10.7447 3.26684 11.0481C3.14117 11.3515 3.07648 11.6766 3.07648 12.005C3.07648 12.3333 3.14117 12.6585 3.26684 12.9618C3.39252 13.2652 3.57673 13.5408 3.80895 13.773L11.4709 21.435C11.7442 21.7179 11.8954 22.0968 11.892 22.4901C11.8885 22.8834 11.7308 23.2596 11.4527 23.5377C11.1746 23.8158 10.7983 23.9735 10.405 23.977C10.0118 23.9804 9.63285 23.8292 9.34995 23.556L1.68795 15.9C0.657711 14.8677 0.0791016 13.4689 0.0791016 12.0105C0.0791016 10.552 0.657711 9.15322 1.68795 8.12095L9.35995 0.443953C9.56973 0.234037 9.83706 0.0910666 10.1281 0.0331324C10.4192 -0.0248017 10.7209 0.00490445 10.9951 0.118492C11.2692 0.232079 11.5036 0.424443 11.6684 0.671242C11.8332 0.918041 11.9211 1.20818 11.9209 1.50495Z"
										fill="currentColor"
									/>
								</svg>
							</Link>
							<Link
								to={'#'}
								className="inline-block rounded-md w-10 h-10 text-center leading-[33px] border border-gray mr-2 last:mr-0 hover:bg-theme hover:text-white hover:border-theme"
							>
								2
							</Link>
							<Link
								to={'#'}
								className="inline-block rounded-md w-10 h-10 text-center leading-[33px] border mr-2 last:mr-0 text-white bg-theme border-theme hover:bg-theme hover:text-white hover:border-theme"
							>
								3
							</Link>
							<Link
								to={'#'}
								className="inline-block rounded-md w-10 h-10 text-center leading-[33px] border border-gray mr-2 last:mr-0 hover:bg-theme hover:text-white hover:border-theme"
							>
								4
							</Link>
							<Link
								to={'#'}
								className="inline-block rounded-md w-10 h-10 text-center leading-[33px] border border-gray mr-2 last:mr-0 hover:bg-theme hover:text-white hover:border-theme"
							>
								<svg
									className="-translate-y-px"
									width="12"
									height="12"
									viewBox="0 0 12 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M0.0790405 22.5C0.0793906 22.1023 0.237656 21.7211 0.519041 21.44L8.19104 13.768C8.42326 13.5359 8.60747 13.2602 8.73314 12.9569C8.85882 12.6535 8.92351 12.3284 8.92351 12C8.92351 11.6717 8.85882 11.3465 8.73314 11.0432C8.60747 10.7398 8.42326 10.4642 8.19104 10.232L0.52904 2.56502C0.255803 2.28211 0.104612 1.90321 0.108029 1.50992C0.111447 1.11662 0.269201 0.740401 0.547313 0.462289C0.825425 0.184177 1.20164 0.0264236 1.59494 0.0230059C1.98823 0.0195883 2.36714 0.17078 2.65004 0.444017L10.312 8.10502C11.3423 9.13728 11.9209 10.5361 11.9209 11.9945C11.9209 13.4529 11.3423 14.8518 10.312 15.884L2.64004 23.556C2.43056 23.7656 2.16368 23.9085 1.87309 23.9666C1.58249 24.0247 1.2812 23.9954 1.00723 23.8824C0.733259 23.7695 0.498891 23.5779 0.333699 23.3319C0.168506 23.0858 0.0798928 22.7964 0.0790405 22.5Z"
										fill="currentColor"
									/>
								</svg>
							</Link>
						</div>
					</div>
				</div>
			</div>
			{isLoading && <Loader />}
		</>
	);
};
export default Transaction;
