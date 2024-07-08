const containerVideos = document.querySelector('.videos__container')

async function buscarEMostrarVideos() {
    try {
        const buscaNaAPI = await fetch('https://raw.githubusercontent.com/Kauanrodrigues01/Javascript-consumindo-API/main/backend/videos.json')
        
        if (!buscaNaAPI.ok) {
            throw new Error('Falha ao buscar dados: ' + buscaNaAPI.status)
        }

        const responseJson = await buscaNaAPI.json()
        
        // Acessar o array de vídeos dentro do objeto
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
    } catch (error) {
        console.error('Erro ao carregar os vídeos:', error)
        containerVideos.innerHTML = `<p>Houve um erro ao carregar os vídeos: ${error.message}</p>`
    }
}

buscarEMostrarVideos()

const barraPesquisa = document.querySelector('.pesquisar__input')
barraPesquisa.addEventListener('input', filtrarPesquisa)

function filtrarPesquisa() {
    const videos = document.querySelectorAll('.videos__item')

    if (barraPesquisa.value !== '') {
        const valorFiltro = barraPesquisa.value.toLowerCase()
        videos.forEach((video) => {
            let titulo = video.querySelector('.titulo-video').textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            if (!titulo.includes(valorFiltro)) {
                video.style.display = 'none'
            } else {
                video.style.display = 'block'
            }
        })
    } else {
        videos.forEach((video) => {
            video.style.display = 'block'
        })
    }
}

const botoesCategoria = document.querySelectorAll(".superior__item")
botoesCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute("name")
    botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria))
})

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
