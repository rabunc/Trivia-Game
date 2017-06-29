$(document).ready(function() {

    var currentQuestion = 0;

    var triviaObjectArray = [{
        trivia1: {
            question: "How many National Championships has UNC won?",
            answerOptions: ["4","9","6","3"],
            // "correct answer position" counting from 0, i.e. [2] is the 3rd option
            correctAnswerPosition: 2 
        },
        trivia2: {
            question: "How many NBA Championships did Michael Jordan win?",
            answerOptions: ["6","2","5","8"],
            correctAnswerPosition: 0 
        },
        trivia3: {
            question: "What is the name of the main character of Burn Notice?",
            answerOptions: ["Michael Scott","Michael Westen","Jason Bourne","Jason Stallman"],
            correctAnswerPosition: 1
        }
    }]

    function generateTriviaQuestion() {
        var newQuestion = $("<span>");
        // Pull question from triviaObjectArray sequentially
        newQuestion.text(triviaObjectArray[currentQuestion].question);
        console.log(triviaObjectArray[currentQuestion].question);
        $("#question").append(newQuestion);
        currentQuestion++;


    }

    $("#start-button").on("click", function() {
        $("#start-button").empty();
        generateTriviaQuestion();
    })

});