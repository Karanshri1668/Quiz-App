const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ]
  },
  {
    question: "Which is the smallest country in the world?",
    answers: [
      { text: "Vatican City", correct: true },
      { text: "Bhutan", correct: false },
      { text: "Nepal", correct: false },
      { text: "Sri Lanka", correct: false },
    ]
  },
  {
    question: "Which is the largest desert in the world?",
    answers: [
      { text: "Kalahari", correct: false },
      { text: "Gobi", correct: false },
      { text: "Sahara", correct: false },
      { text: "Antarctica", correct: true },
    ]
  },
  {
    question: "Which is the smallest continent in the world?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Arctic", correct: false },
      { text: "Africa", correct: false },
    ]
  }
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  $("#next-btn").text("Next");
  showQuestion();
}

function showQuestion() {
  $(".answer-buttons").empty(); // Clear existing buttons
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  $("#question").text(questionNo + ". " + currentQuestion.question);

  currentQuestion.answers.forEach(answer => {
    const button = $("<button>").text(answer.text).addClass("btn");
    if (answer.correct) {
      button.data("correct", answer.correct);
    }
    $(".answer-buttons").append(button);
    button.click(selectAnswer);
  });
}

function selectAnswer(e) {
  const selectedBtn = $(e.target);
  const isCorrect = selectedBtn.data("correct") === true;

  // Disable all buttons to prevent further selection
  $(".answer-buttons button").prop("disabled", true);
  
  if (isCorrect) {
    selectedBtn.addClass("correct");
    score++;
  } else {
    selectedBtn.addClass("incorrect");

    // Find the correct button and highlight it
    const correctButton = $(".answer-buttons button").filter(function() {
      return $(this).data("correct") === true;
    });
    correctButton.addClass("correct");
  };

  $("#next-btn").show();
};

function showScore() {
  $(".answer-buttons").empty();
  $("#question").text(`You scored ${score} out of ${questions.length}!`);
  $("#next-btn").text("Play Again").show();
};

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  };
};

$("#next-btn").click(() => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  };
});

startQuiz();