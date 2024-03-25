document.getElementById('editarForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value; 

    try {
        const response = await fetch('/api/editarUsuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, phone, password }) // Inclua a senha no corpo da requisição
        });

        const data = await response.json();

        if (response.ok) {
            // Se a atualização for bem-sucedida, redirecione para a página do usuário
            window.location.href = '/usuario';
        } else {
            // Se ocorrer um erro, exiba um alerta com a mensagem de erro recebida do servidor
            alert(data.error);
        }
    } catch (error) {
        console.error('Erro ao atualizar informações do usuário:', error);
        alert('Erro ao atualizar informações do usuário. Por favor, tente novamente.');
    }
});
