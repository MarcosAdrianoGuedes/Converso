const startButton = document.getElementById('start');
const transcriptionElement = document.getElementById('transcription');

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'pt-BR';
recognition.interimResults = true;
recognition.continuous = true;

recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
    }
    transcriptionElement.textContent = transcript;
};

// Reinicia a gravação quando detecta silêncio
recognition.onspeechend = () => {
    recognition.stop();
    recognition.start();
};

// Tratamento de erros
recognition.onerror = (event) => {
    if (event.error === 'no-speech' || event.error === 'network') {
        recognition.stop();
        recognition.start();
    }
};

startButton.onclick = () => {
    recognition.start();
    transcriptionElement.textContent = 'Gravando...';
};