import { useEffect, useState } from "react";
import "./notification.scss";
// import { getNotifications } from "../utils/apiservice";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
    //   const res = await getNotifications();
    //   setNotifications(res.data.notifications);
    };
    fetchNotifications();
  }, []);

  return (
    <div className="notification-bell">
      🔔 {notifications.length > 0 && <span className="badge">{notifications.length}</span>}
      <div className="dropdown">
        {notifications.map((n, idx) => (
          <div key={idx} className="notification-item">
            {/* {n.message} - {new Date(n.reminder_date).toLocaleString()} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationBell;
