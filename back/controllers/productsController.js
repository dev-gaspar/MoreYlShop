const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { prependListener, count } = require("../models/productos");
const productos = require("../models/productos");
const ErrorHandler = require("../utils/errorHandler");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

const fetch = (url) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url));

//Ver lista de productos /api/productos
exports.getProductos = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 8;
  const productsCount = await productos.countDocuments();

  const apiFeatures = new APIFeatures(productos.find(), req.query)
    .search()
    .filter();

  let respuesta = await apiFeatures.query;
  let filteredProductsCount = respuesta.length;
  apiFeatures.pagination(resPerPage);
  respuesta = await apiFeatures.query.clone();

  res.status(200).json({
    success: true,
    productsCount,
    resPerPage,
    filteredProductsCount,
    respuesta,
  });
});

//Crear nuevo productos /api/productos
exports.setProducto = catchAsyncErrors(async (req, res, next) => {
  let imagen = [];
  if (typeof req.body.imagen === "string") {
    imagen.push(req.body.imagen);
  } else {
    imagen = req.body.imagen;
  }

  let imagenLink = [];

  try {
    for (let i = 0; i < imagen.length; i++) {
      const result = await cloudinary.v2.uploader.upload(imagen[i], {
        folder: "products",
      });
      imagenLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.imagen = imagenLink;
    req.body.user = req.respuesta.id;
    const respuesta = await productos.create(req.body);
    res.status(201).json({
      success: true,
      respuesta,
    });
  } catch (error) {
    for (let i = 0; i < imagenLink.length; i++) {
      await cloudinary.v2.uploader.destroy(imagenLink[i].public_id);
    }
    const respuesta = await productos.create(req.body);
    res.status(201).json({
      success: true,
      respuesta,
    });
  }
});

//Obtiene un productos /api/productos/:id
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

//Elimina un productos /api/productos/:id
exports.deleteProducto = catchAsyncErrors(async (req, res, next) => {
  const respuesta = await productos.findById(req.params.id);
  if (!respuesta) {
    return next(new ErrorHandler("Este productos no existe", 404));
  }

  await respuesta.remove();

  res.status(200).json({
    success: true,
    message: "Producto eliminado",
  });
});

//Actualizar un productos /api/productos/:id
exports.updateProducto = catchAsyncErrors(async (req, res, next) => {
  let respuesta = await productos.findById(req.params.id);
  if (!respuesta) {
    return next(new ErrorHandler("El productos no existe", 404));
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

//Crear o actualizar una review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comentario, idProducto } = req.body;

  const opinion = {
    nombreCliente: req.respuesta.nombre,
    rating: Number(rating),
    comentario,
  };

  const respuesta = await productos.findById(idProducto);

  const isReviewed = respuesta.opiniones.find(
    (item) => item.nombreCliente === req.respuesta.nombre
  );

  if (isReviewed) {
    respuesta.opiniones.forEach((opinion) => {
      if (opinion.nombreCliente === req.respuesta.nombre) {
        (opinion.comentario = comentario), (opinion.rating = rating);
      }
    });
    respuesta.numCalificaciones = respuesta.opiniones.length;
  } else {
    respuesta.opiniones.push(opinion);
    respuesta.numCalificaciones = respuesta.opiniones.length;
  }

  respuesta.calificacion =
    respuesta.opiniones.reduce((acc, opinion) => opinion.rating + acc, 0) /
    respuesta.opiniones.length;

  await respuesta.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Hemos opinado correctamente",
  });
});

//Ver todas las review de un productos
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const respuesta = await productos.findById(req.query.id);

  res.status(200).json({
    success: true,
    opiniones: respuesta.opiniones,
  });
});

//Eliminar review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const respuesta = await productos.findById(req.query.idProducto);

  const opi = respuesta.opWiniones.filter(
    (opinion) => opinion._id.toString() !== req.query.idReview.toString()
  );

  if (opi.length >= 1) {
    const numCalificaciones = opi.length;

    const calificacion =
      opi.reduce((acc, op) => op.rating + acc, 0) / opi.length;

    await productos.findByIdAndUpdate(
      req.query.idProducto,
      {
        opi,
        calificacion,
        numCalificaciones,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  } else {
    const opiniones = [];
    const numCalificaciones = 0;
    const calificacion = 0;

    await productos.findByIdAndUpdate(
      req.query.idProducto,
      {
        opiniones,
        calificacion,
        numCalificaciones,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  }

  res.status(200).json({
    success: true,
    message: "review eliminada correctamente",
  });
});

//Ver la lista de productos (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const respuesta = await productos.find();

  res.status(200).json({
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

//Ver productos por id
function productoById(id) {
  fetch("http://localhost:4000/api/productos/" + id)
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

//productoById("6348aa4deae6cde44598d0f3");
