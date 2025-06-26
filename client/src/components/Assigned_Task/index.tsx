import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from "../../redux/store";
import { getAllTaskbyasignee, getpdfDownload } from '../../utils/apiservice';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Download, SearchIcon } from 'lucide-react';
import "./assigntask.scss"
import { useCaptilize } from '../../utils/helper';
import { useDebounce } from '../../utils/useDebounceHook';

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
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const itemsPerPage = 2;
    const [totalPages, setTotalPages] = useState<number>(0);
    const id = useSelector((state: RootState) => state.authLogin.id)
    const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
    const fetchDetails = async (page: number) => {
        const data = await getAllTaskbyasignee(id, page, itemsPerPage, debouncedSearchTerm);
        console.log(data)
        setAssigned_task(data.tasks);
        setTotalPages(data.totalTasks);
    }
    const assignee_id = useSelector((state: RootState) => state.authLogin.id)
    useEffect(() => {
        fetchDetails(page);
    }, [debouncedSearchTerm, assignee_id, page, itemsPerPage])
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

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="assigned_pdf">
            <div className="pdf_header">
                Assigned Task Details
                <Download className="w-5 h-5 download-icon" onClick={() => pdfDownload(assignee_id)} />
            </div>
            <div className="pdf_search_pdf">
                <div className="search-box">
                    <input type="text" placeholder="Search by Task ID" className="search_input" value={searchTerm} onChange={handleSearchChange} />
                    <SearchIcon className="search_icon" />
                </div>
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
                                    <p>status:{useCaptilize(task.status)}</p>
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