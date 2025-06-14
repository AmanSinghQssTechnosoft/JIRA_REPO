require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express();

const userRouter=require("./route/userRoutes");
const taskRouter=require("./route/taskManagerRoutes");
const mailRouter=require("./route/mailRoute");
const authRoutes=require("./route/passwordRoutes");
const googleAuth=require("./route/googleAuthRoute");
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});