// Array of quiz questions, each containing a question, possible answers, and the index of the correct answer
const questions = [
    {
        question: "What colour is Mace Windu's lightsaber?",
        answers: [
            "Blue",
            "Purple",
            "Red",
            "Green",
            "Pink"
        ],
        correct: 1,
        difficulty: "easy",
        funFact: "Samuel L. Jackson specifically requested a purple lightsaber so he could be easily identified in battle scenes!"
    },
    {
        question: "What is the Emperor's sith name?",
        answers: [
            "Jar Jar Binks",
            "Darth Vader",
            "Emperor Palpatine",
            "Darth Sidious",
            "Mace Windu"
        ],
        correct: 3,
        difficulty: "medium",
        funFact: "The name 'Sidious' is derived from the word 'insidious', reflecting his deceptive nature."
    },
    {
        question: "What is the name of the ship that Han Solo and Chewbacca fly in the original trilogy?",
        answers: [
            "X-wing",
            "TIE Fighter",
            "Millennium Falcon",
            "Death Star",
            "Star Destroyer"
        ],
        correct: 2,
        difficulty: "easy",
        funFact: "The Millennium Falcon's design was inspired by a hamburger with an olive on the side!"
    },
    {
        question: "What does Darth Vader say when Luke is hanging on the edge of the platform?",
        answers: [
            "Get Good",
            "I told you the floor was wet",
            "I am your father",
            "Wait here I'll be right back",
            "I'm not your father"
        ],
        correct: 2,
        difficulty: "medium",
        funFact: "The original line in English is 'No, I am your father', not 'Luke, I am your father' as commonly misquoted!"
    },
    {
        question: "What is the name of the short furry creatures that inhabit the planet of Endor?",
        answers: [
            "Ewoks",
            "Munchkins",
            "Gummi Bears",
            "Wookies",
            "Protheans"
        ],
        correct: 0,
        difficulty: "hard",
        funFact: "The Ewok language was created by mixing various Asian languages including Tibetan and Nepali!"
    }
];

// Variables to track quiz state
let currentQuestion = 0;  // Keeps track of which question is currently being shown
let score = 0;  // Keeps track of how many correct answers the user has given
let timer = null;  // Variable to store the timer
let timeLeft = 60;  // Time in seconds for each question

// Get references to HTML elements we'll need to manipulate
const startBtn = document.getElementById('start-btn');
const quizContent = document.getElementById('quiz-content');
const questionContainer = document.getElementById('question-container');
const resultDiv = document.getElementById('result');
const initialInfo = document.getElementById('initial-info');

// Add sound effect variables
const correctSound = new Audio('sounds/correct.mp3');
const incorrectSound = new Audio('sounds/incorrect.mp3');

// Add Star Wars quotes for different score ranges
const starWarsQuotes = {
    perfect: [
        "Do. Or do not. There is no try. - Yoda",
        "The Force is strong with this one. - Darth Vader",
        "Never tell me the odds! - Han Solo"
    ],
    good: [
        "Great, kid! Don't get cocky. - Han Solo",
        "Your focus determines your reality. - Qui-Gon Jinn",
        "In my experience, there's no such thing as luck. - Obi-Wan Kenobi"
    ],
    average: [
        "Much to learn you still have. - Yoda",
        "Stay on target! - Gold Five",
        "I find your lack of faith disturbing. - Darth Vader"
    ],
    needsPractice: [
        "Try not. Do. Or do not. There is no try. - Yoda",
        "The greatest teacher, failure is. - Yoda",
        "You have taken your first step into a larger world. - Obi-Wan Kenobi"
    ]
};

// Add click event listener to the start button
startBtn.addEventListener('click', startQuiz);

// Function to start the quiz
function startQuiz() {
    initialInfo.style.display = 'none';  // Hide the initial information
    quizContent.classList.remove('hidden');  // Show the quiz content
    timeLeft = 60;  // Reset timer
    
    // Randomize the questions array
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    
    showQuestion();  // Display the first question
}

// Function to start the timer
function startTimer() {
    const timerDisplay = document.getElementById('timer');
    if (timer) clearInterval(timer);
    
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        
        // Add warning class when time is low
        if (timeLeft <= 10) {
            timerDisplay.classList.add('timer-warning');
        } else {
            timerDisplay.classList.remove('timer-warning');
        }
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            currentQuestion++;
            timeLeft = 60;
            showQuestion();
        }
    }, 1000);
}

