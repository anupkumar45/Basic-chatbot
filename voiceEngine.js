/**
 * Web Speech API Engine: Speech-to-Text (STT) & Text-to-Speech (TTS)
 * Provides microphone recording, multilingual speech recognition, voice synthesis,
 * volume, rate, and pitch controls, and real-time state callbacks.
 */

class VoiceEngine {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.isSpeaking = false;
        this.autoSpeak = true;
        this.rate = 1.0;
        this.volume = 1.0;
        this.pitch = 1.0;
        this.currentLangCode = "en-US";
        this.selectedVoiceURI = null;
        this.voices = [];
        this.audioCtx = null;

        this.initSpeechRecognition();
        this.initSpeechSynthesis();
    }

    /**
     * Initialize Web Speech Recognition
     */
    initSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = true;
            this.recognition.maxAlternatives = 1;
        } else {
            console.warn("Speech Recognition API is not supported in this browser.");
        }
    }

    /**
     * Initialize Speech Synthesis voices
     */
    initSpeechSynthesis() {
        if ('speechSynthesis' in window) {
            this.loadVoices();
            if (speechSynthesis.onvoiceschanged !== undefined) {
                speechSynthesis.onvoiceschanged = () => this.loadVoices();
            }
        }
    }

    loadVoices() {
        if ('speechSynthesis' in window) {
            this.voices = window.speechSynthesis.getVoices();
        }
    }

    /**
     * Check if voice input (STT) is supported
     */
    isSTTSupported() {
        return !!this.recognition;
    }

    /**
     * Check if voice output (TTS) is supported
     */
    isTTSSupported() {
        return 'speechSynthesis' in window;
    }

    /**
     * Start microphone speech recognition
     */
    startListening({ langCode = "en-US", onResult, onInterim, onStatusChange, onError }) {
        if (!this.recognition) {
            if (onError) onError("Voice recognition is not supported in this browser. Try Google Chrome or Microsoft Edge.");
            return;
        }

        if (this.isListening) {
            this.stopListening();
            return;
        }

        // Stop any active speech synthesis before listening
        this.stopSpeaking();

        this.currentLangCode = langCode;
        this.recognition.lang = langCode;

        this.recognition.onstart = () => {
            this.isListening = true;
            if (onStatusChange) onStatusChange("listening");
            this.playBeep(600, 0.08);
        };

        this.recognition.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }

            if (interimTranscript && onInterim) {
                onInterim(interimTranscript);
            }

            if (finalTranscript && onResult) {
                if (onStatusChange) onStatusChange("processing");
                onResult(finalTranscript.trim());
            }
        };

        this.recognition.onerror = (event) => {
            this.isListening = false;
            if (onStatusChange) onStatusChange("idle");
            if (onError) {
                let msg = "Microphone error: " + event.error;
                if (event.error === "not-allowed") {
                    msg = "Microphone access blocked. Please grant microphone permission in your browser.";
                } else if (event.error === "no-speech") {
                    msg = "No speech detected. Please try again.";
                }
                onError(msg);
            }
        };

        this.recognition.onend = () => {
            this.isListening = false;
            if (onStatusChange) onStatusChange("idle");
        };

        try {
            this.recognition.start();
        } catch (e) {
            console.error("Recognition start error:", e);
            this.isListening = false;
            if (onStatusChange) onStatusChange("idle");
        }
    }

    /**
     * Stop microphone recording
     */
    stopListening() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
            this.isListening = false;
        }
    }

    /**
     * Find best matching voice for a given BCP-47 language tag
     */
    getBestVoice(langCode) {
        if (!this.voices.length) this.loadVoices();

        if (this.selectedVoiceURI) {
            const chosen = this.voices.find(v => v.voiceURI === this.selectedVoiceURI);
            if (chosen) return chosen;
        }

        const normalizedLang = (langCode || "en-US").toLowerCase().replace('_', '-');
        const langPrefix = normalizedLang.split('-')[0];

        // 1. Exact match (e.g. hi-IN)
        let matched = this.voices.find(v => v.lang.toLowerCase().replace('_', '-') === normalizedLang);
        if (matched) return matched;

        // 2. Prefix match (e.g. hi)
        matched = this.voices.find(v => v.lang.toLowerCase().startsWith(langPrefix));
        if (matched) return matched;

        // 3. Fallback to default voice or first English voice
        matched = this.voices.find(v => v.default) || this.voices.find(v => v.lang.startsWith("en")) || this.voices[0];
        return matched || null;
    }

    /**
     * Read text aloud using Speech Synthesis
     */
    speak({ text, langCode = "en-US", onStart, onEnd, onError }) {
        if (!this.isTTSSupported() || !text) return;

        // Stop any current utterance
        this.stopSpeaking();

        // Strip markdown/emojis for clean speech output
        const cleanText = text.replace(/[#*`_~\[\]()]/g, '').replace(/🤖|👤|👋|📦|🧠|🐍|😄|🇮🇳|🇬🇧|🇪🇸|🇫🇷|🇩🇪|🇯🇵|🇰🇷|🇨🇳|🇸🇦|🇷🇺|🇵🇰|🇵🇹|🇮🇹/g, '').trim();
        if (!cleanText) return;

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = langCode;
        utterance.rate = this.rate;
        utterance.volume = this.volume;
        utterance.pitch = this.pitch;

        const voice = this.getBestVoice(langCode);
        if (voice) {
            utterance.voice = voice;
        }

        utterance.onstart = () => {
            this.isSpeaking = true;
            if (onStart) onStart();
        };

        utterance.onend = () => {
            this.isSpeaking = false;
            if (onEnd) onEnd();
        };

        utterance.onerror = (e) => {
            this.isSpeaking = false;
            if (onError) onError(e);
            if (onEnd) onEnd();
        };

        window.speechSynthesis.speak(utterance);
    }

    /**
     * Stop ongoing speech
     */
    stopSpeaking() {
        if (this.isTTSSupported() && window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            this.isSpeaking = false;
        }
    }

    /**
     * Sound feedback tone
     */
    playBeep(freq = 520, duration = 0.1) {
        try {
            if (!this.audioCtx) {
                this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (this.audioCtx.state === 'suspended') {
                this.audioCtx.resume();
            }
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            osc.connect(gain);
            gain.connect(this.audioCtx.destination);
            osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
            gain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);
            osc.start();
            osc.stop(this.audioCtx.currentTime + duration);
        } catch (e) {}
    }
}
