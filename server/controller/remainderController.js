const pool = require("../db/db");

const createReminder = async (req, res) => {
  try {
    const { task_id, assigned_id, reminder_date, message } = req.body;
    const result = await pool.query(
      `INSERT INTO task_reminders (task_id, assigned_id, reminder_date, message)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [task_id, assigned_id, reminder_date, message]
    );
    return res.status(201).json({ reminder: result.rows[0] });
  } catch (err) {
    console.error("Error creating reminder:", err);
    return res.status(500).json({ message: "Error creating reminder" });
  }
};

const checkReminders = async () => {
  try {
    const now = new Date().toISOString();
    console.log(`⏰ Checking for reminders at ${now}`);
    const dueReminders = await pool.query(
      `SELECT * FROM task_reminders WHERE reminder_date <= $1 AND is_sent = FALSE`,
      [now]
    );

    for (let reminder of dueReminders.rows) {
      await pool.query(
        `INSERT INTO notifications (user_id, message) VALUES ($1, $2)`,
        [reminder.assignee_id, reminder.message]
      );
      await pool.query(
        `UPDATE task_reminders SET is_sent = TRUE WHERE id = $1`,
        [reminder.id]
      );
      console.log(`🔔 Reminder sent to user ${reminder.assignee_id}: "${reminder.message}"`);
    }
  } catch (err) {
    console.error("Reminder processing error:", err);
  }
};

module.exports = {
  createReminder,
  checkReminders
};