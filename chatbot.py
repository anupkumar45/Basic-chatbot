# Basic Rule-Based Python Chatbot
# Exactly 500 Unique Question -> Answer Pairs
import sys
import re
import difflib

# Ensure UTF-8 output across all terminals for emojis
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

responses = {
    # 1-20: Greetings
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
    # 21-40: Introduction
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
    # 41-60: Basic Help
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
    # 61-80: Thanks and Positive Responses
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
    # 81-100: Goodbye
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
    # 101-120: Personal and Simple Questions
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
    # 121-140: Daily Life
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
    # 141-160: Friends and Relationships
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
    # 161-180: Basic Abilities
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
    # 181-200: Chatbot Questions
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
    # 201-220: More Basic Conversation
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
    # 221-240: Fun and Positive
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
    # 241-260: Feelings and Preferences
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
    # 261-280: Daily Life
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
    # 281-300: Friends and Family
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
    # 301-320: Casual Conversation
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
    # 321-340: Positive Conversation
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
    # 341-360: Simple Requests
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
    # 361-380: Explanation and Response Requests
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
    # 381-400: Basic Chatbot Identity
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
    # 401-420: Simple Questions About Chatbot
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
    # 421-440: Repeated Basic Conversation
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
    # 441-460: Greetings and Wishes
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
    # 461-480: More Simple Conversation
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
    # 481-500: Final Basic Questions
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
    "thank you for talking": "You're welcome! It was nice chatting with you.",
}

# Common abbreviations & slang mappings
SLANG_MAP = {
    "u": "you",
    "ur": "your",
    "r": "are",
    "pls": "please",
    "plz": "please",
    "thx": "thank you",
    "ty": "thank you",
    "tq": "thank you",
    "gm": "good morning",
    "gn": "good night",
    "hru": "how are you",
    "wbu": "what about you",
    "fav": "favorite",
    "favourite": "favorite",
    "bcoz": "because",
    "cuz": "because",
    "intro": "introduce yourself",
    "wat": "what",
    "wht": "what",
    "namaste": "hello",
    "kaise ho": "how are you",
    "kya haal hai": "how are you",
    "tum kaun ho": "who are you",
    "aap kaun ho": "who are you",
    "tumhara naam": "what is your name",
    "aapka naam": "what is your name",
    "kya kar rahe ho": "what are you doing",
    "shukriya": "thank you",
    "dhanyawad": "thank you",
    "alvida": "goodbye"
}

# Common contractions mappings
CONTRACTIONS = {
    "what's": "what is",
    "who's": "who is",
    "how's": "how is",
    "where's": "where is",
    "why's": "why is",
    "it's": "it is",
    "i'm": "i am",
    "im ": "i am ",
    "you're": "you are",
    "they're": "they are",
    "we're": "we are",
    "don't": "do not",
    "can't": "cannot",
    "won't": "will not",
    "didn't": "did not",
    "doesn't": "does not",
    "let's": "let us",
    "that's": "that is",
    "whats": "what is",
    "whos": "who is",
    "hows": "how is"
}


def clean_and_normalize(text):
    """Normalize text by expanding contractions, removing punctuation, and converting slang."""
    text = text.lower().strip()

    # 1. Expand contractions
    for c, exp in CONTRACTIONS.items():
        text = text.replace(c, exp)

    # 2. Replace punctuation with space
    text = re.sub(r"[^a-zA-Z0-9\s]", " ", text)

    # 3. Replace slang / abbreviations token by token
    words = text.split()
    normalized_words = [SLANG_MAP.get(w, w) for w in words]
    normalized_text = " ".join(normalized_words)

    # Also replace multi-word slang
    for slang, standard in SLANG_MAP.items():
        if " " in slang and slang in normalized_text:
            normalized_text = normalized_text.replace(slang, standard)

    return " ".join(normalized_text.split())


def get_bot_response(user_text):
    """Matches user input against the 500-question knowledge base with multiple matching layers."""
    raw_clean = user_text.lower().strip()

    # Layer 1: Direct exact match
    if raw_clean in responses:
        return responses[raw_clean]

    normalized = clean_and_normalize(user_text)

    # Layer 2: Exact normalized match
    if normalized in responses:
        return responses[normalized]

    # Layer 3: Substring match (find longest matching question in dictionary)
    best_sub = None
    max_len = 0
    for key in responses:
        if key in normalized:
            if len(key) > max_len:
                max_len = len(key)
                best_sub = key
        elif len(normalized) >= 4 and normalized in key:
            if len(normalized) > max_len:
                max_len = len(normalized)
                best_sub = key

    if best_sub:
        return responses[best_sub]

    # Layer 4: Word overlap (matches questions with shared meaningful keywords)
    user_words = set(normalized.split())
    stopwords = {"a", "an", "the", "is", "are", "do", "does", "can", "could", "would", "please", "me", "i", "to"}
    meaningful_user_words = user_words - stopwords if len(user_words) > 1 else user_words

    best_overlap_key = None
    best_overlap_score = 0

    for key in responses:
        key_words = set(key.split())
        meaningful_key_words = key_words - stopwords if len(key_words) > 1 else key_words

        common = meaningful_user_words.intersection(meaningful_key_words)
        if common:
            score = len(common) / max(len(meaningful_key_words), 1)
            if score > best_overlap_score and score >= 0.6:
                best_overlap_score = score
                best_overlap_key = key

    if best_overlap_key:
        return responses[best_overlap_key]

    # Layer 5: Fuzzy Matching (handles typos, misspellings using difflib)
    close_matches = difflib.get_close_matches(normalized, responses.keys(), n=1, cutoff=0.65)
    if close_matches:
        return responses[close_matches[0]]

    # Layer 6: Fallback for completely unknown inputs
    return "I don't know this question."


while True:
    user_input = input("You: ").lower().strip()

    if user_input in ["bye", "goodbye", "exit", "quit", "close"]:
        print("Bot: Goodbye!")
        break

    if not user_input:
        continue

    reply = get_bot_response(user_input)
    print("Bot:", reply)




