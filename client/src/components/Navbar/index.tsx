import { useState } from 'react'
import './navbar.scss'
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';

const Navbar = () => {
  const [toggle, showToggle] = useState(false);
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="./public/hot-air-balloon-svgrepo-com.svg" alt="Logo" />
      </div>
      <div className="menu-toggle" onClick={() => showToggle(!toggle)}>
        ☰
      </div>
      <ul className={`nav-links ${toggle ? "active" : ""}`}>
        <Link to="/home" onClick={() => showToggle(!toggle)} >Home</Link>
        <Link to="/about" onClick={() => showToggle(!toggle)}>About</Link>
        <Link to="/Jira" onClick={() => showToggle(!toggle)}>Jira</Link>
        <Link to="/assignedTask" onClick={() => showToggle(!toggle)}>AssignedTask</Link>
        <Link to="/notification" onClick={() => showToggle(!toggle)}> <Bell size={24} color="#333" /></Link>
      </ul>
    </nav>
  )
}

export default Navbar