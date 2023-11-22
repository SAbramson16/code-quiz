let startBtn = document.querySelector("#startQuiz");
let submitBtn = document.querySelector("#submitBtn");
let playAgainBtn = document.querySelector("#playAgainBtn");
let clearScoreBtn = document.querySelector("#clearScoreBtn");
let questionBtn = document.querySelector(".questionBtn");
let highscoresBtn = document.querySelector("#highscoresBtn");
let timerEl = document.getElementById('timer');
let introSection = document.querySelector("#introSection");
let questionSection = document.querySelector("#questionSection");
let gameOverSection = document.querySelector("#gameOverSection");
let highscoreSection = document.querySelector("#highscoreSection");
let scoreList = document.querySelector("#scoreList");
let initialsInput = document.getElementById('initialsInput');

//set defaults
let timeLeft = 0;
let isGameOver = false;
let highscoresList = [];
let playerObj = {
  initials: "",
  score: 0
}

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

startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", submitScore);
questionBtn.addEventListener("click", checkAnswer);
playAgainBtn.addEventListener("click", playAgain);
clearScoreBtn.addEventListener("click", clearScore);
highscoresBtn.addEventListener("click", highscoreView);


//setAttribute shows and hides the content on the page based on the quiz section
function startQuiz() {
  // console.log("start");
  startTimer();
  introSection.setAttribute("style", "display: none;");
  questionPresent();
  questionSection.setAttribute("style", "display: block;");
}

function startTimer(){ 
  console.log("start");
  timeLeft = 60;
  let timeInterval = setInterval(function () {
    if(timeLeft > 1) {
      timerEl.textContent = timeLeft;
      timeLeft--;
    } else {timerEl.textContent = '';
      clearInterval(timeInterval);
      if (!isGameOver) {
        gameOver();
      } 
    }
  }, 1000);
}

//shows the question and the corresponding choices based on the currentQuestionIndex, each click of a button runs the checkAnswer function
function questionPresent() {
  let question = document.querySelector(".question");
  question.textContent = quizContent.questions[quizContent.currentQuestionIndex];

  let questionBtn = document.querySelectorAll(".questionBtn");
  //console log for debugging
  // console.log(quizContent.choices[quizContent.currentQuestionIndex].length);
  for (let i = 0; i < quizContent.choices[quizContent.currentQuestionIndex].length; i++) {
    questionBtn[i].textContent = quizContent.choices[quizContent.currentQuestionIndex][i];
    questionBtn[i].addEventListener("click", checkAnswer);
  }
}

//looks for what the user picked vs the actual correct answer
function checkAnswer(event) {
  let currentChoiceIndex = event.currentTarget.getAttribute("value");

  console.log("This is the ID: " + currentChoiceIndex);
  if (quizContent.correctAnswers[quizContent.currentQuestionIndex] == currentChoiceIndex) {
    console.log("that's right");
    playerObj.score++;
  } else {
    console.log("nope");
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

//take away timer
function gameOver() {
  isGameOver = true;
  timerEl.setAttribute("style", "display: none;");
  questionSection.setAttribute("style", "display: none;");
  gameOverSection.setAttribute("style", "display: block;");
}

function submitScore() {
  let storedScores = JSON.parse(localStorage.getItem("highscoresList"));
  if (storedScores !== null) {
    highscoresList=storedScores;
  }

  playerObj.initials = initialsInput.value.trim();
  highscoresList[highscoresList.length] = playerObj;
  localStorage.setItem("highscoresList", JSON.stringify(highscoresList));

  showHighscores();
}

function showHighscores() {
  gameOverSection.setAttribute("style", "display: none;");
  highscoreSection.setAttribute("style", "display: block;");

  scoreList.innerHTML = "";

  for (let i = 0; i < highscoresList.length; i++) {
    let playerObj = highscoresList[i];

    let li = document.createElement("li");
    li.textContent = "Player: " + playerObj.initials + " --- Score: " + playerObj.score;
    li.setAttribute("data-index", i,);
    li.setAttribute("style", "font-size: 30px;")
    //add list to scoreList ul
    scoreList.appendChild(li);
  }
}

//resets quiz to beginning
function playAgain() {
  highscoreSection.setAttribute("style", "display: none;");
  playerObj.score = 0;
  quizContent.currentQuestionIndex = 0;
  timerEl.setAttribute("style", "display: block;");
  timeLeft = 0;
  isGameOver = false;
  startQuiz();
}

function clearScore() {
  highscoresList = [];
  localStorage.setItem("highscoresList", JSON.stringify(highscoresList));
  showHighscores();
}

function highscoreView() {
  introSection.setAttribute("style", "display: none;");
  questionSection.setAttribute("style", "display: none;");
  gameOverSection.setAttribute("style", "display: none;");
  highscoreSection.setAttribute("style", "display: none;");
  showHighscores();
}