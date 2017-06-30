$(document).ready(function () {

    var currentQuestion = 0;
    var correctResponse = null;
    var triviaObjectArray = [
        {
            question: "How many National Championships has UNC won?",
            answerOptions: ["4", "9", "6", "3"],
            // "correct answer position" counting from 0, i.e. [2] is the 3rd option
            correctAnswerPosition: 2
        },
        {
            question: "How many NBA Championships did Michael Jordan win?",
            answerOptions: ["6", "2", "5", "8"],
            correctAnswerPosition: 0
        },
        {
            question: "What is the name of the main character of Burn Notice?",
            answerOptions: ["Michael Scott", "Michael Westen", "Jason Bourne", "Jason Stallman"],
            correctAnswerPosition: 1
        }
    ]
    function clearOldText() {
        $("#question-area").empty();
        $("#answers-area").empty();
    }

    function announceCorrect() {
        alert("That's the correct answer!")
        setTimeout(generateTriviaQuestion, 350)
        setTimeout(generateTriviaAnswers, 450)
    }

    function announceIncorrect() {
        alert("That's the wrong answer!");
        setTimeout(generateTriviaQuestion, 350)
        setTimeout(generateTriviaAnswers, 450)
    }

    function generateTriviaQuestion() {
        var newQuestionSpan = $("<span>");
        var newQuestion = triviaObjectArray[currentQuestion].question
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
        var answers = triviaObjectArray[currentQuestion].answerOptions;
        var correctAnswer = answers[triviaObjectArray[currentQuestion].correctAnswerPosition];
        console.log(correctAnswer)
        var selectedOption = event.target.value;
        if (correctAnswer === selectedOption) {
            correctResponse = true;
            setTimeout(clearOldText, 0)
            setTimeout(announceCorrect, 100)
        } else {
            correctResponse = false;
            setTimeout(clearOldText, 0)
            setTimeout(announceIncorrect, 100)
            
        }
        currentQuestion++;

    }


    $("#start-button").on("click", function () {
        $("#start-button").empty();
        generateTriviaQuestion();
        generateTriviaAnswers();
    })

    // When an answer option is clicked, check to see if it's correct, then show correct gif
    $(document).on("click", ".answer-options", function(event) {
        evaluateAnswer(event);
    })

});