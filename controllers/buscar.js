const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;

const Empresa = require('../models/sucursal');

const coleccionesPermitidas = [
    'sucursales'
];

const bucarSucursal = async (termino = '', res = response) => {

    // Buscando termino
    const esMongoID = ObjectId.isValid(termino); // TRUE

    // validando si fue encontrado el termino
    if (esMongoID) {
        const empresa = await Empresa.findById(termino);
        return res.json({
            //results: [ usuario ]
            results: (empresa) ? [empresa] : []
            // Preguntar si e usuario existe, si no existe regresa un array vacio
        })
    }

    const regex = new RegExp(termino, 'i');
    
    const sucursales = await Empresa.find({
        $or: [{ nombre: regex }, { direccion: regex }]
    });

    res.json({
        results: sucursales
    })

}

const buscar = (req = request, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `La coleccion ${coleccion} no existe en la DB
                  Las colecciones permitidas son: ${coleccionesPermitidas}`
        });
    }

    switch (coleccion) {
        case 'sucursales':
            bucarSucursal(termino, res);
            break;
        default:
            res.status(500).json({
                msg: 'Ups, se me olvido hacer esta busqueda'
            })
            break;
    }
}

module.exports = {
    buscar
}