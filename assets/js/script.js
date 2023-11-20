var startBtn = document.querySelector("#startQuiz");
var timerEl = document.getElementById('timer');
var viewDisplay = document.querySelector("#viewDisplay");

// var questions [];

//Add event listener to the start quiz button
startBtn.addEventListener("click", startQuiz);
// answerBtn.addEventListener("click", answer);
// startBtn.addEventListener("click", startQuiz);
// startBtn.addEventListener("click", startQuiz);

quizContent = {
  questions: ["Commonly used data types DO NOT include: ", 
              "The condition in an if/else statement is enclosed within ______.", 
              "Arrays in JavaScript can be used to store______.", 
              "String values must be enclosed within ______ when being assigned to variables.", 
              "A very useful tool used during development and debugging for printing content to the debugger is:"],
  answers: [
    ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
    ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
    ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console log"]
  ],
  currentQuestion: 0,
}

function startTimer(){ 
  var timeLeft = 60;
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
  questionPresent();

}

function questionPresent() {
  viewDisplay.innerHTML = "";

  let h1 = document.createElement("h1");
  h1.textContent = "question";
  h1.setAttribute("data-index", 0); //change 0 to i
 
  let ul = document.createElement("ul");

  let li = document.createElement("li");
  li.textContent = "answers";
  //create button
  li.setAttribute("data-index", 0); //change 0 to i
  ul.appendChild(li);
  //for loop

  viewDisplay.appendChild(h1);
  viewDisplay.appendChild(ul);
  

}