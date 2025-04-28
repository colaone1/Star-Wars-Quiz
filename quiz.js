// Array of quiz questions with their answers, correct answer index, and difficulty level
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
        correct: 1,  // Index 1 (Purple) is the correct answer
        difficulty: "easy"
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
        correct: 3,  // Index 3 (Darth Sidious) is the correct answer
        difficulty: "medium"
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
        correct: 2,  // Index 2 (Millennium Falcon) is the correct answer
        difficulty: "easy"
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
        correct: 2,  // Index 2 (I am your father) is the correct answer
        difficulty: "medium"
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
        correct: 0,  // Index 0 (Ewoks) is the correct answer
        difficulty: "hard"
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

// Add click event listener to the start button
startBtn.addEventListener('click', startQuiz);

// Add click event listeners for logos when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the logo images
    const yodaImage = document.querySelector('.yoda-logo');
    const starWarsLogo = document.querySelector('.star-wars-logo');
    
    // Add click handler for Yoda image - only starts quiz from start page
    if (yodaImage) {
        yodaImage.addEventListener('click', function() {
            if (quizContent.classList.contains('hidden')) {
                startQuiz();
            }
        });
    }
    
    // Add click handler for Star Wars logo - always resets quiz
    if (starWarsLogo) {
        starWarsLogo.addEventListener('click', resetQuiz);
    }
});

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
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    
    timer = setInterval(() => {
        timeLeft--;
        if (timerDisplay) {
            timerDisplay.textContent = timeLeft;
        }
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            timer = null;
            currentQuestion++;
            timeLeft = 60;
            showQuestion();
        }
    }, 1000);
}

// Function to display the current question
function showQuestion() {
    // Check if we've reached the end of the quiz
    if (currentQuestion >= questions.length) {
        showResult();
        return;
    }

    const question = questions[currentQuestion];
    let questionImage = '';
    const questionText = question.question.toLowerCase();
    
    // Set the appropriate image based on the current question
    if (questionText.includes("mace windu's lightsaber")) {
        questionImage = '<img src="images/Lightsaber-Vector.png" alt="Lightsaber" class="quiz-image">';
    } else if (questionText.includes("emperor's sith name")) {
        questionImage = '<img src="images/deathstar.png" alt="Death Star" class="quiz-image">';
    } else if (questionText.includes("han solo and chewbacca")) {
        questionImage = '<img src="images/chewbakka.svg" alt="Chewbacca" class="quiz-image">';
    } else if (questionText.includes("darth vader say")) {
        questionImage = '<img src="images/darth vader update.svg" alt="Darth Vader" class="quiz-image">';
    } else if (questionText.includes("short furry creatures")) {
        questionImage = '<img src="images/troopernew.png" alt="Stormtrooper" class="quiz-image">';
    }

    // Create the HTML for the current question
    let questionHTML = `
        <div class="flex flex-col items-center w-full">
            <div class="progress-bar-container mb-4 w-full max-w-md">
                <div class="progress-bar" style="width: ${(currentQuestion / questions.length) * 100}%"></div>
            </div>
            <div class="timer-container mb-4">
                <span class="text-yellow-400 text-xl">Time Left: <span id="timer">${timeLeft}</span>s</span>
            </div>
            ${questionImage}
            <h2 class="question-text text-center mb-6">${question.question}</h2>
            <div class="flex flex-col items-center w-full gap-4">
    `;

    // Add buttons for each possible answer
    question.answers.forEach((answer, index) => {
        questionHTML += `
            <button class="answer-button w-full max-w-md"
                    onclick="checkAnswer(${index})">
                ${answer}
            </button>
        `;
    });

    // Add the restart button and close the HTML structure
    questionHTML += `
            </div>
            <button onclick="resetQuiz()" class="restart-button mt-4">
                Restart Quiz
            </button>
        </div>
    `;
    
    // Update the question container with the new HTML
    if (questionContainer) {
        questionContainer.innerHTML = questionHTML;
    }
    
    // Start the timer for this question
    startTimer();
}

// Function to check if the selected answer is correct
function checkAnswer(answerIndex) {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    
    const question = questions[currentQuestion];
    if (answerIndex === question.correct) {
        score++;
    }

    currentQuestion++;
    timeLeft = 60;
    showQuestion();
}

// Function to display the final results
function showResult() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    
    if (questionContainer) {
        questionContainer.innerHTML = '';
    }
    
    if (resultDiv) {
        resultDiv.classList.remove('hidden');
        
        let message = '';
        if (score === questions.length) {
            message = 'Perfect score! You are a true Star Wars master!';
        } else if (score >= questions.length * 0.8) {
            message = 'Impressive! The Force is strong with you!';
        } else if (score >= questions.length * 0.6) {
            message = 'Good job! You know your Star Wars!';
        } else {
            message = 'Keep practicing! May the Force be with you!';
        }
        
        resultDiv.innerHTML = `
            <h2 class="result-title">Quiz Complete!</h2>
            <img src="images/Yoda-Vector.svg" alt="Yoda" class="quiz-image mb-8">
            <p class="result-score">Your score: ${score} out of ${questions.length}</p>
            <div class="result-message mb-6">
                <p class="text-yellow-400 text-xl">${message}</p>
            </div>
            <button onclick="resetQuiz()" class="try-again-button">
                Try Again
            </button>
        `;
    }
}

// Function to reset the quiz to its initial state
function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 60;
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    
    if (resultDiv) {
        resultDiv.classList.add('hidden');
    }
    
    if (initialInfo) {
        initialInfo.style.display = 'block';
    }
    
    if (quizContent) {
        quizContent.classList.add('hidden');
    }
    
    if (questionContainer) {
        questionContainer.innerHTML = '';
    }
} 