import { useState, useContext, useEffect, useRef } from 'react';
import AuthContext from '../context/authContext';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import axios from 'axios';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { fetchProductCategory } from '../hooks/axiosApis';
import { Link, useNavigate } from 'react-router-dom';
import SelectOptions from '../components/SelectOptions';
import imageIcon from './../../assets/img/icons/upload.png';
import getError from '../hooks/getError';
const EditCategory = () => {
	const { user, selectedProduct, setSelectedProduct } = useContext(AuthContext);
	const apiUrl = import.meta.env.VITE_API_URL;
	const navigate = useNavigate();
	const { data, isLoading, error } = useQuery(['category'], async () =>
		fetchProductCategory(user)
	);
	const [parentCategories, setParentCategories] = useState('');
	useEffect(() => {
		if (data && data.length > 0) {
			setParentCategories(() => data.filter((item) => item.isParent));
			// console.log(data);
		}
		if (error) {
			console.log(error);
			toast.error(error?.message);
		}
	}, [data, error]);
	useEffect(() => {
		if (!selectedProduct) {
			navigate('/category');
		}
		console.log(selectedProduct);
	}, [selectedProduct, navigate]);
	const [name, setName] = useState(selectedProduct.name || '');
	const [isParent, setIsParent] = useState(selectedProduct.isParent || false);
	const [description, setDescription] = useState(
		selectedProduct.description || ''
	);
	const [parent, setParent] = useState(selectedProduct.parent || '');
	const [slug, setSlug] = useState(selectedProduct.slug || '');
	const [image, setImage] = useState(null);
	const [imageName, setImageName] = useState(null);
	const [imageFile, setImageFile] = useState(null);
	const hiddenFileInput = useRef(null);
	const [loading, setLoading] = useState(null);
	const queryClient = useQueryClient();
	const config = {
		headers: {
			Authorization: `Bearer ${user?.token}`,
			'Content-Type': 'multipart/form-data',
		},
	};
	const handleUpdateCoupon = async () => {
		if (name === '') {
			return toast.error('category name is required');
		}
		if (description === '') {
			return toast.error('category discription is required');
		}
		// if (isParent && !imageFile) {
		// 	return toast.error('Image is required for parent category');
		// }
		if (!isParent && !parent) {
			return toast.error('select category type is required');
		}
		// check if the catecory is already exist
		// const categoryAlreadyExist = data.find(
		// 	(item) => item.name.toLowerCase() === name.toLowerCase()
		// );
		// // also check if the user is already selected to avoid dublicate
		// if (categoryAlreadyExist || data.includes(name.toLowerCase())) {
		// 	toast.error('Category already added');
		// 	return;
		// }
		setLoading(true);
		try {
			const data = {
				name,
				parent,
				slug,
				isParent,
				description,
			};
			const formData = new FormData();
			for (const key in data) {
				formData.append(key, data[key]);
			}
			if (imageFile) {
				formData.append('image', imageFile);
			}
			axios
				.patch(
					`${apiUrl}/products/category/${selectedProduct._id}`,
					formData,
					config
				)
				.then((res) => {
					if (res.data) {
						toast.success('Product category updated successfully');
					}
					console.log(res);
					queryClient.invalidateQueries(['category']);
					navigate('/category');
				})
				.catch((error) => {
					const message = getError(error);
					toast.error(message);
					console.log(error);
				})
				.finally(() => {
					setLoading(false);
				});
		} catch (error) {
			setLoading(false);
			const message = getError(error);
			toast.error(message);
			console.log(error);
		}
	};
	const handleRadioChange = () => {
		if (parent) {
			setParent(() => '');
		}
		setIsParent(() => !isParent);
	};
	const handleSelectOptionChange = (e) => {
		if (isParent) {
			setIsParent(() => !isParent);
		}
		setParent(() => e.target.value);
	};
	const handleCancel = () => {
		setSelectedProduct('');
		navigate('/category');
	};
	const handleImageChange = (event) => {
		const file = event.target.files[0];
		const maxSize = 5 * 1024 * 1024; // 5MB in bytes
		const validTypes = ['image/svg+xml', 'image/jpeg', 'image/png'];
		const isValidType = validTypes.includes(file.type);
		if (!file) {
			return toast.error('add a valid image');
		}
		const reader = new FileReader();
		reader.readAsDataURL(file);
		if (!isValidType) {
			toast.error('Invalid file type. Only SVG, JPEG, and PNG are allowed.');
			return;
		}
		if (file.size > maxSize) {
			return toast.error('Image size must be less than 5Mb');
		}
		const imgname = file.name;
		setImageName(imgname);
		reader.onloadend = () => {
			const imageDataURL = reader.result;
			setImage(imageDataURL);
			setImageFile(file);
		};
	};
	const handleClick = () => {
		hiddenFileInput.current.click();
	};
	return (
		<>
			<div className="body-content px-8 py-8 bg-slate-100">
				<div className="flex justify-between mb-10">
					<div className="page-title mb-6 sm:mb-0">
						<h3 className="mb-0 text-[28px]">Edit Category</h3>
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
								<Link to={'/category'}>Category</Link>
							</li>
						</ul>
					</div>
					<div className="mb-2 flex sm:justify-end items-center flex-wrap">
						<button
							onClick={handleUpdateCoupon}
							className="tp-btn px-10 py-2 mr-2 sm:mb-0 mb-2"
						>
							Save
						</button>
						<button
							onClick={handleCancel}
							className="tp-btn px-10 py-2 border border-[#dfdfdf] bg-transparent text-black hover:text-black hover:bg-white hover:border-white sm:mb-0 mb-2"
						>
							Cancel
						</button>
					</div>
				</div>

				{/* <!-- table --> */}
				<div className="bg-white rounded-t-md rounded-b-md shadow-xs py-4">
					<div className="relative overflow-x-auto  mx-8">
						<table className="w-full text-base text-left text-gray-500">
							{/* <!-- Sidemenu closed --> */}
							<div className="app-content icon-content">
								<div className="section">
									<div className="coupon-container">
										<div className="bg-white px-8 py-8 rounded-md mb-6">
											<p className="mb-2 text-base text-black">Upload Image</p>
											<div className="text-center" onClick={handleClick}>
												{!image ? (
													<img
														className="w-[100px] h-auto mx-auto"
														src={selectedProduct?.image?.url || imageIcon}
														alt=""
													/>
												) : (
													<img
														className="w-[100px] h-auto mx-auto"
														src={image || selectedProduct?.image?.url}
														alt={imageName || name}
													/>
												)}
											</div>
											<span className="text-tiny text-center w-full inline-block mb-3">
												{imageName
													? imageName
													: 'Image size must be less than 5Mb'}
											</span>
											<div className="">
												<form>
													<input
														type="file"
														ref={hiddenFileInput}
														onChange={handleImageChange}
														className="hidden"
													/>
													<label
														htmlFor="productImage"
														className="text-tiny w-full inline-block py-1 px-4 rounded-md border border-gray6 text-center hover:cursor-pointer hover:bg-theme hover:text-white hover:border-theme transition"
														onClick={handleClick}
													>
														Upload Image
													</label>
												</form>
											</div>
										</div>
										<div className="mb-6">
											<p className="mb-0 text-base text-black">Name</p>
											<input
												className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
												type="text"
												placeholder="Name"
												value={name}
												onChange={(e) => setName(e.target.value)}
											/>
										</div>
										{/* <!-- input --> */}
										<div className="mb-6">
											<p className="mb-0 text-base text-black">Slug</p>
											<input
												className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
												type="text"
												placeholder="Slug"
												value={slug}
												onChange={(e) => setSlug(e.target.value)}
											/>
										</div>
										{/* <!-- input --> */}
										<div className="mb-6">
											<p className="mb-0 text-base text-black">Parent</p>
											<SelectOptions
												options={parentCategories}
												selected={parent}
												handleSelectOptionChange={handleSelectOptionChange}
											/>
										</div>
										{/* <!-- input --> */}
										<div className="mb-6">
											<p className="mb-0 text-base text-black">Description</p>
											<textarea
												value={description}
												onChange={(e) => setDescription(e.target.value)}
												className="input h-[150px] w-full py-3 resize-none"
												placeholder="Description Here"
											></textarea>
										</div>

										<div className="tp-checkbox flex items-center mb-5">
											<input
												id="product-1"
												checked={isParent}
												onChange={handleRadioChange}
												type="checkbox"
											/>
											<label htmlFor="product-1" className="text-tiny">
												Create As Parent Category
											</label>
										</div>
										<div className="mb-2">
											<button
												onClick={handleUpdateCoupon}
												className="tp-btn px-10 py-2 mr-2 sm:mb-0 mb-2"
											>
												Save
											</button>
										</div>
									</div>
								</div>
							</div>
						</table>
					</div>
				</div>
			</div>
			{isLoading || loading ? <Loader /> : ''}
		</>
	);
};

export default EditCategory;
