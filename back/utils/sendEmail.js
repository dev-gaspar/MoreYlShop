const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "d15de51694de84",
      pass: "ce7db5ecf03d63",
    },
  });
  const mensaje = {
    from: "VetyShop Store <ozzyta@outlook.com>",
    to: options.email,
    subject: options.subject,
    text: options.mensaje,
  };

  await transport.sendMail(mensaje);
};

module.exports = sendEmail;
