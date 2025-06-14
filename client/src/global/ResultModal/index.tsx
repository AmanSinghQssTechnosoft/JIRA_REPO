import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./resultmodal.scss";
import { addResult } from "../../redux/slice/ResultSlice";


interface Props {
  onClose: () => void;
}

const AddResultModal = ({ onClose }: Props) => {
  const dispatch = useDispatch();
  const results = useSelector((state: any) => state.result.results); 

  const [form, setForm] = useState({
    subject: "",
    subjectId: "",
    result: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const newResult = {
      srNo: results.length + 1,
      subject: form.subject,
      subjectId: form.subjectId,
      result: form.result,
    };
    dispatch(addResult(newResult));
    onClose();
  };

  return (
    <div className="modal-backdroped">
      <div className="modal">
        <h2>Add Result</h2>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
        />
        <input
          type="text"
          name="subjectId"
          placeholder="Subject ID"
          value={form.subjectId}
          onChange={handleChange}
        />
        <input
          type="text"
          name="result"
          placeholder="Result (Pass/Fail)"
          value={form.result}
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

export default AddResultModal;
