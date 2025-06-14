import { useSelector } from "react-redux";
import "./resultcard.scss";
import type { RootState } from "../../redux/store";
import { useState } from "react";
import AddResultModal from "../ResultModal";



const ResultCard = () => {
    const [showResult, setShowResult] = useState<boolean>();
    const mockResults = useSelector((state: RootState) => state.result.results)
    return (
        <div className="result-card">
            <div className="result-header">
                <div className="result">Result</div>
                <div className="result-option">
                    <p>Semester</p>
                    <p>Team</p>
                </div>
            </div>

            <div className="result-table-header">
                <p>Sr.No</p>
                <p>Subjects</p>
                <p>SubjectId</p>
                <p>Result</p>
            </div>

            <div className="result-table-body">
                {mockResults.map((item, index) => (
                    <div key={index} className="result-table-row">
                        <p>{item.srNo}</p>
                        <p>{item.subject}</p>
                        <p>{item.subjectId}</p>
                        <p>{item.result}</p>
                    </div>
                ))}
            </div>
            <div className="add-result">
                <button className="result-btn" onClick={() => setShowResult(!showResult)}>Add Result</button>
            </div>

            {
                showResult && <AddResultModal onClose={() => setShowResult(!showResult)} />
            }
        </div>
    );
};

export default ResultCard;
