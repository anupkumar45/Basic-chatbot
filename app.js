/**
 * Main Application Controller: OmniVoice AI
 * Integrates Knowledge Base, Voice Engine, Canvas Themes, and DOM Interactions.
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Engines
    const canvasManager = new CanvasBackgroundManager("bgCanvas");
    const voice = new VoiceEngine();

    // 2. DOM Elements
    const langSelect = document.getElementById("langSelect");
    const themeSelect = document.getElementById("themeSelect");
    const voiceSettingsBtn = document.getElementById("voiceSettingsBtn");
    const stopVoiceBtn = document.getElementById("stopVoiceBtn");
    const restartChatBtn = document.getElementById("restartChatBtn");

    const statusDot = document.getElementById("statusDot");
    const statusLabel = document.getElementById("statusLabel");
    const soundWaveBars = document.getElementById("soundWaveBars");

    const messagesContainer = document.getElementById("messagesContainer");
    const chipsContainer = document.getElementById("chipsContainer");
    const interimBanner = document.getElementById("interimBanner");
    const interimText = document.getElementById("interimText");

    const inputForm = document.getElementById("inputForm");
    const textInput = document.getElementById("textInput");
    const micBtn = document.getElementById("micBtn");
    const micIcon = document.getElementById("micIcon");
    const stopIcon = document.getElementById("stopIcon");
    const sendBtn = document.getElementById("sendBtn");
    const initialTimestamp = document.getElementById("initialTimestamp");

    // Modal Elements
    const settingsModalOverlay = document.getElementById("settingsModalOverlay");
    const closeSettingsBtn = document.getElementById("closeSettingsBtn");
    const saveSettingsBtn = document.getElementById("saveSettingsBtn");
    const autoSpeakToggle = document.getElementById("autoSpeakToggle");
    const rateSlider = document.getElementById("rateSlider");
    const rateValueDisplay = document.getElementById("rateValueDisplay");
    const volumeSlider = document.getElementById("volumeSlider");
    const volumeValueDisplay = document.getElementById("volumeValueDisplay");
    const pitchSlider = document.getElementById("pitchSlider");
    const pitchValueDisplay = document.getElementById("pitchValueDisplay");
    const voiceOverrideSelect = document.getElementById("voiceOverrideSelect");
    const testVoiceBtn = document.getElementById("testVoiceBtn");

    // State Variables
    let currentLanguage = localStorage.getItem("omni_lang") || "en";
    let currentTheme = localStorage.getItem("omni_theme") || "theme-neural";
    let isSessionEnded = false;

    // Set initial timestamp
    if (initialTimestamp) {
        initialTimestamp.textContent = getFormattedTime();
    }

    // 3. Initialize Preferences & Background
    if (LANGUAGES[currentLanguage]) {
        langSelect.value = currentLanguage;
    }
    themeSelect.value = currentTheme;
    canvasManager.setTheme(currentTheme);

    // Update Quick Suggestions for initial language
    updateQuickSuggestions(currentLanguage);

    // Populate Voice Selection options in modal
    setTimeout(() => populateVoiceList(), 600);
    if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = () => populateVoiceList();
    }

    // =========================================================================
    // Status Display Controller
    // =========================================================================
    function setStatus(state, customLabel = null) {
        statusDot.className = "status-dot";
        soundWaveBars.classList.add("hidden");

        if (state === "listening") {
            statusDot.classList.add("listening");
            statusLabel.textContent = customLabel || "Listening... 🎤";
            micBtn.classList.add("listening");
            micIcon.classList.add("hidden");
            stopIcon.classList.remove("hidden");
            interimBanner.classList.remove("hidden");
        } else if (state === "processing") {
            statusDot.classList.add("processing");
            statusLabel.textContent = customLabel || "Processing... ⏳";
            micBtn.classList.remove("listening");
            micIcon.classList.remove("hidden");
            stopIcon.classList.add("hidden");
            interimBanner.classList.add("hidden");
        } else if (state === "speaking") {
            statusDot.classList.add("speaking");
            statusLabel.textContent = customLabel || "Speaking... 🔊";
            soundWaveBars.classList.remove("hidden");
            micBtn.classList.remove("listening");
            micIcon.classList.remove("hidden");
            stopIcon.classList.add("hidden");
            interimBanner.classList.add("hidden");
        } else if (state === "offline") {
            statusDot.classList.add("listening"); // red
            statusLabel.textContent = customLabel || "Offline • Session ended";
            micBtn.classList.remove("listening");
            micIcon.classList.remove("hidden");
            stopIcon.classList.add("hidden");
            interimBanner.classList.add("hidden");
        } else {
            statusLabel.textContent = customLabel || "Ready • Online";
            micBtn.classList.remove("listening");
            micIcon.classList.remove("hidden");
            stopIcon.classList.add("hidden");
            interimBanner.classList.add("hidden");
        }
    }

    // =========================================================================
    // Language & Theme Handlers
    // =========================================================================
    function switchLanguage(newLang) {
        if (!LANGUAGES[newLang]) return;
        currentLanguage = newLang;
        langSelect.value = newLang;
        localStorage.setItem("omni_lang", newLang);
        updateQuickSuggestions(newLang);
    }

    langSelect.addEventListener("change", (e) => {
        switchLanguage(e.target.value);
    });

    themeSelect.addEventListener("change", (e) => {
        currentTheme = e.target.value;
        canvasManager.setTheme(currentTheme);
        localStorage.setItem("omni_theme", currentTheme);
    });

    function updateQuickSuggestions(langKey) {
        if (!chipsContainer) return;
        chipsContainer.innerHTML = "";
    }

    // =========================================================================
    // Message Rendering & Actions
    // =========================================================================
    function getFormattedTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function appendMessage(sender, text, langCode = "en-US") {
        const row = document.createElement("div");
        row.className = `message-row ${sender === "user" ? "user-row" : "bot-row"}`;

        const avatar = document.createElement("div");
        avatar.className = "msg-avatar-badge";
        avatar.textContent = sender === "user" ? "👤" : "🤖";

        const contentWrapper = document.createElement("div");
        contentWrapper.className = "msg-content-wrapper";

        const bubble = document.createElement("div");
        bubble.className = `msg-bubble ${sender === "user" ? "user-bubble" : "bot-bubble"}`;

        const p = document.createElement("p");
        p.className = "msg-text";
        p.textContent = text;

        const footer = document.createElement("div");
        footer.className = "bubble-footer";

        const time = document.createElement("span");
        time.className = "msg-time";
        time.textContent = getFormattedTime();

        const actions = document.createElement("div");
        actions.className = "msg-actions";

        // Speak Message button
        const speakBtn = document.createElement("button");
        speakBtn.type = "button";
        speakBtn.className = "msg-action-btn speak-msg-btn";
        speakBtn.title = "Read aloud";
        speakBtn.textContent = "🔊";
        speakBtn.addEventListener("click", () => {
            voice.speak({
                text: text,
                langCode: langCode,
                onStart: () => setStatus("speaking"),
                onEnd: () => setStatus("idle"),
                onError: () => setStatus("idle")
            });
        });

        // Copy Message button
        const copyBtn = document.createElement("button");
        copyBtn.type = "button";
        copyBtn.className = "msg-action-btn copy-msg-btn";
        copyBtn.title = "Copy text";
        copyBtn.textContent = "📋";
        copyBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(text).then(() => {
                copyBtn.textContent = "✅";
                setTimeout(() => copyBtn.textContent = "📋", 1500);
            });
        });

        actions.appendChild(speakBtn);
        actions.appendChild(copyBtn);
        footer.appendChild(time);
        footer.appendChild(actions);

        bubble.appendChild(p);
        bubble.appendChild(footer);
        contentWrapper.appendChild(bubble);
        row.appendChild(avatar);
        row.appendChild(contentWrapper);

        messagesContainer.appendChild(row);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function showTypingIndicator() {
        const row = document.createElement("div");
        row.id = "activeTypingIndicator";
        row.className = "message-row bot-row";

        const avatar = document.createElement("div");
        avatar.className = "msg-avatar-badge";
        avatar.textContent = "🤖";

        const contentWrapper = document.createElement("div");
        contentWrapper.className = "msg-content-wrapper";

        const bubble = document.createElement("div");
        bubble.className = "msg-bubble bot-bubble";

        const dots = document.createElement("div");
        dots.className = "typing-dots";
        dots.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';

        bubble.appendChild(dots);
        contentWrapper.appendChild(bubble);
        row.appendChild(avatar);
        row.appendChild(contentWrapper);

        messagesContainer.appendChild(row);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById("activeTypingIndicator");
        if (indicator) indicator.remove();
    }

    // =========================================================================
    // Core Message Processing Workflow
    // =========================================================================
    function processUserMessage(rawText) {
        const text = rawText.trim();
        if (!text || isSessionEnded) return;

        // 1. Display user message
        appendMessage("user", text);
        textInput.value = "";

        // 2. Query knowledge base intent engine
        const resolved = resolveMultilingualResponse(text, currentLanguage, true);

        // 3. Handle Language switch if recognized
        if (resolved.intent === "LANGUAGE_CHANGE" && resolved.newLanguage) {
            switchLanguage(resolved.newLanguage);
        }

        const effectiveLangMeta = LANGUAGES[resolved.language] || LANGUAGES["en"];

        // 4. Show typing simulation
        setStatus("processing");
        showTypingIndicator();

        setTimeout(() => {
            removeTypingIndicator();
            appendMessage("bot", resolved.reply, effectiveLangMeta.code);

            // Check if user said goodbye
            if (resolved.isGoodbye) {
                isSessionEnded = true;
                setStatus("offline");
                textInput.disabled = true;
                micBtn.disabled = true;
                sendBtn.disabled = true;
                textInput.placeholder = "Session ended. Click restart button to chat again.";
            } else {
                setStatus("idle");
            }

            // 5. Automatic Voice Output (Text-to-Speech)
            if (voice.autoSpeak) {
                voice.speak({
                    text: resolved.reply,
                    langCode: effectiveLangMeta.code,
                    onStart: () => setStatus("speaking"),
                    onEnd: () => {
                        if (isSessionEnded) setStatus("offline");
                        else setStatus("idle");
                    },
                    onError: () => {
                        if (isSessionEnded) setStatus("offline");
                        else setStatus("idle");
                    }
                });
            }
        }, 500);
    }

    // Form Submit Handler
    inputForm.addEventListener("submit", (e) => {
        e.preventDefault();
        processUserMessage(textInput.value);
    });

    // =========================================================================
    // Voice Input: Microphone Button Flow
    // =========================================================================
    micBtn.addEventListener("click", () => {
        if (isSessionEnded) return;

        if (voice.isListening) {
            voice.stopListening();
            setStatus("idle");
            return;
        }

        const activeLangMeta = LANGUAGES[currentLanguage] || LANGUAGES["en"];

        voice.startListening({
            langCode: activeLangMeta.code,
            onStatusChange: (st) => {
                if (st === "listening") {
                    setStatus("listening");
                    interimText.textContent = `Listening in ${activeLangMeta.nativeName}...`;
                } else if (st === "processing") {
                    setStatus("processing");
                } else {
                    setStatus("idle");
                }
            },
            onInterim: (transcript) => {
                interimText.textContent = `"${transcript}"`;
            },
            onResult: (finalText) => {
                processUserMessage(finalText);
            },
            onError: (errMessage) => {
                setStatus("idle");
                alert(errMessage);
            }
        });
    });

    // Stop/Mute Voice Button
    stopVoiceBtn.addEventListener("click", () => {
        voice.stopSpeaking();
        voice.stopListening();
        setStatus(isSessionEnded ? "offline" : "idle");
    });

    // Restart Conversation
    restartChatBtn.addEventListener("click", () => {
        voice.stopSpeaking();
        voice.stopListening();
        isSessionEnded = false;
        textInput.disabled = false;
        micBtn.disabled = false;
        sendBtn.disabled = false;
        textInput.placeholder = "Type or click 🎤 to speak in any language...";
        setStatus("idle");

        const welcome = INTENT_RESPONSES["GREETING"][currentLanguage] || INTENT_RESPONSES["GREETING"]["en"];
        messagesContainer.innerHTML = `
            <div class="message-row bot-row">
                <div class="msg-avatar-badge">🤖</div>
                <div class="msg-content-wrapper">
                    <div class="msg-bubble bot-bubble">
                        <p class="msg-text">${welcome}</p>
                        <div class="bubble-footer">
                            <span class="msg-time">${getFormattedTime()}</span>
                            <div class="msg-actions">
                                <button type="button" class="msg-action-btn speak-msg-btn" title="Read aloud" aria-label="Read aloud">🔊</button>
                                <button type="button" class="msg-action-btn copy-msg-btn" title="Copy text" aria-label="Copy text">📋</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        textInput.focus();
    });

    // =========================================================================
    // Voice Settings Modal Controls
    // =========================================================================
    function populateVoiceList() {
        const voices = voice.voices.length ? voice.voices : window.speechSynthesis.getVoices();
        voiceOverrideSelect.innerHTML = '<option value="">Default (Auto-detect per language)</option>';
        voices.forEach(v => {
            const opt = document.createElement("option");
            opt.value = v.voiceURI;
            opt.textContent = `${v.name} (${v.lang})`;
            voiceOverrideSelect.appendChild(opt);
        });
    }

    voiceSettingsBtn.addEventListener("click", () => {
        settingsModalOverlay.classList.remove("hidden");
    });

    closeSettingsBtn.addEventListener("click", () => {
        settingsModalOverlay.classList.add("hidden");
    });

    saveSettingsBtn.addEventListener("click", () => {
        settingsModalOverlay.classList.add("hidden");
    });

    settingsModalOverlay.addEventListener("click", (e) => {
        if (e.target === settingsModalOverlay) {
            settingsModalOverlay.classList.add("hidden");
        }
    });

    // Auto-Speak Toggle
    autoSpeakToggle.addEventListener("change", (e) => {
        voice.autoSpeak = e.target.checked;
    });

    // Rate Slider
    rateSlider.addEventListener("input", (e) => {
        const val = parseFloat(e.target.value);
        voice.rate = val;
        rateValueDisplay.textContent = `${val.toFixed(1)}x`;
    });

    // Volume Slider
    volumeSlider.addEventListener("input", (e) => {
        const val = parseFloat(e.target.value);
        voice.volume = val;
        volumeValueDisplay.textContent = `${Math.round(val * 100)}%`;
    });

    // Pitch Slider
    pitchSlider.addEventListener("input", (e) => {
        const val = parseFloat(e.target.value);
        voice.pitch = val;
        pitchValueDisplay.textContent = val.toFixed(1);
    });

    // Voice Override Select
    voiceOverrideSelect.addEventListener("change", (e) => {
        voice.selectedVoiceURI = e.target.value || null;
    });

    // Test Voice
    testVoiceBtn.addEventListener("click", () => {
        const activeLangMeta = LANGUAGES[currentLanguage] || LANGUAGES["en"];
        const testText = INTENT_RESPONSES["GREETING"][currentLanguage] || "Testing voice synthesis output!";
        voice.speak({
            text: testText,
            langCode: activeLangMeta.code,
            onStart: () => setStatus("speaking"),
            onEnd: () => setStatus("idle"),
            onError: () => setStatus("idle")
        });
    });
});
