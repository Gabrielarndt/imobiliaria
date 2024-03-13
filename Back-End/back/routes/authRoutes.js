// authRouter.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateJWT } = require('../middleware/authMiddleware');
const { registerUser, loginUser } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/profile', authenticateJWT, (req, res) => {
    // Aqui você pode acessar o usuário autenticado através de req.user
    res.json({ user: req.user });
});

module.exports = router;
