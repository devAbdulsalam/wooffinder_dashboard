import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/authContext';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import PaymentCheckbox from '../components/PaymentCheckBox';
import { fetchSite } from '../hooks/axiosApis';
import getError from '../hooks/getError';
// import { LocalStorage } from '../hooks/LocalStorage';
const Currencies = [
	{
		name: 'dollar',
		active: true,
	},
	{
		name: 'naira',
		active: false,
	},
	{
		name: 'yen',
		active: false,
	},
];
const payment = [
	{
		icon: 'assets/img/payment/paypal.svg',
		name: 'paypal',
		active: false,
	},
	{
		icon: 'assets/img/payment/unionpay.svg',
		name: 'Union Pay',
		active: false,
	},
	{
		icon: 'assets/img/payment/discover.svg',
		name: 'Discover',
		active: false,
	},
	{
		icon: 'assets/img/payment/mastercard.svg',
		name: 'Master Card',
		active: false,
	},
	{
		icon: 'assets/img/payment/american-express.svg',
		name: 'American Express',
		active: false,
	},
	{
		icon: 'assets/img/payment/visa.svg',
		name: 'Visa Card',
		active: false,
	},
	{
		icon: 'assets/img/payment/bank.svg',
		name: 'Bank Transfer',
		active: true,
	},
	{
		icon: 'assets/img/payment/cod.svg',
		name: 'Cash On Delivery',
		active: false,
	},
];
const dateFormats = ['DD/MM/YY', 'MM/DD/YY', 'YY/MM/DD'];

