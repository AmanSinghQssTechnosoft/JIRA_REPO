import { useState } from "react";
import "./EditTaskModal.scss";
import { updateTaskStatus } from "../../utils/apiservice";


interface EditTaskModalProps {
  taskId: string;
  token:string;
 settaskID: (id?: string) => void;
}

const EditTaskModal = ({ taskId ,token,settaskID}: EditTaskModalProps) => {
  const [taskMessage, setTaskMessage] = useState<string>("");
  console.log("modaltoken",token)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateTaskStatus({task_id:taskId, task_message:taskMessage,token});
      setTaskMessage(""); 
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task. Please try again.");
    }
  };

  const handleClose = () => {
   settaskID();
  };

  return (
    <div className="edit-task-backdrop">
      <div className="edit-task-modal">
        <form onSubmit={handleSubmit}>
          <button
            className="close-button"
            type="button"
           onClick={handleClose} 
            aria-label="Close modal"
          >
            ×
          </button>
          <h2>Edit Task</h2>
          <input
            type="text"
            value={taskMessage}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTaskMessage(e.target.value)
            }
            placeholder="Enter task message"
            aria-label="Task message"
          />
          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;