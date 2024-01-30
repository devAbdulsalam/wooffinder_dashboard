import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const fetchSite = async () => {
	try {
		const { data } = await axios.get(`${apiUrl}/general`);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
const fetchDashboard = async (user) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${user?.token}`,
			},
		};
		const { data } = await axios.get(`${apiUrl}/general/dashboard`, config);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
const fetchProducts = async (user) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${user?.token}`,
			},
		};
		const { data } = await axios.get(`${apiUrl}/products`, config);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
const fetchProduct = async (prop) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${prop?.token}`,
			},
		};
		const { data } = await axios.get(`${apiUrl}/products/${prop.id}`, config);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
const fetchOrders = async (user) => {
	// console.log(user);
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${user?.token}`,
			},
		};
		const { data } = await axios.get(`${apiUrl}/management/orders`, config);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
const fetchOrder = async (prop) => {
	const { token, id } = prop;
	console.log(prop);
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const { data } = await axios.get(`${apiUrl}/orders/${id}`, config);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};

const fetchCoupons = async (user) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${user?.token}`,
			},
		};
		const { data } = await axios.get(`${apiUrl}/coupons`, config);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
const fetchCoupon = async (prop) => {
	const { token, id } = prop;
	// console.log(prop);
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const { data } = await axios.get(`${apiUrl}/coupons/${id}`, config);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
const fetchCustomers = async (user) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${user?.token}`,
			},
		};
		const { data } = await axios.get(`${apiUrl}/users`, config);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
const fetchCustomer = async (prop) => {
	const { user } = prop;
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${user?.token}`,
			},
		};
		const { data } = await axios.get(`${apiUrl}/users/${prop.id}`, config);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
const fetchProductCategory = async (prop) => {
	const { user } = prop;
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${user?.token}`,
			},
		};
		const { data } = await axios.get(`${apiUrl}/products/category`, config);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
const fetchProductCategoryDetail = async (prop) => {
	const { token, id } = prop;
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const { data } = await axios.get(
			`${apiUrl}/products/category/${id}`,
			config
		);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
const fetchProductCategoryAndSubCategory = async (prop) => {
	const { user } = prop;
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${user?.token}`,
			},
		};
		const { data } = await axios.get(
			`${apiUrl}/products/category/sub-category`,
			config
		);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
const fetchTransactions = async (prop) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${prop?.token}`,
			},
		};
		const { data } = await axios.get(`${apiUrl}/transactions`, config);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
const fetchTransaction = async (prop) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${prop?.token}`,
			},
		};
		const { data } = await axios.get(
			`${apiUrl}/transactions/${prop.id}`,
			config
		);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
export {
	fetchSite,
	fetchDashboard,
	fetchProducts,
	fetchProduct,
	fetchCoupons,
	fetchCoupon,
	fetchOrder,
	fetchOrders,
	fetchCustomers,
	fetchCustomer,
	fetchProductCategory,
	fetchProductCategoryDetail,
	fetchProductCategoryAndSubCategory,
	fetchTransactions,
	fetchTransaction,
};
