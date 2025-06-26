require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express();
//schedule for remainder
const reminderScheduler = require("./remainder/scheduler");
// Importing routers
const userRouter=require("./route/userRoutes");
const taskRouter=require("./route/taskManagerRoutes");
const mailRouter=require("./route/mailRoute");
const authRoutes=require("./route/passwordRoutes");
const googleAuth=require("./route/googleAuthRoute");
const PdfRouter=require("./route/pdfRoute");
const remainderRouter=require("./route/remainderRoute");
const notificationRouter=require("./route/notificationRoute");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/user",userRouter);
app.use("/task",taskRouter);
app.use("/mail",mailRouter);
app.use("/api", authRoutes);
app.use("/googleauth",googleAuth);
app.use("/pdf",PdfRouter);
app.use("/remainder",remainderRouter);
app.use("/notification",notificationRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});