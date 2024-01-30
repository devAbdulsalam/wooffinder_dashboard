// import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { fetchOrder } from '../hooks/axiosApis';
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/authContext';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import axios from 'axios';
import formatDateString from '../hooks/formatDateString';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import getOrderStatus from '../hooks/getOrderStatus';
import getError from '../hooks/getError';
const OrderDetails = () => {
	const { user } = useContext(AuthContext);
	const [order, setOrder] = useState('');
	const [orderStatus, setOrderStatus] = useState(order.isDelivered || '');
	const { id } = useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const info = { token: user.token, id };
	const { data, isLoading, error } = useQuery(['order', id], async () =>
		fetchOrder(info)
	);
	useEffect(() => {
		if (data) {
			setOrder(data);
			console.log(data);
		}
		if (error) {
			console.log(error);
			// navigate('/order');
			toast.error(error?.message);
		}
	}, [data, error, navigate]);
	const config = {
		headers: {
			Authorization: `Bearer ${user?.token}`,
			// 'Content-Type': 'multipart/form-data',
		},
	};
	const apiUrl = import.meta.env.VITE_API_URL;
	// const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const handleUpdateOrder = async () => {
		const data = {
			isDelivered: orderStatus,
		};
		setLoading(true);
		try {
			axios
				.patch(`${apiUrl}/orders/${id}`, data, config)
				.then((res) => {
					if (res.data) {
						toast.success('Order updated successfully');
					}
					console.log(res);
					queryClient.invalidateQueries(['orders', 'order']);
				})
				.catch((error) => {
					const message = getError(error);
					toast.error(message);
				})
				.finally(() => {
					setLoading(false);
				});
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};
	return (
		<>
			<div className="body-content px-8 py-8 bg-slate-100">
				<div className="flex justify-between mb-10">
					<div className="page-title">
						<h3 className="mb-0 text-[28px]">Order Details</h3>
						<ul className="text-tiny font-medium flex items-center space-x-3 text-text3">
							<li className="breadcrumb-item text-muted">
								<Link to={'/'} className="text-hover-primary">
									{' '}
									Home
								</Link>
							</li>
							<li className="breadcrumb-item flex items-center">
								<span className="inline-block bg-text3/60 w-[4px] h-[4px] rounded-full"></span>
							</li>
							<li className="breadcrumb-item text-muted">
								<Link to={'/orders'}>Order</Link> Details #
								{order?._id?.slice(-6)}
							</li>
						</ul>
					</div>
				</div>

				{/* <!-- table --> */}
				<div className="">
					<div className="flex items-center flex-wrap justify-between px-8 mb-6 bg-white rounded-t-md rounded-b-md shadow-xs py-6">
						<div className="relative">
							<h5 className="font-normal mb-0">
								Oder ID : #{order?._id?.slice(-6)}
							</h5>
							<p className="mb-0 text-tiny">
								Order Created : {formatDateString(order?.updatedAt)}
							</p>
						</div>
						<div className="flex sm:justify-end flex-wrap sm:space-x-6 mt-5 md:mt-0">
							<div className="relative">
								<h5 className="font-normal mb-0">
									Order Status : {getOrderStatus(order?.isDelivered)}
								</h5>

								<div className="search-select mr-3 flex items-center space-x-3 ">
									<span className="text-tiny inline-block leading-none -translate-y-[2px]">
										Change Status :{' '}
									</span>
									<select
										value={orderStatus}
										onChange={(e) => setOrderStatus(e.target.value)}
									>
										<option value={'processing'}>Processing</option>
										<option value={'shipped'}>Shipped</option>
										<option value={'delivered'}>Delivered</option>
										<option value={'refund'}>Refunded</option>
										<option value={'cancelled'}>Cancelled</option>
									</select>
								</div>
							</div>
							<div className="product-add-btn flex ">
								<button onClick={handleUpdateOrder} className="tp-btn ">
									Save
								</button>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 mb-6">
						<div className="bg-white rounded-t-md rounded-b-md shadow-xs px-8 py-8">
							<h5>Customer Details</h5>

							<div className="relative overflow-x-auto ">
								<table className="w-[400px] sm:w-full text-base text-left text-gray-500">
									<tbody>
										<tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
											<td className="py-3 font-normal text-[#55585B] w-[50%]">
												Name
											</td>
											<td className="py-3 whitespace-nowrap ">
												<Link
													to={`/customers/${order?.userId?._id}`}
													className="flex items-center justify-end space-x-5 text-end text-heading text-hover-primary"
												>
													<img
														className="w-10 h-10 rounded-full"
														src={
															order?.userId?.image?.url ||
															'assets/img/users/user-10.jpg'
														}
														alt={order?.firstName}
													/>
													<span className="font-medium ">
														{order?.firstName}
													</span>
												</Link>
											</td>
										</tr>
										<tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
											<td className="py-3 font-normal text-[#55585B] w-[50%]">
												Email
											</td>
											<td className="py-3 text-end">
												<a href="mailto:support@mail.com">{order?.email}</a>
											</td>
										</tr>
										<tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
											<td className="py-3 font-normal text-[#55585B] w-[50%]">
												Phone
											</td>
											<td className="py-3 text-end">
												<a href="tel:9458785014">{order?.phone}</a>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div className="bg-white rounded-t-md rounded-b-md shadow-xs px-8 py-8">
							<h5>Order Summary</h5>

							<div className="relative overflow-x-auto ">
								<table className="w-[400px] sm:w-full text-base text-left text-gray-500">
									<tbody>
										<tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
											<td className="py-3 font-normal text-[#55585B] w-[50%]">
												Order Date
											</td>
											<td className="py-3 whitespace-nowrap text-end">
												{formatDateString(order?.createdAt)}
											</td>
										</tr>
										<tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
											<td className="py-3 font-normal text-[#55585B] w-[50%]">
												Payment Method
											</td>
											<td className="py-3 text-end">
												{order?.paymentMethod}{' '}
												<img
													className="w-[40px] h-auto"
													src="assets/img/icons/visa.svg"
													alt=""
												/>
											</td>
										</tr>
										<tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
											<td className="py-3 font-normal text-[#55585B] w-[50%]">
												Shipping Method
											</td>
											<td className="py-3 text-end">{order?.shippingOption}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div className="bg-white rounded-t-md rounded-b-md shadow-xs px-8 py-8">
							<h5>Deliver To</h5>

							<div className="relative overflow-x-auto ">
								<table className="w-[400px] sm:w-full text-base text-left text-gray-500">
									<tbody>
										<tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
											<td className="py-3 font-normal text-[#55585B] w-[40%]">
												House
											</td>
											<td className="py-3 text-end">{order?.address}</td>
										</tr>
										<tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
											<td className="py-3 font-normal text-[#55585B] w-[40%]">
												Street
											</td>
											<td className="py-3 whitespace-nowrap text-end">
												{order?.zipCode}
											</td>
										</tr>
										<tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
											<td className="py-3 font-normal text-[#55585B] w-[40%]">
												State
											</td>
											<td className="py-3 text-end">
												{order?.city}, {order?.country}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-12 gap-6">
						<div className="col-span-12 2xl:col-span-8">
							<div className="bg-white rounded-t-md rounded-b-md shadow-xs py-8">
								<div className="relative overflow-x-auto  mx-8">
									<table className="w-[975px] md:w-full text-base text-left text-gray-500">
										<thead className="bg-white">
											<tr className="border-b border-gray6 text-tiny">
												<th
													scope="col"
													className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold"
												>
													Product
												</th>
												<th
													scope="col"
													className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
												>
													Unit Price
												</th>
												<th
													scope="col"
													className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
												>
													Quantity
												</th>
												<th
													scope="col"
													className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
												>
													Totally
												</th>
											</tr>
										</thead>
										<tbody>
											{order?.cart?.map((item) => (
												<tr
													key={item._id}
													className="bg-white border-b border-gray6 last:border-0 text-start mx-9"
												>
													<td className="pr-8 py-5 whitespace-nowrap">
														<a href="#" className="flex items-center space-x-5">
															<img
																className="w-[40px] h-[40px] rounded-md"
																src={
																	item.image.url ||
																	'assets/img/product/prodcut-1.jpg'
																}
																alt={item.name}
															/>
															<span className="font-medium text-heading text-hover-primary transition">
																{item.name}
															</span>
														</a>
													</td>
													<td className="px-3 py-3 font-normal text-[#55585B] text-end">
														${item?.price}
													</td>
													<td className="px-3 py-3 font-normal text-[#55585B] text-end">
														{item?.cartQuantity}
													</td>
													<td className="px-3 py-3 font-normal text-[#55585B] text-end">
														${Number(item?.price) * Number(item?.cartQuantity)}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div className="col-span-12 2xl:col-span-4">
							<div className="bg-white rounded-t-md rounded-b-md shadow-xs py-8 px-8">
								<h5>Order Price</h5>
								<div className="relative overflow-x-auto">
									<table className="w-full text-base text-left text-gray-500">
										<tbody>
											<tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
												<td className="pr-3 py-3 pt-6 font-normal text-[#55585B] text-start">
													Subtotal
												</td>
												<td className="px-3 py-3 pt-6 font-normal text-[#55585B] text-end">
													${order?.cartTotalAmount}
												</td>
											</tr>
											<tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
												<td className="pr-3 py-3 font-normal text-[#55585B] text-start">
													Shipping cost:
												</td>
												<td className="px-3 py-3 font-normal text-[#55585B] text-end">
													${order?.shippingPrice}
												</td>
											</tr>
											<tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
												<td className="pr-3 py-3 font-normal text-[#55585B] text-start">
													Grand total:
												</td>
												<td className="px-3 py-3 text-[#55585B] text-end text-lg font-semibold">
													${order?.totalPrice}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{isLoading || loading ? <Loader /> : ''}
		</>
	);
};
export default OrderDetails;
