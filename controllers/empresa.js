const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const Empresa = require('../models/empresa');
const Sucursal = require('../models/sucursal');

const getEmpresa = async (req = request, res = response) => {

    const data = req.empresa.id;

    const empresa = await Promise.all([
        Empresa.findById(data)
        .populate('sucursales', 'nombre')
        .populate('sucursales', 'direccion')
    ]);

    res.json({
        msg: 'get Api - Controlador Empresa',
        empresa
    });

}

const postEmpresa = async (req = request, res = response) => {
    
    const {nombre, correo, password, tipo, sucursales} = req.body;
    const empresaGuardada = new Empresa({nombre, correo, password, tipo, sucursales});

    /*if (empresaGuardada.sucursales) {
        const sucursalGuardada = new Sucursal({nombre, direccion});
        await sucursalGuardada.save();

    }*/

    const salt = bcrypt.genSaltSync();
    empresaGuardada.password = bcrypt.hashSync(password, salt);

    await empresaGuardada.save();
    

    res.json({
        msg: 'post Api - Controlador Empresa',
        empresaGuardada
        //,sucursalGuardada
    });

}

const putEmpresa = async (req = request, res = response) => {

    //const { id } = req.params;
    const data = req.empresa.id;

    const { id_, estado, ...resto} = req.body;

    if ( resto.password ) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }

    const empresaEditada = await Empresa.findByIdAndUpdate(data, resto, { new : true });

    res.json({
        msg: 'put Api - Controlador Empresa',
        empresaEditada
    });

}

const deleteEmpresa = async (req = request, res = response) => {

    //const { id } = req.params;
    const data = req.empresa.id;

    const empresaEliminada = await Empresa.findByIdAndDelete(data);

    res.json({
        msg: 'delete Api - Controlador Empresa',
        empresaEliminada
    });

}

module.exports = {
    getEmpresa,
    postEmpresa,
    putEmpresa,
    deleteEmpresa
}