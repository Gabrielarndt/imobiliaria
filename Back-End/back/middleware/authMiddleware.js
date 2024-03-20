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

module.exports = { authenticateJWT };