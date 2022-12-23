const app = require("./app");
const connectDB = require("./config/database");
const cloudinary = require("cloudinary");

//Setear el archivo de configuracion
const dotenv = require("dotenv");
dotenv.config({ path: "back/config/config.env" });

//Configuracion base de datos
connectDB();

//Configuracion cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Inicializacion del servidor
const server = app.listen(process.env.PORT, () => {
  console.log(`Servidor iniciado en el puerto: ${process.env.PORT}`);
  console.log(`En modo: ${process.env.NODE_ENV}`);
});
