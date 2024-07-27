const Joi = require('joi');

const registerMiddleware = (req, res, next) => {
    try {
        const userSchema = Joi.object({
            userName: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
            email: Joi.string()
                .email()    
                .required(),
            password: Joi.string()
                /*
                    - La contraseña debe contener al menos una letra mayúscula.
                    - La contraseña debe contener al menos un dígito.
                    - La contraseña debe contener al menos uno de los caracteres especiales: !@#\$%\^&\*.
                    - La longitud total de la contraseña debe ser al menos 8 caracteres.
                */
                .pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
                .required(),
            passwordConf: Joi.ref('password')
        });
    
        // Definimos el usuario que nos pasan de la ruta
        const user = req.body;
        // Definimos el error
        const { error } = UserSchema.validate(user);
        // Si los datos son correctos pasamos a la ruta
        if (error) {
            res.status(400).json({ 'Bad request': error.details });
        } else {
            next();
        }
    } catch (error) {
        res.status(500).json({ 'Revise your user': error.details });
    }
};

module.exports = {
    registerMiddleware
}