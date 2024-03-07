// controllers/authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Importe o modelo de usuário adequado
const passport = require('../passport');

// Controlador para registro de usuário
async function registerUser(req, res) {
    try {
        const { email, password } = req.body;
        // Verifique se o email já está em uso
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        // Crie um novo usuário
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Controlador para login de usuário
function loginUser(req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (!user) {
            return res.status(401).json({ message: info.message });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            // Gere um token JWT
            const token = jwt.sign({ id: user._id }, 'seu_segredo');
            return res.status(200).json({ token });
        });
    })(req, res, next);
}

// Controlador para logout de usuário
function logoutUser(req, res) {
    req.logout();
    return res.status(200).json({ message: 'User logged out successfully' });
}

module.exports = { registerUser, loginUser, logoutUser };
