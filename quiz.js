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
    showQuestion();  // Display the first question
}

// Function to display the current question
function showQuestion() {
    // Check if we've reached the end of the questions
    if (currentQuestion >= questions.length) {
        showResult();  // If so, show the final results
        return;
    }

    // Get the current question object
    const question = questions[currentQuestion];
    
    // Create the HTML for the question and answer buttons
    let questionHTML = `
        <div class="flex flex-col items-center">
            <h2 class="question-text text-center w-full">${question.question}</h2>
            <div class="space-y-3 w-full max-w-md">
    `;

    // Create a button for each possible answer
    question.answers.forEach((answer, index) => {
        questionHTML += `
            <button class="answer-button text-center"
                    onclick="checkAnswer(${index})">
                ${answer}
            </button>
        `;
    });

    questionHTML += '</div></div>';
    // Insert the question HTML into the question container
    questionContainer.innerHTML = questionHTML;
}

// Function to check if the selected answer is correct
function checkAnswer(answerIndex) {
    const question = questions[currentQuestion];
    // If the selected answer matches the correct answer index
    if (answerIndex === question.correct) {
        score++;  // Increment the score
    }

    currentQuestion++;  // Move to the next question
    showQuestion();  // Display the next question
}

// Function to display the final results
function showResult() {
    questionContainer.innerHTML = '';  // Clear the question container
    resultDiv.classList.remove('hidden');  // Show the result container
    
    // Create and display the results HTML
    resultDiv.innerHTML = `
        <h2 class="result-title">Quiz Complete!</h2>
        <p class="result-score">Your score: ${score} out of ${questions.length}</p>
        <button onclick="resetQuiz()" class="try-again-button">
            Try Again
        </button>
    `;
}

// Function to reset the quiz to its initial state
function resetQuiz() {
    currentQuestion = 0;  // Reset question counter
    score = 0;  // Reset score
    resultDiv.classList.add('hidden');  // Hide results
    initialInfo.style.display = 'block';  // Show initial information
    quizContent.classList.add('hidden');  // Hide quiz content
} 