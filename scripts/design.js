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
