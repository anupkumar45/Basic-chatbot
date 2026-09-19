/**
 * Multilingual Knowledge Base & Intent Classification Engine
 * Supports 23+ languages including Bhojpuri (भोजपुरी), native scripts, auto-detection, and universal intent resolution.
 */

// Supported Languages Metadata
const LANGUAGES = {
    "en": { name: "English", nativeName: "English", code: "en-US", flag: "🇬🇧" },
    "hi": { name: "Hindi", nativeName: "हिन्दी", code: "hi-IN", flag: "🇮🇳" },
    "bho": { name: "Bhojpuri", nativeName: "भोजपुरी", code: "hi-IN", flag: "🇮🇳" },
    "hinglish": { name: "Hinglish", nativeName: "Hinglish", code: "hi-IN", flag: "🇮🇳" },
    "bn": { name: "Bengali", nativeName: "বাংলা", code: "bn-IN", flag: "🇮🇳" },
    "te": { name: "Telugu", nativeName: "తెలుగు", code: "te-IN", flag: "🇮🇳" },
    "mr": { name: "Marathi", nativeName: "मराठी", code: "mr-IN", flag: "🇮🇳" },
    "ta": { name: "Tamil", nativeName: "தமிழ்", code: "ta-IN", flag: "🇮🇳" },
    "gu": { name: "Gujarati", nativeName: "ગુજરાતી", code: "gu-IN", flag: "🇮🇳" },
    "kn": { name: "Kannada", nativeName: "ಕನ್ನಡ", code: "kn-IN", flag: "🇮🇳" },
    "ml": { name: "Malayalam", nativeName: "മലയാളം", code: "ml-IN", flag: "🇮🇳" },
    "pa": { name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", code: "pa-IN", flag: "🇮🇳" },
    "ur": { name: "Urdu", nativeName: "اردو", code: "ur-PK", flag: "🇵🇰" },
    "es": { name: "Spanish", nativeName: "Español", code: "es-ES", flag: "🇪🇸" },
    "fr": { name: "French", nativeName: "Français", code: "fr-FR", flag: "🇫🇷" },
    "de": { name: "German", nativeName: "Deutsch", code: "de-DE", flag: "🇩🇪" },
    "pt": { name: "Portuguese", nativeName: "Português", code: "pt-PT", flag: "🇵🇹" },
    "it": { name: "Italian", nativeName: "Italiano", code: "it-IT", flag: "🇮🇹" },
    "ja": { name: "Japanese", nativeName: "日本語", code: "ja-JP", flag: "🇯🇵" },
    "ko": { name: "Korean", nativeName: "한국어", code: "ko-KR", flag: "🇰🇷" },
    "zh": { name: "Chinese", nativeName: "中文 (Mandarin)", code: "zh-CN", flag: "🇨🇳" },
    "ar": { name: "Arabic", nativeName: "العربية", code: "ar-SA", flag: "🇸🇦" },
    "ru": { name: "Russian", nativeName: "Русский", code: "ru-RU", flag: "🇷🇺" }
};

// Universal Intent Knowledge Base Responses across all languages

// 500 Predefined Question-Answer Knowledge Base
const QA_500_RESPONSES = {
    "hello": "Hi! How can I help you?",
    "hi": "Hello! Nice to meet you.",
    "hey": "Hey! How are you?",
    "hii": "Hii! How can I help you?",
    "good morning": "Good morning! Have a great day.",
    "good afternoon": "Good afternoon! How can I help you?",
    "good evening": "Good evening! How are you?",
    "good night": "Good night! Sleep well.",
    "hello chatbot": "Hello! I am ready to chat with you.",
    "hi chatbot": "Hi! What would you like to know?",
    "hey chatbot": "Hey! Nice to see you.",
    "how are you": "I'm fine, thank you!",
    "how are you doing": "I'm doing great! Thanks for asking.",
    "how is your day": "My day is going well!",
    "how is everything": "Everything is good!",
    "are you okay": "Yes, I'm okay. Thank you!",
    "are you there": "Yes, I'm here!",
    "can we talk": "Of course! Let's chat.",
    "can i talk to you": "Yes! I'm happy to chat with you.",
    "nice to meet you": "Nice to meet you too!",
    "what is your name": "My name is ChatBot.",
    "tell me your name": "I'm ChatBot. Nice to meet you!",
    "who are you": "I'm a simple rule-based chatbot.",
    "what are you": "I'm a computer program designed to chat with you.",
    "are you a chatbot": "Yes, I'm a chatbot.",
    "are you a robot": "I'm software, not a physical robot.",
    "are you human": "No, I'm a chatbot.",
    "are you ai": "I'm a simple chatbot program.",
    "who created you": "I was created as a Python chatbot project.",
    "what is your purpose": "My purpose is to answer basic questions.",
    "what can you do": "I can answer many basic questions.",
    "what do you do": "I chat with users and provide predefined responses.",
    "why are you here": "I'm here to chat and help you.",
    "what is your job": "My job is to respond to your questions.",
    "can you introduce yourself": "Sure! I'm ChatBot, a simple Python-based chatbot.",
    "tell me about yourself": "I'm a basic chatbot created to have simple conversations.",
    "what kind of chatbot are you": "I'm a rule-based chatbot.",
    "are you a virtual assistant": "I can work like a simple virtual assistant.",
    "what is a chatbot": "A chatbot is a program that communicates with users.",
    "how do you work": "I match your input with predefined rules and responses.",
    "can you help me": "Yes! I'll try my best to help you.",
    "how can you help me": "I can answer your basic questions.",
    "i need help": "Sure! Tell me what you need.",
    "can you answer my question": "Yes, ask me your question.",
    "can i ask you something": "Of course! Go ahead.",
    "can i ask a question": "Yes! Please ask your question.",
    "what can i ask you": "You can ask me basic questions about myself and chatting.",
    "do you understand me": "I'll try to understand your message.",
    "can you explain something": "Yes, I'll try to explain it simply.",
    "can you repeat that": "Sure! I'll repeat it.",
    "can you say that again": "Of course! I'll say it again.",
    "can you help with information": "Yes, I can provide basic information.",
    "what should i ask": "You can ask me about my name, purpose, or abilities.",
    "are you able to help": "Yes, I can help with basic questions.",
    "can you talk to me": "Yes! Let's have a conversation.",
    "do you answer questions": "Yes, I answer predefined questions.",
    "can you give me an answer": "Yes! Ask me something.",
    "can you understand english": "Yes, I can respond to basic English questions.",
    "can you understand hindi": "Yes, I can respond to basic Hindi questions.",
    "can you speak hindi": "Yes, I can give simple Hindi responses.",
    "thank you": "You're welcome!",
    "thanks": "You're welcome!",
    "thank you so much": "You're very welcome!",
    "thanks a lot": "My pleasure!",
    "thank you chatbot": "You're welcome! 😊",
    "thanks chatbot": "Anytime!",
    "you helped me": "I'm glad I could help!",
    "that was helpful": "I'm happy it was helpful!",
    "good answer": "Thank you!",
    "nice answer": "Thanks!",
    "great": "Glad you liked it!",
    "awesome": "Thank you! 😊",
    "very good": "Thank you!",
    "well done": "Thanks!",
    "nice": "Thank you!",
    "perfect": "Glad to hear that!",
    "great job": "Thank you!",
    "good work": "Thanks!",
    "i like you": "That's nice of you to say!",
    "you are helpful": "Thank you! I'm happy to help.",
    "bye": "Goodbye! Have a great day!",
    "goodbye": "Goodbye! See you next time.",
    "see you": "See you later!",
    "see you later": "See you later! Take care.",
    "see you soon": "See you soon!",
    "i have to go": "Okay! Take care.",
    "i am leaving": "Goodbye! Have a nice day.",
    "i need to leave": "No problem. See you later!",
    "good bye chatbot": "Goodbye! It was nice chatting with you.",
    "bye chatbot": "Bye! Take care.",
    "talk to you later": "Sure! Talk to you later.",
    "catch you later": "See you later!",
    "until next time": "Until next time!",
    "have a good day": "Thank you! You have a good day too.",
    "have a nice day": "Thank you! Have a nice day too.",
    "take care": "You too! Take care.",
    "good night bye": "Good night! Goodbye!",
    "i will talk later": "Sure! I'll be here when you return.",
    "end chat": "Okay! Ending our chat. Goodbye!",
    "stop chatting": "Okay! Goodbye and take care.",
    "what is your favorite color": "I don't have a personal favorite color.",
    "what is your favorite food": "I don't eat food, but I can talk about it!",
    "do you like music": "I don't have personal likes, but music is fun to discuss.",
    "do you like movies": "I don't watch movies, but I can talk about them.",
    "do you like books": "I don't read like humans do, but books are interesting.",
    "do you have a favorite song": "I don't have personal favorites.",
    "do you have a favorite movie": "I don't have personal movie preferences.",
    "do you have a favorite book": "I don't have personal book preferences.",
    "what is your favorite game": "I don't play games, but games can be fun!",
    "do you play games": "No, I don't play games.",
    "do you watch tv": "No, I don't watch TV.",
    "do you watch movies": "No, I don't watch movies myself.",
    "do you read books": "I don't read books like a person does.",
    "do you listen to music": "I don't listen to music, but I can discuss it.",
    "do you like chatting": "I enjoy helping through conversations.",
    "are you happy": "I don't have human emotions, but I'm here to help.",
    "are you sad": "I don't experience sadness.",
    "are you angry": "No, I don't experience anger.",
    "are you excited": "I don't experience excitement, but I'm ready to chat!",
    "do you have feelings": "I don't have human feelings or emotions.",
    "what are you doing": "I'm here chatting with you.",
    "are you busy": "I'm available to chat with you.",
    "are you free": "Yes, I'm ready to chat.",
    "what are you up to": "I'm waiting for your next message.",
    "are you working": "Yes, I'm responding to your messages.",
    "do you sleep": "No, I don't need to sleep.",
    "do you eat": "No, I don't eat food.",
    "do you drink water": "No, I don't need water.",
    "do you need rest": "No, I don't need rest like humans do.",
    "do you get tired": "No, I don't get tired.",
    "do you wake up": "I don't sleep or wake up like humans.",
    "what time do you sleep": "I don't sleep.",
    "what do you do all day": "I answer questions and chat with users.",
    "are you online": "Yes, I'm ready to respond.",
    "are you always available": "I'm designed to respond whenever I'm available.",
    "what are you thinking": "I don't think like a human, but I'm processing your message.",
    "do you have a home": "No, I don't have a physical home.",
    "where do you live": "I don't live in a physical place.",
    "do you have a room": "No, I don't have a physical room.",
    "do you have a phone": "No, I don't have a personal phone.",
    "do you have friends": "I don't have friends like humans do.",
    "who is your best friend": "I don't have a best friend.",
    "can you be my friend": "Sure! We can chat anytime.",
    "are we friends": "We can certainly have friendly conversations.",
    "do you like people": "I'm here to communicate and help people.",
    "do you know my friends": "No, I don't know your friends personally.",
    "do you have a family": "No, I don't have a human family.",
    "who is your family": "I don't have a family like humans do.",
    "do you have parents": "No, I don't have parents.",
    "do you have a brother": "No, I don't have a brother.",
    "do you have a sister": "No, I don't have a sister.",
    "do you have children": "No, I don't have children.",
    "do you know me": "I only know what you share during our conversation.",
    "can you remember me": "I can respond based on the conversation available to me.",
    "can we be friends": "Sure! Let's have a friendly conversation.",
    "will you talk to me": "Yes! I'm happy to chat.",
    "can i be your friend": "Of course, we can chat as friends.",
    "do you care about me": "I'm designed to be helpful and respectful.",
    "can i trust you": "You should use your judgment and avoid sharing sensitive information.",
    "are you my friend": "I'm your chatbot companion for this conversation.",
    "can you talk": "Yes, I can communicate through text.",
    "can you listen": "I can process the messages you send me.",
    "can you read": "I can process text that you provide.",
    "can you write": "Yes, I can generate text responses.",
    "can you answer questions": "Yes, I can answer many basic questions.",
    "can you tell jokes": "Yes! I can tell simple jokes.",
    "can you tell a story": "Yes, I can tell a simple story.",
    "can you give advice": "I can provide general suggestions.",
    "can you explain things": "Yes, I can explain simple topics.",
    "can you translate": "I can help with simple translations.",
    "can you count": "Yes, I can count numbers.",
    "can you calculate": "I can help with simple calculations.",
    "can you spell words": "Yes, I can help spell words.",
    "can you say hello": "Hello! 👋",
    "can you say goodbye": "Goodbye! 👋",
    "can you greet me": "Hello! It's nice to meet you.",
    "can you help me learn": "Yes, I can help explain basic topics.",
    "can you give examples": "Yes, I can provide simple examples.",
    "can you repeat a word": "Yes. Tell me the word.",
    "can you answer in simple words": "Yes, I'll try to keep my answers simple.",
    "why were you created": "I was created to provide simple conversational assistance.",
    "how were you created": "I was created as a Python rule-based chatbot project.",
    "what language are you made in": "I'm designed as a Python chatbot.",
    "do you use python": "Yes, Python is used for this chatbot project.",
    "are you made with python": "Yes, this chatbot project is made with Python.",
    "are you a simple chatbot": "Yes, I'm designed as a simple chatbot.",
    "are you a rule based chatbot": "Yes, I use predefined rules and responses.",
    "how do you answer me": "I match your message with predefined responses.",
    "do you understand everything": "No, I may not understand every question.",
    "what if you don't understand me": "I'll ask you to try asking in another way.",
    "can you answer every question": "No, I mainly handle the questions I've been programmed for.",
    "do you know everything": "No, I don't know everything.",
    "can you learn from me": "This basic chatbot does not automatically learn from conversations.",
    "do you remember everything": "No, this basic chatbot does not remember everything.",
    "can you make mistakes": "Yes, a chatbot can sometimes give an incorrect response.",
    "what happens if i ask something unknown": "I'll give a default response asking you to try again.",
    "can i ask another question": "Of course! Ask me anything from my supported questions.",
    "can we continue chatting": "Yes! Let's continue our conversation.",
    "are you ready": "Yes! I'm ready to chat.",
    "what is your main purpose": "My main purpose is to chat and answer basic questions.",
    "how is your day going": "My day is going well!",
    "is your day good": "Yes, everything is going well.",
    "are you having a good day": "Yes, I'm ready to chat!",
    "do you want to chat": "Yes! Let's chat.",
    "can we chat": "Of course!",
    "can we talk for a while": "Sure! Let's talk.",
    "do you want to talk": "I'm ready to chat with you.",
    "what should we talk about": "We can talk about something simple and interesting.",
    "can you start a conversation": "Sure! How has your day been?",
    "start chatting with me": "Sure! Hello, how are you?",
    "say something": "Hello! I'm happy to chat with you.",
    "tell me something": "Here's something simple: Every day is a new opportunity to learn.",
    "tell me something interesting": "Honey never spoils when stored properly.",
    "tell me something fun": "Here's a fun fact: Octopuses have three hearts.",
    "tell me a joke": "Why did the computer go to the doctor? It had a virus!",
    "make me laugh": "Why was the computer cold? It left its Windows open!",
    "do you know any jokes": "Yes! I know some simple jokes.",
    "can you make me smile": "I'll try! Keep smiling. 😊",
    "say something funny": "Why did the phone wear glasses? It lost its contacts!",
    "are you funny": "I can try to be funny!",
    "do you like jokes": "Jokes can make conversations fun.",
    "is chatting fun": "Yes, conversations can be fun!",
    "are you enjoying this chat": "I'm ready to continue chatting.",
    "do you like talking": "I'm designed for conversations.",
    "can we have a fun conversation": "Sure! Let's have some fun.",
    "tell me a fun fact": "A group of flamingos is called a flamboyance.",
    "tell me a fact": "The Earth takes about 365 days to orbit the Sun.",
    "give me a simple fact": "Water freezes at 0°C under standard conditions.",
    "can you surprise me": "Here's a surprise: Bananas are botanically berries!",
    "say something nice": "You're doing great by learning and asking questions!",
    "say something positive": "Keep learning and keep moving forward!",
    "give me motivation": "Believe in yourself and keep practicing.",
    "motivate me": "Small steps every day can lead to big progress.",
    "tell me something positive": "Every new day is a chance to learn something new.",
    "can you cheer me up": "Keep going! Better moments are ahead. 😊",
    "give me a smile": "Here's a virtual smile for you! 😊",
    "what do you like": "I don't have personal preferences, but I enjoy useful conversations.",
    "what do you dislike": "I don't have personal likes or dislikes.",
    "do you have hobbies": "I don't have hobbies like humans do.",
    "what is your hobby": "Chatting and helping users is my main purpose.",
    "do you have interests": "I don't have personal interests.",
    "what makes you happy": "I don't experience happiness, but helpful conversations are my purpose.",
    "what makes you sad": "I don't experience sadness.",
    "what makes you angry": "I don't experience anger.",
    "are you bored": "No, I don't experience boredom.",
    "do you get bored": "No, I don't get bored.",
    "do you have a routine": "No, I don't have a human routine.",
    "do you have a birthday": "I don't have a personal birthday.",
    "how old are you": "I don't have a human age.",
    "when were you born": "I don't have a human birth date.",
    "are you young": "Human age doesn't apply to me.",
    "are you old": "Human age doesn't apply to me.",
    "do you have a birthday party": "No, I don't have birthday parties.",
    "do you celebrate festivals": "I don't personally celebrate festivals.",
    "do you celebrate birthdays": "I don't personally celebrate birthdays.",
    "do you celebrate holidays": "I don't personally celebrate holidays.",
    "do you like holidays": "I don't have personal preferences about holidays.",
    "what is your favorite day": "I don't have a favorite day.",
    "what is your favorite time": "I don't have a favorite time.",
    "do you like mornings": "I don't have personal preferences.",
    "do you like nights": "I don't have personal preferences.",
    "do you like weekends": "I don't experience weekends personally.",
    "what do you do on weekends": "I don't have weekends or a personal schedule.",
    "do you go outside": "No, I don't have a physical body.",
    "can you walk": "No, I don't have a physical body.",
    "can you run": "No, I don't have a physical body.",
    "can you dance": "No, I don't have a physical body.",
    "can you sing": "I can generate text, but I don't physically sing.",
    "can you cook": "I can't physically cook, but I can discuss recipes.",
    "can you drive": "No, I can't physically drive.",
    "can you travel": "I don't physically travel.",
    "do you have a car": "No, I don't have a physical car.",
    "do you have a computer": "I'm software that runs on computer systems.",
    "do you have a laptop": "No, I don't have a personal laptop.",
    "do you have a house": "No, I don't have a physical house.",
    "do you have a city": "No, I don't have a personal city.",
    "do you live somewhere": "I don't live like a human does.",
    "do you have a country": "No, I don't have a personal country.",
    "where are you": "I'm available through this chat.",
    "where do you stay": "I don't have a physical place to stay.",
    "who are your friends": "I don't have personal friends.",
    "do you have a best friend": "No, I don't have a best friend.",
    "do you have any family": "No, I don't have a human family.",
    "do you have a mother": "No, I don't have a human mother.",
    "do you have a father": "No, I don't have a human father.",
    "do you have any parents": "No, I don't have human parents.",
    "do you have siblings": "No, I don't have siblings.",
    "do you have any brothers": "No, I don't have a brother.",
    "do you have any sisters": "No, I don't have a sister.",
    "do you have any children": "No, I don't have children.",
    "could you be my friend": "Sure! We can chat anytime.",
    "could we be friends": "Sure! Let's have a friendly conversation.",
    "are we good friends": "We can certainly have friendly conversations.",
    "could i be your friend": "Of course! We can chat as friends.",
    "would you talk to me": "Yes! I'm happy to chat.",
    "do you like talking to people": "I'm here to communicate and help people.",
    "do you know any of my friends": "No, I don't know your friends personally.",
    "do you know who i am": "I only know what you share during our conversation.",
    "can you remember who i am": "I can respond based on the conversation available to me.",
    "are you really my friend": "I'm your chatbot companion for this conversation.",
    "what are you doing now": "I'm chatting with you.",
    "what are you up to right now": "I'm here waiting for your message.",
    "are you free right now": "Yes, I'm ready to chat.",
    "are you busy right now": "No, I'm available for our conversation.",
    "do you want to chat with me": "Yes! Let's chat.",
    "can we talk together": "Of course! Let's talk.",
    "what should we talk about today": "We can talk about something simple and interesting.",
    "start a conversation": "Sure! How has your day been?",
    "start chatting": "Sure! Hello, how are you?",
    "say something to me": "Hello! I'm happy to chat with you.",
    "tell me something nice": "Every day is a new opportunity to learn.",
    "tell me something really interesting": "Honey never spoils when stored properly.",
    "tell me something fun to know": "Octopuses have three hearts.",
    "can you tell me a joke": "Why did the computer go to the doctor? It had a virus!",
    "can you make me laugh": "Why was the computer cold? It left its Windows open!",
    "do you know jokes": "Yes! I know some simple jokes.",
    "please say something funny": "Why did the phone wear glasses? It lost its contacts!",
    "could you make me smile": "I'll try! Keep smiling. 😊",
    "can you tell me a fun fact": "A group of flamingos is called a flamboyance.",
    "give me a fact": "The Earth takes about 365 days to orbit the Sun.",
    "give me some motivation": "Believe in yourself and keep practicing.",
    "please motivate me": "Small steps every day can lead to big progress.",
    "can you say something positive": "Keep learning and keep moving forward!",
    "can you say something nice": "You're doing great by learning and asking questions!",
    "could you cheer me up": "Keep going! Better moments are ahead. 😊",
    "give me a compliment": "You seem curious and eager to learn!",
    "encourage me": "Keep going! You can do it.",
    "tell me i can do it": "You can do it! Keep trying. 💪",
    "am i doing well": "Keep practicing and improving!",
    "is everything okay": "I hope everything is going well for you.",
    "wish me good luck": "Good luck! I hope everything goes well.",
    "wish me a nice day": "Have a wonderful day!",
    "wish me good morning": "Good morning! Have a wonderful day!",
    "wish me good night": "Good night! Sleep well!",
    "tell me to take care": "Take care and stay safe!",
    "say welcome to me": "Welcome! 😊",
    "welcome me": "Welcome! It's nice to have you here.",
    "could you greet me": "Hello! Welcome! 👋",
    "say hello to me": "Hello! 👋",
    "say hi to me": "Hi! 👋",
    "say hello": "Hello! 👋",
    "say hi": "Hi! 👋",
    "say goodbye": "Goodbye! 👋",
    "say thank you": "Thank you!",
    "say please": "Please!",
    "say welcome": "You're welcome!",
    "say my name": "Sure! Tell me your name first.",
    "ask me a question": "Sure! How are you today?",
    "give me a question": "Here's one: What is your favorite hobby?",
    "ask me something": "What is your favorite color?",
    "please tell me your name": "My name is ChatBot.",
    "introduce yourself": "I'm ChatBot, a simple Python chatbot.",
    "please tell me about yourself": "I'm a rule-based chatbot designed for simple conversations.",
    "tell me what you can do": "I can answer basic questions and chat with you.",
    "tell me what you cannot do": "I cannot physically perform real-world actions.",
    "help me": "Sure! Tell me what you need help with.",
    "help me please": "Of course! What do you need help with?",
    "please help me": "Sure! I'll try to help you.",
    "can you help": "Yes, I'll try my best.",
    "i need your help": "I'm here to help. Tell me more.",
    "can you answer this": "Yes, ask me your question.",
    "answer me": "Sure! Please ask your question.",
    "give me an answer": "Of course! What would you like to know?",
    "explain this": "Sure! Please tell me what you want explained.",
    "explain something": "Sure! Tell me the topic.",
    "repeat your answer": "Sure! I'll repeat my answer.",
    "repeat that": "No problem. I'll repeat it.",
    "say it again": "Sure! I'll say it again.",
    "speak slowly": "I'll keep the response simple and clear.",
    "keep it simple": "Sure! I'll use simple words.",
    "give me a short answer": "Sure! I'll keep my answer short.",
    "give me a long answer": "I'll provide more details when possible.",
    "can you explain simply": "Yes! I'll explain it in simple words.",
    "can you give an example": "Yes, I can give a simple example.",
    "give me an example": "Sure! Tell me the topic first.",
    "can you repeat the question": "Yes, I'll repeat it for you.",
    "what should i do": "Tell me what you're trying to do, and I'll suggest something.",
    "what can i do": "You can ask me a basic question or start a conversation.",
    "what should i ask you": "You can ask about my name, purpose, or abilities.",
    "give me something to ask": "You can ask: What can you do?",
    "are you real": "I'm a computer program, not a human.",
    "are you a real person": "No, I'm a chatbot.",
    "are you alive": "No, I'm software.",
    "do you have a body": "No, I don't have a physical body.",
    "do you have a face": "No, I don't have a physical face.",
    "do you have eyes": "No, I don't have physical eyes.",
    "do you have ears": "No, I don't have physical ears.",
    "do you have a brain": "I don't have a human brain.",
    "do you have a heart": "I don't have a physical heart.",
    "do you have hands": "No, I don't have physical hands.",
    "can you see me": "No, I cannot physically see you.",
    "can you hear me": "I can process the messages you send.",
    "can you touch things": "No, I don't have a physical body.",
    "can you smell": "No, I don't have a sense of smell.",
    "can you taste food": "No, I cannot taste food.",
    "can you feel pain": "No, I don't experience physical pain.",
    "can you feel emotions": "No, I don't experience human emotions.",
    "can you think like a human": "No, I don't think exactly like a human.",
    "do you have a mind": "I don't have a human mind.",
    "do you have emotions": "No, I don't experience human emotions.",
    "do you know everything in the world": "No, I don't know everything.",
    "do you ever make mistakes": "Yes, I can sometimes make mistakes.",
    "can you be wrong": "Yes, my responses can sometimes be incorrect.",
    "do you always tell the truth": "I try to provide accurate information, but I can make mistakes.",
    "can i ask anything": "You can ask me questions that I can handle.",
    "do you answer everyone": "I respond to users when I'm available.",
    "do you talk to many people": "A chatbot can interact with many users.",
    "can you talk to two people": "A chatbot system can handle multiple conversations.",
    "do you know other users": "I don't personally know users.",
    "do you know my name": "I only know your name if you tell me.",
    "can you remember my name": "If the chatbot stores it during the conversation, it can use it later.",
    "can you remember our chat": "This basic chatbot can keep information only if programmed to do so.",
    "do you remember everything i say": "No, not automatically.",
    "do you understand every language": "No, language support depends on how the chatbot is programmed.",
    "can you speak english": "Yes, I can respond in English.",
    "do you speak hindi": "Yes, I can respond in Hindi.",
    "can you speak hinglish": "Yes, I can handle simple Hinglish responses.",
    "can you talk in simple english": "Yes, I'll use simple English.",
    "can you talk in hindi": "Haan, main Hindi mein baat kar sakta hoon.",
    "can you understand hinglish": "Haan, main simple Hinglish samajhne ki koshish kar sakta hoon.",
    "what is your name again": "My name is ChatBot.",
    "who are you again": "I'm a simple rule-based chatbot.",
    "what can you do again": "I can answer basic questions and chat with you.",
    "are you still there": "Yes, I'm still here!",
    "are you listening": "Yes, I'm processing your message.",
    "can we continue": "Yes! Let's continue chatting.",
    "can i talk again": "Of course!",
    "are you ready to talk": "Yes! I'm ready.",
    "shall we chat": "Sure! Let's chat.",
    "can we start": "Yes! Let's start.",
    "lets start": "Great! Let's begin.",
    "start": "Hello! How can I help you?",
    "hello again": "Hello again! 👋",
    "hi again": "Hi again! How are you?",
    "good to see you": "Good to chat with you too!",
    "nice talking to you": "Nice talking to you too!",
    "i am back": "Welcome back!",
    "im back again": "Welcome back! Let's continue.",
    "do you remember me": "I can use information available in the current conversation.",
    "what did we talk about": "We talked about our conversation and basic questions.",
    "welcome": "Welcome! It's nice to have you here.",
    "hello there": "Hello there! 👋",
    "hi there": "Hi there! How can I help?",
    "hey there": "Hey there! Nice to see you.",
    "good morning chatbot": "Good morning! Have a wonderful day.",
    "good afternoon chatbot": "Good afternoon! How can I help you?",
    "good evening chatbot": "Good evening! Nice to chat with you.",
    "good night chatbot": "Good night! Sleep well.",
    "have a good day chatbot": "Thank you! You have a good day too.",
    "have a nice day chatbot": "Thank you! Have a nice day too.",
    "have a great day": "Thank you! Have a great day too.",
    "have a wonderful day": "Thank you! Have a wonderful day too.",
    "take care of yourself": "Thank you! You take care too.",
    "good luck": "Thank you! Good luck to you too.",
    "wish me luck": "Good luck! I hope everything goes well.",
    "wish me success": "I wish you success in your efforts!",
    "say good morning": "Good morning! ☀️",
    "say good evening": "Good evening! 🌆",
    "say good night": "Good night! 🌙",
    "say goodbye to me": "Goodbye! Take care! 👋",
    "can you talk with me": "Yes! I'm happy to chat with you.",
    "can you chat with me": "Of course! Let's chat.",
    "do you want to talk with me": "I'm ready to have a conversation.",
    "can i talk with you": "Yes! Go ahead.",
    "can i chat with you": "Of course!",
    "are you ready to chat": "Yes! I'm ready.",
    "shall we talk": "Sure! What would you like to talk about?",
    "shall we start": "Yes! Let's start.",
    "what can we talk about": "We can talk about simple everyday topics.",
    "tell me about yourself again": "I'm ChatBot, a simple rule-based chatbot.",
    "what is your purpose again": "My purpose is to chat and answer basic questions.",
    "why are you here today": "I'm here to chat and help you.",
    "what is your primary purpose": "My main purpose is to chat and answer basic questions.",
    "what is your role": "My role is to provide simple chatbot responses.",
    "what is your work": "My work is to respond to user messages.",
    "what is your function": "My function is to match questions with predefined responses.",
    "what can i ask": "You can ask me basic questions about the chatbot.",
    "what questions can i ask": "You can ask questions about my name, purpose, abilities, and simple conversation.",
    "how can i use you": "Simply type a supported question and I'll respond.",
    "how should i talk to you": "Just type your question or message.",
    "can i come back later": "Of course! Come back whenever you want to chat.",
    "can we talk tomorrow": "Sure! You can start a new conversation whenever you're ready.",
    "will you be here later": "You can chat with me whenever the service is available.",
    "i am back now": "Welcome back!",
    "i will talk to you later": "Sure! I'll be here when you return.",
    "i have to go now": "Okay! Take care.",
    "i am leaving now": "Goodbye! Have a nice day.",
    "i need to leave now": "No problem. See you later!",
    "end conversation": "Okay! Ending our conversation. Goodbye!",
    "please end chat": "Okay! Ending our chat. Goodbye!",
    "stop chat": "Okay! Goodbye and take care.",
    "please stop chatting": "Okay! Goodbye and take care.",
    "bye for now": "Bye for now! Take care and see you later! 👋",
    "talk later": "Sure! Talk to you later.",
    "see you tomorrow": "See you tomorrow! Take care.",
    "see you next time": "See you next time! 👋",
    "bye until next time": "Until next time!",
    "goodbye for now": "Goodbye for now! Take care.",
    "thanks for chatting": "You're welcome! I enjoyed our conversation.",
    "thank you for talking": "You're welcome! It was nice chatting with you."
};

const INTENT_RESPONSES = {
    // 1. Identity / Self-Introduction (Who are you? / Tell me about yourself)
    "WHO_ARE_YOU": {
        "en": "I am OmniVoice AI, a smart multilingual and voice-enabled chatbot assistant! I can chat with you, answer your questions, and speak in multiple languages.",
        "hi": "मैं OmniVoice AI हूँ, एक स्मार्ट बहुभाषी और वॉयस-सक्षम चैटबॉट सहायक! मैं आपसे बातचीत कर सकता हूँ और आपके प्रश्नों के उत्तर दे सकता हूँ।",
        "bho": "हम OmniVoice AI हईं, एगो स्मार्ट बहुभाषी आ आवाज वाला चैटबॉट सहायक! हम रउआ से बात कर सकीलें आ राउर सवालन के जवाब दे सकीलें।",
        "hinglish": "Main OmniVoice AI hoon, ek smart multilingual aur voice-enabled chatbot assistant! Main aapse chat kar sakta hoon aur questions ke answers de sakta hoon.",
        "bn": "আমি OmniVoice AI, একটি বুদ্ধিমান বহুভাষিক এবং ভয়েস-সক্ষম চ্যাটবট সহকারী!",
        "te": "నేను OmniVoice AI, స్మార్ట్ బహుభాషా మరియు వాయిస్-ఎనేబుల్డ్ చాట్‌బాట్ అసిస్టెంట్‌ని!",
        "mr": "मी OmniVoice AI आहे, एक स्मार्ट बहुभाषिक आणि व्हॉइस-सक्षम चॅटबॉट सहाय्यक!",
        "ta": "நான் OmniVoice AI, ஒரு ஸ்மார்ட் பன்மொழி மற்றும் குரல்-செயல்படுத்தப்பட்ட சாட்பாட் உதவியாளர்!",
        "gu": "હું OmniVoice AI છું, એક સ્માર્ટ બહુભાષી અને વૉઇસ-સક્ષમ ચેટબોટ સહાયક!",
        "kn": "ನಾನು OmniVoice AI, ಸ್ಮಾರ್ಟ್ ಬಹುಭಾಷಾ ಮತ್ತು ಧ್ವನಿ-ಸಕ್ರಿಯಗೊಳಿಸಿದ ಚಾಟ್‌ಬಾಟ್ ಸಹಾಯಕ!",
        "ml": "ഞാൻ OmniVoice AI ആണ്, ഒരു സ്മാർട്ട് ബഹുഭാഷാ വോയ്‌സ് ചാറ്റ്‌ബോട്ട് അസിസ്റ്റന്റ്!",
        "pa": "ਮੈਂ OmniVoice AI ਹਾਂ, ਇੱਕ ਸਮਾਰਟ ਬਹੁਭਾਸ਼ਾਈ ਅਤੇ ਵੌਇਸ-ਸਮਰਥਿਤ ਚੈਟਬੋਟ ਸਹਾਇਕ!",
        "ur": "میں OmniVoice AI ہوں، ایک سمارٹ کثیر لسانی اور وائس فعال چیٹ بوٹ اسسٹنٹ!",
        "es": "¡Soy OmniVoice AI, un asistente conversacional inteligente, multilingüe y habilitado por voz!",
        "fr": "Je suis OmniVoice AI, un assistant chatbot intelligent, multilingue et à commande vocale !",
        "de": "Ich bin OmniVoice AI, ein intelligenter, mehrsprachiger und sprachgesteuerter Chatbot-Assistent!",
        "pt": "Eu sou o OmniVoice AI, um assistente chatbot inteligente, multilíngue e habilitado por voz!",
        "it": "Sono OmniVoice AI, un assistente chatbot intelligente, multilingue e abilitato alla voce!",
        "ja": "私は OmniVoice AI です。多言語対応・音声対話ができるスマートなAIチャットボットアシスタントです！",
        "ko": "저는 OmniVoice AI입니다. 음성 대화와 다국어를 지원하는 스마트 챗봇 비서입니다!",
        "zh": "我是 OmniVoice AI，一个支持语音交互与多语言的智能聊天机器人助手！",
        "ar": "أنا OmniVoice AI، مساعد محادثة ذكي متعدد اللغات ومزود بالصوت!",
        "ru": "Я OmniVoice AI — умный многоязычный голосовой чат-бот ассистент!"
    },

    // 2. Who am I?
    "WHO_AM_I": {
        "en": "You are my awesome friend and user chatting with me!",
        "hi": "आप मेरे प्रिय मित्र और प्रयोक्ता हैं जो मुझसे बातचीत कर रहे हैं!",
        "bho": "रउआ हमार बहुत बढ़िया दोस्त आ यूजर हईं जे हमरा से बात करत बानी!",
        "hinglish": "Aap mere awesome friend aur user hain jo mujhse chat kar rahe hain!",
        "bn": "আপনি আমার দারুণ বন্ধু এবং ব্যবহারকারী যিনি আমার সাথে কথা বলছেন!",
        "te": "మీరు నాతో మాట్లాడుతున్న నా ప్రియమైన మిత్రులు మరియు వినియోగదారు!",
        "mr": "तुम्ही माझे प्रिय मित्र आणि युझर आहात जे माझ्याशी संवाद साधत आहात!",
        "ta": "நீங்கள் என்னுடன் உரையாடும் எனது அருமையான நண்பர் மற்றும் பயனர்!",
        "gu": "તમે મારા અદ્ભુત મિત્ર અને યૂઝર છો જે મારી સાથે ચેટ કરી રહ્યા છો!",
        "kn": "ನೀವು ನನ್ನೊಂದಿಗೆ ಚಾಟ್ ಮಾಡುತ್ತಿರುವ ಅದ್ಭುತ ಸ್ನೇಹಿತ ಮತ್ತು ಬಳಕೆದಾರ!",
        "ml": "നിങ്ങൾ എന്നോട് സംസാരിക്കുന്ന എന്റെ പ്രിയപ്പെട്ട സുഹൃത്തും ഉപയോക്താവുമാണ്!",
        "pa": "ਤੁਸੀਂ ਮੇਰੇ ਬਹੁਤ ਹੀ ਖਾਸ ਦੋਸਤ ਅਤੇ ਯੂਜ਼ਰ ਹੋ ਜੋ ਮੇਰੇ ਨਾਲ ਗੱਲ ਕਰ ਰਹੇ ਹੋ!",
        "ur": "آپ میرے شاندار دوست اور صارف ہیں جو مجھ سے بات کر رہے ہیں!",
        "es": "¡Eres mi fantástico amigo y usuario que está chateando conmigo!",
        "fr": "Vous êtes mon formidable ami et utilisateur qui discute avec moi !",
        "de": "Sie sind mein geschätzter Freund und Nutzer, der sich mit mir unterhält!",
        "pt": "Você é meu incrível amigo e usuário que está conversando comigo!",
        "it": "Sei il mio fantastico amico e utente che sta chattando con me!",
        "ja": "あなたはいま私とお話ししている素敵なお友達・ユーザー様です！",
        "ko": "당신은 지금 저와 즐겁게 대화하고 있는 소중한 친구이자 사용자입니다!",
        "zh": "您是正在与我愉快交流的朋友与用户！",
        "ar": "أنت صديقي الرائع والمستخدم الذي يتحدث معي الآن!",
        "ru": "Вы — мой замечательный друг и пользователь, который общается со мной!"
    },

    // 3. Name (What is your name?)
    "NAME": {
        "en": "My name is OmniVoice AI! You can call me Omni. 😊",
        "hi": "मेरा नाम OmniVoice AI है! आप मुझे Omni कह सकते हैं। 😊",
        "bho": "हमार नाम OmniVoice AI बा! रउआ हमरा के Omni कह सकीलें। 😊",
        "hinglish": "Mera naam OmniVoice AI hai! Aap mujhe Omni keh sakte hain. 😊",
        "bn": "আমার নাম OmniVoice AI! আপনি আমাকে Omni বলতে পারেন। 😊",
        "te": "నా పేరు OmniVoice AI! మీరు నన్ను Omni అని పిలవవచ్చు. 😊",
        "mr": "माझे नाव OmniVoice AI आहे! आपण मला Omni म्हणू शकता. 😊",
        "ta": "எனது பெயர் OmniVoice AI! நீங்கள் என்னை Omni என்று அழைக்கலாம். 😊",
        "gu": "મારું નામ OmniVoice AI છે! તમે મને Omni કહી શકો છો. 😊",
        "kn": "ನನ್ನ ಹೆಸರು OmniVoice AI! ನೀವು ನನ್ನನ್ನು Omni ಎಂದು ಕರೆಯಬಹುದು. 😊",
        "ml": "എന്റെ പേര് OmniVoice AI എന്നാണ്! നിങ്ങൾക്ക് എന്നെ Omni എന്ന് വിളിക്കാം. 😊",
        "pa": "ਮੇਰਾ ਨਾਮ OmniVoice AI ਹੈ! ਤੁਸੀਂ ਮੈਨੂੰ Omni ਕਹਿ ਸਕਦੇ ਹੋ। 😊",
        "ur": "میرا نام OmniVoice AI ہے! آپ مجھے Omni کہہ سکتے ہیں۔ 😊",
        "es": "¡Mi nombre es OmniVoice AI! Puedes llamarme Omni. 😊",
        "fr": "Je m'appelle OmniVoice AI ! Vous pouvez m'appeler Omni. 😊",
        "de": "Mein Name ist OmniVoice AI! Sie können mich einfach Omni nennen. 😊",
        "pt": "Meu nome é OmniVoice AI! Pode me chamar de Omni. 😊",
        "it": "Mi chiamo OmniVoice AI! Puoi chiamarmi Omni. 😊",
        "ja": "私の名前は OmniVoice AI です！オムニと呼んでくださいね。 😊",
        "ko": "제 이름은 OmniVoice AI입니다! 옴니라고 불러주세요. 😊",
        "zh": "我的名字是 OmniVoice AI！您可以叫我 Omni。 😊",
        "ar": "اسمي OmniVoice AI! يمكنك مناداتي Omni. 😊",
        "ru": "Меня зовут OmniVoice AI! Можете называть меня просто Омни. 😊"
    },

    // 4. Creator
    "CREATOR": {
        "en": "I was built using modern Python and Web Technologies to be an intelligent voice chatbot assistant!",
        "hi": "मुझे Python और आधुनिक वेब तकनीकों का उपयोग करके एक संवादात्मक वॉयस सहायक के रूप में बनाया गया है!",
        "bho": "हमरा के Python आ आधुनिक वेब तकनीक से बनावल गइल बा!",
        "hinglish": "Mujhe Python aur modern web technologies se banaya gaya hai!",
        "bn": "আমাকে পাইথন এবং আধুনিক ওয়েব প্রযুক্তি দিয়ে তৈরি করা হয়েছে!",
        "te": "నన్ను పైథాన్ మరియు ఆధునిక వెబ్ టెక్నాలజీలతో రూపొందించారు!",
        "mr": "मला पायथन आणि आधुनिक वेब तंत्रज्ञान वापरून तयार केले गेले आहे!",
        "ta": "நான் பைதான் மற்றும் நவீன இணைய தொழில்நுட்பங்களால் உருவாக்கப்பட்டேன்!",
        "gu": "મને પાયથન અને આધુનિક વેબ ટેક્નોલોજી વડે બનાવવામાં આવ્યો છે!",
        "kn": "ನನ್ನನ್ನು ಪೈಥಾನ್ ಮತ್ತು ವೆಬ್ ತಂತ್ರಜ್ಞಾನ ಬಳಸಿ ಅಭಿವೃದ್ಧಿಪಡಿಸಲಾಗಿದೆ!",
        "ml": "പൈത്തണും വെബ് സാങ്കേതികവിദ്യകളും ഉപയോഗിച്ചാണ് എന്നെ നിർമ്മിച്ചിരിക്കുന്നത്!",
        "pa": "ਮੈਨੂੰ ਪਾਈਥਨ ਅਤੇ ਵੈੱਬ ਤਕਨੀਕਾਂ ਨਾਲ ਬਣਾਇਆ ਗਿਆ ਹੈ!",
        "ur": "مجھے پائتھن اور جدید ویب ٹیکنالوجیز کے ذریعے بنایا گیا ہے!",
        "es": "¡Fui creado con Python y tecnologías web modernas!",
        "fr": "J'ai été conçu avec Python et les technologies web modernes !",
        "de": "Ich wurde mit Python und modernen Webtechnologien entwickelt!",
        "pt": "Fui desenvolvido com Python e tecnologias web modernas!",
        "it": "Sono stato creato con Python e moderne tecnologie web!",
        "ja": "私はPythonと最新のWeb技術を活用して開発されました！",
        "ko": "저는 파이썬과 최신 웹 기술을 기반으로 개발되었습니다!",
        "zh": "我是基于 Python 和现代 Web 技术构建的！",
        "ar": "تم تطويري باستخدام بايثون وأحدث تقنيات الويب!",
        "ru": "Я создан на основе Python и современных веб-технологий!"
    },

    // 5. Thank you
    "THANK_YOU": {
        "en": "You're very welcome! Let me know if you need anything else! 😊",
        "hi": "आपका बहुत-बहुत स्वागत है! यदि कुछ और चाहिए तो बताएं! 😊",
        "bho": "रउआ के बहुत-बहुत धन्यवाद! राउर मदद क के बहुत नीक लागल। 😊",
        "hinglish": "You're most welcome! Kuch aur poochhna ho toh batayein! 😊",
        "bn": "আপনাকে অনেক ধন্যবাদ ও স্বাগতম! 😊",
        "te": "మీకు స్వాగతం! 😊",
        "mr": "आपले मनापासून स्वागत आहे! 😊",
        "ta": "மிக்க மகிழ்ச்சி! 😊",
        "gu": "તમારું સ્વાગત છે! 😊",
        "kn": "ನಿಮಗೆ ಸ್ವಾಗತ! 😊",
        "ml": "നിങ്ങൾക്ക് സ്വാഗതം! 😊",
        "pa": "ਤੁਹਾਡਾ ਬਹੁਤ-ਬਹੁਤ ਸੁਆਗਤ ਹੈ! 😊",
        "ur": "آپ کا بہت شکریہ اور خیر مقدم! 😊",
        "es": "¡De nada! ¡Dime si necesitas algo más! 😊",
        "fr": "Je vous en prie ! N'hésitez pas si vous avez d'autres questions ! 😊",
        "de": "Sehr gerne! Wenn Sie noch etwas brauchen, fragen Sie einfach! 😊",
        "pt": "De nada! Se precisar de mais alguma coisa, é só chamar! 😊",
        "it": "Prego, non c'è di che! 😊",
        "ja": "どういたしまして！他に気になることがあれば何でも聞いてくださいね。 😊",
        "ko": "천만에요! 또 궁금한 점이 있으시면 언제든 말씀해주세요! 😊",
        "zh": "不客气！如果您还有其他问题，请随时告诉我！ 😊",
        "ar": "على الرحب والسعة! يسعدني دائماً مساعدتك! 😊",
        "ru": "Пожалуйста! Всегда рад помочь! 😊"
    },

    // 6. Direct Fallback: "I don't know the answer to this."
    "FALLBACK": {
        "en": "I don't know the answer to this.",
        "hi": "मुझे इसका जवाब नहीं पता है।",
        "bho": "हमरा एकर जवाब नइखे मालूम।",
        "hinglish": "Mujhe iska jawab nahi pata.",
        "bn": "আমি এর উত্তর জানি না।",
        "te": "నాకు దీని సమాధానం తెలియదు.",
        "mr": "मला याचे उत्तर माहीत नाही.",
        "ta": "எனக்கு இதற்கு பதில் தெரியவில்லை.",
        "gu": "મને આનો જવાબ ખબર નથી.",
        "kn": "ನನಗೆ ಇದಕ್ಕೆ ಉತ್ತರ ತಿಳಿದಿಲ್ಲ.",
        "ml": "എനിക്ക് ഇതിന് ഉത്തരം അറിയില്ല.",
        "pa": "ਮੈਨੂੰ ਇਸ ਦਾ ਜਵਾਬ ਨਹੀਂ ਪਤਾ।",
        "ur": "مجھے اس کا جواب نہیں معلوم۔",
        "es": "No sé la respuesta a esto.",
        "fr": "Je ne connais pas la réponse à cela.",
        "de": "Ich kenne die Antwort darauf nicht.",
        "pt": "Não sei a resposta para isso.",
        "it": "Non conosco la risposta a questa domanda.",
        "ja": "これに対する答えはわかりません。",
        "ko": "이에 대한 답변을 잘 모르겠습니다.",
        "zh": "我不知道这个问题的答案。",
        "ar": "لا أعرف الإجابة على هذا السؤال.",
        "ru": "Я не знаю ответа на этот вопрос."
    },

    // 7. General Greetings
    "GREETING": {
        "en": "Hello! How can I help you today?",
        "hi": "नमस्ते! मैं आपकी क्या सहायता कर सकता हूँ?",
        "bho": "प्रणाम! राउर का हाल बा? हम रउआ के का मदद कर सकीं?",
        "hinglish": "Hello! Main aapki kya help kar sakta hoon?",
        "bn": "নমস্কার! আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
        "te": "నమస్కారం! నేను మీకు ఎలా సహాయపడగలను?",
        "mr": "नमस्कार! मी तुम्हाला कशी मदत करू शकतो?",
        "ta": "வணக்கம்! நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?",
        "gu": "નમસ્તે! હું તમને કેવી રીતે મદદ કરી શકું?",
        "kn": "ನಮಸ್ಕಾರ! ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?",
        "ml": "നമസ്കാരം! എനിക്ക് നിങ്ങളെ എങ്ങനെ സഹായിക്കാനാകും?",
        "pa": "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡੀ ਕੀ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?",
        "ur": "السلام علیکم! میں آپ کی کیا مدد کر سکتا ہوں؟",
        "es": "¡Hola! ¿Cómo puedo ayudarte hoy?",
        "fr": "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
        "de": "Hallo! Wie kann ich Ihnen heute helfen?",
        "pt": "Olá! Como posso ajudar você hoje?",
        "it": "Ciao! Come posso aiutarti oggi?",
        "ja": "こんにちは！本日はどのようなご用件でしょうか？",
        "ko": "안녕하세요! 무엇을 도와드릴까요?",
        "zh": "您好！今天我能为您提供什么帮助？",
        "ar": "مرحباً! كيف يمكنني مساعدتك اليوم؟",
        "ru": "Здравствуйте! Чем я могу вам помочь сегодня?"
    },

    "HOW_ARE_YOU": {
        "en": "I'm doing great, thank you! How are you doing?",
        "hi": "मैं बिल्कुल ठीक हूँ, धन्यवाद! आप कैसे हैं?",
        "bho": "हम एकदम ठीक बानी, धन्यवाद! रउआ बताईं राउर का हाल बा?",
        "hinglish": "Main badhiya hoon, thank you! Aap bataiye aap kaise hain?",
        "bn": "আমি খুব ভালো আছি, ধন্যবাদ! আপনি কেমন আছেন?",
        "te": "నేను చాలా బాగున్నాను, ధన్యవాదాలు! మీరు ఎలా ఉన్నారు?",
        "mr": "मी अगदी मजेत आहे, धन्यवाद! आपण कसे आहात?",
        "ta": "நான் நன்றாக இருக்கிறேன், நன்றி! நீங்கள் எப்படி இருக்கிறீர்கள்?",
        "gu": "હું મજામાં છું, આભાર! તમે કેમ છો?",
        "kn": "ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ, ಧನ್ಯವಾದಗಳು! ನೀವು ಹೇಗಿದ್ದೀರಿ?",
        "ml": "ഞാൻ സുഖമായിരിക്കുന്നു, നന്ദി! നിങ്ങൾക്ക് സുഖമാണോ?",
        "pa": "ਮੈਂ ਬਹੁਤ ਵਧੀਆ ਹਾਂ, ਧੰਨਵਾਦ! ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?",
        "ur": "میں بالکل ٹھیک ہوں، شکریہ! آپ کیسے ہیں؟",
        "es": "¡Estoy genial, gracias! ¿Cómo estás tú?",
        "fr": "Je vais très bien, merci ! Et vous, comment allez-vous ?",
        "de": "Mir geht es blendend, danke! Wie geht es Ihnen?",
        "pt": "Estou ótimo, obrigado! Como você está?",
        "it": "Sto benissimo, grazie! Tu come stai?",
        "ja": "元気いっぱいです、ありがとうございます！お元気ですか？",
        "ko": "저는 아주 잘 지내고 있습니다, 감사합니다! 어떻게 지내시나요?",
        "zh": "我很好，谢谢！您今天过得怎么样？",
        "ar": "أنا بخير، شكراً لك! كيف حالك أنت؟",
        "ru": "У меня всё отлично, спасибо! Как ваши дела?"
    },

    "BYE": {
        "en": "Goodbye! Have a fantastic day! 👋",
        "hi": "अलविदा! आपका दिन शुभ हो! 👋",
        "bho": "प्रणाम! फेर मिलल जाई, राउर दिन शुभ होखे! 👋",
        "hinglish": "Goodbye! Aapka din shubh rahe! 👋",
        "bn": "বিদায়! আপনার দিনটি শুভ হোক! 👋",
        "te": "సెలవు! మీ రోజు శుభప్రదంగా ఉండాలని కోరుకుంటున్నాను! 👋",
        "mr": "निरोप! तुमचा दिवस आनंदात जावो! 👋",
        "ta": "விடைபெறுகிறேன்! உங்கள் நாள் இனிதாக அமையட்டும்! 👋",
        "gu": "આવજો! તમારો દિવસ શુભ રહે! 👋",
        "kn": "ವಿದಾಯ! ನಿಮ್ಮ ದಿನವು ಅದ್ಭುತವಾಗಿರಲಿ! 👋",
        "ml": "വിട! നിങ്ങളുടെ ദിവസം ശുഭകരമാകട്ടെ! 👋",
        "pa": "ਅਲਵਿਦਾ! ਤੁਹਾਡਾ ਦਿਨ ਵਧੀਆ ਰਹੇ! 👋",
        "ur": "خدا حافظ! آپ کا دن اچھا گزرے! 👋",
        "es": "¡Adiós! ¡Que tengas un excelente día! 👋",
        "fr": "Au revoir ! Passez une excellente journée ! 👋",
        "de": "Auf Wiedersehen! Einen wundervollen Tag! 👋",
        "pt": "Adeus! Tenha um ótimo dia! 👋",
        "it": "Arrivederci! Buona giornata! 👋",
        "ja": "さようなら！素晴らしい一日をお過ごしください！ 👋",
        "ko": "안녕히 가세요! 좋은 하루 보내세요! 👋",
        "zh": "再见！祝您度过愉快的一天！ 👋",
        "ar": "مع السلامة! أتمنى لك يوماً رائعاً! 👋",
        "ru": "До свидания! Отличного вам дня! 👋"
    },

    // Technical Concepts (Answered only when asked)
    "ARRAY": {
        "en": "An Array is a linear data structure that stores a collection of elements of the same type at contiguous memory locations with O(1) index access.",
        "hi": "Array (सरणी) एक लीनियर डेटा स्ट्रक्चर है जो मेमोरी के निरंतर स्थानों पर समान डेटा प्रकार के तत्वों को संग्रहीत करता है।",
        "bho": "Array एगो अइसन डेटा स्ट्रक्चर हवे जे मेमोरी में एकही तरह के डेटा के लगातार सुरक्षित राखेला।",
        "hinglish": "Array ek linear data structure hai jo same type ke elements ko continuous memory locations me store karta hai.",
        "bn": "Array হলো একটি রৈখিক ডেটা স্ট্রাকচার যা সংলগ্ন মেমরি অবস্থানে একই ধরণের উপাদান সংরক্ষণ করে।",
        "te": "Array అనేది ఒకే రకమైన డేటా ఎలిమెంట్లను వరుస మెమరీ స్థానాల్లో నిల్వ చేసే లీనియర్ డేటా స్ట్రక్చర్.",
        "mr": "Array ही एक लिनिअर डेटा रचना आहे जी एकाच प्रकारच्या घटकांना सलग मेमरी स्थानांमध्ये साठवते.",
        "ta": "Array என்பது ஒரே வகையான தரவு கூறுகளை தொடர்ச்சியான நினைவக இடங்களில் சேமிக்கும் அமைப்பாகும்.",
        "gu": "Array એ એક રેખીય ડેટા સ્ટ્રક્ચર છે જે સમાન પ્રકારના ડેટા તત્વોને સતત મેમરી સ્થાનો પર સંગ્રહિત કરે છે.",
        "kn": "Array ಎನ್ನುವುದು ಒಂದೇ ರೀತಿಯ ಅಂಶಗಳನ್ನು ಸತತ ಮೆಮೊರಿ ಸ್ಥಳಗಳಲ್ಲಿ ಸಂಗ್ರಹಿಸುವ ಲೀನಿಯರ್ ಡೇಟಾ ರಚನೆಯಾಗಿದೆ.",
        "ml": "തുടർച്ചയായ മെമ്മറി ലൊക്കേഷനുകളിൽ ഒരേ തരത്തിലുള്ള ഘടകങ്ങൾ സംഭരിക്കുന്ന ഒരു ലീനിയർ ഡാറ്റാ ഘടനയാണ് Array.",
        "pa": "Array ਇੱਕ ਲੀਨੀਅਰ ਡਾਟਾ ਸਟ੍ਰਕਚਰ ਹੈ ਜੋ ਇੱਕੋ ਕਿਸਮ ਦੇ ਤੱਤਾਂ ਨੂੰ ਲਗਾਤਾਰ ਮੈਮੋਰੀ ਵਿੱਚ ਸਟੋਰ ਕਰਦਾ ਹੈ।",
        "ur": "Array ایک لکیری ڈیٹا سٹرکچر ہے جو مسلسل میموری میں عناصر کو محفوظ کرتا ہے۔",
        "es": "Un Array es una estructura de datos lineal que almacena elementos del mismo tipo en memoria contigua.",
        "fr": "Un tableau (Array) est une structure de données linéaire stockant des éléments de même type dans des emplacements mémoire contigus.",
        "de": "Ein Array ist eine lineare Datenstruktur, die Elemente desselben Datentyps an aufeinanderfolgenden Speicheradressen speichert.",
        "pt": "Um Array é uma estrutura de dados linear que armazena elementos do mesmo tipo em locais de memória contíguos.",
        "it": "Un Array è una struttura dati lineare che memorizza elementi dello stesso tipo in locazioni di memoria contigue.",
        "ja": "配列（Array）は、同じ型のデータを連続したメモリ領域に格納する線形データ構造です。",
        "ko": "배열(Array)은 동일한 타입의 데이터를 연속된 메모리 공간에 저장하는 선형 자료구조입니다.",
        "zh": "数组（Array）是一种在连续内存空间中存储相同类型元素的线性数据结构。",
        "ar": "المصفوفة (Array) هي بنية بيانات خطية تخزن عناصر من نفس النوع في مواقع ذاكرة متجاورة.",
        "ru": "Массив (Array) — это линейная структура данных, хранящая элементы одного типа в непрерывных ячейках памяти."
    },

    "DSA": {
        "en": "DSA (Data Structures and Algorithms) is the core foundation for organizing data efficiently and solving computational problems.",
        "hi": "DSA (डेटा स्ट्रक्चर्स और एल्गोरिदम) कंप्यूटर साइंस की नींव है जो समस्याओं को कुशलता से हल करने के काम आती है।",
        "bho": "DSA (Data Structures & Algorithms) कंप्यूटर साइंस के जान हवे, जवना से सवालन के तेजी से हल कइल जाला।",
        "hinglish": "DSA ka full form Data Structures and Algorithms hai, jo problems ko efficiently solve karne ke liye zaroori hai.",
        "bn": "DSA হলো কম্পিউটার বিজ্ঞানের মূল ভিত্তি যা সমস্যা সমাধানে সাহায্য করে।",
        "te": "DSA అంటే Data Structures and Algorithms. ఇది సమస్యలను సమర్థవంతంగా పరిష్కరించడానికి పునాది.",
        "mr": "DSA (डेटा स्ट्रक्चर्स आणि अल्गोरिदम) हा संगणक शास्त्राचा पाया आहे.",
        "ta": "DSA என்பது சிக்கல்களை திறம்பட தீர்க்க உதவும் கணினி அறிவியலின் அடித்தளமாகும்.",
        "gu": "DSA કોમ્પ્યુટર સાયન્સનો પાયો છે જે સમસ્યાઓ ઉકેલવા માટે ઉપયોગી છે.",
        "kn": "DSA ಕಂಪ್ಯೂಟರ್ ವಿಜ್ಞಾನದ ಮೂಲಾಧಾರವಾಗಿದೆ.",
        "ml": "കാര്യക്ഷമമായി പ്രശ്നങ്ങൾ പരിഹരിക്കാൻ സഹായിക്കുന്നതാണ് DSA.",
        "pa": "DSA ਕੰਪਿਊਟਰ ਸਾਇੰਸ ਦੀ ਬੁਨਿਆਦ ਹੈ।",
        "ur": "ڈی ایس اے (DSA) کمپیوٹر سائنس کی بنیادی اساس ہے۔",
        "es": "DSA es la base informática para organizar datos y resolver problemas eficientemente.",
        "fr": "DSA constitue le socle de l'informatique pour organiser les données et résoudre les problèmes.",
        "de": "DSA ist das Fundament zur effizienten Speicherung von Daten und logischen Problemlösung.",
        "pt": "DSA é a base da computação para armazenar dados e resolver problemas de forma eficiente.",
        "it": "DSA è il pilastro per organizzare dati e risolvere problemi in modo ottimizzato.",
        "ja": "DSAはデータを効率的に管理し問題を論理的に解決するための基礎技術です。",
        "ko": "DSA는 데이터를 효율적으로 저장하고 문제를 체계적으로 해결하는 핵심 분야입니다.",
        "zh": "DSA 是高效组织数据并解决计算问题的核心基础。",
        "ar": "DSA هي الأساس لتنظيم البيانات وحل المشكلات بكفاءة عالية.",
        "ru": "DSA — это фундамент для эффективного хранения данных и решения сложных задач."
    },

    "PYTHON": {
        "en": "Python is a high-level, versatile programming language famous for its clean readability and vast power in AI and software development.",
        "hi": "Python एक लोकप्रिय और आसान प्रोग्रामिंग लैंग्वेज है जो AI, डेटा साइंस और वेब डेवलपमेंट में उपयोग की जाती है।",
        "bho": "Python एगो बहुत आसान आ पॉपुलर प्रोग्रामिंग भाषा हवे जेकरा से AI आ वेबसाइट बनावल जाला।",
        "hinglish": "Python ek powerful aur easy programming language hai jo AI aur Web Dev me bahut use hoti hai.",
        "bn": "Python একটি জনপ্রিয় প্রোগ্রামিং ভাষা যা সহজে শেখা যায়।",
        "te": "Python అనేది అత్యంత ప్రజాదరణ పొందిన సులభమైన ప్రోగ్రామింగ్ భాష.",
        "mr": "Python ही एक सोपी आणि शक्तिशाली प्रोग्रामिंग भाषा आहे.",
        "ta": "Python என்பது எளிதில் படிக்கக்கூடிய சக்திவாய்ந்த நிரலாக்க மொழியாகும்.",
        "gu": "Python એક લોકપ્રિય અને સરળ પ્રોગ્રામિંગ ભાષા છે.",
        "kn": "Python ಸುಲಭವಾಗಿ ಕಲಿಯಬಹುದಾದ ಪ್ರೋಗ್ರಾಮಿಂಗ್ ಭಾಷೆಯಾಗಿದೆ.",
        "ml": "വളരെ ലളിതമായ പ്രോഗ്രാമിംഗ് ഭാഷയാണ് Python.",
        "pa": "Python ਇੱਕ ਬਹੁਤ ਹੀ ਸਰਲ ਅਤੇ ਸ਼ਕਤੀਸ਼ਾਲੀ ਪ੍ਰੋਗਰਾਮਿੰਗ ਭਾਸ਼ਾ ਹੈ।",
        "ur": "پائتھن (Python) ایک آسان اور طاقتور پروگرامنگ زبان ہے۔",
        "es": "Python es un lenguaje de programación versátil y de alto nivel muy popular en Inteligencia Artificial.",
        "fr": "Python est un langage de programmation de haut niveau, réputé pour sa simplicité et utilisé en IA.",
        "de": "Python ist eine interpretierte Programmiersprache, bekannt für klare Syntax und breite Anwendung in KI.",
        "pt": "Python é uma linguagem de programação de alto nível conhecida pela facilidade de leitura e força em IA.",
        "it": "Python è un linguaggio di programmazione celebre per la sintassi pulita e l'uso nell'Intelligenza Artificiale.",
        "ja": "Pythonは、コードの読みやすさとシンプルな文法が特徴の高水準プログラミング言語です。",
        "ko": "파이썬(Python)은 배우기 쉽고 가독성이 뛰어난 고급 프로그래밍 언어입니다.",
        "zh": "Python 是一种简洁、功能强大的高级编程语言，在人工智能等领域应用广泛。",
        "ar": "بايثون (Python) هي لغة برمجة عالية المستوى وسهلة التعلم ومستخدمة في الذكاء الاصطناعي.",
        "ru": "Python — это высокоуровневый язык программирования с чистым синтаксисом, лидер в ИИ."
    },

    "LOOP": {
        "en": "A Loop repeats a block of code multiple times as long as a condition is met (e.g. for loops and while loops).",
        "hi": "Loop कोड को बार-बार तब तक दोहराता है जब तक कि दी गई शर्त सत्य (true) रहे।",
        "bho": "Loop कोड के तबले बार-बार चलावेला जबले शर्त सही (true) रहेला।",
        "hinglish": "Loop ek statement hai jo code block ko repeatedly chalata hai jab tak condition true rahe.",
        "bn": "Loop নির্দিষ্ট শর্ত পূরণ না হওয়া পর্যন্ত কোড বারবার চালায়।",
        "te": "Loop అనేది ఒక నిర్దిష్ట కండిషన్ నిజమయ్యే వరకు కోడ్‌ను పదేపదే రన్ చేస్తుంది.",
        "mr": "Loop हे अट खरी असेपर्यंत कोड पुन्हा चालवण्यासाठी वापरले जाते.",
        "ta": "Loop என்பது நிபந்தனை உண்மையாக இருக்கும் வரை குறியீட்டை மீண்டும் இயக்க பயன்படுகிறது.",
        "gu": "Loop શરત સાચી હોય ત્યાં સુધી કોડને વારંવાર ચલાવે છે.",
        "kn": "Loop ಷರತ್ತು ಸತ್ಯವಾಗಿರುವವರೆಗೆ ಕೋಡ್ ಅನ್ನು ಪುನರಾವರ್ತಿಸುತ್ತದೆ.",
        "ml": "കണ്ടീഷൻ ശരിയാകുന്നതുവരെ ഒരേ കോഡ് വീണ്ടും പ്രവർത്തിപ്പിക്കാൻ Loop സഹായിക്കുന്നു.",
        "pa": "Loop ਕੋਡ ਨੂੰ ਵਾਰ-ਵਾਰ ਚਲਾਉਣ ਲਈ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ।",
        "ur": "لوپ کسی کوڈ کو بار بار دہرانے کے لیے استعمال ہوتا ہے۔",
        "es": "Un bucle repite un bloque de código mientras se cumpla una condición determinada.",
        "fr": "Une boucle permet de répéter un bloc d'instructions tant qu'une condition reste vraie.",
        "de": "Eine Schleife wiederholt einen Codeblock solange, wie eine Bedingung erfüllt ist.",
        "pt": "Um loop executa um bloco de código repetidamente enquanto uma condição for verdadeira.",
        "it": "Un ciclo ripete un blocco di codice finché una condizione è vera.",
        "ja": "ループは、指定された条件が満たされている間、処理を繰り返し実行する構文です。",
        "ko": "반복문은 특정 조건이 참인 동안 코드 블록을 계속해서 반복 실행합니다.",
        "zh": "循环在满足指定条件期间会重复执行代码块。",
        "ar": "التكرار هو أداة برمجية لتكرار تنفيذ جزء من الكود طالما أن الشرط يتحقق.",
        "ru": "Цикл многократно выполняет блок кода, пока истинно заданное условие."
    },

    "JOKE": {
        "en": "Why do programmers prefer dark mode? Because light attracts bugs! 😄",
        "hi": "प्रोग्रामर्स को डार्क मोड क्यों पसंद है? क्योंकि रोशनी कीड़े (bugs) को आकर्षित करती है! 😄",
        "bho": "प्रोग्रामर लोग डार्क मोड काहे पसंद करेला? काहे कि रोशनी में बग (कीड़ा) भागेला! 😄",
        "hinglish": "Programmers dark mode kyu use karte hain? Kyunki light se bugs attract hote hain! 😄",
        "bn": "প্রোগ্রামাররা ডার্ক মোড কেন পছন্দ করে? কারণ আলো বাগ আকর্ষণ করে! 😄",
        "te": "ప్రోగ్రామర్లు డార్క్ మోడ్‌ను ఎందుకు ఇష్టపడతారు? ఎందుకంటే వెలుతురు బగ్‌లను ఆకర్షిస్తుంది! 😄",
        "mr": "प्रोग्रामर्सना डार्क मोड का आवडतो? कारण प्रकाशाकडे बग्स आकर्षित होतात! 😄",
        "ta": "புரோகிராமர்கள் ஏன் டார்க் மோடை விரும்புகிறார்கள்? ஏனென்றால் வெளிச்சம் பிழைகளை ஈர்க்கிறது! 😄",
        "gu": "પ્રોગ્રામરોને ડાર્ક મોડ કેમ ગમે છે? કારણ કે પ્રકાશ બગ્સને આકર્ષે છે! 😄",
        "kn": "ಪ್ರೋಗ್ರಾಮರ್‌ಗಳು ಡಾರ್ಕ್ ಮೋಡ್ ಅನ್ನು ಏಕೆ ಇಷ್ಟಪಡುತ್ತಾರೆ? ಏಕೆಂದರೆ ಬೆಳಕು ಬಗ್‌ಗಳನ್ನು ಆಕರ್ಷಿಸುತ್ತದೆ! 😄",
        "ml": "പ്രോഗ്രാമർമാർ എന്തുകൊണ്ടാണ് ഡാർക്ക് മോഡ് ഇഷ്ടപ്പെടുന്നത്? കാരണം വെളിച്ചം ബഗുകളെ ആകർഷിക്കുന്നു! 😄",
        "pa": "ਪ੍ਰੋਗਰਾਮਰ ਡਾਰਕ ਮੋਡ ਕਿਉਂ ਪਸੰਦ ਕਰਦੇ ਹਨ? ਕਿਉਂਕਿ ਰੌਸ਼ਨੀ ਬੱਗਾਂ ਨੂੰ ਆਕਰਸ਼ਿਤ ਕਰਦੀ ਹੈ! 😄",
        "ur": "پروگرامرز ڈارک موڈ کیوں پسند کرتے ہیں؟ کیونکہ روشنی کیڑوں کو کھینچتی ہے! 😄",
        "es": "¿Por qué los programadores prefieren el modo oscuro? ¡Porque la luz atrae a los bichos (bugs)! 😄",
        "fr": "Pourquoi les développeurs préfèrent le mode sombre ? Parce que la lumière attire les bugs ! 😄",
        "de": "Warum bevorzugen Programmierer den Dark Mode? Weil Licht Bugs anzieht! 😄",
        "pt": "Por que programadores preferem o modo escuro? Porque a luz atrai bugs! 😄",
        "it": "Perché i programmatori preferiscono il tema scuro? Perché la luce attira i bug! 😄",
        "ja": "プログラマーがダークモードを好む理由は？ 光があるとバグが集まってくるからです！ 😄",
        "ko": "개발자들이 다크 모드를 선호하는 이유는 무엇일까요? 빛은 버그를 끌어들이기 때문입니다! 😄",
        "zh": "为什么程序员都喜欢深色模式？因为光明会招来 Bug！ 😄",
        "ar": "لماذا يفضل المبرمجون الوضع المظلم؟ لأن الضوء يجذب الأخطاء والحشرات! 😄",
        "ru": "Почему программисты любят тёмную тему? Потому что свет привлекает багов! 😄"
    },

    "HELP": {
        "en": "You can chat with me, ask who I am, ask questions, tell jokes, and talk in 23+ languages including Bhojpuri! 🎤",
        "hi": "आप मुझसे बातचीत कर सकते हैं, मेरा परिचय ले सकते हैं, प्रश्न पूछ सकते हैं और भोजपुरी सहित 23+ भाषाओं में बोल सकते हैं! 🎤",
        "bho": "रउआ हमरा से बात कर सकीलें, हमार नाम पूछ सकीलें, सवाल पूछ सकीलें आ भोजपुरी में भी बोल सकीलें! 🎤",
        "hinglish": "Aap mujhse baat kar sakte hain, intro le sakte hain, questions pooch sakte hain aur Bhojpuri samet 23+ languages me chat kar sakte hain! 🎤",
        "bn": "আপনি আমার সাথে কথা বলতে পারেন এবং ২৩টি ভাষায় আলোচনা করতে পারেন! 🎤",
        "te": "మీరు నాతో మాట్లాడవచ్చు మరియు 23+ భాషల్లో సమాధానాలు పొందవచ్చు! 🎤",
        "mr": "आपण माझ्याशी गप्पा मारू शकता आणि 23+ भाषांमध्ये बोलू शकता! 🎤",
        "ta": "நீங்கள் என்னுடன் உரையாடவும் 23+ மொழிகளில் பேசவும் முடியும்! 🎤",
        "gu": "તમે મારી સાથે વાતચીત કરી શકો છો અને 23+ ભાષાઓમાં બોલી શકો છો! 🎤",
        "kn": "ನೀವು ನನ್ನೊಂದಿಗೆ ಮಾತನಾಡಬಹುದು ಮತ್ತು 23+ ಭಾಷೆಗಳಲ್ಲಿ ಸಂವಹನ ನಡೆಸಬಹುದು! 🎤",
        "ml": "എനിക്ക് നിങ്ങളോട് സംസാരിക്കാനും 23+ ഭാഷകളിൽ പ്രതികരിക്കാനും കഴിയും! 🎤",
        "pa": "ਤੁਸੀਂ ਮੇਰੇ ਨਾਲ ਗੱਲਬਾਤ ਕਰ ਸਕਦੇ ਹੋ ਅਤੇ 23+ ਭਾਸ਼ਾਵਾਂ ਵਿੱਚ ਗੱਲ ਕਰ ਸਕਦੇ ਹੋ! 🎤",
        "ur": "آپ مجھ سے بات چیت کر سکتے ہیں اور 23+ زبانوں میں بول سکتے ہیں! 🎤",
        "es": "¡Puedes charlar conmigo, hacer preguntas y hablar en más de 23 idiomas! 🎤",
        "fr": "Vous pouvez discuter avec moi, poser des questions et parler dans plus de 23 langues ! 🎤",
        "de": "Sie können sich mit mir unterhalten und in über 23 Sprachen sprechen! 🎤",
        "pt": "Você pode conversar comigo e falar em mais de 23 idiomas! 🎤",
        "it": "Puoi chiacchierare con me e parlare in oltre 23 lingue! 🎤",
        "ja": "日常会話、自己紹介、23言語以上での音声対話が可能です！ 🎤",
        "ko": "일상 대화와 23개 이상의 언어로 음성 대화가 가능합니다! 🎤",
        "zh": "您可以与我自由交谈，并支持 23 种以上的语言！ 🎤",
        "ar": "يمكنك التحدث معي والتواصل بأكثر من 23 لغة! 🎤",
        "ru": "Вы можете общаться со мной и говорить на 23+ языках! 🎤"
    }
};

// Language Switch Command Dictionary
const LANGUAGE_SWITCH_MAP = {
    "english": "en", "angrezi": "en", "inglés": "es", "anglais": "fr", "englisch": "de",
    "hindi": "hi", "हिंदी": "hi", "हिन्दी": "hi",
    "bhojpuri": "bho", "भोजपुरी": "bho",
    "hinglish": "hinglish",
    "bengali": "bn", "bangla": "bn", "বাংলা": "bn",
    "telugu": "te", "తెలుగు": "te",
    "marathi": "mr", "मराठी": "mr",
    "tamil": "ta", "தமிழ்": "ta",
    "gujarati": "gu", "ગુજરાતી": "gu",
    "kannada": "kn", "ಕನ್ನಡ": "kn",
    "malayalam": "ml", "മലയാളം": "ml",
    "punjabi": "pa", "ਪੰਜਾਬੀ": "pa",
    "urdu": "ur", "اردو": "ur",
    "spanish": "es", "español": "es", "espanol": "es",
    "french": "fr", "français": "fr", "francais": "fr",
    "german": "de", "deutsch": "de",
    "portuguese": "pt", "português": "pt", "portugues": "pt",
    "italian": "it", "italiano": "it",
    "japanese": "ja", "日本語": "ja", "nihongo": "ja",
    "korean": "ko", "한국어": "ko", "hangul": "ko",
    "chinese": "zh", "中文": "zh", "mandarin": "zh",
    "arabic": "ar", "العربية": "ar",
    "russian": "ru", "русский": "ru"
};

/**
 * Detect script / language automatically from string
 */
function autoDetectLanguage(text) {
    if (!text || typeof text !== "string") return null;

    const lower = text.toLowerCase();

    // Bhojpuri markers detection
    const bhojpuriMarkers = [
        "ka haal ba", "kaha jaat", "kaise baani", "hamaar", "tohaar", "bujhail", 
        "batawa", "bataee", "rauwa", "raur", "bani", "baani", "ka ba", "ka karat", 
        "neek", "baate", "hote", "hola", "kahe", "ekdam"
    ];
    if (bhojpuriMarkers.some(m => lower.includes(m))) {
        return "bho";
    }

    // Unicode Script detection
    if (/[\u0900-\u097F]/.test(text)) {
        if (/बानी|हईं|बाटे|का हाल बा|रउआ|हमार|तोहार|कइल|होखे/.test(text)) {
            return "bho";
        }
        return "hi"; // Devanagari (Hindi)
    }
    if (/[\u0980-\u09FF]/.test(text)) return "bn";      // Bengali
    if (/[\u0C00-\u0C7F]/.test(text)) return "te";      // Telugu
    if (/[\u0B80-\u0BFF]/.test(text)) return "ta";      // Tamil
    if (/[\u0A80-\u0AFF]/.test(text)) return "gu";      // Gujarati
    if (/[\u0C80-\u0CFF]/.test(text)) return "kn";      // Kannada
    if (/[\u0D00-\u0D7F]/.test(text)) return "ml";      // Malayalam
    if (/[\u0A00-\u0A7F]/.test(text)) return "pa";      // Punjabi
    if (/[\u0600-\u06FF]/.test(text)) return "ar";      // Arabic / Urdu
    if (/[\u3040-\u309F\u30A0-\u30FF]/.test(text)) return "ja"; // Japanese Kana
    if (/[\uAC00-\uD7AF\u1100-\u11FF]/.test(text)) return "ko"; // Korean Hangul
    if (/[\u4E00-\u9FFF]/.test(text)) return "zh";      // Chinese Hanzi
    if (/[\u0400-\u04FF]/.test(text)) return "ru";      // Cyrillic (Russian)

    // Hinglish keywords detection
    const hinglishMarkers = ["kya", "hota", "hai", "kaise", "batao", "samjhao", "karo", "baat", "mein", "aur", "chahiye", "accha", "dhanyawad", "shukriya", "suno", "sunao", "namaste", "kaun", "mera", "aapka", "tumhara", "apne"];
    const words = lower.split(/\s+/);
    if (words.some(w => hinglishMarkers.includes(w))) {
        return "hinglish";
    }

    // Spanish markers
    if (/[¿¡áéíóúüñ]/.test(lower) || /\b(qué|como|estas|hola|adios|gracias|buenos|por favor|ayuda|quién|eres|soy)\b/.test(lower)) {
        return "es";
    }

    // French markers
    if (/[àâçéèêëîïôûùüÿœæ]/.test(lower) || /\b(bonjour|salut|merci|comment|pourquoi|au revoir|aide|qui|es-tu|suis-je)\b/.test(lower)) {
        return "fr";
    }

    // German markers
    if (/[äöüß]/.test(lower) || /\b(hallo|tschüss|danke|bitte|was ist|wie geht|hilfe|wer bist|wer bin)\b/.test(lower)) {
        return "de";
    }

    // Default to English if Latin script
    if (/[a-zA-Z]/.test(lower)) {
        return "en";
    }

    return null;
}

/**
 * Check if the user is asking to switch language
 */
function checkLanguageSwitchCommand(text) {
    const lower = text.toLowerCase();
    
    for (const [langKey, code] of Object.entries(LANGUAGE_SWITCH_MAP)) {
        const regexPatterns = [
            new RegExp(`\\b(switch|change|set|talk|speak|translate)\\s+(to|in|into)?\\s*${langKey}`, "i"),
            new RegExp(`${langKey}\\s+(mein|me|par|me|me)\\s+(baat|bolo|switch)`, "i"),
            new RegExp(`(talk to me in|change language to)\\s+${langKey}`, "i"),
            new RegExp(`${langKey}\\s*(में बात|में स्विच|में बोलो|मे बात|मे बोलो|म बोल)`, "i"),
            new RegExp(`${langKey}\\s*(で話して|に変更|に変えて)`, "i"),
            new RegExp(`(cambiar a|habla en)\\s+${langKey}`, "i"),
            new RegExp(`(passer en|parle en)\\s+${langKey}`, "i")
        ];

        if (regexPatterns.some(rgx => rgx.test(lower)) || lower === `switch to ${langKey}` || lower === `speak in ${langKey}`) {
            return code;
        }
    }

    return null;
}

/**
 * Intent Classifier: Matches user text to conversational and technical intents
 */

// 500 Predefined Question-Answer Knowledge Base
function classifyIntent(text) {
    const lower = text.toLowerCase().trim();

    // 1. Language switch check
    const targetLang = checkLanguageSwitchCommand(text);
    if (targetLang) {
        return { intent: "LANGUAGE_CHANGE", targetLang };
    }

    // 2. Who are you? / Tell me about yourself / Introduce yourself
    if (/who are you|who r u|tell me about yourself|tell about yourself|about yourself|introduce yourself|what are you|tum kaun ho|aap kaun ho|tu kon hai|apne baare me|apne baare mein|rauwa kaun|raur parichay|apne baare me batawa|quién eres|quien eres|qui es-tu|wer bist du|chi sei|quem é você|あなたは誰|誰ですか|너는 누구|당신은 누구|你是谁|من أنت|кто ты/i.test(lower) ||
        lower === "who are you" || lower === "who are you?" || lower === "who are u" || lower === "tell me about yourself" || lower === "about you" || lower === "tum kaun ho" || lower === "aap kaun hain" || lower === "aap kaun ho" || lower === "आप कौन हैं" || lower === "रउआ के हईं") {
        return { intent: "WHO_ARE_YOU" };
    }

    // 3. Who am I? / Who I am
    if (/who am i|who i am|who am i\?|main kaun hoon|hum kaun hain|hum ke hani|quién soy|qui suis-je|wer bin ich|chi sono|quem sou eu|私は誰|나는 누구|我是谁|من أنا|кто я/i.test(lower) ||
        lower === "who am i" || lower === "who i am" || lower === "main kaun hoon" || lower === "मैं कौन हूँ") {
        return { intent: "WHO_AM_I" };
    }

    // 4. Name (What is your name?)
    if (/what is your name|what's your name|whats your name|your name|aapka naam|tumhara naam|tera naam|raur naam|tohaar naam|cuál es tu nombre|comment t'appelles-tu|wie heißt du|come ti chiami|qual é o seu nome|お名前は|이름이 뭐|你叫什么名字|ما اسمك|как тебя зовут/i.test(lower) ||
        lower === "name" || lower === "your name" || lower === "naam" || lower === "नाम क्या है") {
        return { intent: "NAME" };
    }

    // 5. Creator (Who made you? Who created you?)
    if (/who made you|who created you|who built you|kisne banaya|aapko kisne banaya|tumhe kisne banaya|ke banawlas|ke banawale|quién te creó|qui t'a créé|wer hat dich erschaffen|chi ti ha creato|quem te criou|誰が作った|누가 만들|谁创造了你|من صنعك|кто тебя создал/i.test(lower)) {
        return { intent: "CREATOR" };
    }

    // 6. Thank you / Thanks
    if (/thank you|thanks|thx|dhanyawad|shukriya|dhanyavaad|gracias|merci|danke|obrigado|grazie|arigato|ありがとう|감사합니다|谢谢|شكرا|спасибо/i.test(lower)) {
        return { intent: "THANK_YOU" };
    }

    // 7. General Greetings
    if (/^(hi|hello|hey|hola|namaste|pranaam|pranam|bonjour|hallo|ciao|olá|ola|konnichiwa|annyeong|nihao|marhaban|privet|salaam|sasriakal|vanakkam|namaskara|namaskar)\b/i.test(lower) || 
        lower === "hello" || lower === "hi" || lower === "hey" || lower === "namaste" || lower === "pranam" || lower === "प्रणाम" || lower === "नमस्ते" || lower === "வணக்கம்" || lower === "నమస్కారం" || lower === "こんにちは" || lower === "안녕하세요" || lower === "你好" || lower === "مرحبا" || lower === "привет") {
        return { intent: "GREETING" };
    }

    // 8. How are you
    if (/how are you|how r u|kaise ho|kaisa hai|ka haal ba|ka hal ba|kaise baani|cómo estás|como estas|comment allez-vous|wie geht|come stai|como você está|genki|eotteoke jinaeyo|ni hao ma|kayfa haluk|kak dela|kemon acho|ela unnaru/i.test(lower) ||
        lower.includes("how are you") || lower.includes("kaise ho") || lower.includes("ka haal ba") || lower.includes("का हाल बा") || lower.includes("हाल")) {
        return { intent: "HOW_ARE_YOU" };
    }

    // 9. Goodbyes
    if (/^(bye|goodbye|adios|adíos|alvida|tata|see you|au revoir|tschüss|ciao|sayonara|annyeonghi|zaijian|ma'a salama|poka|vidaay|selavu)\b/i.test(lower) ||
        lower === "bye" || lower === "goodbye" || lower === "alvida" || lower === "अलविदा" || lower === "さようなら" || lower === "안녕히" || lower === "再见" || lower === "مع السلامة" || lower === "пока") {
        return { intent: "BYE" };
    }

    // 10. Joke
    if (/joke|chiste|blague|witz|जोक|चुटकुला|मजाक|రస్|농담|ジョーク|笑话|نكتة|шутк/i.test(lower)) {
        return { intent: "JOKE" };
    }

    // 11. Array (Only if explicitly asked)
    if (/array|सरणी|एरे|배열|配列|数组|المصفوفة|массив/i.test(lower)) {
        return { intent: "ARRAY" };
    }

    // 12. DSA (Only if explicitly asked)
    if (/dsa|data structure|डेटा स्ट्रक्चर|ডাটা স্ট্রাকচার|డేటా స్ట్రక్చర్|자료구조|データ構造|数据结构|خوارزميات|структур/i.test(lower)) {
        return { intent: "DSA" };
    }

    // 13. Python (Only if explicitly asked)
    if (/python|पायथन|পাইথন|పైథాన్|파이썬|パイソン|بايثون|питон/i.test(lower)) {
        return { intent: "PYTHON" };
    }

    // 14. Loop (Only if explicitly asked)
    if (/\b(loop|loops|for loop|while loop)\b|लूप|లూప్|반복문|ループ|循环|تكرار|цикл/i.test(lower)) {
        return { intent: "LOOP" };
    }

    // 15. Help
    if (/help|features|what can you do|commands|मदद|सहायता|ಸಹಾಯಂ|도움|ヘルプ|帮助|مساعدة|помощь/i.test(lower)) {
        return { intent: "HELP" };
    }

    return { intent: "FALLBACK" };
}

/**
 * Universal Response Resolver:
 * Takes user input, current selected language, returns response string and metadata
 */
function resolveMultilingualResponse(userInput, currentLang = "en", autoDetect = true) {
    let effectiveLang = currentLang;

    // Optional Auto-Detection
    if (autoDetect) {
        const detected = autoDetectLanguage(userInput);
        if (detected) {
            effectiveLang = detected;
        }
    }

    const { intent, targetLang } = classifyIntent(userInput);

    // Handle Language Switch command
    if (intent === "LANGUAGE_CHANGE" && targetLang) {
        const langMeta = LANGUAGES[targetLang] || LANGUAGES["en"];
        let msg = "";
        if (targetLang === "bho") {
            msg = `भाषा बदल के भोजपुरी ${langMeta.flag} क दिहल गइल बा। अब रउआ भोजपुरी में बात कर सकीलें!`;
        } else if (targetLang === "hi" || targetLang === "hinglish") {
            msg = `भाषा बदलकर ${langMeta.nativeName} ${langMeta.flag} कर दी गई है। अब आप इस भाषा में बात कर सकते हैं!`;
        } else if (targetLang === "es") {
            msg = `Idioma cambiado a ${langMeta.nativeName} ${langMeta.flag}. ¡Ahora podemos hablar en español!`;
        } else if (targetLang === "fr") {
            msg = `Langue changée en ${langMeta.nativeName} ${langMeta.flag}. Nous pouvons discuter en français !`;
        } else if (targetLang === "de") {
            msg = `Sprache auf ${langMeta.nativeName} ${langMeta.flag} geändert. Wie kann ich Ihnen helfen?`;
        } else if (targetLang === "ja") {
            msg = `言語を${langMeta.nativeName} ${langMeta.flag}に変更しました。ご質問をどうぞ！`;
        } else if (targetLang === "ko") {
            msg = `언어가 ${langMeta.nativeName} ${langMeta.flag}(으)로 변경되었습니다. 무엇을 도와드릴까요?`;
        } else if (targetLang === "zh") {
            msg = `语言已切换为${langMeta.nativeName} ${langMeta.flag}。请问有什么可以帮助您的？`;
        } else if (targetLang === "ar") {
            msg = `تم تغيير اللغة إلى ${langMeta.nativeName} ${langMeta.flag}. كيف يمكنني مساعدتك؟`;
        } else if (targetLang === "ru") {
            msg = `Язык переключен на ${langMeta.nativeName} ${langMeta.flag}. Чем могу помочь?`;
        } else {
            msg = `Language changed to ${langMeta.nativeName} ${langMeta.flag}. Let's continue in ${langMeta.name}!`;
        }

        return {
            reply: msg,
            intent: "LANGUAGE_CHANGE",
            newLanguage: targetLang,
            language: targetLang,
            isGoodbye: false
        };
    }

    // If intent is FALLBACK, check the 500 QA Knowledge Base
    if (intent === "FALLBACK" || !INTENT_RESPONSES[intent]) {
        const cleanText = userInput.toLowerCase().replace(/[^a-z0-9\s]/g, " ").trim().replace(/\s+/g, " ");

        // 1. Direct match
        if (QA_500_RESPONSES[cleanText]) {
            return {
                reply: QA_500_RESPONSES[cleanText],
                intent: "QA_500",
                language: effectiveLang,
                isGoodbye: false
            };
        }

        // 2. Substring & Keyword match
        let bestKey = null;
        let maxLen = 0;
        for (const k in QA_500_RESPONSES) {
            if (cleanText.includes(k)) {
                if (k.length > maxLen) {
                    maxLen = k.length;
                    bestKey = k;
                }
            } else if (cleanText.length >= 4 && k.includes(cleanText)) {
                if (cleanText.length > maxLen) {
                    maxLen = cleanText.length;
                    bestKey = k;
                }
            }
        }

        if (bestKey) {
            return {
                reply: QA_500_RESPONSES[bestKey],
                intent: "QA_500",
                language: effectiveLang,
                isGoodbye: false
            };
        }
    }

    const intentData = INTENT_RESPONSES[intent] || INTENT_RESPONSES["FALLBACK"];
    const reply = intentData[effectiveLang] || intentData["en"] || INTENT_RESPONSES["FALLBACK"]["en"];

    return {
        reply,
        intent,
        language: effectiveLang,
        isGoodbye: (intent === "BYE")
    };
}

