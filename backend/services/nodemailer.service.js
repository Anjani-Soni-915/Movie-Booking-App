const sendMail = async (bookingDetails) => {
  const nodemailer = require("nodemailer");

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_ID,
      pass: process.env.GMAIL_PASS,
    },
  });

  for (const booking of bookingDetails) {
    const { email, userName, movieName, theatreName, seatNumber, time } =
      booking;

    var mailOptions = {
      from: "spotlyte@gmail.com",
      to: email,
      subject: "Booking Confirmation",
      text: `
          Dear ${userName},
  
          Your booking has been confirmed!
  
          Movie: ${movieName}
          Theatre: ${theatreName}
          Seat Number: ${seatNumber}
          Time: ${time}
  
          Thank you for booking with us!
  
          Best Regards,
          SpotLyte Team
        `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent to " + email + ":", info.response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
};

module.exports = sendMail;
