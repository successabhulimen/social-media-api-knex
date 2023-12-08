const joi = require('joi')


const CommentValidationSchema = joi.object({
    content: joi.string().required(),
})
 
const CreateCommentValidation = async (req, res, next) => {
    const { error } = CommentValidationSchema.validate(req.body);
    if (error) {
        return res.status(406).json({
            message: error.message,
            success: false})
    }else {
        next();
    }
};

const EditCommentValidationSchema = joi.object({
    content: joi.string().required(),
})
 
const EditCommentValidation = async (req, res, next) => {
    const { error } = EditCommentValidationSchema.validate(req.body);
    if (error) {
        return res.status(406).json({
            message: error.message,
            success: false})
    }else {
        next();
    }
}



module.exports = { CreateCommentValidation, EditCommentValidation }