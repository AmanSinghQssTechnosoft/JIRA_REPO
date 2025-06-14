import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./resultmodal.scss";
import { addResult } from "../../redux/slice/ResultSlice";


interface newprops{
  onClose: () => void;
}

const AddResultModal = ({ onClose }: newprops) => {
  const dispatch = useDispatch();
  const results = useSelector((state: any) => state.result.results); 

  const [formModal, setFormModal] = useState({
    subject: "",
    subjectId: "",
    result: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormModal({ ...formModal, [e.target.name]: e.target.value });
  };

  const handleSubmitModal = () => {
    const newResult = {
      srNo: results.length + 1,
      subject: formModal.subject,
      subjectId: formModal.subjectId,
      result: formModal.result,
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
          value={formModal.subject}
          onChange={handleChange}
        />
        <input
          type="text"
          name="subjectId"
          placeholder="Subject ID"
          value={formModal.subjectId}
          onChange={handleChange}
        />
        <input
          type="text"
          name="result"
          placeholder="Result (Pass/Fail)"
          value={formModal.result}
          onChange={handleChange}
        />
        <div className="modal-actions">
          <button onClick={handleSubmitModal}>Add</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddResultModal;
