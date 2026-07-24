const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'pacto_enterprise_jwt_secret_key_2026';

function protect(req, res, next) {
  let token = null;

  // 1. Extract token from Authorization header (Bearer <token>)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    token = req.query.token;
  } else if (req.headers['x-access-token']) {
    token = req.headers['x-access-token'];
  }

  if (!token) {
    return res.status(401).json({ error: 'Authentication required. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Contains id, email, role, organizationId, workspaceId
    next();
  } catch (err) {
    console.error('JWT Verification Error:', err.message);
    return res.status(401).json({ error: 'Invalid or expired authentication token.' });
  }
}

function generateToken(userPayload) {
  return jwt.sign(userPayload, JWT_SECRET, { expiresIn: '30d' });
}

module.exports = {
  protect,
  generateToken,
  JWT_SECRET
};
