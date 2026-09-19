# 🤖 OmniVoice AI & Basic Rule-Based Chatbot

[![CodSoft Internship](https://img.shields.io/badge/Internship-CodSoft-blue.svg)](https://codsoft.in)
[![Python 3.x](https://img.shields.io/badge/Python-3.8+-yellow.svg?logo=python&logoColor=white)](https://www.python.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E.svg?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5 / CSS3](https://img.shields.io/badge/UI-HTML5%20%2F%20CSS3-E34F26.svg?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

> An intelligent, dual-interface chatbot project featuring a high-performance **Python Rule-Based Engine** and an interactive, modern **OmniVoice Web AI Assistant** with voice input/output, real-time speech recognition, 10 animated background themes, and multi-layer fuzzy matching.
>
> 🎓 **Developed as part of the CodSoft / CodeAlpha Internship Program.**

---

## 🌟 Overview & Highlights

This repository contains two core components designed to demonstrate conversational AI fundamentals:

1. **Python Rule-Based Chatbot (`chatbot.py`)**:
   - Built with pure Python without heavy dependencies.
   - Powered by a 500+ question-answer knowledge base across diverse domains (greetings, technology, programming, mathematics, science, facts, history, health, entertainment, languages, and general knowledge).
   - Features **multi-tiered intent resolution**: Direct exact match &rarr; Punctuation normalized match &rarr; Substring match &rarr; Keyword overlap scoring &rarr; Fuzzy matching with `difflib`.

2. **OmniVoice AI Web Application (`index.html`)**:
   - Modern, glassmorphic, responsive user interface.
   - **Voice Engine**: Integrated Speech-to-Text (STT) and Text-to-Speech (TTS) using the Web Speech API.
   - **10 Interactive Canvas Background Themes** (Neural Network, Cyber Grid, Starfield Matrix, Particle Flow, Neon Aurora, Galaxy Vortex, Bubble Float, Circuit Board, Fireflies, Rain Stream).
   - **Multilingual Support**: Supports English, Hindi, Spanish, French, German, and auto-detection.
   - Real-time sound wave animations, exportable chat history, quick suggestions, and voice controls (pitch, rate, voice selection).

---

## 🚀 Key Features

### 🐍 Python Core (`chatbot.py`)
- **500+ Predefined Responses**: Comprehensive response dictionary categorized systematically.
- **5-Layer Fallback Architecture**:
  1. *Exact Match*: Instant $O(1)$ dictionary lookup.
  2. *Normalized Match*: Cleans casing, whitespace, and punctuation.
  3. *Substring Match*: Identifies canonical questions inside conversational phrases.
  4. *Word Overlap Scoring*: Calculates Jaccard-like keyword overlap excluding stopwords.
  5. *Fuzzy Matching*: Uses `difflib.get_close_matches` with a calibrated similarity threshold (0.65) to handle typos and spelling mistakes.
- **UTF-8 Support**: Clean emoji output in cross-platform terminals.

### 🌐 Web Frontend & Voice Engine
- **Speech Recognition (STT)**: Hands-free voice input with real-time mic status and visual audio indicators.
- **Speech Synthesis (TTS)**: Natural voice playback with customizable rate and pitch sliders.
- **Interactive Theme Engine**: 10 distinct dynamic background particle animations powered by HTML5 Canvas.
- **Audio Sound Effects**: UI feedback sounds (mic click, sent message, received message).
- **Chat Management**: Clear chat, download/export chat logs, and quick prompt chips for seamless interaction.

---

## 📂 Project Structure

```
Basic-chatbot/
│
├── .gitignore              # Ignores bytecode, caches, OS files, and sensitive items
├── README.md               # Project documentation and guide
│
├── chatbot.py              # Standalone Python rule-based CLI chatbot (500+ Q&A)
│
├── index.html              # Main web application UI
├── style.css               # Modern glassmorphism & responsive CSS styling
├── app.js                  # Frontend application logic & state management
├── knowledgeBase.js        # Multilingual web knowledge base & intent matcher
├── canvasThemes.js         # 10 Canvas animated particle background themes
└── voiceEngine.js          # Web Speech API (STT & TTS) audio engine
```

---

## 🛠️ Technologies Used

- **Language & Frameworks**: Python 3.8+, Vanilla JavaScript (ES6+), HTML5, CSS3.
- **APIs & Web Standards**: Web Speech API (`webkitSpeechRecognition`, `speechSynthesis`), HTML5 Canvas API.
- **Typography & Styling**: Google Fonts (*Outfit*, *Fira Code*), CSS Variables, Flexbox, CSS Grid, Glassmorphic backdrop filters.
- **Matching Algorithms**: Python `difflib`, Regex normalization, Word overlap intersection scoring.

---

## 💻 Getting Started & Installation

### Option 1: Run the Python Chatbot (CLI)

1. Ensure you have **Python 3.8+** installed.
2. Clone the repository:
   ```bash
   git clone https://github.com/anupkumar45/Basic-chatbot.git
   cd Basic-chatbot
   ```
3. Run the script:
   ```bash
   python chatbot.py
   ```
4. Start chatting in your terminal! Type `bye`, `exit`, or `quit` to end the session.

---

### Option 2: Run the OmniVoice AI Web App

1. Simply open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Brave, etc. recommended for Web Speech API support).
2. Or use **VS Code Live Server**:
   - Right-click `index.html` &rarr; Select **"Open with Live Server"**.
3. Or launch a local Python HTTP server:
   ```bash
   python -m http.server 8000
   ```
   Navigate to `http://localhost:8000` in your browser.

---

## 📸 Usage & Interaction

- **Typing**: Enter questions like `"What is machine learning?"`, `"Tell me a joke"`, `"What is Python?"`, or `"नमस्ते"`.
- **Voice Mode**: Click the microphone button or press the shortcut to speak.
- **Theme Customizer**: Select any of the 10 animated themes from the header dropdown.
- **Language Switcher**: Toggle between English, Hindi, Spanish, French, and German.

---

## 📜 Acknowledgements & Internship Note

This project was developed as a core submission for the **CodSoft / CodeAlpha Artificial Intelligence & Web Development Internship**. It showcases fundamental NLP and rule-based conversational agent architecture, paired with modern web interface design and browser speech APIs.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) - feel free to use and adapt it for learning and development.
