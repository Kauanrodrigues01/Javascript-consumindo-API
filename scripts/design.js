const itemApps = document.querySelector('.cabecalho__Quadrado')
const menuSuspensoApps = document.querySelector('.menu-suspenso-apps')

itemApps.addEventListener('mouseenter', () => {
    menuSuspensoApps.style.height = '300px'   
    menuSuspensoApps.addEventListener('mouseenter', () => {
        menuSuspensoApps.style.height = '300px'
    })
    menuSuspensoApps.addEventListener('mouseleave', () => {
        menuSuspensoApps.style.height = '0'
    })
})

itemApps.addEventListener('mouseleave', () => {
    menuSuspensoApps.style.height = '0'   
})

const btnScrollBarSecaoSuperior = document.querySelector('.superior__slider')
const secaoSuperior = document.querySelector('.superior__secao__container-wrapper')

function smoothScroll(target, distance, duration) {
    const start = target.scrollLeft
    let startTime = null

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const run = ease(timeElapsed, start, distance, duration)
        target.scrollLeft = run
        if (timeElapsed < duration) requestAnimationFrame(animation)
    }

    function ease(t, b, c, d) {
        t /= d / 2
        if (t < 1) return c / 2 * t * t + b
        t--
        return -c / 2 * (t * (t - 2) - 1) + b
    }

    requestAnimationFrame(animation)
}

btnScrollBarSecaoSuperior.addEventListener('click', () => {
    smoothScroll(secaoSuperior, 300, 500) // Rola para a direita 100 pixels em 500ms
})
