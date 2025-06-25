const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const uploadPdfBufferToCloudinary = require("../utils/pdfUpdate");
const pool = require("../db/db");
const pdfDir = path.join(__dirname, "..", "generated-pdfs");

if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir);
}
const generatePDFController = async (req, res) => {
  try {
    const { assignee_id } = req.body;

    if (!assignee_id) {
      return res.status(400).json({ error: "Title, content, and assignee_id are required" });
    }

    const selectedTask = await pool.query("SELECT * FROM task_manager WHERE assignee_id = $1", [assignee_id]);

    if (selectedTask.rows.length === 0) {
      return res.status(404).json({ error: "No tasks found for the given assignee_id" });
    }

    const doc = new PDFDocument({ margin: 50 });
    const buffers = [];

    doc.on("data", chunk => buffers.push(chunk));
    doc.on("end", async () => {
      const pdfBuffer = Buffer.concat(buffers);
      const public_id = `admin_logs_${Date.now()}`;

      try {
        const result = await uploadPdfBufferToCloudinary(pdfBuffer, public_id);

        await pool.query(
          "INSERT INTO pdf_downloads (assignee_id, url_link) VALUES ($1, $2) RETURNING *",
          [assignee_id, result.secure_url]
        );

        return res.status(200).json({
          message: "PDF generated and uploaded successfully",
          cloudinaryUrl: result.secure_url
        });
      } catch (uploadError) {
        console.error("Cloudinary Upload Error:", uploadError);
        return res.status(500).json({ error: "Failed to upload PDF" });
      }
    });

    // Heading
    doc.fontSize(20).text("Admin Logs", { align: "center" });
    doc.moveDown(2);

    // Table column titles
    const tableTop = doc.y;
    const itemHeight = 25;

    const columns = [
      { label: "Task ID", x: 50 },
      { label: "Assigned ID", x: 120 },
      { label: "Status", x: 210 },
      { label: "Created At", x: 280 },
      { label: "Message", x: 400 }
    ];

    // Draw headers
    doc.font("Helvetica-Bold").fontSize(12);
    columns.forEach(col => doc.text(col.label, col.x, tableTop));
    doc.moveDown();

    // Draw a line under header
    doc.moveTo(50, tableTop + 15).lineTo(560, tableTop + 15).stroke();

    // Table data rows
    let y = tableTop + 25;
    doc.font("Helvetica").fontSize(10);

    selectedTask.rows.forEach(task => {
      if (y > 750) { // new page if needed
        doc.addPage();
        y = 50;
      }

      doc.text(task.task_id.toString(), 50, y);
      doc.text(task.assigned_id.toString(), 120, y);
      doc.text(task.status, 210, y);
      doc.text(new Date(task.created_at).toLocaleString(), 280, y, { width: 100 });
      doc.text(task.message_text, 900, y, { width: 150 });

      y += itemHeight;
    });

    // Summary
    doc.addPage();
    doc.moveDown();
    doc.font("Helvetica-Bold").fontSize(14).text("Summary", { underline: true });
    doc.moveDown();
    doc.font("Helvetica").fontSize(12).text(
      `This report includes ${selectedTask.rows.length} tasks assigned by user ID ${assignee_id}. This document was created for administrative auditing and review purposes.`
    );

    doc.end();
  } catch (err) {
    console.error("PDF generation error:", err);
    return res.status(500).json({ error: "Server error during PDF generation" });
  }
};

module.exports = {
  generatePDFController
};
