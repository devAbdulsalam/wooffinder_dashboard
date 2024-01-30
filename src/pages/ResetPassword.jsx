import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/authContext';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import getError from '../hooks/getError';
const ResetPassword = () => {
	const { user } = useContext(AuthContext);
	const apiUrl = import.meta.env.VITE_API_URL;
	const [password, setPassword] = useState('');
	const [cPassword, setCPassword] = useState('');
	const [isLoading, setIsLoading] = useState('');
	const navigate = useNavigate();
	useEffect(() => {
		if (user) {
			navigate('/');
		}
	});
	const { token } = useParams();
	useEffect(() => {
		if (!token) {
			navigate('/');
		}
	});
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== cPassword) {
			return toast.error('Passwords must be the same');
		}
		if (password == '' || cPassword == '') {
			return toast.error('Enter password and confirm password');
		}
		try {
			setIsLoading(true);
			const data = { password, token };
			console.log(data);
			axios
				.post(`${apiUrl}/management/password-reset`, data)
				.then((res) => {
					console.log(res);
					if (res.data) {
						toast.success('Password reset successfull');
						setTimeout(() => {
							toast.success('Login in to continue');
							navigate('/login');
						}, 500);
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
			const message = getError(error);
			toast.error(message);
			setIsLoading(false);
		}
	};
	return (
		<>
			<div className="tp-main-wrapper h-screen">
				<div className="container mx-auto my-auto h-full flex items-center justify-center">
					<div className="w-[500px] mx-auto my-auto shadow-lg bg-white pt-[50px] py-[60px] px-[60px]">
						<div className="text-center">
							<h4 className="text-[24px] mb-1">Reset Password</h4>
							<p>Enter new secured passwords to reset your password.</p>
						</div>
						<div className="">
							<form onSubmit={handleSubmit}>
								<div className="mb-5">
									<p className="mb-0 text-base text-black">
										Password <span className="text-red">*</span>
									</p>
									<input
										className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base"
										type="password"
										value={password}
										placeholder="Enter new password"
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>
								<div className="mb-5">
									<p className="mb-0 text-base text-black">
										Confirm password <span className="text-red">*</span>
									</p>
									<input
										className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base"
										type="text"
										value={cPassword}
										placeholder="confrim password"
										onChange={(e) => setCPassword(e.target.value)}
									/>
								</div>
								<button
									type="submit"
									className="tp-btn h-[49px] w-full justify-center"
								>
									Reset Password
								</button>

								<div className="tp-checkbox flex items-start space-x-2 mt-5 justify-center">
									<p className="mb-0 leading-none">
										Remember password ?{' '}
										<Link
											to="/login"
											className="text-theme border-b border-transparent hover:border-theme"
										>
											Login
										</Link>
									</p>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			{isLoading && <Loader />}
		</>
	);
};

export default ResetPassword;
