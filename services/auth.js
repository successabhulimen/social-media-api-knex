const UserRepository = require("../repository/user");



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
      throw new Error("User Already Exist")
    }
  
     
  
      //   hashing password
        const hashedPassword = bcrypt.hashSync(password, 10);
  
        // create new user
        const userData = {
          first_name: first_name,
          last_name: last_name,
          username : username,
          email: email,
          phone_number: phone_number,
          password: hashedPassword,
          gender : gender,
        }
        const createdUser = await this.userRepository.createUser(userData);
  
  
        

        return createdUser
        
       

    }

};


module.exports = AuthService;