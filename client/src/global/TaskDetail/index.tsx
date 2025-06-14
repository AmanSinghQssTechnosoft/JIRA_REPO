import { useParams } from "react-router-dom"
import "./taskdetail.scss"
import { useEffect, useState } from "react";
import { getMailById } from "../../utils/apiservice";

const TaskDetail = () => {
  const [taskData, settaskData] = useState<any>();
  const { taskid } = useParams();

  taskid && useEffect(() => {
    const fetchTaskData = async () => {
      const data = await getMailById(taskid);
      settaskData(data)
    }
    fetchTaskData()
  }, [taskid])

  return (
    <div>
      <p>{taskid}</p>
    </div>
  )
}

export default TaskDetail