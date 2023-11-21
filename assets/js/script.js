let startBtn = document.querySelector("#startQuiz");
let timerEl = document.getElementById('timer');
let introSection = document.querySelector("#introSection");
let questionSection = document.querySelector("#questionSection");
let gameOverSection = document.querySelector("#gameOverSection");
let highscoresSection = document.querySelector("#higscoresSection");
let submitBtn = document.querySelector("#submitBtn");
let questionBtn = document.querySelector(".questionBtn");

// let questionNumber = 0;
// let answerNumber = 0;
let isRight = false;
let chosenAnswer = false;
let timeLeft = 0;

let correctAnswers = [];

let quizContent = {
  questions: ["Commonly used data types DO NOT include: ", 
              "The condition in an if/else statement is enclosed within ______.", 
              "Arrays in JavaScript can be used to store______.", 
              "String values must be enclosed within ______ when being assigned to letiables.", 
              "A very useful tool used during development and debugging for printing content to the debugger is:"],
  choices: [
    ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
    ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
    ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console log"]
  ],
  correctAnswers: [2, 1, 3, 2, 3],
  currentQuestionIndex: 0,
}
//Add event listener to the start quiz button
startBtn.addEventListener("click", startQuiz);


answerBtn.addEventListener("click", checkAnswer);

// startBtn.addEventListener("click", clearHighscores);
// startBtn.addEventListener("click", playAgain);



function startTimer(){ 
  console.log("start");
  timeLeft = 60;
  let timeInterval = setInterval(function () {
    if(timeLeft > 1) {
      timerEl.textContent = timeLeft;
      timeLeft--;
    } else {timerEl.textContent = '';
      clearInterval(timeInterval);
      gameOver();
    }
  }, 1000);
}

function startQuiz() {
  // console.log("start");
  startTimer();
  introSection.setAttribute("style", "display: none;")
  questionPresent();
  questionSection.setAttribute("style", "display: block;")

  
}


function questionPresent() {
  let question = document.querySelector(".question");
  question.textContent = quizContent.questions[quizContent.currentQuestionIndex];

  let questionBtn = document.querySelectorAll(".questionBtn");
  console.log(quizContent.choices[quizContent.currentQuestionIndex].length);
  for (let i = 0; i < quizContent.choices[quizContent.currentQuestionIndex].length; i++) {
    questionBtn[i].textContent = quizContent.choices[quizContent.currentQuestionIndex][i];
    questionBtn[i].addEventListener("click", checkAnswer);
    // console.log(questionBtn);
  }
}

function gameOver() {
  questionSection.setAttribute("style", "display: none;")
  gameOverSection.setAttribute("style", "display: block;")

  
  submitBtn.addEventListener("click", showHighscores);
}

function showHighscores() {
  let scores = localStorage.getItem("scores");
  scoresList.textContent = scores;
}

function checkAnswer(evt) {
  let currentChoiceIndex = evt.currentTarget.getAttribute("value");
  console.log("This is the ID: " + currentChoiceIndex);
  if (quizContent.correctAnswers[quizContent.currentQuestionIndex] == currentChoiceIndex) {
    isWin = true;
  } else {
    timeLeft-=5;
  }
  
  console.log("check answer");
  if (quizContent.currentQuestionIndex >= 4 || timeLeft == 0) {
    gameOver();
  } else {
    quizContent.currentQuestionIndex++;
    questionPresent();
  }
}
