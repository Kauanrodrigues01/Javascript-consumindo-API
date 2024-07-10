// Configuração do speechRecognation
window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition
const recognition = new SpeechRecognition()
recognition.lang = 'pt-Br'

const btnMicrofone = document.querySelector('.bnt-microfone')


btnMicrofone.addEventListener('click', () => {
    recognition.start()
    console.log('chamou o bnt')
})

recognition.addEventListener('result', (e) => {
    searchInput.textContent = e.results[0][0].transcript
    console.log(e.results[0][0].transcript)
    console.log('não acha ')
})