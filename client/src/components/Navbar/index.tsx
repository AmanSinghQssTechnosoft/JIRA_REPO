import { useState } from 'react'
import './navbar.scss'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [toggle, showToggle] = useState(false);
  return (
    <nav className="navbar">
      <div className="logo">MyApp</div>
      <div className="menu-toggle" onClick={() => showToggle(!toggle)}>
        ☰
      </div>
      <ul className={`nav-links ${toggle ? "active" : ""}`}>
        <Link to="/home" onClick={() => showToggle(!toggle)} >Home</Link>
        <Link to="/about" onClick={() => showToggle(!toggle)}>About</Link>
        <Link to="/Jira" onClick={() => showToggle(!toggle)}>Jira</Link>
        <Link to="/assignedTask" onClick={() => showToggle(!toggle)}>AssignedTask</Link>
      </ul>
    </nav>
  )
}

export default Navbar