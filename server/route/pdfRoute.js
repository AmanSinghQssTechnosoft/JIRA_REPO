const express = require("express");
const router = express.Router();
const { generatePDFController, downloadPDFController } = require("../controller/pdfController");
router.post("/generate", generatePDFController);
router.get("/download", downloadPDFController);
module.exports=router;