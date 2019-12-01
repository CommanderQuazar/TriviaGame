// Var references
var questionID, question, choiceA, choiceB, choiceC, choiceD, questions, numQuestions, userChoice, correct, qInfo,
    length, current, score, points, defaultQuestions;
current = 0;
score = 0;
points = [];
defaultQuestions = [
    {
        question: "Where are the three smallest bones in the human body?",
        choiceA: "middle ear",
        choiceB: "nose",
        choiceC: "toes",
        choiceD: "eyes",
        correct: "A"
    },
    {
        question: "What is the most abundant element in the Universe?",
        choiceA: "Helium",
        choiceB: "Oxygen",
        choiceC: "Lithium",
        choiceD: "Hydrogen",
        correct: "D"
    },
    {
        question: "Approximately how long does it take for light to travel from the Sun's surface to the Earth?",
        choiceA: "8 days",
        choiceB: "8 seconds",
        choiceC: "8 minutes",
        choiceD: "8 hours",
        correct: "C"
    },
    {
        question: "What is 10/2?",
        choiceA: "5",
        choiceB: "2",
        choiceC: "8",
        choiceD: "9",
        correct: "A"
    },
    {
        question: "Which planet has the most moons?",
        choiceA: "Saturn",
        choiceB: "Mars",
        choiceC: "Jupiter",
        choiceD: "Uranus",
        correct: "C"
    }];
// reference HTML elements
var elQuiz = document.getElementById("quiz");
var elQuizStatus = document.getElementById("quizStatus");

//Quiz elements
var elQuestion = document.getElementById("question");
var elChoiceA = document.getElementById("choiceA");
var elChoiceB = document.getElementById("choiceB");
var elChoiceC = document.getElementById("choiceC");
var elChoiceD = document.getElementById("choiceD");
var userGuess = document.getElementsByName("choices");

//next and back buttons
var next = document.getElementById("next").onclick = moveNext;
var back = document.getElementById("back").onclick = moveBack;

// start quiz
populateQuestions();
renderQuestion();
document.getElementById("submit").onclick = gradeQuestion;

function populateQuestions(){

    // populate with default questions
    questions = defaultQuestions;
    // if local storage contains questions, add to question set
    if(localStorage.getItem("questions")){
        var storedQuestions = JSON.parse(localStorage.getItem("questions"));
        for(var i = 0; i < storedQuestions.length; i++){
            questions.push(storedQuestions[i]);
        }
    }
    numQuestions = questions.length;
}
function populateQuestionInfo(){
    // populate current question info from question list
    question = questions[current].question;
    qInfo = questions[current];
    choiceA = qInfo.choiceA;
    choiceB = qInfo.choiceB;
    choiceC = qInfo.choiceC;
    choiceD = qInfo.choiceD;
    correct = qInfo.correct;

}

function renderQuestion(){
    // display question on web page
    questionID = current + 1;
    elQuizStatus.innerHTML = "Question " + (questionID) + " of " + (numQuestions);
    populateQuestionInfo();
    elQuestion.innerHTML = question;
    elChoiceA.innerHTML = choiceA;
    elChoiceB.innerHTML = choiceB;
    elChoiceC.innerHTML = choiceC;
    elChoiceD.innerHTML = choiceD;
}
function gradeQuestion() {
    if (getUserChoice()) {
        if (userChoice === questions[current].correct) {
            score ++;
            points[current] = 1;
        }
        else{
            points[current] = 0;
        }
        if (current === questions.length-1) {
            endGame();
        } else {
        current++;
        renderQuestion()
        }
    }
}


function getUserChoice() {
    for (var i = 0, length = userGuess.length; length > i; i++) {

        if (userGuess[i].checked) {
            userChoice = userGuess[i].value;

            //clears radio for next guess
            userGuess[i].checked = false;
            return true;
        }

    }
    //user didnt select an ans.
    alert("Please select an answer before continuing");
    return false;

}
//ends game displays graded question
function endGame() {
    elQuiz.innerHTML = "<h1> YOUR SCORE: " + score + " out of " + numQuestions + "</h1>";
    for (var i = 0; i < points.length; i++) {
        var summery = document.createElement("p");
        if (points[i] === 0) {
            summery.innerHTML = "Question #" + (i + 1) + ": INCORRECT";
            summery.style.color = "red";
        } else {
            summery.innerHTML = "Question #" + (i + 1) + ": CORRECT";
            summery.style.color = "green";
        }
        elQuiz.appendChild(summery);
        //displays link to retake quiz or enter a new question
        document.getElementById("options").style.display = "block";
    }
}

// move back in question order
function moveBack() {
    current--;
    //default back value
    if (current > -1) {
    renderQuestion();
    }
    else {
        alert("No questions that way")

    }
    for (var i = 0, length = userGuess.length; length > i; i++) {
        userGuess[i].checked = false;
    }

}

//move forward in question order
function moveNext() {
    current++;
    if (current < questions.length) {
        renderQuestion();
    } else {
        alert("No more questions")
    }
    for (var i = 0, length = userGuess.length; length > i; i++) {
        userGuess[i].checked = false;
    }

}


