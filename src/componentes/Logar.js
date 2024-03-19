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
            // Redirecionar para a página inicial após o login
            window.location.href = '/'; // Substitua '/' pela rota desejada
        } else if (response.status === 401) {
            // Exibir alerta de credenciais incorretas
            alert('Email ou senha incorretos. Por favor, tente novamente.');
        } else {
            console.error('Erro ao fazer login:', response.statusText);
            alert('Email ou senha incorretos. Por favor, tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
    }
});
