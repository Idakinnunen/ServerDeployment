const basicAuth = require('basic-auth');
const userService = require('../services/userServices'); // Adjust the path as needed

async function auth(req, res, next) {
  const admin = basicAuth(req);

  if (!admin || admin.name !== 'admin') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Validate password
  const isValid = await userService.validateUser(admin.name, admin.pass);
  if (isValid) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = auth;
