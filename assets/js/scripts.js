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
    let totalQuestions = questionsArray.length;


    // Select the high scores link
    const highScoresLink = document.getElementById("highscores-link");
    // Select the high scores section
    const highScoresSection = document.getElementById("highscores");

    // Add a click event listener to the link
    highScoresLink.addEventListener("click", function(event) {
        // Prevent link from navigating to a new page)
        event.preventDefault();
    // Show the high scores section
    highScoresSection.classList.remove("hide");
    document.getElementById("start-container").classList.add("hide");

    });

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
          displayAlert("You have selected the correct answer", 1000, true);
        } else {
            // Wrong answer subtrack 10 sec
            currentTime -= 10;
            if (currentTime < 0) {
                // Make sure 0 restarts quiz no negatives
                currentTime = 0;
      }
            displayAlert("You have selected the wrong answer", 1000, false);
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
        // Calculate the percentage score
        let percentageScore = (playerGrade / totalQuestions) * 100;
        document.getElementById("your-score").textContent = "Your grade is: " + percentageScore.toFixed(2) + "%";
        // document.getElementById("your-score").textContent = "Your score is: " + playerGrade;
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
    let highScore = [];
    const submitBtn = document.getElementById("submit-btn");
    submitBtn.addEventListener("click", function() {
     
    // Get the user's initials from the input field    
    const initialsInput = document.getElementById("initials");
    const userInitials = initialsInput.value;

    // Create an object with user initials and their score
    const userScoreObject = {
      initials: userInitials,
      correctAnswers: playerGrade,
      totalQuestions: totalQuestions
  };
  
    // Push the user's score to the highScore array
    highScore.push(userScoreObject);

    // Sort the highScore array by score in descending order
    highScore.sort((a, b) => b.score - a.score);

    // Update the high scores display
    viewHighScores();


    document.getElementById("score-container").classList.add("hide");
    document.getElementById("highscores").classList.remove("hide");
    // viewHighScores();
  });

  
  function viewHighScores() {
    const highScoreList = document.getElementById("highscores-list");
    const highScoreTitle = document.querySelector(".center");


    // Sort the highScore array by correctAnswers in descending order
    highScore.sort((a, b) => b.correctAnswers - a.correctAnswers);
    
    // Clears the existing list
    highScoreList.innerHTML="";
    // Display high scores
    highScore.forEach(score => {
        const li = document.createElement("li");

        const percentageScore = (score.correctAnswers / score.totalQuestions) * 100;
        li.textContent = `${score.initials}: ${score.correctAnswers} out of ${score.totalQuestions}  (${percentageScore.toFixed(2)}%)`;

        highScoreList.appendChild(li);
    });

    // Update the title with "High-Scores"
    highScoreTitle.textContent = "High-Scores";
    
  }

    const clearBtn = document.getElementById("clear-btn");

    clearBtn.addEventListener("click", function () {
    // Remove all list items from the high scores list
    const highScoreList = document.getElementById("highscores-list");
    highScoreList.innerHTML = "";
    // Clear the Array
    highScore = [];
    });    
  
    const restartBtn = document.getElementById("restart-btn");

    restartBtn.addEventListener("click", function () {
      // Clear the previous timer interval
      clearInterval(timerInterval);
      
      // Reset the timer to its initial value (maxTime)
      currentTime = maxTime;
      // Update the timer display with the reset time
      timerEl.textContent = "Time: " + currentTime;

      // Hide the score container
      document.getElementById("highscores").classList.add("hide");
      // Show the start container
      document.getElementById("start-container").classList.remove("hide");
      // Reset necessary variables or states to restart the quiz
      currentQuestion = 0;
      playerGrade = 0;
    });
  
  
  
  
  
  