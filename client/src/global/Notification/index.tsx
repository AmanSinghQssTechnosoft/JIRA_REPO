import { useEffect, useState } from "react";
import "./notification.scss";
import { Check, Bell } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getNotification, tickNotification } from "../../utils/apiservice";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const { id: user_id, name: user_name, token } = useSelector((state: RootState) => state.authLogin);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getNotification(user_id)
      console.log("notification data", data);
      setNotifications(data.notifications)
    }
    fetchData();
  }, []);

  const handleReadNotification = async (id: string) => {
    if (token) {
      await tickNotification(id, token);
    } else {
      console.warn("No token available for marking notification as read.");
    }
  }

  return (
    <div className="notification-wrapper">
      <div className="bell-icon" onClick={() => setOpen(!open)}>
        <Bell size={24} />
        {notifications.length > 0 && (
          <span className="badge">{notifications.length}</span>
        )}
      </div>
      {open && (
        <div className="popover">
          {notifications.length > 0 ? (
            notifications.map((n: any, idx: number) => (
              <div key={idx} className="notification-item">
                <h4>Hii <span className="user-name">{user_name}</span>, I am informing you about your task</h4>
                <p className="notification-message"> {n.message}</p>
                <div className="read_btn">
                  <Check size={16} onClick={() => {
                    handleReadNotification(n.id)
                  }} />
                </div>
              </div>
            ))
          ) : (
            <div className="notification-item">No new notifications</div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
