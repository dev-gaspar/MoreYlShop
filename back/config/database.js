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
    });
};

module.exports = connectDB;