const SiteSetting = () => {
	const { user, site, setSite } = useContext(AuthContext);
	const apiUrl = import.meta.env.VITE_API_URL;
	const { data, isLoading, error } = useQuery(['site'], async () =>
		fetchSite()
	);
	useEffect(() => {
		if (data) {
			setSite(data);
			console.log(data);
			// navigate('/');
		}
		if (error) {
			console.log(error);
			toast.error(error?.message);
		}
	}, [data, error, setSite]);
	const queryClient = useQueryClient();
	const [siteTitle, setSiteTitle] = useState(site?.siteTitle);
	const [siteUrl, setSiteUrl] = useState(site?.siteUrl);
	const [email, setEmail] = useState(site?.adminEmail || user?.email);
	const [phone, setPhone] = useState(site?.phone || user?.phone);
	const [description, setDescription] = useState(site?.description);
	const [selectedFormat, setSelectedFormat] = useState('DD/MM/YY');
	const [currencies, setCurrencies] = useState(Currencies);
	const [selectedCurrency, setSelectedCurrency] = useState('dollar');
	const [payments, setPayments] = useState(site?.payment || payment);
	const [address, setAddress] = useState(site?.address);
	const [postalCode, setPostalCode] = useState(site?.postalCode);
	const [loading, setIsLoading] = useState('');
	const config = {
		headers: {
			Authorization: `Bearer ${user?.token}`,
			'Content-Type': 'multipart/form-data',
		},
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (siteTitle === '') {
			return toast.error('Site name is required');
		}
		if (siteUrl === '') {
			return toast.error('Site url is required');
		}
		const atLeastOneChecked = payments.some((method) => method.active);
		if (!atLeastOneChecked) {
			return toast.error('Please select at least one payment method.');
		}
		try {
			setIsLoading(true);
			const data = {
				siteTitle,
				adminEmail: email,
				phone,
				description,
				paymentMethods: payments,
				siteUrl,
				currency: currencies,
				dateFormat: selectedFormat,
				address,
				postalCode,
			};
			axios
				.patch(`${apiUrl}/management/site`, data, config)
				.then((res) => {
					// console.log(res);
					setSite(res.data);
					queryClient.invalidateQueries(['site']);
					if (res.data) {
						toast.success('Setting updated successfully');
					}
				})
				.catch((error) => {
					const message = getError(error);
					toast.error(message);
				})
				.finally(() => {
					setIsLoading(false);
				});
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};
	const handleFormatChange = (event) => {
		setSelectedFormat(event.target.value);
	};
	const handleCurrencyChange = (event) => {
		const selectedCurrencyName = event.target.value;

		const updatedCurrencies = currencies.map((currency) => ({
			...currency,
			active: currency.name === selectedCurrencyName,
		}));

		setSelectedCurrency(selectedCurrencyName);
		setCurrencies(updatedCurrencies);
	};

	const handlePaymentChange = (updatedPayment) => {
		setPayments((prevPayments) =>
			prevPayments.map((p) =>
				p.name === updatedPayment.name ? updatedPayment : p
			)
		);
	};
	return (
		<>
			<div className="body-content px-8 py-8 bg-slate-100">
				<div className="flex justify-between mb-10">
					<div className="page-title">
						<h3 className="mb-0 text-[28px]">Site Settings</h3>
					</div>
				</div>

				{/* <!-- content here --> */}

				<div className="bg-white rounded-md">
					<div className="px-6 md:px-10 py-7  border-b border-gray6 sm:flex justify-between items-center">
						<h5 className="text-lg mb-5 sm:mb-0">Basic Information</h5>
						<div className="sm:text-end">
							<button onClick={handleSubmit} className="tp-btn px-10 py-2">
								Save
							</button>
						</div>
					</div>
					<div className="px-0 md:px-10 py-10">
						<div className="grid grid-cols-12 px-6 py-6 gap-6">
							<div className="col-span-12 sm:col-span-5 lg:col-span-4">
								<h6 className="mb-1">Site Information</h6>
								<p className="mb-0 leading-[18px] text-tiny">
									Recommended to include relevant keywords and avoid using
									duplicate or spammy titles.
								</p>
							</div>
							<div className="col-span-12 sm:col-span-7 lg:col-span-8">
								<div className="mb-3">
									<label className="text-black">Site Title</label>
									<input
										type="text"
										value={siteTitle}
										onChange={(e) => setSiteTitle(e.target.value)}
										className="input rounded-md h-11 w-full border border-gray6 text-black"
									/>
								</div>
								<div className="">
									<label className="text-black">Description</label>
									<textarea
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										className="input py-4 rounded-md h-[200px] resize-none w-full border border-gray6  text-black"
									></textarea>
								</div>
							</div>
						</div>
						<div className="grid grid-cols-12 px-6 py-6 gap-6 items-center">
							<div className="col-span-12 sm:col-span-5 lg:col-span-4">
								<h6 className="mb-0">Site URL</h6>
							</div>
							<div className="col-span-12 sm:col-span-7 lg:col-span-8">
								<div className="">
									<input
										type="text"
										className="input rounded-md h-11 w-full border border-gray6  text-black"
										placeholder="https://siteurl.com/"
										value={siteUrl}
										onChange={(e) => setSiteUrl(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="grid grid-cols-12 px-6 py-6 gap-6 items-center">
							<div className="col-span-12 sm:col-span-5 lg:col-span-4">
								<h6 className="mb-0">Administration Email</h6>
							</div>
							<div className="col-span-12 sm:col-span-7 lg:col-span-8">
								<div className="">
									<input
										type="text"
										className="input rounded-md h-11 w-full border border-gray6 text-black"
										placeholder="shahnewaz@mail.com"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="grid grid-cols-12 px-6 py-6 gap-6 items-center">
							<div className="col-span-12 sm:col-span-5 lg:col-span-4">
								<h6 className="mb-0">Administration Phone</h6>
							</div>
							<div className="col-span-12 sm:col-span-7 lg:col-span-8">
								<div className="">
									<input
										type="text"
										className="input rounded-md h-11 w-full border border-gray6 text-black"
										placeholder="shahnewaz@mail.com"
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="grid grid-cols-12 px-6 py-6 gap-6 items-center">
							<div className="col-span-12 sm:col-span-5 lg:col-span-4">
								<h6 className="mb-0">Default Currency</h6>
							</div>
							<div className="col-span-12 sm:col-span-7 lg:col-span-8">
								<div className="currency-format-select select-bordered">
									<select
										value={selectedCurrency}
										onChange={handleCurrencyChange}
									>
										{currencies.map((currency, index) => (
											<option key={index} value={currency.name}>
												{currency.name}
											</option>
										))}
									</select>
								</div>
							</div>
						</div>
						<div className="grid grid-cols-12 px-6 py-6 gap-6 items-center">
							<div className="col-span-12 sm:col-span-5 lg:col-span-4">
								<h6 className="mb-0">Date Format</h6>
							</div>
							<div className="col-span-12 sm:col-span-7 lg:col-span-8">
								<div className="date-format-select select-bordered">
									<select value={selectedFormat} onChange={handleFormatChange}>
										{dateFormats.map((format, index) => (
											<option key={index} value={format}>
												{format}
											</option>
										))}
									</select>
								</div>
							</div>
						</div>
						<div className="grid grid-cols-12 px-6 py-6 gap-6">
							<div className="col-span-12 sm:col-span-5 lg:col-span-4">
								<h6 className="mb-1">Supported Payment Methods</h6>
								<p className="mb-0 leading-[18px] text-tiny">
									Select Payment methods to show on website.
								</p>
							</div>
							<div className="col-span-12 sm:col-span-7 lg:col-span-8">
								<div className="flex flex-col space-y-5">
									{payments.map((p, index) => (
										<PaymentCheckbox
											key={index}
											payment={p}
											onChange={handlePaymentChange}
										/>
									))}
								</div>
							</div>
						</div>
						<div className="grid grid-cols-12 px-6 py-6 gap-6 items-center">
							<div className="col-span-12 sm:col-span-5 lg:col-span-4">
								<h6 className="mb-0">Address</h6>
							</div>
							<div className="col-span-12 sm:col-span-7 lg:col-span-8">
								<div className="">
									<input
										type="text"
										className="input rounded-md h-11 w-full border border-gray6  text-black"
										placeholder="123 Main St , Anytown"
										value={address}
										onChange={(e) => setAddress(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="grid grid-cols-12 px-6 py-6 gap-6 items-center">
							<div className="col-span-12 sm:col-span-5 lg:col-span-4">
								<h6 className="mb-0">Post Code</h6>
							</div>
							<div className="col-span-12 sm:col-span-7 lg:col-span-8">
								<div className="">
									<input
										type="text"
										className="input rounded-md h-11 w-full border border-gray6  text-black"
										placeholder="5236"
										value={postalCode}
										onChange={(e) => setPostalCode(e.target.value)}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="text-end mt-5">
					<button onClick={handleSubmit} className="tp-btn px-10 py-2">
						Save
					</button>
				</div>
			</div>
			{isLoading || loading ? <Loader /> : ''}
		</>
	);
};

export default SiteSetting;
