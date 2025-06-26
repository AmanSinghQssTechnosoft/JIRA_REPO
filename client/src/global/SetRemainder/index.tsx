import { useState } from "react";
import "./setRemainder.scss";
import { createRemainder } from "../../utils/apiservice";
const SetReminderModal = ({ id, taskId, onClose }) => {
    const [reminderDate, setReminderDate] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        await createRemainder(taskId, id, reminderDate, message);
        onClose();
    };

    const getCurrentDateTimeLocal = () => {
        const now = new Date();
        now.setSeconds(0, 0);
        return now.toISOString().slice(0, 16);
    };
    return (
        <div className="modal">
            <div className="header-cross">
            <h2>Set Reminder</h2>
            <button onClick={onClose}>X</button>
            </div>
            <input
                type="datetime-local"
                min={getCurrentDateTimeLocal()}
                value={reminderDate}
                onChange={(e) => setReminderDate(e.target.value)}
            />
            <textarea
                placeholder="Reminder message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSubmit}>Set Reminder</button>
        </div>
    );
};

export default SetReminderModal;
