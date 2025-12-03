// const bcrypt=require('bcryptjs');

// const hashPassword = async (password) => {
//   const salt = await bcrypt.genSalt(12);
//   const hashed = await bcrypt.hash(password, salt);
//   console.log("Hashed:", hashed);
// };

// hashPassword("Arnav23456");
const bcrypt = require("bcryptjs");
bcrypt.hash("Arnav23456", 12).then(console.log);
