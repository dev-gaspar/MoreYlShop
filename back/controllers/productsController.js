const { prependListener, count } = require("../models/productos");
const productos = require("../models/productos");

const fetch = (url) =>
  import('node-fetch').then(({ default: fetch }) => fetch(url));

//Ver lista de productos /api/productos
exports.getProductos = async (req, res, next) => {
  try {
    const respuesta = await productos.find();

    res.status(200).json({
      success: true,
      cantidad: respuesta.length,
      respuesta,
    });
  } catch (e) {
    console.error(`Error al obtener los productos en controlador: ${e}`);
    res.status(400).json({
      success: true,
      Error: `Ha ocurrido algo al obtener los productos: ${e}`,
    });
  }
};

//Crear nuevo producto /api/productos
exports.setProducto = async (req, res, next) => {
  try {
    const respuesta = await productos.create(req.body);

    res.status(201).json({
      success: true,
      respuesta,
    });
  } catch (e) {
    console.error(`Error al crear el producto en controlador: ${e}`);
    res.status(406).json({
      success: false,
      message: "El formato del cuerpo no es correcto",
    });
  }
};

//Obtiene un producto /api/productos/:id
exports.getProducto = async (req, res, next) => {
  try {
    const respuesta = await productos.findById(req.params.id);

    res.status(200).json({
      success: true,
      respuesta,
    });
  } catch (e) {
    console.error(`Error al obtener el producto en controlador: ${e}`);

    res.status(404).json({
      success: false,
      message: "El producto no existe",
    });
  }
};

//00:53:38

//Elimina un producto /api/productos/:id
exports.deleteProducto = async (req, res, next) => {
  try {
    const respuesta = await productos.findById(req.params.id);
    if (!respuesta) {
      return res.status(404).json({
        success: false,
        message: "El producto no existe",
      });
    }

    await respuesta.remove();

    res.status(200).json({
      success: true,
      message: "Producto eliminado",
    });
  } catch (e) {
    console.error(`Error al eliminar el producto en controlador: ${e}`);
    res.status(406).json({
      success: false,
      message: "Ocurrio un error al eliminar el producto en controlador",
      error: `${e}`,
    });
  }
};

//Actualizar un producto /api/productos/:id
exports.updateProducto = async (req, res, next) => {
  try {
    let respuesta = await productos.findById(req.params.id);
    if (!respuesta) {
      return res.status(404).json({
        success: false,
        message: "El producto no existe",
      });
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
  } catch (e) {
    console.error(`Error al actualizar el producto en controlador: ${e}`);
    res.status(406).json({
      success: false,
      message:
        "El formato del cuerpo no es correcto o actualizas un producto que no existe",
      error: `${e}`,
    });
  }
};

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

