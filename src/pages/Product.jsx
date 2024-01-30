// import React from 'react'
import { Fragment, useState, useContext, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchProducts } from '../hooks/axiosApis';
import AuthContext from '../context/authContext';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import { useNavigate, Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import ProductTable from '../components/ProductTable';
import getError from '../hooks/getError';

const Product = () => {
	const { user, selectedProduct, setSelectedProduct } = useContext(AuthContext);
	const navigate = useNavigate();
	const apiUrl = import.meta.env.VITE_API_URL;
	const [products, setProducts] = useState([]);
	const { data, isLoading, error } = useQuery(['products'], async () =>
		fetchProducts(user)
	);
	const [isDeleteProductModal, setShowDeleteProductModal] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (data && data?.length > 0) {
			setProducts(data);
			// console.log(data);
			// navigate('/');/
		}
		if (error) {
			console.log(error);
			toast.error(error?.message);
		}
	}, [data, error]);
	const handleDelete = (product) => {
		// console.log(product);
		setShowDeleteProductModal(true);
		setSelectedProduct(product);
	};
	const config = {
		headers: {
			Authorization: `Bearer ${user?.token}`,
			'Content-Type': 'multipart/form-data',
		},
	};
	const queryClient = useQueryClient();
	const handleDeleteProduct = async (product) => {
		setLoading(true);
		setShowDeleteProductModal(false);
		try {
			axios
				.delete(`${apiUrl}/products/${product._id}`, config)
				.then((res) => {
					if (res.data) {
						toast.success('Product deleted successfully');
					}
					queryClient.invalidateQueries(['products']);
				})
				.catch((error) => {
					const message = getError(error);
					toast.error(message);
					setShowDeleteProductModal(true);
				})
				.finally(() => {
					setLoading(false);
					// setShowDeleteProductModal(false);
					setSelectedProduct('');
				});
		} catch (error) {
			console.log(error);
		}
	};
	const handleEdit = (product) => {
		setSelectedProduct(product);
		navigate(`/products/${product._id}/edit`);
	};
	return (
		<>
			<div className="body-content px-8 py-8 bg-slate-100">
				<div className="flex justify-between mb-10">
					<div className="page-title">
						<h3 className="mb-0 text-[28px]">Products</h3>
						<ul className="text-tiny font-medium flex items-center space-x-3 text-text3">
							<li className="breadcrumb-item text-muted">
								<Link to={'/products'} className="text-hover-primary">
									{' '}
									Home
								</Link>
							</li>
							<li className="breadcrumb-item flex items-center">
								<span className="inline-block bg-text3/60 w-[4px] h-[4px] rounded-full"></span>
							</li>
							<li className="breadcrumb-item text-muted">Product List</li>
						</ul>
					</div>
				</div>

				{/* <!-- table --> */}
				<div className="bg-white rounded-t-md rounded-b-md shadow-xs py-4">
					<ProductTable
						data={products}
						handleDelete={handleDelete}
						handleEdit={handleEdit}
						isLoading={isLoading}
					/>
				</div>
			</div>
			{isLoading || loading ? <Loader /> : ''}
			{/*  Delete product alert modal */}
			<Transition appear show={isDeleteProductModal} as={Fragment}>
				<Dialog as="div" className="relative" onClose={() => {}}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/70 bg-opacity-25 z-50" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto flex place-content-center z-50">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all font-josefin">
									<div className="space-y-5 p-4">
										<div className="flex justify-between">
											<div>
												<p className="font-semibold text-lg text-primary">
													Delete Product
												</p>
											</div>
											<button
												onClick={() => setShowDeleteProductModal(false)}
												className="m-1 p-2 py-1 shadow rounded-full hover:bg-red-300 duration-150 ease-in-out"
											>
												<i className="fa-solid fa-xmark text-xl text-red-300 hover:text-red-500" />
											</button>
										</div>
										<div className="p-2">
											<p className="text-center ">
												Are you sure you want to delete this product?
											</p>
											<div className="flex items-center space-x-5">
												<img
													className="w-[60px] h-[60px] rounded-md"
													src={
														selectedProduct?.image?.url ||
														selectedProduct?.image
													}
													alt={selectedProduct?.name}
												/>
												<p className=" text-center">{selectedProduct?.name}</p>
											</div>
										</div>
										<button
											disabled={isLoading || loading}
											className="bg-red-500 hover:bg-red-400 text-white font-semibold h-10 py-1 w-full flex items-center justify-center rounded-md transition-all duration-500 ease-in-out"
											onClick={() => handleDeleteProduct(selectedProduct)}
										>
											<span>Delete Product</span>
											<i className="fa-solid fa-delete text-2xl text-primary"></i>
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default Product;
