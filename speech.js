document.addEventListener('DOMContentLoaded', function() {
    // Check for browser support
    if (!('speechSynthesis' in window)) {
        document.getElementById('browserSupport').classList.remove('d-none');
        document.getElementById('speakButton').disabled = true;
        return;
    }

    const textInput = document.getElementById('textInput');
    const speakButton = document.getElementById('speakButton');
    let speechUtterance = null;

    // Initialize speech synthesis
    const synth = window.speechSynthesis;
    let voices = [];

    // Get available voices
    function loadVoices() {
        voices = synth.getVoices();
    }

    loadVoices();

    // Chrome loads voices asynchronously
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Find Bulgarian voice or fallback to first available
    function getBulgarianVoice() {
        return voices.find(voice => voice.lang.includes('bg')) || voices[0];
    }

    speakButton.addEventListener('click', () => {
        // Cancel any ongoing speech
        synth.cancel();

        const text = textInput.value.trim();
        if (!text) return;

        speechUtterance = new SpeechSynthesisUtterance(text);
        speechUtterance.voice = getBulgarianVoice();
        speechUtterance.lang = 'bg-BG';
        speechUtterance.rate = 1;
        speechUtterance.pitch = 1;

        synth.speak(speechUtterance);

        // Update button state
        speakButton.disabled = true;

        speechUtterance.onend = () => {
            speakButton.disabled = false;
        };
    });
});