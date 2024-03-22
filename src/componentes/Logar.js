//logar.js

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            // O token será enviado automaticamente pelo navegador como um cookie
            // Não é mais necessário armazenar o token no localStorage

            // Redirecionar para a página do usuário
            window.location.href = '/usuario';
        } else if (response.status === 401) {
            // Exibir alerta de credenciais incorretas
            alert('Email ou senha incorretos. Por favor, tente novamente.');
        } else {
            console.error('Erro ao fazer login:', response.statusText);
            alert('Erro ao fazer login. Por favor, tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao fazer login. Por favor, tente novamente.');
    }
});
