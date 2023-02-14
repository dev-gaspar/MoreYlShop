const nodemailer = require("nodemailer");
//C9YUD-TWZE3-DDTJH-7JSDF-LNKDG
const sendEmail = async (options) => {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "shopmoreyl@gmail.com",
      pass: "cnfrhueexrevvnig",
    },
  });

  const mensaje = {
    from: "More YL Shop <MoreYLShop@outlook.com>",
    to: options.email,
    subject: options.subject,
    html: options.mensaje,
  };

  await transport.sendMail(mensaje);
};

module.exports = sendEmail;
