import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./paymentmodal.scss";
import { addPayments } from "../../redux/slice/PaymentSlice";
interface Props {
  onClose: () => void;
}

const AddPaymentModal = ({ onClose }: Props) => {
  const dispatch = useDispatch();
  const payments = useSelector((state:any) => state.payment.payment);

  const [form, setForm] = useState({
    invoice: "",
    dueDate: "",
    feesPaid: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const newPayment = {
      srNo: payments.length + 1,
      invoice: form.invoice,
      dueDate: form.dueDate,
      feesPaid: form.feesPaid,
    };
    dispatch(addPayments(newPayment));
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Add Payment</h2>
        <input
          type="text"
          name="invoice"
          placeholder="Invoice No"
          value={form.invoice}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
        />
        <input
          type="text"
          name="feesPaid"
          placeholder="Fees Paid (₹)"
          value={form.feesPaid}
          onChange={handleChange}
        />
        <div className="modal-actions">
          <button onClick={handleSubmit}>Add</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddPaymentModal;
