
const AuthService = require("../services/auth");

const authService = new AuthService();
class AuthController {

  async userSignup(req, res){
    try{
      
      const newUser = await authService.userSignup(req.body)
      return res.status(201).json( newUser )
      // return res.status(201).json(newUser)
    }catch (error) {
      console.error(error);
      
      return res.status(500).json({ message: error.message || 'Internal Server Error' });
      // return res.status(500).json({ error: 'Internal Server Error' });
    }

    }


  async login (req, res) {
    try{
      const userLogin = await authService.login(req.body)
      return res.status(200).json(userLogin)

    }catch (error){
      console.error(error);
      return res.status(500).json({  message: error.message || 'Internal Server Error' })
    }
  }
  };


  module.exports = AuthController; ;


