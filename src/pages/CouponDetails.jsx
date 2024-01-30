// import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { fetchCoupon } from '../hooks/axiosApis';
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/authContext';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
// import axios from 'axios';
import formatDateString from '../hooks/formatDateString';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import { useQueryClient } from '@tanstack/react-query';

const CouponDetails = () => {
	const { user, setSelectedProduct } = useContext(AuthContext);
	const [coupon, setCoupon] = useState('');
	const { id } = useParams();
	const navigate = useNavigate();
	// const queryClient = useQueryClient();
	const info = { token: user.token, id };
	const { data, isLoading, error } = useQuery(['coupon', id], async () =>
		fetchCoupon(info)
	);
	useEffect(() => {
		if (data) {
			setCoupon(data);
			// console.log(data);
		}
		if (error) {
			console.log(error);
			// navigate('/order');
			toast.error(error?.message);
		}
	}, [data, error, navigate]);
	const handleEdit = (coupon) => {
		setSelectedProduct(coupon);
		navigate(`/coupons/${coupon?._id}/edit`);
	};

	return (
		<>
			<div className="body-content px-8 py-8 bg-slate-100">
				<div className=" w-full">
					<div className="flex justify-between mb-10 items-end">
						<div className="page-title">
							<h3 className="mb-0 text-[28px]">Coupon Details</h3>
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
									<Link to={'/coupon'}>Coupon</Link>
								</li>
							</ul>
						</div>
						<button
							onClick={() => handleEdit(coupon)}
							className="tp-btn px-10 py-2 mb-2"
						>
							Edit
						</button>
					</div>
				</div>
				<div>
					<p>Name: {coupon?.name}</p>
					<p>Amount: {coupon?.amount}</p>
					<p>Start Time: {formatDateString(coupon?.startTime)}</p>
					<p>End Time: {formatDateString(coupon?.endTime)}</p>
					<p>Code: {coupon?.code}</p>
					<p>
						Status:{' '}
						<span
							className={`${
								coupon.status === 'Scheduled'
									? 'text-yellow-500'
									: coupon.status === 'Active'
									? 'text-green-500'
									: 'text-red-500'
							} `}
						>
							{coupon?.status}
						</span>
					</p>
					<p>Code: {coupon?.code}</p>
					<p>Description: {coupon?.description}</p>
				</div>
			</div>
			{isLoading ? <Loader /> : ''}
		</>
	);
};

export default CouponDetails;
