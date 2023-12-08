const joi = require('joi');


const postValidationSchema = joi.object({
    title: joi.string()
    .regex(/[a-zA-Z0-9!?._\s]$/i)
    .trim()
    .max(80)
    .required(),
    content: joi.string().required(),
})
  

const CreatePostValidation = async (req, res, next) => {
    const { error } = postValidationSchema.validate(req.body);
    if (error) {
        return res.status(406).json({
            message: error.message,
            success: false})
    }else {
        next();
    }
}

const editPostValidationSchema = joi.object({
    title: joi.string()
    .regex(/[a-zA-Z0-9!?._\s]$/i)
    .trim()
    .max(80)
    .optional(),
    content: joi.string().optional(),
})
 
const EditPostValidation = async (req, res, next) => {
    const { error } = editPostValidationSchema.validate(req.body);
    if (error) {
        return res.status(406).json({
            message: error.message,
            success: false})
    }else {
        next();
    }
}





module.exports = {
   CreatePostValidation ,
   EditPostValidation
}