import { useSelector } from "react-redux";
import "./payment.scss";
import type { RootState } from "../../redux/store";
import { useState } from "react";
import AddPaymentModal from "../PaymentModal";
const PaymentCard = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const mockData = useSelector((state: RootState) => state.payment.payment);
    return (
        <div className="payment-card">
            <div className="payment-header">
                <div className="pay">Payment</div>
                <div className="pay-option">
                    <p>Paid</p>
                    <p>Pending</p>
                </div>
            </div>
            <div className="table-header">
                <p>Sr.No</p>
                <p>Invoice No</p>
                <p>Due Date</p>
                <p>Fees Paid</p>
            </div>
            <div className="table-body">
                {mockData.map((item, index) => (
                    <div key={index} className="table-row">
                        <p>{item.srNo}</p>
                        <p>{item.invoice}</p>
                        <p>{item.dueDate}</p>
                        <p>{item.feesPaid}</p>
                    </div>
                ))}
            </div>
            <div className="add-payment">
                <button className="payment-btn" onClick={() => setShowModal(!showModal)}>Add Payment</button>
            </div>
            {
                showModal && <AddPaymentModal onClose={() => setShowModal(!showModal)} />
            }
        </div>


    );
};

export default PaymentCard;
