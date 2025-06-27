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
    const now = new Date().toISOString().split("T")[0]; 
    console.log(`⏰ Checking for reminders on date ${now}`);

    const dueReminders = await pool.query(
      `SELECT * FROM task_reminders WHERE reminder_date::DATE <= $1::DATE AND is_sent = FALSE`,
      [now]
    );
     console.log(dueReminders.rows);
    if (dueReminders.rows.length === 0) {
      console.log("✅ No due reminders today.");
      return;
    }


    console.log(`${dueReminders.rows.length} due reminders found`);

    for (let reminder of dueReminders.rows) {
      const { assigned_id, message, id } = reminder;
         if(!assigned_id || !message) {
          return;
         }
      await pool.query(
        `INSERT INTO notifications (user_id, message) VALUES ($1, $2)`,
        [assigned_id, message]
      );

      await pool.query(
        `UPDATE task_reminders SET is_sent = TRUE WHERE id = $1`,
        [id]
      );

      console.log(`🔔 Reminder sent to user ${assigned_id}: "${message}"`);
    }
  } catch (err) {
    return res.status(500).json({ message: "Error processing reminders" });
  }
};

module.exports = {
  createReminder,
  checkReminders
};