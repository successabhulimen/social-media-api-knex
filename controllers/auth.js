const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db } = require("../db/config");
const { JWT_SECRET } = require("../config");
const UserRepository = require('../repository/user');
const AuthService = require("../services/auth");

const authService = new AuthService();
class AuthController {

  async userSignup(req, res){
    try{
      
      const newUser = await authService.userSignup(req.body)
      return newUser
      // return res.status(201).json(newUser)
    }catch (error) {
      console.error(error);
      
      return res.status(500).json({ message: error.message || 'Internal Server Error' });
      // return res.status(500).json({ error: 'Internal Server Error' });
    }

    }
  };


  module.exports = AuthController; ;


// const userRepository =  new UserRepository();

//  // create signe jwt token
// //  const getSignedJwtToken = function (user) {
// //     return jwt.sign( { id: user.id, email: user.email }, JWT_SECRET, {
// //       expiresIn: '1h',
// //     });
// //   };


// const userSignup = async (req, res) => {
//   // get user input
//   const {
//     first_name,
//     last_name,
//     username,
//     email,
//     phone_number,
//     password,
//     gender,
//   } = req.body;

//   //validate user input

//   if (
//     !first_name ||
//     !last_name ||
//     !username ||
//     !email ||
//     !phone_number ||
//     !password ||
//     !gender
//   ) {
//     return res.status(400).json({
//       status: "fail",
//       msg: "please enter the necessary fields",
//     });
//   }

//   // check if user already exist

//   const checkUser = await userRepository.checkUser(email, phone_number, username);


//     if (checkUser) {
//         if (checkUser.email === email) {
//           return res.status(400).json({
//             status: "fail",
//             data: "Email already exist",
//           });
//         } else if (checkUser.phone_number === phone_number) {
//           return res.status(400).json({
//             status: "fail",
//             data: "Phone Number already exist",
//           });
//         } else if (checkUser.username === username){
//           return res.status(400).json({
//             status: "fail",
//             data: "Username already exist",
//           });
//         }
//       };

//     //   hashing password
//       const hashedPassword = bcrypt.hashSync(password, 10);

//       // create new user
//       const userData = {
//         first_name: first_name,
//         last_name: last_name,
//         username : username,
//         email: email,
//         phone_number: phone_number,
//         password: hashedPassword,
//         gender : gender,
//       }
//       const newUserIds = await userRepository.createUser(userData);


//       const newUserId = newUserIds[0];

//       // Retrieve the newly created user's data

//       const newUser = await userRepository.getUserById(newUserId);
      
//       // Create token
//       const token = getSignedJwtToken(newUser);
      
//       res.status(201).json({
//         message: "User successfully created",
//         data: newUser,
//         token,
//       });
// };

// const userLogin = async (req, res) =>{
//     // get user input
//     const { email, password } = req.body;

// // validate user input
// if (!email && !password) {
//     return res.status(404).json({
//       status: "fail",
//       msg: "please enter the necessary fields",
//     });
//   }

//   // check if user exists
//   // const user = await db("users")
//   //   .where('email', email)
//   //   .first();

//   const user = await userRepository.checkUser(email);

//   if (!user) {
//     return res.status(404).json({
//       status: "fail",
//       msg: "user does not exist",
//     });
//   }

//  // compare user password against hashed password
//  const userPassword = await bcrypt.compare(password, user.password);
//  if (user && userPassword) {

//   // const userData = await db("users").select("id", "first_name", "last_name", "username", "email", "phone_number", "gender").where({ id: user.id }).first();
//   const userData = await userRepository.getUserById(user.id)
      
//    //generate token
//    const token = getSignedJwtToken(user);

//    res.status(200).json({
//      message: "Login successful",
//      userData,
//      token,
//    });
//  }

//  // check for correct password

//  if (!userPassword) {
//    return res.status(404).json({
//      status: "fail",
//      msg: "Email or password is not correct.",
//    });
//  }


// }


// module.exports = {
//     userSignup, userLogin
// }