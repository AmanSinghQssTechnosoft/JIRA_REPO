import { useState } from 'react';
import './navbar.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import NotificationBell from '../../global/Notification';


const Navbar = () => {
  const [toggle, showToggle] = useState(false);
  const {id,name} = useSelector((state: RootState) => state.authLogin);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/hot-air-balloon-svgrepo-com.svg" alt="Logo" />
      </div>
      <div className="menu-toggle" onClick={() => showToggle(!toggle)}>☰</div>
      <ul className={`nav-links ${toggle ? "active" : ""}`}>
        <Link to="/home" onClick={() => showToggle(false)}>Home</Link>
        <Link to="/about" onClick={() => showToggle(false)}>About</Link>
        <Link to="/Jira" onClick={() => showToggle(false)}>Jira</Link>
        <Link to="/assignedTask" onClick={() => showToggle(false)}>AssignedTask</Link>
        <NotificationBell />
      </ul>
    </nav>
  );
};

export default Navbar;
