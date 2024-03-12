const form = document.getElementById('cadastro-imovel-form');
const selectedPhotosContainer = document.getElementById('selected-photos-container');
let selectedPhotos = [];
let selectedPhotoIndex = null;
let jsonData = {}; // Adicionando jsonData aqui

// Função para exibir as fotos selecionadas
function displaySelectedPhotos() {
    selectedPhotosContainer.innerHTML = ''; // Limpa o conteúdo atual

    selectedPhotos.forEach((photo, index) => {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(photo);
        img.dataset.index = index;
        img.addEventListener('click', () => selectPhoto(index));

        // Se a foto estiver selecionada, adiciona a classe 'selected'
        if (index === selectedPhotoIndex) {
            img.classList.add('selected');
        }

        selectedPhotosContainer.appendChild(img);
    });
}

// Função para selecionar uma foto
function selectPhoto(index) {
    selectedPhotoIndex = index;
    displaySelectedPhotos();
}

// Função para mover a foto selecionada para cima
function movePhotoUp() {
    if (selectedPhotoIndex > 0) {
        const temp = selectedPhotos[selectedPhotoIndex];
        selectedPhotos[selectedPhotoIndex] = selectedPhotos[selectedPhotoIndex - 1];
        selectedPhotos[selectedPhotoIndex - 1] = temp;
        selectedPhotoIndex--;
        displaySelectedPhotos();
    }
}

// Função para mover a foto selecionada para baixo
function movePhotoDown() {
    if (selectedPhotoIndex < selectedPhotos.length - 1) {
        const temp = selectedPhotos[selectedPhotoIndex];
        selectedPhotos[selectedPhotoIndex] = selectedPhotos[selectedPhotoIndex + 1];
        selectedPhotos[selectedPhotoIndex + 1] = temp;
        selectedPhotoIndex++;
        displaySelectedPhotos();
    }
}

// Ouvinte de eventos para o botão "Mover para cima"
document.getElementById('move-up-btn').addEventListener('click', movePhotoUp);

// Ouvinte de eventos para o botão "Mover para baixo"
document.getElementById('move-down-btn').addEventListener('click', movePhotoDown);

// Ouvinte de eventos para o input de seleção de arquivos
document.getElementById('fotos').addEventListener('change', (event) => {
    selectedPhotos = Array.from(event.target.files);
    displaySelectedPhotos();
});


// Event listener para o envio do formulário
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Obter os dados do formulário, exceto as fotos
    const formData = new FormData(form);
    const jsonData = {};
    formData.forEach((value, key) => {
        if (key !== 'fotos') {
            jsonData[key] = value;
        }
    });

    try {
        // Enviar os dados do formulário (exceto as fotos)
        const response = await fetch('http://localhost:3000/api/imoveis', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });

        if (!response.ok) {
            throw new Error('Erro ao enviar dados do formulário');
        }

        // Obter as fotos do formulário
        const files = document.getElementById('fotos').files;

        // Enviar as fotos
        const formDataFotos = new FormData();
        for (const file of files) {
            formDataFotos.append('fotos', file);
        }

        const responseFotos = await fetch('http://localhost:3000/api/imoveis/fotos', {
            method: 'POST',
            body: formDataFotos
        });

        if (!responseFotos.ok) {
            throw new Error('Erro ao enviar fotos');
        }

        // Redirecionar para a página de sucesso se tudo correr bem
        window.location.href = '/sucesso';
    } catch (error) {
        console.error('Erro ao cadastrar imóvel:', error);
    }
});
