document.getElementById('cadastroForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const jsonData = {};

    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        const responseData = await response.json();
        alert(responseData.message); // Exibir mensagem de sucesso
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Erro ao cadastrar usuário. Verifique os dados e tente novamente.');
    }
});