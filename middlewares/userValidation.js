const joi = require('joi');

const schema = joi.object({
            username: joi.string().regex(/^[a-zA-Z0-9._-]{3,16}$/i),
            password: joi.string().required(),
            email: joi.string().email().required(),
            phone_number: joi.string().regex(/^[0-9+]{3,16}$/),
            first_name: joi.string().required(),
            last_name: joi.string().required(),
            gender: joi.string().required(),
            });
        
const SignUpValidation = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(406).json({
            message: error.message,
            success: false})
    }else {
        next();
    }
};

const loginSchema = joi.object({
    password: joi.string().required(),
    email: joi.string().email().required(),
    });

const LoginValidation = async (req, res, next) => {
const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(406).json({
         message: error.message,
        success: false})
    }else {
    next();
    };
};


module.exports = {
    SignUpValidation, LoginValidation
}
