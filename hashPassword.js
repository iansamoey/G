const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10); // Generate a salt
  const hashedPassword = await bcrypt.hash(password, salt); // Hash the password
  return hashedPassword;
}

async function main() {
  const password = 'yourPlainTextPassword'; // Replace with your desired password
  const hashedPassword = await hashPassword(password);
  
  console.log('Hashed Password:', hashedPassword);
}

main().catch(console.error);
