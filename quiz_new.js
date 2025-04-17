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
        correct: 1  // Index 1 (Purple) is the correct answer
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
        correct: 3  // Index 3 (Darth Sidious) is the correct answer
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
        correct: 2  // Index 2 (Millennium Falcon) is the correct answer
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
        correct: 2  // Index 2 (I am your father) is the correct answer
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
        correct: 0  // Index 0 (Ewoks) is the correct answer
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
    
    let questionHTML = `
        <div class="flex flex-col items-center w-full">
            <div class="progress-bar-container mb-4 w-full max-w-md">
                <div class="progress-bar" style="width: ${(currentQuestion / questions.length) * 100}%"></div>
            </div>
            <div class="timer-container mb-4">
                <span class="text-yellow-400 text-xl">Time Left: <span id="timer">60</span>s</span>
            </div>
    `;
    
    // Add the appropriate image based on the question
    if (question.question.includes("Mace Windu")) {
        questionHTML += '<img src="images/Lightsaber-Vector.png" alt="Lightsaber" class="yoda-logo">';
    } else if (question.question.includes("Emperor")) {
        questionHTML += '<img src="images/deathstar.png" alt="Death Star" class="yoda-logo">';
    } else if (question.question.includes("Han Solo")) {
        questionHTML += '<img src="images/chewbakka.svg" alt="Chewbacca" class="yoda-logo">';
    } else if (question.question.includes("Darth Vader")) {
        questionHTML += '<img src="images/darth vader update.svg" alt="Darth Vader" class="yoda-logo">';
    } else if (question.question.includes("Ewoks")) {
        questionHTML += '<img src="images/trooper.png" alt="Stormtrooper" class="yoda-logo">';
    }
    
    questionHTML += `
            <h2 class="question-text text-center mb-6">${question.question}</h2>
            <div class="flex flex-col items-center w-full gap-4">
    `;

    // Create a button for each possible answer
    question.answers.forEach((answer, index) => {
        questionHTML += `
            <button class="answer-button w-full max-w-md"
                    onclick="checkAnswer(${index})">
                ${answer}
            </button>
        `;
    });

    questionHTML += '</div></div>';
    // Insert the question HTML into the question container
    questionContainer.innerHTML = questionHTML;
    
    // Start the timer for this question
    timeLeft = 60;
    startTimer();
}

// Function to check if the selected answer is correct
function checkAnswer(answerIndex) {
    if (timer) clearInterval(timer);  // Clear the timer when answer is selected
    
    const question = questions[currentQuestion];
    // If the selected answer matches the correct answer index
    if (answerIndex === question.correct) {
        score++;  // Increment the score
    }

    currentQuestion++;  // Move to the next question
    timeLeft = 60;  // Reset timer for next question
    showQuestion();  // Display the next question
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