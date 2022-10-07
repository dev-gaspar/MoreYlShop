const app = require("./app");
const connectDB = require("./config/database");

//Setear el archivo de configuracion
const dotenv = require("dotenv");
dotenv.config({ path: "back/config/config.env" });

//Configuracion base de datos
connectDB();

//Inicializacion del servidor
const server = app.listen(process.env.PORT, () => {
  console.log(`Servidor iniciado en el puerto: ${process.env.PORT}`);
  console.log(`En modo: ${process.env.NODE_ENV}`);
});
