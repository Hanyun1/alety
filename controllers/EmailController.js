const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const config = require("../config/mailConfig");

const oAuth2Client = new google.auth.OAuth2(
  config.CLIENT_ID,
  config.CLIENT_SECRET,
  config.REDIRECT_URL
);
oAuth2Client.setCredentials({ refresh_token: config.REFRESH_TOKEN });

const sendEmail = async (req, res) => {
  const emailList = req.body.receipt.replace(/ /g, "").split(",");

  const accessToken = oAuth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      type: "OAuth2",
      user: "aletytest@gmail.com",
      clientId: config.CLIENT_ID,
      clientSecret: config.CLIENT_SECRET,
      refreshToken: config.REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  const mailOptions = {
    from: "The Alety Team📲 💌 <aletytest@gmail.com>",
    to: emailList,
    subject: req.body.title,
    text: req.body.msg,
  };
  transporter.sendMail(mailOptions, function (error, result) {
    if (error) {
      console.log("Error: ", error);
    } else {
      console.log("Success: ", result);
      res.json({ result });
    }
    transport.close();
  });
};

module.exports = { sendEmail };
