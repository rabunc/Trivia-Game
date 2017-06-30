$(document).ready(function() {

    var currentQuestion = 0;

    var triviaObjectArray = [
            {
            question: "How many National Championships has UNC won?",
            answerOptions: ["4","9","6","3"],
            // "correct answer position" counting from 0, i.e. [2] is the 3rd option
            correctAnswerPosition: 2 
        },
            {
            question: "How many NBA Championships did Michael Jordan win?",
            answerOptions: ["6","2","5","8"],
            correctAnswerPosition: 0 
        },
            {
            question: "What is the name of the main character of Burn Notice?",
            answerOptions: ["Michael Scott","Michael Westen","Jason Bourne","Jason Stallman"],
            correctAnswerPosition: 1
        }
    ]

    function generateTriviaAnswers() {
        var answers = triviaObjectArray[currentQuestion].answerOptions;
        for (i=0;i<answers.length;i++) {
            var newAnswersDiv = $("<div>");
            $(newAnswersDiv).addClass("answer-options");
            $(newAnswersDiv).text(answers[i]);
            $("#answers-area").append(newAnswersDiv);
        }
        currentQuestion++;
    }

    function generateTriviaQuestion() {
        var newQuestionSpan = $("<span>");
        var question
        // Pull question from triviaObjectArray sequentially
        newQuestionSpan.text(triviaObjectArray[currentQuestion].question);
        console.log(triviaObjectArray[currentQuestion].question);
        $("#question").append(newQuestionSpan);
    }

    $("#start-button").on("click", function() {
        $("#start-button").empty();
        generateTriviaQuestion();
        generateTriviaAnswers();
    })

});