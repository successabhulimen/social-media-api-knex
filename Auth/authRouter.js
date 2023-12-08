const express = require('express');
const { userSignup, userLogin } = require('./authController');
const { SignUpValidation, LoginValidation } = require('../middlewares/userValidation');


const router = express.Router();

router.post('/signup', SignUpValidation, userSignup) // create a new user
router.post('/login', LoginValidation,  userLogin) // user login


const AuthRouter = router;

module.exports = { AuthRouter };