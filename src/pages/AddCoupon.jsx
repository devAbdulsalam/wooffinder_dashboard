// import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { fetchCoupons } from '../hooks/axiosApis';
import { useState, useContext, useEffect, useRef } from 'react';
import AuthContext from '../context/authContext';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import MultiSelectDropdown from './../components/MultiSelectDropdown';
import { generateRandomCode } from '../hooks/RandomCode';
import imageIcon from './../../assets/img/icons/upload.png';

const AddCoupon = () => {
	const { user } = useContext(AuthContext);
	// const navigate = useNavigate();
	const apiUrl = import.meta.env.VITE_API_URL;
	// const [search, setSearch] = useState();
	const [loading, setLoading] = useState();
	const { data, isLoading, error } = useQuery(['coupons'], async () =>
		fetchCoupons(user)
	);
	useEffect(() => {
		if (data) {
			console.log(data);
			// navigate('/');
		}
		if (error) {
			console.log(error);
			toast.error(error?.message);
		}
	}, [data, error]);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [code, setCode] = useState(() => generateRandomCode());
	const [endTime, setEndTime] = useState('');
	const [startTime, setStartTime] = useState('');
	const [amount, setAmount] = useState('');
	const [available, setAvailable] = useState('');
	const [minAmount, setMinAmount] = useState('');
	const [type, setType] = useState('');
	const [selectedOptions, setSelectedOptions] = useState([]);
	const [validationError, setValidationError] = useState('');

	const [image, setImage] = useState(null);
	const [imageName, setImageName] = useState(null);
	const [imageFile, setImageFile] = useState(null);
	const hiddenFileInput = useRef(null);
	const queryClient = useQueryClient();
	// const navigate = useNavigate();

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
	const config = {
		headers: {
			Authorization: `Bearer ${user?.token}`,
			'Content-Type': 'multipart/form-data',
		},
	};
	const handleAddCoupon = async () => {
		if (name === '') {
			return toast.error('Coupon name is required');
		}
		if (description === '') {
			return toast.error('Coupon discription is required');
		}
		if (type === '') {
			return toast.error('Coupon type is required');
		}
		if (amount === '') {
			return toast.error('Coupon amount is required');
		}
		if (endTime <= startTime) {
			toast.error('End Time must be greater than Start Time');
		}
		// //check if the catecory is already exist
		const couponAlreadyExist = data.find(
			(item) => item.name.toLowerCase() === name.toLowerCase()
		);
		// // also check if the user is already selected to avoid dublicate
		if (couponAlreadyExist || data.includes(name.toLowerCase())) {
			toast.error('Coupon already added');
			return;
		}
		setLoading(true);
		try {
			const data = {
				name,
				type,
				description,
				available,
				code,
				amount,
				minAmount,
				productType: selectedOptions,
				startTime,
				endTime,
			};
			const formData = new FormData();
			for (const key in data) {
				formData.append(key, data[key]);
			}
			formData.append('image', imageFile);
			axios
				.post(`${apiUrl}/coupons`, formData, config)
				.then((res) => {
					if (res.data) {
						toast.success('Coupons added successfully');
					}
					console.log(res);
					queryClient.invalidateQueries(['coupons']);
					setName('');
					setDescription('');
					setType('');
					setCode(() => generateRandomCode());
				})
				.catch((error) => {
					toast.error(error.message);
					console.log(error);
				})
				.finally(() => {
					setLoading(false);
				});
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};
	const handleStartTimeChange = (e) => {
		setStartTime(e.target.value);
		validateTimeRange(e.target.value, endTime);
	};

	const handleEndTimeChange = (e) => {
		setEndTime(e.target.value);
		validateTimeRange(startTime, e.target.value);
	};

	const validateTimeRange = (start, end) => {
		if (start && end) {
			const startTimeValue = new Date(start).getTime();
			const endTimeValue = new Date(end).getTime();
			// const currentTimeValue = new Date().getTime();

			// if (startTimeValue <= currentTimeValue) {
			// 	return setValidationError('End Time must be greater than Start Time');
			// }
			if (endTimeValue <= startTimeValue) {
				setValidationError('End Time must be greater than Start Time');
			} else {
				setValidationError('');
			}
		}
	};

	return (
		<>
			<div className="body-content px-8 py-8 bg-slate-100">
				<div className="flex justify-between mb-10">
					<div className="page-title">
						<h3 className="mb-0 text-[28px]">Coupon</h3>
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
								<Link to={'/coupons'}>Coupon List</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="col-span-12 lg:col-span-4">
					<div className="mb-6 bg-white px-8 py-8 rounded-md">
						<div className="mb-6">
							<p className="mb-2 text-base text-black">Upload Image</p>
							<div className="text-center" onClick={handleClick}>
								{!image ? (
									<img
										className="w-[100px] h-auto mx-auto"
										src={imageIcon}
										alt="coupon"
									/>
								) : (
									<img
										className="w-[100px] h-auto mx-auto"
										src={image}
										alt={imageName || name}
									/>
								)}
							</div>
							<span className="text-tiny text-center w-full inline-block mb-3">
								Image size must be less than 5Mb
							</span>
							<div className="">
								<form action="#">
									<input
										type="file"
										id="productImage"
										ref={hiddenFileInput}
										onChange={handleImageChange}
										className="hidden"
									/>
									<label
										htmlFor="productImage"
										className="text-tiny w-full inline-block py-1 px-4 rounded-md border border-gray6 text-center hover:cursor-pointer hover:bg-theme hover:text-white hover:border-theme transition"
									>
										Upload Image
									</label>
								</form>
							</div>
						</div>
					</div>
					<div className="mb-6 bg-white px-8 py-8 rounded-md">
						{/* <!-- input --> */}
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
						<div className="w-full grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6">
							{/* <!-- input --> */}
							<div className="mb-6">
								<p className="mb-0 text-base text-black">Type</p>
								<div className="category-add-select select-bordered">
									<select
										value={type}
										onChange={(e) => setType(e.target.value)}
										className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
									>
										<option value="">Select type</option>
										<option value="fixed price">Fixed price</option>
										<option value="percent price">Percent price</option>
									</select>
								</div>
							</div>
							{/* <!-- input --> */}
							<div className="mb-6">
								<p className="mb-0 text-base text-black">Code</p>
								<input
									className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
									type="text"
									placeholder="code"
									value={code}
									onChange={(e) => setCode(e.target.value)}
								/>
							</div>
							<div className="mb-6">
								<p className="mb-0 text-base text-black">Amount</p>
								<input
									className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
									type="number"
									required
									placeholder="amount"
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
								/>
							</div>
							<div className="mb-6">
								<p className="mb-0 text-base text-black">Min Amount</p>
								<input
									className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
									type="text"
									placeholder="min amount"
									required
									value={minAmount}
									onChange={(e) => setMinAmount(e.target.value)}
								/>
							</div>
							<div className="mb-6">
								<p className="mb-0 text-base text-black">Available</p>
								<input
									className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
									type="number"
									required
									placeholder="available"
									value={available}
									onChange={(e) => setAvailable(e.target.value)}
								/>
							</div>
							<div className="">
								<div className="md:flex gap-2">
									<div className="mb-6">
										<p className="mb-0 text-base text-black">Start Time</p>
										<input
											className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
											type="datetime-local"
											placeholder="type"
											required
											value={startTime}
											onChange={handleStartTimeChange}
										/>
									</div>
									<div className="mb-6">
										<p className="mb-0 text-base text-black">End Time</p>
										<input
											className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
											type="datetime-local"
											placeholder="type"
											value={endTime}
											required
											onChange={handleEndTimeChange}
										/>
									</div>
								</div>
								{validationError && (
									<p className="text-red-500 text-center">{validationError}</p>
								)}
							</div>
						</div>
						{/* <!-- input --> */}
						<div className="mb-6">
							<p className="mb-0 text-base text-black">Products</p>
							<div className="flex">
								{selectedOptions?.map((option) => (
									<span key={option}>{option}</span>
								))}
							</div>
							<MultiSelectDropdown
								selectedOptions={selectedOptions}
								setSelectedOptions={setSelectedOptions}
								// options={parentCategories}
								// handleSelectOptionChange={handleSelectOptionChange}
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

						<button onClick={handleAddCoupon} className="tp-btn px-7 py-2">
							Add Coupon
						</button>
					</div>
				</div>
			</div>
			{isLoading || loading ? <Loader /> : ''}
		</>
	);
};

export default AddCoupon;
