const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transport = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    auth: {
      user: "MoreYLShop@outlook.com",
      pass: "JG_1064980429",
    },
  });
  const mensaje = {
    from: "More YL Shop <MoreYLShop@outlook.com>",
    to: options.email,
    subject: options.subject,
    text: options.mensaje,
  };

  await transport.sendMail(mensaje);
};

module.exports = sendEmail;
