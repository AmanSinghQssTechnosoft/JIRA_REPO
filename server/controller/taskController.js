const pool = require("../db/db");

const taskCreateController = async (req, res) => {
  try {
    const { assigned_id, assignee_id, status, task_message } = req.body;

    console.log("hiii", assigned_id, assignee_id, status, task_message)
    const taskStatus = status || "todo";

    const newTask = await pool.query(
      `INSERT INTO task_manager (assigned_id, assignee_id, status, message_text)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [assigned_id, assignee_id, taskStatus, task_message]
    );
    console.log("newTask", newTask.rows[0])

    return res.status(201).json({ task: newTask.rows[0] });

  } catch (err) {
    console.error("Error creating task:", err.message);
    return res.status(500).json({ error: "Server error while creating task." });
  }
};

const taskUpdateController = async (req, res) => {
  try {
    const { task_id, status, task_message } = req.body;

    if (!task_id) {
      return res.status(400).json({ error: "task_id is required" });
    }

    const updates = [];
    const values = [];
    let paramIndex = 1;

    if (status) {
      updates.push(`status = $${paramIndex++}`);
      values.push(status);
    }

    if (task_message) {
      updates.push(`message_text= $${paramIndex++}`);
      values.push(task_message);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    values.push(task_id);

    const query = `
      UPDATE task_manager
      SET ${updates.join(', ')}
      WHERE task_id = $${paramIndex}
      RETURNING *`;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json({ task: result.rows[0] });

  } catch (err) {
    console.error("Update error:", err);
    return res.status(500).json({ error: "Server Error" });
  }
};

const getAllTaskController = async (req, res) => {
  try {
    const { id } = req.body;
    const selectedTask = await pool.query("SELECT * FROM task_manager where assigned_id=$1", [id]);
    console.log(selectedTask.rows[0])
    return res.status(200).send({ Tasks: selectedTask.rows })
  }
  catch (err) {
    return res.status(500).json({ error: "server Error" })
  }
}

const deleteTaskController = async (req, res) => {
  try {
    const { task_id } = req.body;
    console.log("Task ID to delete:", task_id);

    const result = await pool.query('DELETE FROM task_manager WHERE task_id = $1', [task_id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAllAssignedTaskController = async (req, res) => {
  try {
    console.log("req.body", req.body)
    const { assignee_id } = req.body;
    console.log("assigned_id", assignee_id)
    if (!assignee_id) {
      return res.status(400).json({ message: "Missing assigned user ID" });
    }

    const result = await pool.query(
      "SELECT * FROM task_manager WHERE assignee_id = $1",
      [assignee_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No assigned tasks found" });
    }

    return res.status(200).json({ assigned_task: result.rows });
  } catch (err) {
    console.error("Error in getAllAssignedTaskController:", err);
    return res.status(500).json({ message: "Server error while fetching tasks" });
  }
};

const getTaskbyId = async (req, res) => {
  try {
   const { taskId } = req.params; 
    const result = await pool.query(
      "SELECT * FROM task_manager WHERE task_id= $1",
      [taskId]
    );

    return res.status(200).json({ result: result.rows[0] })
  }
  catch (err) {
    return res.status(404).json({ message: "Server error while fetching" })
  }
}
module.exports = { taskCreateController, taskUpdateController, getAllTaskController, deleteTaskController, getAllAssignedTaskController, getTaskbyId }

