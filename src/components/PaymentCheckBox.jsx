/* eslint-disable react/prop-types */
const PaymentCheckbox = ({ payment, onChange }) => {
	const handleCheckboxChange = (event) => {
		const updatedPayment = { ...payment, active: event.target.checked };
		onChange(updatedPayment);
	};
	// console.log(payment);

	return (
		<div className="tp-checkbox flex items-center">
			<label htmlFor={payment.name} className="tp-checkbox flex items-center">
				<input
					id={payment.name}
					type="checkbox"
					checked={payment.active}
					onChange={handleCheckboxChange}
				/>
				<img
					className="w-[44px] h-[25px] border border-gray6 mr-1"
					src={payment.icon}
					alt={payment.name}
				/>{' '}
				{payment.name}
			</label>
		</div>
	);
};

export default PaymentCheckbox;
