const express = require('express');
// const { userSignup, userLogin } = require('../controllers/auth');
const AuthController = require("../controllers/auth")

const { SignUpValidation, LoginValidation } = require('../middlewares/userValidation');

const authController = new AuthController();

const router = express.Router();

router.post('/signup', SignUpValidation, authController.userSignup) // create a new user
router.post('/login', LoginValidation,  authController.login) // user login


const AuthRouter = router;

module.exports = { AuthRouter };