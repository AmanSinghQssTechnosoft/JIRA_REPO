const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
        user: "amancode177@gmail.com",
        pass: "ktmchwpiyhmlpyco",
    },
});

const sendmail = async (email) => {
    console.log("email", email)
    try {
        const info = await transporter.sendMail({
            from: 'amancode177@gmail.com',
            to: email,
            subject: "Task",
            text: "See your Jira updates",
            html: "<b>See your Jira updates</b>",
        });
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = sendmail

