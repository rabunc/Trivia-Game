$(document).ready(function () {

    var currentQuestion = 0;

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

    function generateTriviaQuestion() {
        var newQuestionSpan = $("<span>");
        // Pull question from triviaObjectArray sequentially
        newQuestionSpan.text(triviaObjectArray[currentQuestion].question);
        console.log(triviaObjectArray[currentQuestion].question);
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

    function evaluateAnswer() {
        var answers = triviaObjectArray[currentQuestion].answerOptions;
        var correctAnswer = answers[triviaObjectArray[currentQuestion].correctAnswerPosition];
        console.log(correctAnswer)
        console.log(this)
        var selectedOption = $(this).attr("value");
        console.log(selectedOption);
        currentQuestion++;

    }


    $("#start-button").on("click", function () {
        $("#start-button").empty();
        generateTriviaQuestion();
        generateTriviaAnswers();
    })

    // When an answer option is clicked, check to see if it's correct, then show correct gif
    $(document).on("click", ".answer-options", function () {
        evaluateAnswer();
    })

});