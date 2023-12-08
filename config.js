require("dotenv").config();

// const DB_NAME = process.env.DB_NAME;
// const DB_USER = process.env.DB_USER;
// const DB_PASSWORD = process.env.DB_PASSWORD;
// const DB_HOST = process.env.DB_HOST;
// const JWT_SECRET = process.env.JWT_SECRET;
// const JWT_EXPIRE = process.env.JWT_EXPIRE;
const PORT = process.env.PORT || 4006;
const JWT_SECRET = process.env.JWT_SECRET;

// const testHost = process.env.testDb;
// const testDbName = process.env.testDbName;
// const testDbUser = process.env.testDbUser;
// const testDbPassword = process.env.testDbPassword;

module.exports = {
//   DB_HOST,
//   DB_NAME,
//   DB_PASSWORD,
//   DB_USER,
  JWT_SECRET,
//   JWT_EXPIRE,
  PORT
//   testHost,
//   testDbName,
//   testDbUser,
//   testDbPassword
};
