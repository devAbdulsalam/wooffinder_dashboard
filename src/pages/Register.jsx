import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/authContext';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logo from './../../assets/img/bg/login-bg.jpg';
import getError from '../hooks/getError';
const Register = () => {
	const { user } = useContext(AuthContext);
	const apiUrl = import.meta.env.VITE_API_URL;
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState('');
	const [cPassword, setCPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		if (user) {
			navigate('/');
		}
	});
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (email === '') {
			return toast.error('Name is required');
		}
		if (email === '') {
			return toast.error('email is required');
		}
		if (password === '') {
			return toast.error('password is required');
		}
		// if (password === cPassword) {
		// 	return toast.error('passwords must be the same');
		// }
		try {
			setIsLoading(true);
			const data = { name, email, password };
			axios
				.post(`${apiUrl}/management/register`, data)
				.then((res) => {
					console.log(res);
					if (res.data) {
						toast.success('Account created successfully');
					}
					navigate('/login');
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
	const backgroundImageUrl = `url(${logo})`;
	const bgImage = {
		backgroundImage: backgroundImageUrl,
	};
	return (
		<>
			<div className="tp-main-wrapper h-screen">
				<div className="container mx-auto my-auto h-full flex items-center justify-center">
					<div className="pt-[120px] pb-[120px] w-full sm:max-w-6xl">
						<div className="grid grid-cols-12 shadow-lg bg-white overflow-hidden rounded-md ">
							<div className="col-span-4 lg:col-span-6 relative h-full hidden lg:block">
								<div
									style={bgImage}
									className="data-bg absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat"
								></div>
							</div>
							<div className="col-span-12 lg:col-span-6 w-full sm:w-[500px] mx-auto my-auto  pt-[50px] py-[60px] px-5 md:px-[60px]">
								<div className="text-center">
									<h4 className="text-[24px] mb-1">Register Now.</h4>
									<p>
										Already have an account?{' '}
										<span>
											{' '}
											<Link to="/login" className="text-theme">
												Sign In
											</Link>{' '}
										</span>
									</p>
								</div>
								<div className="">
									<a
										href="#"
										className="flex items-center justify-center space-x-3 border border-gray6 py-3 px-4 rounded-md hover:border-black"
									>
										<img src="assets/img/icons/google.svg" alt="" />
										<span>Sign up with google</span>
									</a>
								</div>
								<div className="my-6 flex items-center space-x-3">
									<div className="h-px flex-1 bg-slate-200"></div>
									<p className="mb-0">OR</p>
									<div className="h-px flex-1 bg-slate-200"></div>
								</div>
								<div className="">
									<form onSubmit={handleSubmit}>
										<div className="mb-5">
											<p className="mb-0 text-base text-black">
												Your Name <span className="text-red">*</span>
											</p>
											<input
												className="input w-full h-[46px] rounded-md border border-gray6 px-6 text-base"
												type="text"
												placeholder="Enter Your Name"
												value={name}
												onChange={(e) => setName(e.target.value)}
											/>
										</div>
										<div className="mb-5">
											<p className="mb-0 text-base text-black">
												Your Email <span className="text-red">*</span>
											</p>
											<input
												className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base"
												type="email"
												placeholder="Enter Your Email"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
											/>
										</div>
										<div className="mb-5">
											<p className="mb-0 text-base text-black">
												Password <span className="text-red">*</span>
											</p>
											<input
												className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base"
												type="password"
												placeholder="Password"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
											/>
										</div>
										<div className="mb-5">
											<p className="mb-0 text-base text-black">
												Confirm Password <span className="text-red">*</span>
											</p>
											<input
												className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base"
												type="password"
												placeholder="Confirm Password"
												value={cPassword}
												onChange={(e) => setCPassword(e.target.value)}
											/>
										</div>
										<div className="tp-checkbox flex items-start space-x-2 mb-3">
											<input
												id="product-1"
												type="checkbox"
												checked={rememberMe}
												onChange={() => setRememberMe(!rememberMe)}
											/>
											<label htmlFor="product-1" className="text-tiny">
												I accept the terms of the Service &amp;{' '}
												<a href="#">Privacy Policy</a>.
											</label>
										</div>
										<button className="tp-btn h-[49px] w-full justify-center">
											Sign Up
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{isLoading && <Loader />}
		</>
	);
};

export default Register;
