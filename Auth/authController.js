const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db } = require("../db/config");
const { JWT_SECRET } = require("../config");
const UserRepository = require('../Repository/userRepository')


const userRepository =  new UserRepository();

 // create signed jwt token
 const getSignedJwtToken = function (user) {
    return jwt.sign( { id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });
  };


const userSignup = async (req, res) => {
  // get user input
  const {
    first_name,
    last_name,
    username,
    email,
    phone_number,
    password,
    gender,
  } = req.body;

  //validate user input

  if (
    !first_name ||
    !last_name ||
    !username ||
    !email ||
    !phone_number ||
    !password ||
    !gender
  ) {
    return res.status(400).json({
      status: "fail",
      msg: "please enter the necessary fields",
    });
  }

  // check if user already exist
  // const checkUser = await db("users")
  // .where(function() {
  //   this.where('email', email)
  //     .orWhere('phone_number', phone_number)
  //     .orWhere('username', username);
  // })
  // .first();

  const checkUser = await userRepository.checkUser();


    if (checkUser) {
        if (checkUser.email === email) {
          return res.status(400).json({
            status: "fail",
            data: "Email already exist",
          });
        } else if (checkUser.phone_number === phone_number) {
          return res.status(400).json({
            status: "fail",
            data: "Phone Number already exist",
          });
        } else if (checkUser.username === username){
          return res.status(400).json({
            status: "fail",
            data: "Username already exist",
          });
        }
      };

    //   hashing password
      const hashedPassword = bcrypt.hashSync(password, 10);

      // create new user

      const newUserIds = await db("users").insert({
        first_name: first_name,
        last_name: last_name,
        username : username,
        email: email,
        phone_number: phone_number,
        password: hashedPassword,
        gender : gender,
      })


      const newUserId = newUserIds[0];

      // Retrieve the newly created user's data
      const newUser = await db("users").select("id", "first_name", "last_name", "username", "email", "phone_number", "gender").where({ id: newUserId }).first();
      
      // Create token
      const token = getSignedJwtToken(newUser);
      
      res.status(201).json({
        message: "User successfully created",
        data: newUser,
        token,
      });
};

const userLogin = async (req, res) =>{
    // get user input
    const { email, password } = req.body;

// validate user input
if (!email && !password) {
    return res.status(404).json({
      status: "fail",
      msg: "please enter the necessary fields",
    });
  }

  // check if user exists
  // const user = await db("users")
  //   .where('email', email)
  //   .first();

  const user = await userRepository.checkUser();

  if (!user) {
    return res.status(404).json({
      status: "fail",
      msg: "user does not exist",
    });
  }

 // compare user password against hashed password
 const userPassword = await bcrypt.compare(password, user.password);
 if (user && userPassword) {

  const userData = await db("users").select("id", "first_name", "last_name", "username", "email", "phone_number", "gender").where({ id: user.id }).first();
      
   //generate token
   const token = getSignedJwtToken(user);

   res.status(200).json({
     message: "Login successful",
     userData,
     token,
   });
 }

 // check for correct password

 if (!userPassword) {
   return res.status(404).json({
     status: "fail",
     msg: "Email or password is not correct.",
   });
 }


}


module.exports = {
    userSignup, userLogin
}