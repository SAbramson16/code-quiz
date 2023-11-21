let startBtn = document.querySelector("#startQuiz");
let timerEl = document.getElementById('timer');
let introSection = document.querySelector("#introSection");
let questionSection = document.querySelector("#questionSection");
let gameOverSection = document.querySelector("#gameOverSection");
let highscoreSection = document.querySelector("#highscoreSection");
let submitBtn = document.querySelector("#submitBtn");
let questionBtn = document.querySelector(".questionBtn");
let scoreList = document.querySelector("#scoreList");
let pickedChoice = document.getElementById('#pickedChoice');


let timeLeft = 0;

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
//Add event listener to the start quiz button
startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", submitScore);

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
  introSection.setAttribute("style", "display: none;");
  questionPresent();
  questionSection.setAttribute("style", "display: block;");
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
  questionSection.setAttribute("style", "display: none;");
  gameOverSection.setAttribute("style", "display: block;");
  //stop/clear timer
  
}

function submitScore() {
  //set score in local storage
  //get highscores list append to list, the playerObj
  highscoresList.push(playerObj);
  
  let storedScores = JSON.parse(localStorage.getItem("playerObj"));
  if (storedScores !== null) {
    highscoresList=storedScores;
  }
  localStorage.setItem("highscoresList", JSON.stringify(playerObj));

  showHighscores();
}

function showHighscores() {
  gameOverSection.setAttribute("style", "display: none;");
  highscoreSection.setAttribute("style", "display: block;");

  

  scoreList.innerHTML = "";

  for (let i = 0; i < highscoresList.length; i++) {
    let playerObj = highscoresList[i];

    let li = document.createElement("li");
    li.textContent = playerObj.initials + playerObj.score;
    li.setAttribute("data-index", i);

    scoreList.appendChild(li);
    
  }

//get high scores list and populate


  // let scores = localStorage.getItem("scores");
  // scoresList.textContent = scores;
}

function checkAnswer(evt) {
  let currentChoiceIndex = evt.currentTarget.getAttribute("value");
  pButtonId = "pickedChoice" + currentChoiceIndex;
  let pButton = document.getElementById(pButtonId);

  console.log("This is the ID: " + currentChoiceIndex);
  if (quizContent.correctAnswers[quizContent.currentQuestionIndex] == currentChoiceIndex) {
    pickedChoice.textContent = "That's right!";
    playerObj.score++;
  } else {
    //textcontent wrong
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
