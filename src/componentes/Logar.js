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
            // Extrair o token da resposta
            const data = await response.json();
            const token = data.token;
            console.log('Token recebido:', token);

            // Armazenar o token no localStorage ou em outro lugar, conforme necessário
            localStorage.setItem('token', token);

            // Redirecionar para outra página ou realizar outras ações, conforme necessário
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
