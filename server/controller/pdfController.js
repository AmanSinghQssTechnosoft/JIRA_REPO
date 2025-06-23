const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const pdfDir = path.join(__dirname, "..", "generated-pdfs");

if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir);
}

const generatePDFController = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const doc = new PDFDocument();
    const fileName = `output_${Date.now()}.pdf`;
    const filePath = path.join(pdfDir, fileName);
    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);
    doc.fontSize(20).text(title, { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(content);
    doc.end();

    writeStream.on("finish", () => {
      return res.status(200).json({
        message: "PDF generated successfully",
        downloadLink: `http://localhost:5000/pdf/download?file=${fileName}`
      });
    });

    writeStream.on("error", () => {
      return res.status(500).json({ error: "Failed to generate PDF" });
    });

  } catch (err) {
    console.error("PDF generation error:", err);
    return res.status(500).json({ error: "Server error during PDF generation" });
  }
};


const downloadPDFController = async (req, res) => {
  try {
    const { file } = req.query;

    if (!file) {
      return res.status(400).json({ error: "File name is required" });
    }

    const filePath = path.join(pdfDir, file);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File not found" });
    }

    return res.download(filePath, file, (err) => {
      if (err) {
        console.error("Download error:", err);
        return res.status(500).json({ error: "Failed to download PDF" });
      }
    });
  } catch (err) {
    console.error("Error in downloadPDFController:", err);
    return res.status(500).json({ error: "Server error during download" });
  }
};

module.exports = {
  generatePDFController,
  downloadPDFController
};
