import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";

import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import "./jira.scss";
import {
  createTask,
  deleteTask,
  getAllassignedTask,
  getAllTask,
  getAllUser,
  getSingleUser,
  SendMailToUser,
  updateTaskStatus,
} from "../../utils/apiservice";
import { useDispatch, useSelector } from "react-redux";
import { userData, userType } from "../../redux/slice/userStoreSlice";
import { Bell, Edit2, Trash2 } from "lucide-react";
import EditTaskModal from "../../global/EditTaskModal";
import userFetchUserData from "../../hooks/useFetchUserData";
import { useNavigate } from 'react-router-dom';
import SetReminderModal from '../../global/SetRemainder';

type Task = { id: string; title: string; assigned_id?: string; status?: string,allocted_assigned_id?: number };
type ColumnType = "todo" | "drafting" | "review" | "done" | "newtask";

type TasksState = {
  [key in ColumnType]: Task[];
};

const initialTasks: TasksState = {
  newtask: [],
  todo: [],
  drafting: [],
  review: [],
  done: [],
};

const TaskManager = () => {
  const [tasks, setTasks] = useState<TasksState>(initialTasks);
  const [assigneeList, setAssigneeList] = useState<userType[]>([]);
  const [newTaskData, setNewTaskData] = useState({
    assignee_id: 0,
    assigned_id: 0,
    message_text: "",
  });
  const [taskID, settaskID] = useState<string | undefined>();
  const { token, id } = useSelector((state: any) => state.authLogin);
  const [assigned_Task, setassignedTask] = useState<string | undefined>(undefined);
  const [assigned_id, setassigned_id] = useState<number | undefined>(undefined);
  const dispatch = useDispatch();
  const filename = localStorage.getItem("file");
  const navigate = useNavigate();
  const fetchTasks = async () => {
    const data = await getAllTask(id);
    const groupedTasks: TasksState = {
      newtask: [],
      todo: [],
      drafting: [],
      review: [],
      done: [],
    };

    if (Array.isArray(data.Tasks)) {
      data.Tasks.forEach((task: any) => {
        const status: ColumnType = task.status?.toLowerCase() || "todo";
        const normalizedStatus = status as ColumnType;

        if (groupedTasks[normalizedStatus]) {
          groupedTasks[normalizedStatus].push({
            id: String(task.task_id),
            title: task.message_text ?? "",
            assigned_id: task.assigned_id,
            status: task.status,
          });
        }
      });

      setTasks(groupedTasks);
    }
  };

  const handleDelete = async (taskId: string) => {

    setTasks((prev) => {
      const updatedTasks = { ...prev };
      for (const col in updatedTasks) {
        updatedTasks[col as ColumnType] = updatedTasks[col as ColumnType].filter(
          (task) => task.id !== taskId
        );
      }
      return updatedTasks;
    });

    try {
      await deleteTask(taskId, token);
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete task!");
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getAllUser();
        const assigned_user = await getAllassignedTask(id);

        dispatch(userData(user.alluser));
        setAssigneeList(user.alluser);

        const newTasks = await Promise.all(
          assigned_user.assigned_task.map(async (task: any) => {
            const data = await userFetchUserData(task.assigned_id);
            return {
              id: String(task.task_id),
              title: task.message_text ?? "",
              assigned_id: data,
              allocted_assigned_id: task.assigned_id,
              status: task.status,
            };
          })
        );

        setTasks((prev) => ({
          ...prev,
          newtask: newTasks,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    fetchTasks();
  }, [dispatch, id, taskID]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = source.droppableId as ColumnType;
    const destCol = destination.droppableId as ColumnType;
    const sourceTasks = [...tasks[sourceCol]];
    const [movedTask] = sourceTasks.splice(source.index, 1);

    updateTaskStatus({ task_id: movedTask.id, status: destCol, token });

    if (sourceCol === destCol) {
      sourceTasks.splice(destination.index, 0, movedTask);
      setTasks({ ...tasks, [sourceCol]: sourceTasks });
    } else {
      const destTasks = [...tasks[destCol]];
      destTasks.splice(destination.index, 0, movedTask);
      setTasks({
        ...tasks,
        [sourceCol]: sourceTasks,
        [destCol]: destTasks,
      });
    }
  };

  const handleAddTask = async () => {
    if (!newTaskData.message_text.trim() || newTaskData.assigned_id === 0) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: `${newTaskData.message_text} (To: ${newTaskData.assigned_id})`,
    };

    setTasks((prev) => ({
      ...prev,
      todo: [newTask, ...prev.todo],
    }));

    await createTask(
      {
        assigned_id: newTaskData.assigned_id,
        assignee_id: id,
        task_message: newTaskData.message_text,
      },
      token
    );

    const data = await getSingleUser(String(newTaskData.assigned_id));
    await SendMailToUser(data.userData.email);

    if (data.userData.email) {
      toast.success(`Task created and email sent to ${data.userData.email}!`, {
        position: "top-right",
        autoClose: 3000,
      });
    }

    setNewTaskData({ assignee_id: 0, assigned_id: 0, message_text: "" });
  };
  const navigateToTask = (id: string) => {
    navigate(`/jira/${id}`)
  }
  const renderColumn = (title: string, colKey: ColumnType) => (
    <Droppable droppableId={colKey} key={colKey}>
      {(provided) => (
        <div
          className={`task task-${colKey}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h3>{title}</h3>

          {colKey === "newtask" && (
            <div className="new-task-input">
              <select
                value={newTaskData.assigned_id}
                onChange={(e) =>
                  setNewTaskData((prev) => ({
                    ...prev,
                    assigned_id: Number(e.target.value),
                    assignee_id: id,
                  }))
                }
              >
                <option value={0}>Select Assignee</option>
                {assigneeList.map((user: userType) => (
                  <option key={user.id} value={user.id}>
                    {user.name || "Unnamed"}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Enter task message"
                value={newTaskData.message_text}
                onChange={(e) =>
                  setNewTaskData((prev) => ({
                    ...prev,
                    message_text: e.target.value,
                  }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddTask();
                }}
              />

              <button onClick={handleAddTask}>Add</button>
            </div>
          )}

          {tasks[colKey].map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <div
                  className="task-card"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  
                >
                  {/* {task.title} */}
                  <div className="task-icon">
                    <span>{task.assigned_id}</span>
                    <p>{task.status}</p>
                    <Edit2 size={16} onClick={() => settaskID(task.id)} />
                    <Trash2
                      size={16}
                      onClick={() => handleDelete(task.id)}
                      style={{ cursor: "pointer", marginLeft: "8px" }}
                    />
                   <Bell size={16} onClick={() => (setassigned_id(task.allocted_assigned_id), setassignedTask(task.id))} />
                  </div>
                </div>
              )}
            </Draggable>
          ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Task Manager</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="main-task-container">
          <div className="left-create-task">
            {renderColumn("Create-Task", "newtask")}
          </div>
          <div className="right-task-grid">
            {renderColumn("Todo", "todo")}
            {renderColumn("Drafting", "drafting")}
            {renderColumn("In Review", "review")}
            {renderColumn("Done", "done")}
          </div>
        </div>
      </DragDropContext>

      {taskID && (
        <EditTaskModal
          taskId={taskID}
          token={token}
          settaskID={() => {
            settaskID(undefined);
            fetchTasks(); // Refresh after edit
          }}
        />
      )}
      {assigned_Task && (<SetReminderModal id={assigned_id} taskId={assigned_Task} onClose={() => setassignedTask(undefined)} />)
      }
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );

};

export default TaskManager;
