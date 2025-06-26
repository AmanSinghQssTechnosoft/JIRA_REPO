import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import TaskManager from "./components/Jira";
import Login from "./components/Login";
import ProtectedRoutes from "./components/ProctectedRoutes";
import Register from "./components/Register";
import TaskDetail from "./global/TaskDetail";
import VerifyEmail from "./global/Forget";
import ResetPassword from "./global/Forget/ResetPassword";
import AssigendPdfDetail from "./components/Assigned_Task";
import NotificationBell from "./global/Notification";

const Layout = () => (
  <>
    <ProtectedRoutes>
    <Navbar />
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/jira" element={<TaskManager />} />
      <Route path="/jira/:taskid" element={<TaskDetail/>}/>
      <Route path="/assignedTask" element={<AssigendPdfDetail/>}/>
       <Route path="/notification" element={<NotificationBell />} />
    </Routes>
    </ProtectedRoutes>
  </>
);

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgetPassword" element={<VerifyEmail/>}/>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
    </div>
  );
};

export default App;
