 // Função para obter o valor de um cookie por nome
 function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}

// Função para carregar as informações do usuário
async function carregarInformacoesUsuario() {
    try {
        // Recuperar o ID do usuário do cookie
        const userId = getCookie('userId');
        if (!userId) {
            console.error('ID do usuário não encontrado no cookie');
            return;
        }

        // Fazer uma solicitação para obter as informações do usuário com base no ID
        const response = await fetch(`/api/usuario/${userId}`);
        if (!response.ok) {
            console.error('Erro ao obter informações do usuário:', response.statusText);
            return;
        }

        // Extrair as informações do usuário da resposta
        const data = await response.json();
        const { username, email, phone, createdAt } = data;

        document.getElementById('nomeUsuario').textContent = username;
        document.getElementById('emailUsuario').textContent = email;
        document.getElementById('phoneUsuario').textContent = phone;
        document.getElementById('criado').textContent = createdAt;
    } catch (error) {
        console.error('Erro ao carregar informações do usuário:', error);
    }
}

// Chamar a função para carregar as informações do usuário quando a página for carregada
window.onload = carregarInformacoesUsuario;