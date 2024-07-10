const containerVideos = document.querySelector('.videos__container')
const searchInput = document.getElementById("searchInput")
const autocompleteList = document.getElementById("autocomplete-list")

// Função para buscar dados do JSON
async function buscarEMostrarVideos() {
    // debugger
    try {
        const buscaNaAPI = await fetch('https://raw.githubusercontent.com/Kauanrodrigues01/Javascript-consumindo-API/main/backend/videos.jso')
        
        if (!buscaNaAPI.ok) {
            throw new Error('Falha ao buscar dados: ' + buscaNaAPI.status)
        }

        const responseJson = await buscaNaAPI.json()
        const videos = responseJson.videos

        if (!Array.isArray(videos)) {
            throw new Error('Dados retornados não são um array')
        }
        
        videos.forEach(elementVideo => {
            if (!elementVideo.categoria) {
                throw new Error("Vídeo não tem categoria")
            }
            containerVideos.innerHTML += `
            <li class="videos__item">
                <iframe src="${elementVideo.url}" title="${elementVideo.titulo}" frameborder="0" allowfullscreen height="100%" class="videos__item--video"></iframe>
                <div class="descricao-video">
                    <img class="img-canal" src="${elementVideo.imagem}" alt="Logo do canal">
                    <h3 class="titulo-video">${elementVideo.titulo}</h3>
                    <p class="titulo-canal">${elementVideo.descricao}</p>
                    <p class="categoria" hidden>${elementVideo.categoria}</p>
                </div>
            </li>
            `
        })

        // Adicionar evento de entrada
        searchInput.addEventListener("input", () => {
            autocompleteList.style.height = 'auto'
            autocompleteList.style.maxHeight = '150px'
            const query = searchInput.value
            exibirSugestoesDePesquisa(videos, query)
            filtrarPesquisa()
        })

    } catch (error) {
        console.error('Erro ao carregar os vídeos:', error)
    }
}   

// Função para exibir sugestões de autocompletar
function exibirSugestoesDePesquisa(videos, query) {
    // debugger
    autocompleteList.innerHTML = ''
    if (query.length === 0) {
        return
    }

    // filtra o array videos, com apenas os vídeos que o titulo incluir a pesquisa e remove os acentos e deixa tudo minúsculo antes de verificar
    const videosFiltrados = videos.filter(video => video.titulo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')))
    
    videosFiltrados.forEach(video => {
        const itemDeSugestao = document.createElement("li")
        itemDeSugestao.classList.add("autocomplete-suggestion")
        itemDeSugestao.textContent = video.titulo
        itemDeSugestao.addEventListener("click", () => {
            searchInput.value = video.titulo
            autocompleteList.innerHTML = ''
            filtrarPesquisa()
        })
        autocompleteList.appendChild(itemDeSugestao)
    })
}

// Função para filtrar vídeos com base na pesquisa
function filtrarPesquisa() {
    // debugger
    const videos = document.querySelectorAll('.videos__item')
    const valorFiltro = searchInput.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    videos.forEach((video) => {
        let titulo = video.querySelector('.titulo-video').textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        if (!titulo.includes(valorFiltro)) {
            video.style.display = 'none'
        } else {
            video.style.display = 'block'
        }
    })
}

// Função para filtrar vídeos com base na categoria
function filtrarPorCategoria(filtro) {
    const videos = document.querySelectorAll(".videos__item")
    videos.forEach((video) => {
        let categoria = video.querySelector(".categoria").textContent.toLowerCase()
        let valorFiltro = filtro.toLowerCase()

        if (!categoria.includes(valorFiltro) && valorFiltro !== 'tudo') {
            video.style.display = "none"
        } else {
            video.style.display = "block"
        }
    })
}

buscarEMostrarVideos()

const botoesCategoria = document.querySelectorAll(".superior__item")

botoesCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute("name")
    botao.addEventListener("click", () => {
        // debugger
        botoesCategoria.forEach((botao) => {
            botao.classList.remove('superior__item-active')
        })
        botao.classList.add('superior__item-active')
        filtrarPorCategoria(nomeCategoria)
    })
})