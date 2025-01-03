const emailService = require("../services/nodemailer.service");

const sendEmails = async (req, res) => {
  try {
    const result = await emailService.sendEmailsToUsers();
    res.status(200).send(result);
  } catch (error) {
    console.error("Error sending emails ", error);
    res.status(500).send("Error sending emails");
  }
};

module.exports = {
  sendEmails,
};
