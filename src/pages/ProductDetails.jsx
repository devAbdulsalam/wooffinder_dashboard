// import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { fetchProduct } from '../hooks/axiosApis';
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/authContext';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
// import axios from 'axios';
// import formatDateString from '../hooks/formatDateString';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import { useQueryClient } from '@tanstack/react-query';

const ProductDetails = () => {
	const { user } = useContext(AuthContext);
	const [product, setProduct] = useState('');
	const { id } = useParams();
	const navigate = useNavigate();
	// const queryClient = useQueryClient();
	const info = { token: user.token, id };
	const { data, isLoading, error } = useQuery(['product', id], async () =>
		fetchProduct(info)
	);
	useEffect(() => {
		if (data) {
			setProduct(data);
			console.log(data);
		}
		if (error) {
			console.log(error);
			// navigate('/order');
			toast.error(error?.message);
		}
	}, [data, error, navigate]);

	return (
		<>
			<div className="body-content px-8 py-8 bg-slate-100">
				<div className="grid grid-cols-12">
					<div className="col-span-10">
						<div className="flex justify-between mb-10 items-end">
							<div className="page-title">
								<h3 className="mb-0 text-[28px]">Product Details</h3>
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
										<Link to={'/products'}>Products</Link> Details
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="product-container">
					<div className="product-image">
						<img src={product?.image?.url} alt={product?.name} />
					</div>
					<div className="product-details">
						<div className="product-name">{product?.name}</div>
						<div className="subname">Jacket</div>
						<div className="product-price">Price: {product?.price}</div>
						<div className="product-price">Quantity: {product?.quantity}</div>
						<div className="category">Category: {product?.category}</div>
						<div className="product-description">
							<p>{product?.description}</p>
						</div>
						<div className="category">
							Tags:{' '}
							{product?.tags?.map((tag, index) => (
								<span key={index}>{tag} </span>
							))}
						</div>
						<button className="add-to-cart">
							Show
						</button>
					</div>
				</div>
			</div>
			{isLoading ? <Loader /> : ''}
		</>
	);
};

export default ProductDetails;
