// import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { fetchProductCategoryDetail } from '../hooks/axiosApis';
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/authContext';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
// import axios from 'axios';
// import formatDateString from '../hooks/formatDateString';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import { useQueryClient } from '@tanstack/react-query';

const CategoryDetails = () => {
	const { user, setSelectedProduct } = useContext(AuthContext);
	const [category, setCategory] = useState('');
	const { id } = useParams();
	const navigate = useNavigate();
	// const queryClient = useQueryClient();
	const info = { token: user.token, id };
	const { data, isLoading, error } = useQuery(['category', id], async () =>
		fetchProductCategoryDetail(info)
	);
	useEffect(() => {
		if (data) {
			setCategory(data);
			console.log(data);
		}
		if (error) {
			console.log(error);
			// navigate('/order');
			toast.error(error?.message);
		}
	}, [data, error, navigate]);
	const handleEdit = (category) => {
		setSelectedProduct(category);
		navigate(`/category/${category?._id}/edit`);
	};

	return (
		<>
			<div className="body-content px-8 py-8 bg-slate-100">
				<div className=" w-full">
					<div className="flex justify-between mb-10 items-end">
						<div className="page-title">
							<h3 className="mb-0 text-[28px]">Category Details</h3>
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
									<Link to={'/category'}>Category</Link> List
								</li>
							</ul>
						</div>
						<button
							onClick={() => handleEdit(category)}
							className="tp-btn px-10 py-2 mb-2"
						>
							Edit
						</button>
					</div>
				</div>
				<div className="category-details-container">
					<div className="category-details">
						<img src={category?.image?.url} alt={category?.name} />
						<h2>{category?.name}</h2>
						{!category?.isParent && (
							<p>
								Parent Category:
								<Link to={`/category/${category?.parent?._id}`}>
									{category?.parent?.name}
								</Link>
							</p>
						)}
						<p>Slug: {category?.slug}</p>
						<p>Products: {category?.items}</p>
						<p>Description: {category?.description}</p>
					</div>
					{category?.subcategories && (
						<div>
							<h4>Sub Categories:</h4>
							<ul>
								{category?.subcategories?.map((subcategory) => (
									<li key={subcategory._id}>
										<Link
											to={`/category/${subcategory._id}`}
											className="capitalize"
										>
											{subcategory?.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>
			{isLoading ? <Loader /> : ''}
		</>
	);
};

export default CategoryDetails;
