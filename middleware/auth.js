const basicAuth = require('basic-auth');

function auth(req, res, next) {
  const admin = basicAuth(req);

  if (!admin || admin.name !== 'admin' || admin.pass !== 'yourAdminPassword') {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    next();
  }
}

module.exports = auth;