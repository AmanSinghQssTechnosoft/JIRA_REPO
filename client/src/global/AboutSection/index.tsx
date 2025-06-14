import { BookOpen, Building, Calendar } from "lucide-react"
import "./AboutSection.scss"
import LiveClock from "../LiveClock"
import LiveCalender from "../LiveCalender"
import CollegeLocationPicker from "../AutoComplete"
const AboutSection = () => {
  return (
    <div className="main-three-bar" style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <div className="course" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <BookOpen size={20} />
        <div className="liveclock"> <span>
          Course     </span> <LiveClock /></div>
      </div>

      <div className="semester" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <Calendar size={20} />
        <div className="liveclock"><span>
          Semester</span>  <LiveCalender /> </div>
      </div>

      <div className="college" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <Building size={20} />
         <span>
          College
          </span><CollegeLocationPicker/>
      </div>
    </div>
  )
}

export default AboutSection