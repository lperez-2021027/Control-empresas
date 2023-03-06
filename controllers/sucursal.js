const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const Sucursal = require('../models/sucursal');

const getSucursales = async (req = request, res = response) => {

    const sucursal = await Promise.all([
        Sucursal.find()
    ]);

    res.json({
        msg: 'get Api - Controlador Sucursal',
        empresa: sucursal
    });

}

const postSucursales = async (req = request, res = response) => {

    const nombre = req.body.nombre;
    const direccion = req.body.direccion.toUpperCase();

    const nombreDB = await Sucursal.findOne({ nombre });

    if (nombreDB) {
        return res.status(400).json({
            msg: `La sucursal ${nombreDB.nombre}, ya existe`
        });
    }

    const sucursalGuardada = new Sucursal({ nombre, direccion });

    await sucursalGuardada.save();

    res.json({
        msg: 'Post Api - Controlador Sucursal',
        sucursalGuardada
    });

}

const putSucursales = async (req = request, res = response) => {

    const { id } = req.params
    
    const nombre = req.body.nombre;
    const direccion = req.body.direccion.toUpperCase();

    const nombreDB = await Sucursal.findOne({ nombre });

    if (nombreDB) {
        return res.status(400).json({
            msg: `La sucursal ${nombreDB.nombre}, ya existe`
        });
    }

    const data = {
        nombre,
        direccion
    }

    const sucursalEditada = await Sucursal.findByIdAndUpdate(id, data, { new: true })

    res.json({
        msg: 'put Api - Controlador Sucursal',
        sucursalEditada
    });

}

const deleteSucursales = async (req = request, res = response) => {
    
    const { id } = req.params

    const sucursalEliminada = await Sucursal.findByIdAndDelete(id);

    res.json({
        msg: 'put Api - Controlador Sucursal',
        sucursalEliminada
    });

}

module.exports = {
    getSucursales,
    postSucursales,
    putSucursales,
    deleteSucursales
}