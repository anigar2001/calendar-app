const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

const { isDate } = require ('../helpers/isDate')

const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const { getEvento, crearEvento, actualizarEvento, eliminarEvento} = require('../controllers/events')

// Todas tienen que pasar por la validación del JWT
router.use(validarJWT);

// Obtener eventos
router.get('/', getEvento);

//Crear un nuevo evento
router.post(
    '/new',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha de finalización es obligatoria').custom( isDate ),
        validarCampos,
    ],
      crearEvento);

//Actualizar nuevo evento
router.put(
    '/:id',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha de finalización es obligatoria').custom( isDate ),
        validarCampos,
    ],
    actualizarEvento);

//Borrar nuevo evento
router.delete('/:id', eliminarEvento);

module.exports = router;