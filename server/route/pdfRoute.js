const express = require("express");
const router = express.Router();
const { generatePDFController } = require("../controller/pdfController");
router.post("/generate", generatePDFController);
module.exports = router;