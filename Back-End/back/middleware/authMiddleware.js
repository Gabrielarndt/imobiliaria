// middleware/authMiddleware.js

const passport = require('passport');

function authenticateJWT(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (!user) {
            return res.status(401).json({ message: info.message });
        }
        req.user = user;
        next();
    })(req, res, next);
}

const jwt = require('jsonwebtoken');

function verificaToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido' });
  }
  try {
    const decoded = jwt.verify(token, 'seu_segredo');
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

module.exports = { authenticateJWT, verificaToken };