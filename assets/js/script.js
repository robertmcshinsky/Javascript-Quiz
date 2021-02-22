let QA = {
  0: {
    question: "1) Inside which HTML element do we put the JavaScript?",
    answer: "script",
  },
  1: {
    question:
      '2) What is the correct JavaScript syntax to write "Hello World"?',
    answer: 'document.write("Hello World")',
  },
  2: {
    question: "Where?",
    answer: "Correct3",
  },
  3: {
    question: "When?",
    answer: "Correct4",
  },
  4: {
    question: "Why?",
    answer: "Correct5",
  },
};
let wrongAnswers = [
  "Wrong1",
  "Wrong2",
  "Wrong3",
  "Wrong4",
  "Wrong5",
  "Wrong6",
  "Wrong7",
];
let initials = [];
let score = [];
let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
let leaderboardScore = [];
let myScore = 0;
let playerNum = 0;
let i = 0;
let time;
let timerEl = document.getElementById("time");

function main() {
  window.onload = document.getElementById("topSection").innerHTML =
    '<button id="start">Start</button>';
  document.getElementById("start").addEventListener("click", playGame);
}

function playGame() {
  console.log("playGame");

  displayQuiz();
  time = setInterval(timer, 1000);
}

function displayQuiz() {
  console.log("displayQuiz");
  resetPage();

  let size = Object.keys(QA).length;
  let question = "";
  function displayQuestion(i) {
    console.log("displayQuestion");
    question = "<h1 id='question'>" + QA[i].question + "</h1>";
    document.getElementById("topSection").innerHTML = question;
  }
  function displayAnswers(i) {
    console.log("displayAnswers");
    let answer = "<h1 id='correct'>" + QA[i].answer + "<h1>";
    document.getElementById("midSection").innerHTML = answer;
    document.getElementById("correct").addEventListener("click", function () {
      myScore++;
      score[playerNum] = myScore;
      document.getElementById("correct").style.backgroundColor = "green";
      ++i;
      displayQuiz();
    });
  }

  //
  //

  function displayFakeAnswers() {
    console.log("displayFakeAnswers");

    let aboveOrBelow = "";

    for (let k = 0; k < 3; ++k) {
      let rnd = Math.floor(Math.random() * 3);
      let randNum = Math.floor(Math.random() * wrongAnswers.length);
      let fakeAnswer =
        "<h1 id='fake" + k + "'>" + wrongAnswers[randNum] + "</h1>";

      if (rnd > 1) {
        aboveOrBelow = "beforeEnd";
        document
          .getElementById("midSection")
          .insertAdjacentHTML(aboveOrBelow, fakeAnswer);
      } else {
        aboveOrBelow = "afterBegin";
        document
          .getElementById("midSection")
          .insertAdjacentHTML(aboveOrBelow, fakeAnswer);
      }
    }
    document.getElementById("fake0").addEventListener("click", function () {
      timerEl.innerText = timerEl.innerText - 5;
      document.getElementById("fake0").style.backgroundColor = "red";
    });
    document.getElementById("fake1").addEventListener("click", function () {
      timerEl.innerText = timerEl.innerText - 5;
      document.getElementById("fake1").style.backgroundColor = "red";
    });
    document.getElementById("fake2").addEventListener("click", function () {
      timerEl.innerText = timerEl.innerText - 5;
      document.getElementById("fake2").style.backgroundColor = "red";
    });
  }

  //
  //

  function displayNextButton() {
    document.getElementById("bottomSection").innerHTML =
      "<button id='next'>NEXT</button>";
    document.getElementById("next").addEventListener("click", displayQuiz);
    ++i;
  }

  //! CALLING THE FUNCTIONS

  if (i < size) {
    displayQuestion(i);
    displayAnswers(i);
    displayFakeAnswers();
    displayNextButton();
  } else {
    displayScore();
    i = 0;
  }
}

function displayScore() {
  console.log("displayScore");
  resetPage();
  stopTimer();

  initials[playerNum] = prompt("What are your Initials?").toUpperCase();
  i = 0;
  myScore = 0;

  document.getElementById("topSection").innerHTML =
    "<h1 id='score'>Score = " +
    score[playerNum] +
    "</h1><button id='again'>Try Again</button><button id='leaderboard'>View Leaderboard</button>";
  document.getElementById("again").addEventListener("click", main);
  document
    .getElementById("leaderboard")
    .addEventListener("click", displayLeaderboard);
  playerNum++;
  storeInitialsAndScore();
}

function displayLeaderboard() {
  console.log("displayLeaderboard");
  resetPage();

  document.getElementById("topSection").innerHTML =
    "<h1 id='leaderboard1'>Leaderboard</h1>";

  for (let i = 0; i < leaderboard.length; ++i) {
    document
      .getElementById("midSection")
      .insertAdjacentHTML(
        "beforeend",
        "<h3 id='theScoreboard'>" +
          leaderboard[i].initials +
          " - " +
          leaderboard[i].score +
          "</h3>"
      );
  }
}

function timer() {
  let times = parseInt(timerEl.innerHTML);
  console.log(times);
  if (times > 0) {
    timerEl.innerHTML = --times;
  } else {
    stopTimer();
    displayScore();
  }
  if (times < 0) {
    gameOver();
  }
}

function stopTimer() {
  clearInterval(time);
}

function gameOver() {
  console.log("gameOver");
  resetPage();
  document.getElementById("topSection").innerHTML =
    "<h1 id='gameOver'>Game Over</h1>" +
    "</h1><button id='again'>Try Again</button>";
  document.getElementById("again").addEventListener("click", main);
  timerEl.innerText = 20;
}

function storeInitialsAndScore() {
  console.log("storeInitialsAndScore");

  for (let i = 0; i < score.length; ++i) {
    leaderboard.push({ score: score[i], initials: initials[i] });
  }
  leaderboard.sort(function (a, b) {
    return b.score - a.score;
  });
  console.log(leaderboard);

  // Local Storage
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function resetPage() {
  console.log("resetPage");
  document.getElementById("topSection").innerHTML = "";
  document.getElementById("midSection").innerHTML = "";
  document.getElementById("bottomSection").innerHTML = "";
}

//! CALLED THE MAIN FUNCTION
main();
