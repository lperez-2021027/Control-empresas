const Empresa = require('../models/empresa');
const Sucursal = require('../models/sucursal');

const correoExiste = async(correo = '') => {
    const existeEmail = await Empresa.findOne({correo});

    if (existeEmail) {
        throw new Error(`El email ${correo} existe ya esta registrado en la DB`);
    }
}

const sucursalExiste = async(id) => {

    const existeSucursal = await Sucursal.findById(id);

    if (!existeSucursal) {
        throw new Error (`La sucursal ${id} no existe`)
    }

}

module.exports = {
    correoExiste,
    sucursalExiste
}