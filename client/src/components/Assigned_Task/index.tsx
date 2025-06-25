import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from "../../redux/store";
import { getAllTaskbyasignee, getpdfDownload } from '../../utils/apiservice';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Download } from 'lucide-react';
import "./assigntask.scss"
export interface Task {
    task_id: number;
    assigned_id: number;
    assignee_id: number;
    message_text: string;
    status: string;
    created_at: string;
    updated_at: string;
}

const AssigendPdfDetail = () => {
    const [assigend_task, setAssigned_task] = useState<Task[]>();
    const [page, setPage] = useState<number>(1);
    const itemsPerPage = 2;
    const [totalPages, setTotalPages] = useState<number>(0);
    const id = useSelector((state: RootState) => state.authLogin.id)
    const fetchDetails = async (page: number) => {
        const data = await getAllTaskbyasignee(id, page, itemsPerPage);
        console.log(data)
        setAssigned_task(data.tasks);
        setTotalPages(data.totalTasks);
    }
    const assignee_id = useSelector((state: RootState) => state.authLogin.id)
    useEffect(() => {
        fetchDetails(page);
    }, [page])
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const pdfDownload = async (assignee_id: number) => {
        try {
            const data = await getpdfDownload(assignee_id);
            if (data?.cloudinaryUrl) {
                const link = document.createElement("a");
                link.href = data.cloudinaryUrl;
                link.download = "assigned-task.pdf";
                link.target = "_blank";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
        catch (error) {
            console.error("Download failed:", error);
        }
    };

    return (
        <div className="assigned_pdf">
            <div className="pdf_header">
                Assigned Task Details
                <Download className="w-5 h-5 download-icon" onClick={() => pdfDownload(assignee_id)} />
            </div>
            <div className="pdf_content">
                {
                    assigend_task ?
                        <>
                            {assigend_task.map((task: Task) => (
                                <div className="assigned_data" key={task.task_id}>
                                    <p>Task Name: {task.task_id}</p>
                                    <p>Task Description: {task.message_text}</p>
                                    <p>Assigned By: {task.assigned_id}</p>
                                    <p>Assigned To: {task.assignee_id}</p>
                                    <p>Created At: {new Date(task.created_at).toLocaleString()}</p>
                                </div>
                            )
                            )
                            }
                        </>
                        : (
                            <>Loading</>
                        )
                }
            </div>
            <div className="pdf_pagination">
                <Stack spacing={2} sx={{ mt: 2 }}>
                    <Pagination
                        count={Math.ceil(totalPages / itemsPerPage)}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        size="medium"
                    />
                </Stack>
            </div>
        </div>
    )
}

export default AssigendPdfDetail