// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

function verificarTokenEObterDetalhesUsuario(req, res, next) {
    const token = req.cookies.token; // Supondo que o token seja enviado como um cookie chamado 'token'

    if (!token) {
        console.log("Token de autenticação não fornecido");
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, 'seu_segredo');
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Erro ao verificar o token (Token inválido):', error);
        return res.redirect('/login');
    }
}


function authenticateJWT(req, res, next) {
    // Verifique se o token está presente no cabeçalho Authorization
    
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Token de autenticação não fornecido' });
    }

    // O token está no formato "Bearer <token>". Separe o token da palavra "Bearer"
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token de autenticação não fornecido corretamente' });
    }

    try {
        // Verifique e decodifique o token usando a chave secreta
        const decoded = jwt.verify(token, 'seu_segredo');
        req.user = decoded; // Adicione o payload do token decodificado ao objeto de solicitação (req.user)
        next(); // Prossiga para a próxima middleware ou rota
    } catch (error) {
        console.error('Erro ao verificar o token:', error);
        return res.status(401).json({ message: 'Token inválido' });
    }
}

module.exports = { authenticateJWT, verificarTokenEObterDetalhesUsuario };