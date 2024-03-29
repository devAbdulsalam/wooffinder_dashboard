/* eslint-disable react/prop-types */
import { Fragment, useState, useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { LocalStorage } from '../hooks/LocalStorage';
import AuthContext from '../context/authContext';
import { useQuery } from '@tanstack/react-query';
import { fetchSite } from '../hooks/axiosApis';
import logo from './../assets/img/logo/logo.svg';
const Sidebar = ({ sideMenu, setSideMenu }) => {
	const navigate = useNavigate();
	const [nav, setNav] = useState(null);
	const { setUser, setToken, setSite } = useContext(AuthContext);
	const [isLogoutModal, setIsLogoutModal] = useState(false);
	const handleNav = (number) => {
		nav !== number ? setNav(number) : setNav(null);
	};
	const { data } = useQuery(['site'], async () => fetchSite());
	const [isMobile, setIsMobile] = useState(false);

	const handleResize = () => {
		const screenWidth = window.innerWidth;
		setIsMobile(screenWidth <= 1024); // Set a threshold for tablet screen size (e.g., 1024 pixels)
		// setIsMobile(screenWidth <= 768); // Set a threshold for mobile screen size (e.g., 768 pixels)
	};
	const handleLogOut = () => {
		LocalStorage.remove('user');
		LocalStorage.remove('token');
		setUser('');
		setToken('');
		navigate('login');
		setIsLogoutModal(false);
	};
	useEffect(() => {
		if (data) {
			setSite(data);
			console.log(data);
		}
	}, [data, setSite]);

	useEffect(() => {
		// Initial check on component mount
		handleResize();

		// Add event listener to check on window resize
		window.addEventListener('resize', handleResize);

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	const openLogoutModal = () => {
		setIsLogoutModal(true);
		handleSideBar();
	};
	const handleSideBar = () => {
		// check screen size and close sidebar on mobile screen
		if (!isMobile) {
			return;
		}
		setSideMenu(!sideMenu);
	};
	return (
		<>
			<aside
				className={`w-[300px] lg:w-[250px] xl:w-[300px] border-r border-gray overflow-y-none sidebar-scrollbar fixed left-0 top-0 h-full bg-white z-50 transition-transform duration-300 ${
					sideMenu
						? 'translate-x-[0px]'
						: ' -translate-x-[300px] lg:translate-x-[0]'
				}`}
			>
				<div className="">
					<div className="py-4 pb-8 px-8 border-b border-gray h-[78px] w-full flex justify-between debug items-center">
						<NavLink to={'/'}>
							<img className="w-[140px]" src={logo} alt="" />
						</NavLink>
						<button
							type="button"
							className="block lg:hidden text-2xl text-black"
							onClick={handleSideBar}
						>
							<svg
								width="20"
								height="12"
								viewBox="0 0 20 12"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M1 1H19"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
								<path
									d="M1 6H19"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
								<path
									d="M1 11H19"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
							</svg>
						</button>
					</div>
					<div className="px-4 py-5">
						<ul>
							<li onClick={handleSideBar}>
								<NavLink
									to={'/'}
									onClick={() => handleNav(0)}
									className={`${
										nav == 0
											? 'bg-themeLight hover:bg-themeLight text-theme'
											: ''
									} group rounded-md relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-5 py-[9px] mb-2 hover:bg-gray sidebar-NavLink-active`}
								>
									<span className="inline-block  mr-[10px] text-xl">
										<svg
											className="-translate-y-[4px]"
											xmlnsXlink="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											width="16"
											height="16"
										>
											<path
												fill="currentColor"
												d="M7,0H4A4,4,0,0,0,0,4V7a4,4,0,0,0,4,4H7a4,4,0,0,0,4-4V4A4,4,0,0,0,7,0ZM9,7A2,2,0,0,1,7,9H4A2,2,0,0,1,2,7V4A2,2,0,0,1,4,2H7A2,2,0,0,1,9,4Z"
											/>
											<path
												fill="currentColor"
												d="M20,0H17a4,4,0,0,0-4,4V7a4,4,0,0,0,4,4h3a4,4,0,0,0,4-4V4A4,4,0,0,0,20,0Zm2,7a2,2,0,0,1-2,2H17a2,2,0,0,1-2-2V4a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2Z"
											/>
											<path
												fill="currentColor"
												d="M7,13H4a4,4,0,0,0-4,4v3a4,4,0,0,0,4,4H7a4,4,0,0,0,4-4V17A4,4,0,0,0,7,13Zm2,7a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2H7a2,2,0,0,1,2,2Z"
											/>
											<path
												fill="currentColor"
												d="M20,13H17a4,4,0,0,0-4,4v3a4,4,0,0,0,4,4h3a4,4,0,0,0,4-4V17A4,4,0,0,0,20,13Zm2,7a2,2,0,0,1-2,2H17a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2Z"
											/>
										</svg>
									</span>
									Dashboard
								</NavLink>
							</li>
							<li>
								<a
									onClick={() => handleNav(1)}
									className={`${
										nav == 0
											? 'bg-themeLight hover:bg-themeLight text-theme'
											: ''
									} group rounded-md relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-5 py-[9px] mb-3 hover:bg-gray sidebar-NavLink-active`}
								>
									<span className="inline-block translate-y-[1px] mr-[10px] text-xl">
										<svg
											className="-translate-y-[4px]"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											width="16"
											height="16"
										>
											<path
												fill="currentColor"
												d="M23.621,6.836l-1.352-2.826c-.349-.73-.99-1.296-1.758-1.552L14.214,.359c-1.428-.476-3-.476-4.428,0L3.49,2.458c-.769,.256-1.41,.823-1.759,1.554L.445,6.719c-.477,.792-.567,1.742-.247,2.609,.309,.84,.964,1.49,1.802,1.796l-.005,6.314c-.002,2.158,1.372,4.066,3.418,4.748l4.365,1.455c.714,.238,1.464,.357,2.214,.357s1.5-.119,2.214-.357l4.369-1.457c2.043-.681,3.417-2.585,3.419-4.739l.005-6.32c.846-.297,1.508-.946,1.819-1.79,.317-.858,.228-1.799-.198-2.499ZM10.419,2.257c1.02-.34,2.143-.34,3.162,0l4.248,1.416-5.822,1.95-5.834-1.95,4.246-1.415ZM2.204,7.666l1.327-2.782c.048,.025,7.057,2.373,7.057,2.373l-1.621,3.258c-.239,.398-.735,.582-1.173,.434l-5.081-1.693c-.297-.099-.53-.325-.639-.619-.109-.294-.078-.616,.129-.97Zm3.841,12.623c-1.228-.409-2.052-1.554-2.051-2.848l.005-5.648,3.162,1.054c1.344,.448,2.792-.087,3.559-1.371l.278-.557-.005,10.981c-.197-.04-.391-.091-.581-.155l-4.366-1.455Zm11.897-.001l-4.37,1.457c-.19,.063-.384,.115-.581,.155l.005-10.995,.319,.64c.556,.928,1.532,1.459,2.561,1.459,.319,0,.643-.051,.96-.157l3.161-1.053-.005,5.651c0,1.292-.826,2.435-2.052,2.844Zm4-11.644c-.105,.285-.331,.504-.619,.6l-5.118,1.706c-.438,.147-.934-.035-1.136-.365l-1.655-3.323s7.006-2.351,7.054-2.377l1.393,2.901c.157,.261,.186,.574,.081,.859Z"
											/>
										</svg>
									</span>
									Products
									<span
										className={`absolute right-4 top-[52%] transition-transform duration-300 origin-center w-4 h-4" ${
											nav == 1
												? 'translate-y-[-10px] rotate-90'
												: 'translate-y-[-10px]'
										}`}
									>
										<svg
											className="-translate-y-[5px]"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											width="16"
											height="16"
										>
											<path
												fill="currentColor"
												d="M15.4,9.88,10.81,5.29a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L14,11.29a1,1,0,0,1,0,1.42L9.4,17.29a1,1,0,0,0,1.41,1.42l4.59-4.59A3,3,0,0,0,15.4,9.88Z"
											/>
										</svg>
									</span>
								</a>
								{nav === 1 && (
									<ul className={`pl-[42px] pr-[20px] pb-3`}>
										<li>
											<NavLink
												to={'/products'}
												onClick={handleSideBar}
												className="block font-normal w-full text-[#6D6F71] hover:text-theme nav-dot"
											>
												Product List
											</NavLink>
										</li>
										<li>
											<NavLink
												to={'/product-grid'}
												onClick={handleSideBar}
												className="block font-normal w-full text-[#6D6F71] hover:text-theme nav-dot"
											>
												Product Grid
											</NavLink>
										</li>
										<li>
											<NavLink
												to={'/add-product'}
												onClick={handleSideBar}
												className="block font-normal w-full text-[#6D6F71] hover:text-theme nav-dot"
											>
												Add Product
											</NavLink>
										</li>
									</ul>
								)}
							</li>
							<li>
								<NavLink
									to={'category'}
									onClick={handleSideBar}
									className="group rounded-md relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-5 py-[9px] mb-3 hover:bg-gray sidebar-NavLink-active"
								>
									<span className="inline-block translate-y-[1px] mr-[10px] text-xl">
										<svg
											className="-translate-y-[4px]"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											width="16"
											height="16"
										>
											<path
												fill="currentColor"
												d="M22.713,4.077A2.993,2.993,0,0,0,20.41,3H4.242L4.2,2.649A3,3,0,0,0,1.222,0H1A1,1,0,0,0,1,2h.222a1,1,0,0,1,.993.883l1.376,11.7A5,5,0,0,0,8.557,19H19a1,1,0,0,0,0-2H8.557a3,3,0,0,1-2.82-2h11.92a5,5,0,0,0,4.921-4.113l.785-4.354A2.994,2.994,0,0,0,22.713,4.077ZM21.4,6.178l-.786,4.354A3,3,0,0,1,17.657,13H5.419L4.478,5H20.41A1,1,0,0,1,21.4,6.178Z"
											/>
											<circle fill="currentColor" cx="7" cy="22" r="2" />
											<circle fill="currentColor" cx="17" cy="22" r="2" />
										</svg>
									</span>
									Categories
								</NavLink>
							</li>
							<li>
								<NavLink
									to={'customers'}
									onClick={handleSideBar}
									className="group rounded-md relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-5 py-[9px] mb-3 hover:bg-gray sidebar-NavLink-active"
								>
									<span className="inline-block translate-y-[1px] mr-[10px] text-xl">
										<svg
											className="-translate-y-[4px]"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											width="16"
											height="16"
										>
											<path
												fill="currentColor"
												d="M12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,12,10Zm6,13A6,6,0,0,0,6,23a1,1,0,0,0,2,0,4,4,0,0,1,8,0,1,1,0,0,0,2,0ZM18,8a4,4,0,1,1,4-4A4,4,0,0,1,18,8Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,18,2Zm6,13a6.006,6.006,0,0,0-6-6,1,1,0,0,0,0,2,4,4,0,0,1,4,4,1,1,0,0,0,2,0ZM6,8a4,4,0,1,1,4-4A4,4,0,0,1,6,8ZM6,2A2,2,0,1,0,8,4,2,2,0,0,0,6,2ZM2,15a4,4,0,0,1,4-4A1,1,0,0,0,6,9a6.006,6.006,0,0,0-6,6,1,1,0,0,0,2,0Z"
											/>
										</svg>
									</span>
									Customers
								</NavLink>
							</li>
							<li>
								<NavLink
									to={'orders'}
									onClick={handleSideBar}
									className="group rounded-md relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-5 py-[9px] mb-3 hover:bg-gray sidebar-NavLink-active"
								>
									<span className="inline-block translate-y-[1px] mr-[10px] text-xl">
										<svg
											className="-translate-y-[4px]"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											width="16"
											height="16"
										>
											<path
												fill="currentColor"
												d="m11.349,24H0V3C0,1.346,1.346,0,3,0h12c1.654,0,3,1.346,3,3v5.059c-.329-.036-.662-.059-1-.059s-.671.022-1,.059V3c0-.552-.448-1-1-1H3c-.552,0-1,.448-1,1v19h7.518c.506.756,1.125,1.429,1.831,2Zm0-14h-7.349v2h5.518c.506-.756,1.125-1.429,1.831-2Zm-7.349,7h4c0-.688.084-1.356.231-2h-4.231v2Zm20,0c0,3.859-3.141,7-7,7s-7-3.141-7-7,3.141-7,7-7,7,3.141,7,7Zm-2,0c0-2.757-2.243-5-5-5s-5,2.243-5,5,2.243,5,5,5,5-2.243,5-5ZM14,5H4v2h10v-2Zm5.589,9.692l-3.228,3.175-1.63-1.58-1.393,1.436,1.845,1.788c.314.315.733.489,1.179.489s.865-.174,1.173-.482l3.456-3.399-1.402-1.426Z"
											/>
										</svg>
									</span>
									Orders
								</NavLink>
							</li>
							<li>
								<NavLink
									to={'transactions'}
									onClick={handleSideBar}
									className="group rounded-md relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-5 py-[9px] mb-3 hover:bg-gray sidebar-NavLink-active"
								>
									<span className="inline-block translate-y-[1px] mr-[10px] text-xl">
										<svg
											className="-translate-y-[4px]"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											width="16"
											height="16"
										>
											<path
												fill="currentColor"
												d="m11.349,24H0V3C0,1.346,1.346,0,3,0h12c1.654,0,3,1.346,3,3v5.059c-.329-.036-.662-.059-1-.059s-.671.022-1,.059V3c0-.552-.448-1-1-1H3c-.552,0-1,.448-1,1v19h7.518c.506.756,1.125,1.429,1.831,2Zm0-14h-7.349v2h5.518c.506-.756,1.125-1.429,1.831-2Zm-7.349,7h4c0-.688.084-1.356.231-2h-4.231v2Zm20,0c0,3.859-3.141,7-7,7s-7-3.141-7-7,3.141-7,7-7,7,3.141,7,7Zm-2,0c0-2.757-2.243-5-5-5s-5,2.243-5,5,2.243,5,5,5,5-2.243,5-5ZM14,5H4v2h10v-2Zm5.589,9.692l-3.228,3.175-1.63-1.58-1.393,1.436,1.845,1.788c.314.315.733.489,1.179.489s.865-.174,1.173-.482l3.456-3.399-1.402-1.426Z"
											/>
										</svg>
									</span>
									Transactions
								</NavLink>
							</li>
							<li>
								<NavLink
									to={'reviews'}
									onClick={handleSideBar}
									className="group rounded-md relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-5 py-[9px] mb-3 hover:bg-gray sidebar-NavLink-active"
								>
									<span className="inline-block translate-y-[1px] mr-[10px] text-xl">
										<svg
											className="-translate-y-[3px]"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											width="16"
											height="16"
										>
											<path
												fill="currentColor"
												d="M12.01,23.67c-.48,0-.96-.17-1.34-.51l-3.75-3.16h-2.92c-2.21,0-4-1.79-4-4V4C0,1.79,1.79,0,4,0H20c2.21,0,4,1.79,4,4v12c0,2.21-1.79,4-4,4h-2.85l-3.85,3.18c-.36,.32-.83,.49-1.29,.49ZM4,2c-1.1,0-2,.9-2,2v12c0,1.1,.9,2,2,2h3.29c.24,0,.46,.08,.64,.24l4.05,3.41,4.17-3.42c.18-.15,.4-.23,.64-.23h3.21c1.1,0,2-.9,2-2V4c0-1.1-.9-2-2-2H4Zm5.01,13.35c-.19,0-.39-.06-.55-.18-.31-.23-.44-.64-.32-1.01l.86-2.76-2.18-1.77c-.29-.25-.4-.65-.27-1.01,.13-.36,.48-.6,.86-.6h2.75l.97-2.61c.13-.36,.48-.6,.86-.6s.73,.24,.86,.6l.97,2.61h2.75c.38,0,.73,.24,.86,.6s.02,.77-.27,1.02l-2.17,1.77,.9,2.73c.12,.37,0,.78-.31,1.01-.31,.24-.73,.25-1.06,.04l-2.52-1.64-2.48,1.66c-.15,.1-.33,.15-.51,.15Z"
											/>
										</svg>
									</span>
									Reviews
								</NavLink>
							</li>
							<li>
								<NavLink
									to={'/coupons'}
									onClick={handleSideBar}
									className="group rounded-md relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-5 py-[9px] mb-3 hover:bg-gray sidebar-NavLink-active"
								>
									<span className="inline-block translate-y-[1px] mr-[10px] text-xl">
										<svg
											className="-translate-y-[4px]"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											width="16"
											height="16"
										>
											<path
												fill="currentColor"
												d="M16,0h-.13a2.02,2.02,0,0,0-1.941,1.532,2,2,0,0,1-3.858,0A2.02,2.02,0,0,0,8.13,0H8A5.006,5.006,0,0,0,3,5V21a3,3,0,0,0,3,3H8.13a2.02,2.02,0,0,0,1.941-1.532,2,2,0,0,1,3.858,0A2.02,2.02,0,0,0,15.87,24H18a3,3,0,0,0,3-3V5A5.006,5.006,0,0,0,16,0Zm2,22-2.143-.063A4,4,0,0,0,8.13,22H6a1,1,0,0,1-1-1V17H7a1,1,0,0,0,0-2H5V5A3,3,0,0,1,8,2l.143.063A4.01,4.01,0,0,0,12,5a4.071,4.071,0,0,0,3.893-3H16a3,3,0,0,1,3,3V15H17a1,1,0,0,0,0,2h2v4A1,1,0,0,1,18,22Z"
											/>
											<path
												fill="currentColor"
												d="M13,15H11a1,1,0,0,0,0,2h2a1,1,0,0,0,0-2Z"
											/>
										</svg>
									</span>
									Coupons
								</NavLink>
							</li>
							<li>
								<NavLink
									to={'/profile'}
									onClick={handleSideBar}
									className="group rounded-md relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-5 py-[9px] mb-3 hover:bg-gray sidebar-NavLink-active"
								>
									<span className="inline-block translate-y-[1px] mr-[10px] text-xl">
										<svg
											className="-translate-y-[4px]"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											width="16"
											height="16"
										>
											<path
												fill="currentColor"
												d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm-4,21.164v-.164c0-2.206,1.794-4,4-4s4,1.794,4,4v.164c-1.226.537-2.578.836-4,.836s-2.774-.299-4-.836Zm9.925-1.113c-.456-2.859-2.939-5.051-5.925-5.051s-5.468,2.192-5.925,5.051c-2.47-1.823-4.075-4.753-4.075-8.051C2,6.486,6.486,2,12,2s10,4.486,10,10c0,3.298-1.605,6.228-4.075,8.051Zm-5.925-15.051c-2.206,0-4,1.794-4,4s1.794,4,4,4,4-1.794,4-4-1.794-4-4-4Zm0,6c-1.103,0-2-.897-2-2s.897-2,2-2,2,.897,2,2-.897,2-2,2Z"
											/>
										</svg>
									</span>
									Profile
								</NavLink>
							</li>
						</ul>
						<div className="border-t border-gray pt-3 mt-3">
							<NavLink
								to={'/site-settings'}
								onClick={handleSideBar}
								className="group rounded-md relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-5 py-[9px] mb-3 hover:bg-gray sidebar-NavLink-active"
							>
								<span className="inline-block translate-y-[1px] mr-[10px] text-xl">
									<svg
										className="-translate-y-[3px]"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										width="16"
										height="16"
									>
										<path
											fill="currentColor"
											d="M24,10a.988.988,0,0,0-.024-.217l-1.3-5.868A4.968,4.968,0,0,0,17.792,0H6.208a4.968,4.968,0,0,0-4.88,3.915L.024,9.783A.988.988,0,0,0,0,10v1a3.984,3.984,0,0,0,1,2.643V19a5.006,5.006,0,0,0,5,5H18a5.006,5.006,0,0,0,5-5V13.643A3.984,3.984,0,0,0,24,11ZM2,10.109l1.28-5.76A2.982,2.982,0,0,1,6.208,2H7V5A1,1,0,0,0,9,5V2h6V5a1,1,0,0,0,2,0V2h.792A2.982,2.982,0,0,1,20.72,4.349L22,10.109V11a2,2,0,0,1-2,2H19a2,2,0,0,1-2-2,1,1,0,0,0-2,0,2,2,0,0,1-2,2H11a2,2,0,0,1-2-2,1,1,0,0,0-2,0,2,2,0,0,1-2,2H4a2,2,0,0,1-2-2ZM18,22H6a3,3,0,0,1-3-3V14.873A3.978,3.978,0,0,0,4,15H5a3.99,3.99,0,0,0,3-1.357A3.99,3.99,0,0,0,11,15h2a3.99,3.99,0,0,0,3-1.357A3.99,3.99,0,0,0,19,15h1a3.978,3.978,0,0,0,1-.127V19A3,3,0,0,1,18,22Z"
										/>
									</svg>
								</span>
								Shop Settings
							</NavLink>
							<button
								onClick={openLogoutModal}
								className="group rounded-md bg-red-200 hover:bg-red-300 relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-5 py-[9px] mb-3 sidebar-NavLink-active"
							>
								<span className="inline-block translate-y-[1px] mr-[10px] text-xl">
									<svg
										className="-translate-y-[3px]"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										width="16"
										height="16"
									>
										<path
											fill="currentColor"
											d="M24,10a.988.988,0,0,0-.024-.217l-1.3-5.868A4.968,4.968,0,0,0,17.792,0H6.208a4.968,4.968,0,0,0-4.88,3.915L.024,9.783A.988.988,0,0,0,0,10v1a3.984,3.984,0,0,0,1,2.643V19a5.006,5.006,0,0,0,5,5H18a5.006,5.006,0,0,0,5-5V13.643A3.984,3.984,0,0,0,24,11ZM2,10.109l1.28-5.76A2.982,2.982,0,0,1,6.208,2H7V5A1,1,0,0,0,9,5V2h6V5a1,1,0,0,0,2,0V2h.792A2.982,2.982,0,0,1,20.72,4.349L22,10.109V11a2,2,0,0,1-2,2H19a2,2,0,0,1-2-2,1,1,0,0,0-2,0,2,2,0,0,1-2,2H11a2,2,0,0,1-2-2,1,1,0,0,0-2,0,2,2,0,0,1-2,2H4a2,2,0,0,1-2-2ZM18,22H6a3,3,0,0,1-3-3V14.873A3.978,3.978,0,0,0,4,15H5a3.99,3.99,0,0,0,3-1.357A3.99,3.99,0,0,0,11,15h2a3.99,3.99,0,0,0,3-1.357A3.99,3.99,0,0,0,19,15h1a3.978,3.978,0,0,0,1-.127V19A3,3,0,0,1,18,22Z"
										/>
									</svg>
								</span>
								Logout
							</button>
						</div>
					</div>
				</div>
			</aside>
			{/*  Logout alert modal */}
			<Transition appear show={isLogoutModal} as={Fragment}>
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
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all font-josefin">
									<div className="flex justify-between px-5 pt-4">
										<div>
											<p className="font-light text-primary"></p>
										</div>
										<button
											onClick={() => setIsLogoutModal(false)}
											className="p-2 py-1 my-1 shadow rounded-full hover:bg-red-300 duration-150 ease-in-out"
										>
											<i className="fa-solid fa-xmark text-xl text-red-300 hover:text-red-500" />
										</button>
									</div>
									<div className="container mx-auto my-auto flex items-center justify-center">
										<div className="w-[500px] mx-auto my-auto  pt-[20px] pb-[20px] px-[20px]">
											<div className="text-center">
												<h4 className="text-[24px] mb-1">Log out</h4>
												<p className="mt-3 text-lg md:text-xl">
													Are you sure you want to log out?
												</p>
											</div>
											<div className="pt-[10px]">
												<button
													className="bg-red-400 hover:bg-red-600 text-white h-10 w-full flex items-center justify-center rounded-md"
													onClick={handleLogOut}
												>
													<span className="text-lg">Log out</span>
												</button>
											</div>
										</div>
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

export default Sidebar;
