const UserRepository = require("../repository/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config")



class AuthService {
   constructor() {
    this.userRepository = new UserRepository();
   }

   async getSignedJwtToken (user) {
    return jwt.sign( { id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });
  };


   async  userSignup (data) {
  
    //validate user input
  
    if (
        !data.first_name ||
        !data.last_name ||
        !data.username ||
        !data.email ||
        !data.phone_number ||
        !data.password ||
        !data.gender
    ) {

     throw new Error("Please fill necessary fields")
    }
  
    // check if user already exist
  
    const checkUser = await this.userRepository.checkUser (data.email,
    data.phone_number,
    data.username);
  if (checkUser){
    if (checkUser.email == data.email){
      throw new Error ('Email Already Exist')
    } else if (checkUser.phone_number == data.phone_number) {
      throw new Error ('Phone Number Already Exist')
    } else if (checkUser.username == data.username){
      throw new Error ('Username Already Exist')
    }
  }
     
  
      //   hashing password
        const hashedPassword = bcrypt.hashSync(data.password, 10);
  
        // create new user
        const userData = {
          first_name: data.first_name,
          last_name: data.last_name,
          username : data.username,
          email: data.email,
          phone_number: data.phone_number,
          password: hashedPassword,
          gender : data.gender,
        }
        const createdUserId = await this.userRepository.createUser(userData);

        const userId = createdUserId[0];

        // Retrieve the newly created post

      const createdUser= await this.userRepository.getUserById(userId);
  
        return createdUser
        
       

    }

  async login (data){
    // validate user input

    if (!data.email && !data.password) {
      throw new Error ("please enter the necessary fields")
    };


      // check if user exist

  const user = await this.userRepository.checkUser(data.email);

  if (!user){
    throw new Error ('user does not exist')
  };

  //  // compare user password against hashed password
 const userPassword = await bcrypt.compare(data.password, user.password);
 if (user && userPassword) {

  const userData = await this.userRepository.getUserById(user.id)
      
   //generate token
   const token = await this.getSignedJwtToken(user);

   return {user: userData, token: token}
   
 }

//  // check for correct password

 if (!userPassword) {
   throw new Error ('Email or password is not correct')
 }


// }


  };





};


module.exports = AuthService;