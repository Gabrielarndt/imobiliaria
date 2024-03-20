//authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function registerUser(req, res) {
    try {
        const { email, password, username, phone } = req.body;

        // Verifique se o email já está em uso
        const existingUserEmail = await User.findOne({ where: { email } });
        if (existingUserEmail) {
            return res.status(400).json({ message: 'Email já em uso' });
        }

        // Verifique se o telefone já está em uso
        const existingUserPhone = await User.findOne({ where: { phone } });
        if (existingUserPhone) {
            return res.status(400).json({ message: 'Número de telefone já em uso' });
        }

        // Aqui você pode adicionar a validação para o formato de email, se necessário

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ email, username, phone, password: hashedPassword });
        return res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Cadastro inválido, verifique as informações' });
    }
}



async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Email ou senha incorreto' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Email ou senha incorreto' });
        }

        const token = jwt.sign({ id: user.id }, 'seu_segredo', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


async function logoutUser(req, res) {
    try {
        res.clearCookie('token');
        return res.status(200).json({ message: 'Logout efetuado com sucesso' });
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

module.exports = { registerUser, loginUser, logoutUser };

