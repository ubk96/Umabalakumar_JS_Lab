function Question(text, choices, answer) {
    this.answer = answer;
    this.choices = choices;
    this.text = text;
}
Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
}

var questions = [
    new Question("JavaScript Supports", ["Functions", "XHTML", "CSS", "HTML"], "Functions"),
    new Question("Which language is used for Styling Pages?", ["JQuery", "XML", "CSS", "HTML"], "CSS"),
    new Question("Which is not a JavaScript Framework? ", ["Python Script", "JQuery", "Django", "NodeJs"], "Django"),
    new Question("Which is used to connect to a Database", ["JS", "CSS", "HTML", "PHP"], "PHP"),
    new Question("JavaScript is a", ["Programming Language", "Language", "Development", "All"], "Programming Language")

];

//We will play a quiz
//Initial score is 0
//Starting Point is q1=>index = 0;
//load all questions in the quiz

function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;

}

Quiz.prototype.getQuestionByIndex = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
}

Quiz.prototype.choiceOptionWithAnswer = function (answer) {
    if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}
function handleOptionButton(id, choice) {
    var button = document.getElementById(id);
    button.onclick = function () {
        //check the answer
        quiz.choiceOptionWithAnswer(choice);
        //load the next question
        loadQuestions();
    }

}
function loadQuestions() {
    if (quiz.isEnded()) {
        showscores();
        //show the result
    } else {
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionByIndex().text;

        //show options
        var choices = quiz.getQuestionByIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            var ele = document.getElementById("choice" + i);
            ele.innerHTML = choices[i];
            handleOptionButton("btn" + i, choices[i]);
        }
        //showing the progress
        showProgress();

    }
}
function showProgress() {
    var el = document.getElementById("progress");
    el.innerHTML = "Question " + (quiz.questionIndex+1) + " of " + quiz.questions.length;
}
    function showscores() {
        var gameOverHTML = "<h1>Result<h1>";
        gameOverHTML += "<h2 id ='score'> Your Score : " + quiz.score + ". Your Percentage is :: " + (quiz.score / questions.length * 100) + "%</h2>";
        var e = document.getElementById("quiz");
        e.innerHTML = gameOverHTML;
    }
    //create Quiz

    var quiz = new Quiz(questions);

    //display questions;
    loadQuestions();