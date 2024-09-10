const bcrypt = require('bcrypt');
const db = require('../models'); // Adjust the path as needed

// Function to create a user
async function createUser(username, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const user = await db.User.create({
      username,
      password: hashedPassword
    });
    return user;
  } catch (error) {
    throw new Error('Error creating user: ' + error.message);
  }
}

// Function to find a user by username
async function findUserByUsername(username) {
  try {
    const user = await db.User.findOne({ where: { username } });
    return user;
  } catch (error) {
    throw new Error('Error finding user: ' + error.message);
  }
}

// Function to validate user credentials
async function validateUser(username, password) {
  try {
    const user = await findUserByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      return true;
    }
    return false;
  } catch (error) {
    throw new Error('Error validating user: ' + error.message);
  }
}

module.exports = {
  createUser,
  findUserByUsername,
  validateUser
};
