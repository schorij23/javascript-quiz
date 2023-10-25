// Create an array of questions
let questionsArray = [
    {
      text: "What is string?",
      answers: ["A) a number", "B) a text character or word", "C) a variable", "D) a way to store objects"],
      correct: "B",
    },
    {
      text: "What is a variable?",
      answers: ["A) a number", "B) a text character", "C) a countainer that holds a value", "D) a question"],
      correct: "C",
    },
    {
      text: "What is an Array used for in coding?",
      answers: ["A) Space staion energy storage", "B) A way to design draw multiple copies of a pattern", "C) A way to store a list or colllection of items in a sing variable name", "D) A way to store primative data types or values"],
      correct: "C",
    },
  ];
    let startButton = document.getElementById("start-button");
    let timerEl = document.getElementById('timer');
    let maxTime = 120;
    let currentTime = maxTime;
    let timerInterval;
    let currentQuestion = 0;
    let playerGrade = 0; 

   
    function updateTimer() {
        timerEl.textContent = "Time: " + currentTime;
        if (currentTime <= 0) {
          endQuiz();
          clearInterval(timerInterval);
        }
        currentTime--;
      }
      
      startButton.addEventListener("click", function () {
        timerInterval = setInterval(updateTimer, 1000);
        document.getElementById("start-container").classList.add("hide");
        document.getElementById("question-container").classList.remove("hide");
        displayQuestion(questionsArray[currentQuestion]);
    });
  
      document.querySelectorAll(".btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        let selectAnswer = this.textContent;
        let isCorrect = selectAnswer.includes(questionsArray[currentQuestion].correct);

        if (isCorrect) {
          playerGrade++;
        }

        currentQuestion++;

        if(currentQuestion <questionsArray.length) {
          displayQuestion(questionsArray[currentQuestion]);
        }else {
          endQuiz();
        }
    });
  });
    
  // Function to display the question
  function displayQuestion(qData) {
    document.getElementById("question").textContent = qData.text;
    qData.answers.forEach((answer, index) => {
      document.querySelectorAll(".btn")[index].textContent = answer;
    });  
  }
     
  // Function to end the quiz
  function endQuiz() {
    clearInterval(timerInterval);
    document.getElementById("question-container").classList.add("hide");
    document.getElementById("score-container").classList.remove("hide");
    document.getElementById("your-score").textContent = "Your score is: " + playerGrade;
  }
  