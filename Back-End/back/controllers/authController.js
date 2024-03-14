//authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function registerUser(req, res) {
    try {
        const { email, password, username, phone } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ email, username, phone, password: hashedPassword });
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        
        // Encontre o usuário no banco de dados pelo email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }

        // Verifique se a senha fornecida corresponde à senha armazenada no banco de dados
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }

        // Gere um token JWT
        const token = jwt.sign({ id: user.id }, 'seu_segredo', { expiresIn: '1h' });

        // Envie o token JWT como resposta
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function logoutUser(req, res) {
    try {
        // Implemente a lógica de logout aqui, se necessário
        return res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { registerUser, loginUser, logoutUser };
