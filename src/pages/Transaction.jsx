// import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { fetchTransaction } from '../hooks/axiosApis';
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/authContext';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import getError from '../hooks/getError';
const Transaction = () => {
	const { user, selectedProduct, setSelectedProduct } = useContext(AuthContext);
	const [transaction, setTransaction] = useState('');
	const { id } = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		if (!selectedProduct) {
			navigate('/transactions');
		}
		console.log(selectedProduct);
	}, [selectedProduct, navigate]);
	const info = { token: user.token, id: selectedProduct._id };
	const { data, isLoading, error } = useQuery(['transactions', id], async () =>
		fetchTransaction(info)
	);
	useEffect(() => {
		if (data) {
			console.log(data);
			console.log(transaction);
			setTransaction(data);
			// navigate('/');/
		}
		if (error) {
			const message = getError(error);
			toast.error(message);
		}
	}, [data, transaction, error]);
	return (
		<>
			<div className="body-content px-8 py-8 bg-slate-100">
				<div className="flex justify-between mb-10">
					<div className="page-title">
						<h3 className="mb-0 text-[28px]">Transaction</h3>
						<ul className="text-tiny font-medium flex items-center space-x-3 text-text3">
							<li className="breadcrumb-item text-muted">
								<Link to={'../product-list'} className="text-hover-primary">
									Home
								</Link>
							</li>
							<li className="breadcrumb-item flex items-center">
								<span className="inline-block bg-text3/60 w-[4px] h-[4px] rounded-full"></span>
							</li>
							<li className="breadcrumb-item text-muted">
								<Link to={'../transactions'} className="text-hover-primary">
									Transaction List{' '}
								</Link>
							</li>
							<li className="breadcrumb-item flex items-center">
								<span className="inline-block bg-text3/60 w-[4px] h-[4px] rounded-full"></span>
							</li>
							<li className="breadcrumb-item text-muted">Transaction Item</li>
						</ul>
					</div>
				</div>

				<div className="grid grid-cols-12 gap-6">
					<div className="col-span-12 md:col-span-6 2xl:col-span-3">
						<div className="bg-white rounded-t-md rounded-b-md shadow-xs py-4">
							<div className="px-8 py-8">
								<h5 className="text-xl mb-12">Transaction Details</h5>
								<div className="">
									<div className="mb-6">
										<h5 className="mb-0 text-base">Transaction ID:</h5>
										<p className="mb-0 text-tiny">#{setSelectedProduct?._id}</p>
									</div>
									<div className="mb-6">
										<h5 className="mb-0 text-base">Customer:</h5>
										<p className="mb-0 text-tiny">Shahnewaz Sakil</p>
									</div>
									<div className="mb-6">
										<h5 className="mb-0 text-base">Date:</h5>
										<p className="mb-0 text-tiny">Jan 25, 2023</p>
									</div>
									<div className="mb-6">
										<h5 className="mb-0 text-base">Billing Address:</h5>
										<p className="mb-0 text-tiny">
											1947 Pursglove Court, Magnetic Springs
										</p>
									</div>
									<div className="mb-6">
										<h5 className="mb-0 text-base">Item List:</h5>
										<p className="mb-0 text-tiny ml-3">
											1.{' '}
											<a href="#" className="text-hover-primary">
												Whitetails Open Sky
											</a>{' '}
											<span className="font-medium">(x2)</span>
										</p>
										<p className="mb-0 text-tiny ml-3">
											2.{' '}
											<a href="#" className="text-hover-primary">
												Simple Modern School Boys
											</a>
											<span className="font-medium">(x5)</span>
										</p>
									</div>
									<div className="mb-6">
										<h5 className="mb-0 text-base">Total Ammount:</h5>
										<p className="mb-0 text-tiny">
											<span>Grand Total - </span> $4152.50
										</p>
									</div>
									<div className="mb-6">
										<h5 className="mb-0 text-base">Payment Method:</h5>
										<p className="mb-0 text-tiny">Master Card</p>
									</div>
								</div>
								<button className="text-black border border-gray6 px-5 py-2 hover:text-white hover:bg-info hover:border-info">
									<span className="mr-1">
										<svg
											className="-translate-y-px"
											width="18"
											height="18"
											viewBox="0 0 32 32"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fill="currentColor"
												d="m10.9052 29.895h10.18c1.099 0 1.99-.8909 1.99-1.99v-5.92c0-1.099-.891-1.99-1.99-1.99h-10.18c-1.099 0-1.99.891-1.99 1.99v5.92c0 1.099.8909 1.99 1.99 1.99z"
											></path>
											<path
												fill="currentColor"
												d="m7.915 26.0044v-6.0093c0-.5522.4478-1 1-1h14.1602c.5522 0 1 .4478 1 1v6.0098h1.5498c2.7461 0 4.98-1.9873 4.98-4.4302v-6.9795c0-2.4375-2.2339-4.4204-4.98-4.4204h-19.2598c-2.7407 0-4.9702 1.9829-4.9702 4.4204v6.9795c0 2.4429 2.2295 4.4302 4.9937 4.4297z"
											></path>
											<path
												fill="currentColor"
												d="m11.8751 2.105c-1.1 0-2 .9-2 2v3.84c0 .8174.6627 1.48 1.48 1.48h9.27c.8174 0 1.48-.6626 1.48-1.48v-3.85c0-1.1-.89-1.99-2-1.99z"
											></path>
										</svg>
									</span>{' '}
									Print Details
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			{isLoading && <Loader />}
		</>
	);
};
export default Transaction;