// Function to display the current question
function showQuestion() {
    if (currentQuestion >= questions.length) {
        showResult();
        return;
    }

    const question = questions[currentQuestion];
    console.log("Current question:", question.question);  // Debug log
    
    let questionImage = '';
    const questionText = question.question.toLowerCase();
    
    if (questionText === "what colour is mace windu's lightsaber?") {
        questionImage = '<img src="images/Lightsaber-Vector.png" alt="Lightsaber" class="yoda-logo">';
    } else if (questionText === "what is the emperor's sith name?") {
        questionImage = '<img src="images/deathstar.png" alt="Death Star" class="yoda-logo">';
    } else if (questionText === "what is the name of the ship that han solo and chewbacca fly in the original trilogy?") {
        questionImage = '<img src="images/chewbakka.svg" alt="Chewbacca" class="yoda-logo">';
    } else if (questionText === "what does darth vader say when luke is hanging on the edge of the platform?") {
        questionImage = '<img src="images/darth vader update.svg" alt="Darth Vader" class="yoda-logo">';
    } else if (questionText === "what is the name of the short furry creatures that inhabit the planet of endor?") {
        questionImage = '<img src="images/troopernew.png" alt="Stormtrooper" class="yoda-logo">';
    }

    let questionHTML = `
        <div class="flex flex-col items-center w-full">
            <div class="progress-bar-container mb-4 w-full max-w-md">
                <div class="progress-bar" style="width: ${(currentQuestion / questions.length) * 100}%"></div>
            </div>
            <div class="timer-container mb-4">
                <span class="text-yellow-400 text-xl">Time Left: <span id="timer">60</span>s</span>
            </div>
            <div class="question-progress text-yellow-400 mb-4">
                Question ${currentQuestion + 1} of ${questions.length}
            </div>
            <div class="difficulty-indicator difficulty-${question.difficulty}">
                Difficulty: ${question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
            </div>
            ${questionImage}
            <h2 class="question-text text-center mb-6">${question.question}</h2>
            <div class="flex flex-col items-center w-full gap-4" role="radiogroup" aria-label="Quiz answers">
    `;

    // Create a button for each possible answer
    question.answers.forEach((answer, index) => {
        questionHTML += `
            <button class="answer-button w-full max-w-md"
                    onclick="checkAnswer(${index})"
                    role="radio"
                    aria-checked="false"
                    tabindex="0"
                    data-index="${index}">
                ${answer}
            </button>
        `;
    });

    questionHTML += '</div></div>';
    questionContainer.innerHTML = questionHTML;
    
    // Add keyboard navigation
    const buttons = document.querySelectorAll('.answer-button');
    buttons.forEach(button => {
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                checkAnswer(parseInt(button.dataset.index));
            }
        });
    });
    
    // Start the timer for this question
    timeLeft = 60;
    startTimer();
}

// Function to check if the selected answer is correct
function checkAnswer(answerIndex) {
    if (timer) clearInterval(timer);  // Clear the timer when answer is selected
    
    const question = questions[currentQuestion];
    const isCorrect = answerIndex === question.correct;
    
    // Play sound effect
    if (isCorrect) {
        correctSound.play();
    } else {
        incorrectSound.play();
    }
    
    // Show feedback
    const buttons = document.querySelectorAll('.answer-button');
    buttons.forEach((button, index) => {
        button.disabled = true;
        if (index === question.correct) {
            button.classList.add('correct-answer');
        } else if (index === answerIndex && !isCorrect) {
            button.classList.add('incorrect-answer');
        }
    });

    // Show fun fact and next button
    const funFactDiv = document.createElement('div');
    funFactDiv.className = 'fun-fact text-yellow-400 mt-4 text-center p-4 border border-yellow-400 rounded';
    funFactDiv.innerHTML = `
        <strong>Fun Fact:</strong> ${question.funFact}
        <button onclick="nextQuestion(${isCorrect})" class="next-question-button mt-4">
            Next Question
        </button>
    `;
    questionContainer.appendChild(funFactDiv);
}

// Function to move to the next question
function nextQuestion(isCorrect) {
    if (isCorrect) {
        score++;
    }
    currentQuestion++;
    timeLeft = 60;
    showQuestion();
}

// Function to display the final results
function showResult() {
    if (timer) clearInterval(timer);  // Clear the timer
    questionContainer.innerHTML = '';  // Clear the question container
    resultDiv.classList.remove('hidden');  // Show the result container
    
    // Create and display the results HTML
    resultDiv.innerHTML = `
        <h2 class="result-title">Quiz Complete!</h2>
        <img src="images/Yoda-Vector.svg" alt="Yoda" class="yoda-logo mb-8">
        <p class="result-score">Your score: ${score} out of ${questions.length}</p>
        <div class="result-message mb-6">
            ${score === questions.length ? 
                '<p class="text-yellow-400 text-xl">Perfect score! You are a true Star Wars master!</p>' : 
                score >= questions.length * 0.8 ? 
                '<p class="text-yellow-400 text-xl">Impressive! The Force is strong with you!</p>' : 
                score >= questions.length * 0.6 ? 
                '<p class="text-yellow-400 text-xl">Good job! You know your Star Wars!</p>' : 
                '<p class="text-yellow-400 text-xl">Keep practicing! May the Force be with you!</p>'
            }
        </div>
        <button onclick="resetQuiz()" class="try-again-button">
            Try Again
        </button>
    `;
}

// Function to reset the quiz to its initial state
function resetQuiz() {
    currentQuestion = 0;  // Reset question counter
    score = 0;  // Reset score
    timeLeft = 60;  // Reset timer
    if (timer) clearInterval(timer);  // Clear any existing timer
    resultDiv.classList.add('hidden');  // Hide results
    initialInfo.style.display = 'block';  // Show initial information
    quizContent.classList.add('hidden');  // Hide quiz content
}

// Function to get a random quote based on score
function getRandomQuote(scoreCategory) {
    const quotes = starWarsQuotes[scoreCategory];
    return quotes[Math.floor(Math.random() * quotes.length)];
} 