// speech.js
document.addEventListener('touchstart', () => {
    const utterance = new SpeechSynthesisUtterance('');
    window.speechSynthesis.speak(utterance);
}, { once: true });

function speakText() {
    const text = "Hello! This is a test of speech synthesis on iPhone.";
    
    if (typeof window.speechSynthesis === 'undefined') {
        alert("Speech synthesis is not supported in this browser.");
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
}

document.getElementById('speakButton').addEventListener('click', speakText);
