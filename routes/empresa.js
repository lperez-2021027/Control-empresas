const { Router } = require('express');
const { check } = require('express-validator');
const { correoExiste} = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campo');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getEmpresa, postEmpresa, putEmpresa, deleteEmpresa } = require('../controllers/empresa');

const router = Router();

router.get('/', [
    validarJWT
], getEmpresa);

router.post('/registro', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty() ,
    check('password', 'El password debe de ser mas de 6 digitos').isLength( {min: 6} ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(correoExiste),
    validarCampos
], postEmpresa);

router.put('/editar/', [
    validarJWT
], putEmpresa);

router.delete('/eliminar', [
    validarJWT
], deleteEmpresa);

module.exports = router;