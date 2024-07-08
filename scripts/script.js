const containerVideos = document.querySelector('.videos__container')

async function buscarEMostrarVideos(){
    try{
        const buscaNaAPI = await fetch('http://localhost:3000/videos')
        const videos = await buscaNaAPI.json()
        
        videos.forEach(elementVideo => {
            if(elementVideo.categoria == ''){
                throw new Error("video não tem categoria")
            }
            containerVideos.innerHTML += `
            <li class="videos__item">
                <iframe src="${elementVideo.url}" title="${elementVideo.titulo}" frameborder="0" allowfullscreen heigth="100%" class="vides__item--video">
                </iframe>
                <div class="descricao-video">
                    <img class="img-canal" src="${elementVideo.imagem} alt="Logo do canal">
                    <h3 class="titulo-video">${elementVideo.titulo}</h3>
                    <p class="titulo-canal">${elementVideo.descricao}</p>
                    <p class="categoria" hidden>${elementVideo.categoria}</p>
                </div>
            </li>
            `
        })
    } catch(error){
        containerVideos.innerHTML = `<p>Houve um erro ao carregar os videos: ${error}></p>`
    } // finally{
    //     // alert('Deu algo errado')
    // }
    

    // .then(resposta => resposta.json())
    // .then((videos) => {
    //     videos.forEach(elementVideo => {
    //         containerVideos.innerHTML += `
    //         <li class="videos__item">
    //             <iframe src="${elementVideo.url}" title="${elementVideo.titulo}" frameborder="0" allowfullscreen heigth="100%" class="vides__item--video">
    //             </iframe>
    //             <div class="descricao-video">
    //                 <img class="img-canal" src="${elementVideo.imagem} alt="Logo do canal">
    //                 <h3 class="titulo-video">${elementVideo.titulo}</h3>
    //                 <p class="titulo-canal">${elementVideo.descricao}</p>
    //             </div>
    //         </li>
    //         `
    //     })
    // })
    // .catch((error) => {
    //     containerVideos.innerHTML = `<p>Houve um erro ao carregar os videos: ${error}></p>`
    //     console.log(error)
    // })
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

const botoesCategoria = document.querySelectorAll(".superior__item");
botoesCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute("name")
    botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria))
})

function filtrarPorCategoria(filtro){
    // debugger
    const videos = document.querySelectorAll(".videos__item")
    for(let video of videos){
        let categoria = video.querySelector(".categoria").textContent.toLowerCase()
        let valorFiltro = filtro.toLowerCase()

        if(!categoria.includes(valorFiltro) && valorFiltro != 'tudo'){
            video.style.display = "none"
        } else {
            video.style.display = "block"
        }
    }
}