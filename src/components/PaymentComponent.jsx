import { useState } from 'react';
import PaymentCheckbox from './PaymentCheckBox';
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
const PaymentComponent = () => {
	const [payments, setPayments] = useState(payment);

	const handlePaymentChange = (updatedPayment) => {
		setPayments((prevPayments) =>
			prevPayments.map((p) =>
				p.name === updatedPayment.name ? updatedPayment : p
			)
		);
	};

	return (
		<div>
			{payments.map((p, index) => (
				<PaymentCheckbox
					key={index}
					payment={p}
					onChange={handlePaymentChange}
				/>
			))}
		</div>
	);
};

export default PaymentComponent;
