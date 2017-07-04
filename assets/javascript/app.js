$(document).ready(function () {

    // Play again button

    var currentQuestion = 0;
    var correctResponse = null;
    var timeLeft = 30;
    var intervalID;
    var questionsRight = 0;
    var questionsWrong = 0;
    var gameOver = false;
    var triviaObjectArray = [
        {
            question: "How many National Championships has UNC won?",
            answerOptions: ["4", "9", "6", "3"],
            // "correct answer position" counting from 0, i.e. [2] is the 3rd option
            correctAnswerPosition: 2,
            gif: "assets/images/UNC.gif"
        },
        {
            question: "How many NBA Championships did Michael Jordan win?",
            answerOptions: ["6", "2", "5", "8"],
            correctAnswerPosition: 0,
            gif: "assets/images/michael_jordan.gif"
        },
        {
            question: "What is the name of the main character of Burn Notice?",
            answerOptions: ["Michael Scott", "Michael Westen", "Jason Bourne", "Jason Stallman"],
            correctAnswerPosition: 1,
            gif: "assets/images/burn_notice.gif"
        },
        {
            question: "What state is Ft. Walton Beach in?",
            answerOptions: ["North Carolina", "Florida", "Michigan", "South Carolina"],
            correctAnswerPosition: 1,
            gif: "assets/images/florida.jpg"
        },

        {
            question: "What band performed 'All The Small Things'?",
            answerOptions: ["The Beatles", "Lynard Skynard", "Everclear", "Blink 182"],
            correctAnswerPosition: 3,
            gif: "assets/images/blink182.gif"
        },
        {
            question: "What rapper performed 'One Mic'?",
            answerOptions: ["Dr. Dre", "50 Cent", "Nas", "Eminem"],
            correctAnswerPosition: 2,
            gif: "assets/images/nas.gif"
        },

        {
            question: "What sport does Christian Pulisic play?",
            answerOptions: ["Basketball", "Soccer", "Baseball", "Track"],
            correctAnswerPosition: 1,
            gif: "assets/images/soccer.jpg"
        },

        {
            question: "What of the following is a Korean martial art?",
            answerOptions: ["Karate", "Kickboxing", "Tae Kwon Do", "Aikido"],
            correctAnswerPosition: 2,
            gif: "assets/images/taekwondo.gif"
        },
    ]

    function showGameCredits() {
        $("#question").empty();
        $("#answers-area").empty();
        $("#countdown-timer").empty();
        $("#confirmation-area").empty();
        $("#gif-area").empty();
        $("#correct").append("You got " + questionsRight + " questions correct!")
        $("#incorrect").append("You got " + questionsWrong + " questions wrong!")
        stopTimer();
        var newStartButton = $("<button>");
        newStartButton.text("Play Again")
        newStartButton.addClass("start-button");
        $("#start-button-area").append(newStartButton)
        return;
    }

    function checkEndGame() {
        if (currentQuestion === triviaObjectArray.length) {
            gameOver = true;
            setTimeout(showGameCredits, 3000)
            stopTimer()
        }
    }

    function showConfirmation() {
        var answers = triviaObjectArray[currentQuestion].answerOptions;
        var correctAnswer = answers[triviaObjectArray[currentQuestion].correctAnswerPosition];
        var confirmation = $("<div>");
        $(confirmation).addClass("#confirmation");
        $(confirmation).text("The answer is " + correctAnswer + "!");
        console.log(confirmation);
        $("#confirmation-area").append(confirmation);
        // Add gif to confirmation
        var confirmationGifURL = triviaObjectArray[currentQuestion].gif;
        var confirmationGif = $("<img>");
        $(confirmationGif).attr("src", confirmationGifURL);
        $(confirmationGif).attr("width", "300px");
        $("#gif-area").append(confirmationGif);
    }

    function clearConfirmation() {
        $("#confirmation-area").empty();
        $("#gif-area").empty();
        $("#correctness-area").empty();
    }

    function clearOldText() {
        $("#question").empty();
        $("#answers-area").empty();
        $("#countdown-timer").empty();
        
    }

    function announceOutOfTime() {
        var correctness = $("<div>")
        $(correctness).text("You're out of time!")
        $("#correctness-area").append(correctness)
        showConfirmation();
        questionsWrong++;
        currentQuestion++;
        if (gameOver != true) {
            setTimeout(generateTriviaQuestion, 3000);
            setTimeout(generateTriviaAnswers, 3000);
        }
    }

    function announceCorrect() {
        var correctness = $("<div>")
        $(correctness).text("That's correct!")
        $("#correctness-area").append(correctness)
        showConfirmation();
        questionsRight++;
        currentQuestion++;
        checkEndGame();
        if (gameOver != true) {
            setTimeout(generateTriviaQuestion, 3000);
            setTimeout(generateTriviaAnswers, 3000);
        }
    }

    function announceIncorrect() {
        var correctness = $("<div>")
        $(correctness).text("That's incorrect!")
        $("#correctness-area").append(correctness)
        showConfirmation();
        questionsWrong++;
        currentQuestion++;
        if (gameOver != true) {
            setTimeout(generateTriviaQuestion, 3000);
            setTimeout(generateTriviaAnswers, 3000);
        }
    }

    function startTimer() {
        timeLeft = 15;
        intervalID = setInterval(decrement, 1000)
    }

    function stopTimer() {
        clearInterval(intervalID);
    }

    function decrement() {
        timeLeft--;
        $("#countdown-timer").html("Time remaining: " + timeLeft + " seconds");
        if (timeLeft === 0) {
            stopTimer();
            clearOldText();
            announceIncorrect();
        }
    }

    function generateTriviaQuestion() {
        clearConfirmation();
        startTimer();
        var newQuestionSpan = $("<span>");
        var newQuestion = triviaObjectArray[currentQuestion].question;
        // Pull question from triviaObjectArray sequentially
        newQuestionSpan.html("<h2>" + newQuestion + "<h2>");
        $("#question").append(newQuestionSpan);
    }

    function generateTriviaAnswers() {
        var answers = triviaObjectArray[currentQuestion].answerOptions;
        for (i = 0; i < answers.length; i++) {
            var newAnswersDiv = $("<button>");
            $(newAnswersDiv).addClass("answer-options");
            $(newAnswersDiv).attr("value", answers[i]);
            $(newAnswersDiv).attr("position", [i]);
            $(newAnswersDiv).text(answers[i]);
            $("#answers-area").append(newAnswersDiv);
        }
    }

    function evaluateAnswer(event) {
        stopTimer()
        var answers = triviaObjectArray[currentQuestion].answerOptions;
        var correctAnswer = answers[triviaObjectArray[currentQuestion].correctAnswerPosition];
        console.log(correctAnswer)
        var selectedOption = event.target.value;
        if (correctAnswer === selectedOption) {
            correctResponse = true;
            clearOldText()
            announceCorrect()
        } else {
            correctResponse = false;
            clearOldText()
            announceIncorrect()
        }
    }

    $(document).on("click", ".start-button", function () {
        $("#start-button-area").empty();
        currentQuestion = 0;
        gameOver = false;
        clearOldText();
        clearConfirmation();
        $("#correct").empty()
        $("#incorrect").empty()
        generateTriviaQuestion();
        generateTriviaAnswers();
    })

    // When an answer option is clicked, check to see if it's correct, then show correct gif
    $(document).on("click", ".answer-options", function (event) {
        evaluateAnswer(event);
    })

});