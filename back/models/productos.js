const mongoose = require("mongoose");

const productosSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "Por favor registre el nombre del producto."],
    trim: true,
    maxLength: [120, "El nombre del producto excede los 120 caracteres."],
  },

  precio: {
    type: Number,
    required: [true, "Por favor registre el precio del producto."],
    maxLength: [99, "El precio del producto excede los 99 caracteres."],
    default: 0.0,
  },

  descripcion: {
    type: String,
    required: [true, "Por favor registre la descripcion del producto."],
  },

  calificacion: {
    type: Number,
    default: 0,
  },

  imagen: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  categoria: {
    type: String,
    required: [true, "Por favor seleccione la categoria del producto."],
    enum: {
      values: ["Ropa", "Prendas", "Calzado", "Accesorios"],
    },
  },

  vendedor: {
    type: String,
    required: [true, "Por favor registre el vendedor del producto"],
  },

  inventario: {
    type: Number,
    required: [true, "Por favor registre el stock del producto."],
    maxLength: [3, "El inventario del producto excede los 3 caracteres."],
    default: 0,
  },

  numCalificaciones: {
    type: Number,
    default: 0,
  },

  opiniones: [
    {
      nombreCliente: {
        type: String,
        required: true,
      },

      rating: {
        type: Number,
        required: true,
      },

      comentario: {
        type: String,
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("productos", productosSchema);
