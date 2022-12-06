const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.DB_LOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(
        `Base de datos mongo conectada con el servidor: ${con.connection.host}`
      );
    })
    .catch((con) => {
      console.log(`No se logro la conexion con la base de datos`);
    });
};

module.exports = connectDB;
