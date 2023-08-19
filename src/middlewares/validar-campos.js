"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCampos = void 0;
const { validationResult } = require('express-validator');
const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    // Para seguir con el siguiente middleware, que continue
    next();
};
exports.validarCampos = validarCampos;
