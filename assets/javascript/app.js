$(document).ready(function () {

    var currentQuestion = 0;
    var correctResponse = null;
    var timeLeft = 30;
    var intervalID;
    var questionsRight = 0;
    var questionsWrong = 0;
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
            question: "What state was Ryan Bregier born in?",
            answerOptions: ["North Carolina", "Florida", "Michigan", "South Carolina"],
            correctAnswerPosition: 1,
            gif: "assets/images/florida.jpg"
        },
        {
            question: "What high school did Ryan go to?",
            answerOptions: ["South Charlotte", "Myers Park", "South Meck", "Providence"],
            correctAnswerPosition: 1,
            gif: "assets/images/Myers-Park-High-School.png"
        },
        {
            question: "What was Ryan's favorite band in middle school?",
            answerOptions: ["The Beatles", "Lynard Skynard", "Everclear", "Blink 182"],
            correctAnswerPosition: 3,
            gif: "assets/images/blink182.gif"
        },
        {
            question: "Who was Ryan's favorite rapper in middle school?",
            answerOptions: ["Dr. Dre", "50 Cent", "Nas", "Eminem"],
            correctAnswerPosition: 2,
            gif: "assets/images/nas.gif"
        },
        {
            question: "How many grades ahead was Ryan in math in High School?",
            answerOptions: ["1", "2", "3", "4"],
            correctAnswerPosition: 1,
            gif: "assets/images/math.gif"
        },
        {
            question: "What was the name of Ryan's private school?",
            answerOptions: ["Grace Academy", "Providence Day", "United Faith", "Christian Day"],
            correctAnswerPosition: 2,
            gif: "assets/images/ufca.jpg"
        }

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

    }

    function checkEndGame() {
        if (currentQuestion === triviaObjectArray.length) {
            showGameCredits();
        }
    }

    function showConfirmation() {
        var answers = triviaObjectArray[currentQuestion].answerOptions;
        var correctAnswer = answers[triviaObjectArray[currentQuestion].correctAnswerPosition];
        var confirmation = $("<div>");
        $(confirmation).addClass("#confirmation");
        $(confirmation).text("The correct answer is " + correctAnswer + "!");
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
    }

    function clearOldText() {
        $("#question").empty();
        $("#answers-area").empty();
        $("#countdown-timer").empty();
    }

    function announceCorrect() {
        showConfirmation();
        questionsRight++;
        currentQuestion++;
        checkEndGame();
        setTimeout(generateTriviaQuestion, 3000);
        setTimeout(generateTriviaAnswers, 3000);
    }

    function announceIncorrect() {
        showConfirmation();
        questionsWrong++;
        currentQuestion++;
        checkEndGame();
        setTimeout(generateTriviaQuestion, 3000);
        setTimeout(generateTriviaAnswers, 3000);
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
        $("#countdown-timer").html("<h2>" + timeLeft + "</h2>");
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
        newQuestionSpan.text(newQuestion);
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


    $("#start-button").on("click", function () {
        $("#start-button-area").empty();
        generateTriviaQuestion();
        generateTriviaAnswers();
    })

    // When an answer option is clicked, check to see if it's correct, then show correct gif
    $(document).on("click", ".answer-options", function (event) {
        evaluateAnswer(event);
    })

});