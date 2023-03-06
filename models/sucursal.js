const { Schema, model } = require('mongoose');

const SucursalSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'El nombre de la sucursal el obligatorio']
    },
    direccion: {
        type: String,
        required: true
    }
});

module.exports = model('Sucursal', SucursalSchema);