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

// Ouvinte de eventos para o envio do formulário
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const jsonData = {};
    const formData = new FormData(form);

    const filesData = [];
    const files = document.getElementById('fotos').files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        filesData.push({
            name: file.name,
            type: file.type,
            size: file.size,
            file: file
        });
    }

    // Verificar se já existem fotos em jsonData['fotos']
    if (jsonData['fotos']) {
        // Se já existirem, adicione as novas fotos à lista existente
        jsonData['fotos'] = jsonData['fotos'].concat(filesData);
    } else {
        // Se não existirem, defina as novas fotos como a lista de fotos
        jsonData['fotos'] = filesData;
    }

    formData.forEach((value, key) => {
        if (key !== 'fotos') {
            jsonData[key] = value;
        }
    });

    try {
        const response = await fetch('http://localhost:3000/api/imoveis', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });

        if (response.ok) {
            window.location.href = '/sucesso';
        } else {
            console.error('Erro ao cadastrar imóvel:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao cadastrar imóvel:', error);
    }
});