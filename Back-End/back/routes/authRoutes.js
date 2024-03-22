// authRouter.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateJWT } = require('../middleware/authMiddleware');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

router.get('/usuario', authenticateJWT, (req, res) => {
    // Aqui você pode acessar o usuário autenticado através de req.user
    res.json({ user: req.user });
});

router.get('/recurso-protegido', authenticateJWT, (req, res) => {
    // Se chegou até aqui, o usuário está autenticado
    // O objeto req.user contém os detalhes do usuário autenticado
    res.send('Você está autenticado!');
});

module.exports = router;

