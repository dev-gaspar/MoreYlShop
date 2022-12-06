const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { prependListener, count } = require("../models/productos");
const productos = require("../models/productos");
const ErrorHandler = require("../utils/errorHandler");

const fetch = (url) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url));

//Ver lista de productos /api/productos
exports.getProductos = catchAsyncErrors(async (req, res, next) => {
  const respuesta = await productos.find();

  if (!respuesta) {
    return next(new ErrorHandler("Error el obtener los productos", 404));
  }

  res.status(200).json({
    success: true,
    cantidad: respuesta.length,
    respuesta,
  });
});

//Crear nuevo producto /api/productos
exports.setProducto = catchAsyncErrors(async (req, res, next) => {
  
  req.body.user = req.respuesta.id;

  const respuesta = await productos.create(req.body);

  res.status(201).json({
    success: true,
    respuesta,
  });
});

//Obtiene un producto /api/productos/:id
exports.getProducto = catchAsyncErrors(async (req, res, next) => {
  const respuesta = await productos.findById(req.params.id);

  if (!respuesta) {
    return next(new ErrorHandler("Producto no encontrado", 404));
  }

  res.status(200).json({
    success: true,
    respuesta,
  });
});

//Elimina un producto /api/productos/:id
exports.deleteProducto = catchAsyncErrors(async (req, res, next) => {
  const respuesta = await productos.findById(req.params.id);
  if (!respuesta) {
    return next(new ErrorHandler("Este producto no existe", 404));
  }

  await respuesta.remove();

  res.status(200).json({
    success: true,
    message: "Producto eliminado",
  });
});

//Actualizar un producto /api/productos/:id
exports.updateProducto = catchAsyncErrors(async (req, res, next) => {
  let respuesta = await productos.findById(req.params.id);
  if (!respuesta) {
    return next(new ErrorHandler("El producto no existe", 404));
  }

  respuesta = await productos.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    success: true,
    message: "Producto actualizado",
    respuesta,
  });
});

//Hablemos de fetch
//Ver todos los productos

function verProductos() {
  fetch("http://localhost:4000/api/productos")
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

//verProductos();

//Ver producto por id
function productoById(id) {
  fetch("http://localhost:4000/api/productos/" + id)
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

//productoById("6348aa4deae6cde44598d0f3");
