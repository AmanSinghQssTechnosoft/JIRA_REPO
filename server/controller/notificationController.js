const pool = require("../db/db");

const getNotifications = async (req, res) => {
  try {
    const user_id = req.user.id;
    const result = await pool.query(
      `SELECT * FROM notifications WHERE user_id = $1 AND is_read = FALSE ORDER BY created_at DESC`,
      [user_id]
    );
    res.status(200).json({ notifications: result.rows });
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};


const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(`UPDATE notifications SET is_read = TRUE WHERE id = $1`, [id]);
    res.status(200).json({ message: "Marked as read" });
  } catch (err) {
    console.error("Marking read error:", err);
    res.status(500).json({ message: "Error updating notification" });
  }
};

module.exports = {
  getNotifications,
  markAsRead
};
