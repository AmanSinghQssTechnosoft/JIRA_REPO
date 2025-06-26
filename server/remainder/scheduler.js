const cron = require("node-cron");
const { checkReminders } = require("../controller/remainderController");

cron.schedule("* * * * *", async () => {
    console.log("⏰ Running scheduled reminder check...");
    await checkReminders();
});
