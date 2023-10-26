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
    // Global variables
    const startButton = document.getElementById("start-button");
    const timerEl = document.getElementById('timer');
    let maxTime = 120;
    let currentTime = maxTime;
    let timerInterval;
    let currentQuestion = 0;
    let playerGrade = 0; 

    // Function to create a running timer
    function updateTimer() {
        timerEl.textContent = "Time: " + currentTime;
        // When the timer hits zero end quiz and reset timer
        if (currentTime <= 0) {
          endQuiz();
          clearTime(timerInterval);
        }
        // Otherwise deincrament to subtract seconds
        currentTime--;
      }
      // Add event listener to start the quiz a start timer
      startButton.addEventListener("click", function () {
        timerInterval = setInterval(updateTimer, 1000);
        // Hide start screen display questions array
        document.getElementById("start-container").classList.add("hide");
        document.getElementById("question-container").classList.remove("hide");
        displayQuestion(questionsArray[currentQuestion]);
    });
  
        // Select all the buttons on the page
        document.querySelectorAll(".btn").forEach(function (btn) {
        // Loop the buttons and add event listener
        btn.addEventListener("click", function () {
        // Get answer text
        let selectAnswer = this.textContent;
        // Check if answer is correct
        let isCorrect = selectAnswer.includes(questionsArray[currentQuestion].correct);
        // If correct increase the score
        if (isCorrect) {
          playerGrade++;
          // Alert when correct
          displayAlert("Correct", 1000, true);
        } else {
            displayAlert("Wrong", 1000, false);
        }
        setTimeout(function() {
          // Move to next question
        currentQuestion++;  
        if(currentQuestion <questionsArray.length) {
            displayQuestion(questionsArray[currentQuestion]); 
        } else {
            endQuiz();
        }
        }, 1000); 
    }); 
  });
        // Function to end the quiz
        function endQuiz() {
        clearInterval(timerInterval);
        document.getElementById("question-container").classList.add("hide");
        document.getElementById("score-container").classList.remove("hide");
        document.getElementById("your-score").textContent = "Your score is: " + playerGrade;
  }
    
        
        function displayAlert (message, duration, isCorrect) {
            const alertDiv = document.createElement("div");
            alertDiv.textContent = message;
            alertDiv.classList.add("alert");            

            if (isCorrect) {
                alertDiv.classList.add("correct");
            }

            document.body.appendChild(alertDiv);

            setTimeout (function() {
                alertDiv.classList.add("hide");
                document.body.removeChild(alertDiv);
            }, duration);
        }
    
    // Function to display the question
    function displayQuestion(qData) {
        document.getElementById("question").textContent = qData.text;
        qData.answers.forEach((answer, index) => {
        document.querySelectorAll(".btn")[index].textContent = answer;
    });  
  }
  
  const submitBtn = document.getElementById("submit-btn");
    submitBtn.addEventListener("click", function() {
    document.getElementById("score-container").classList.add("hide");
    document.getElementById("highscores").classList.remove("hide");
    viewHighScores();
  });

  function viewHighScores() {
    const highScore = [
        {initials:"", score: "" },
    ];
    const highScoreL = document.getElementById("highscores-list");
    
    // Clears the existing list
    highScoreL.innerHTML="";
    // Display high scores
    highScore.forEach(score => {
        const li = document.createElement("li");
        li.textContent = `${score.initials}: ${score.score}`;
        highScoreL.appendChild(li);
    });
    
  }
  

  
  
  
  
  