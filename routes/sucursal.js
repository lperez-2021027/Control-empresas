const { Router } = require('express');
const {check} = require('express-validator')
const { getSucursales, postSucursales, putSucursales, deleteSucursales } = require('../controllers/sucursal');
const { correoExiste, sucursalExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campo');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', [
    validarJWT
], getSucursales);

router.post('/agregar',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty() ,
    check('direccion', 'La dirección es obligatoria').not().isEmpty(),    
    validarCampos
], postSucursales);

router.put('/editar/:id',[
    validarJWT
], putSucursales);

router.delete('/eliminar/:id',[
    validarJWT
], deleteSucursales);

module.exports = router;