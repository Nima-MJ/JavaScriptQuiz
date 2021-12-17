function buildQuiz(){
    //varuiable to store html output
    const output = [];
    output.push(
        `<div class="slide intro-page"> 
            <h1> Coding Quiz Challange </h1>
            <p> Try to answer the following code-related questions within the time limit.
            Keep in mind that incorrect answers will penalize your score/time by ten seconds! </p>
            <button class="start"> Start Quiz </button>
        </div>`
    );
    //for each question...
    myQuestions.forEach(
        (currentQuestion, questionNumber) => {

            //variable to store the list of possible answers
            const answersArray = [];

            for(letter in currentQuestion.answers){

                //... add an html radio button
                answersArray.push(
                    `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${currentQuestion.answers[letter]}
                    </label>`
                )
            }
            //... add this question and its answers to the output
            output.push(
                `<div class="slide under">
                <div class="question"> ${currentQuestion.question} </div>
                <div class="answers radio-toolbar"> ${answersArray.join('')} </div>
                </div>`
            );
        }

    );
    output.push(
        `<div class="slide under"> 
            <h1> All done! </h1>
            <p> Your final score is <span class="scoreDisp"></span> </p>
            <label for="fname">Enter Initials<label>
            <input type="text" name="fname" id="user"> 
            <button class="save" > Submit </button>
            
        </div>`
    );
    output.push(
        `<div class="slide under">
        <h1> Highest Score <h1>
        <table>
            <tr><span class="first"></span></tr>
        </table> 
        </div>`
    )

    quizContainer.innerHTML = output.join('');

}

function previousSlideResult(question){
    const answerContainers = quizContainer.querySelectorAll('.answers');
    const answerContainer = answerContainers[question];
    const selector = `input[name=question${question}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if(userAnswer === myQuestions[question].correctAnswer){
        result.innerHTML = "Correct!";
    }else{
        ifWrong();
    }
}

function ifWrong(){
    result.innerHTML = "Wrong!";
    var subTen = timer;
    subTen  = subTen - 10;
    timer = subTen;
}

function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide >= 2){
        previousSlideResult(currentSlide-2);
    }
}
function nextSlide(){
    showSlide(currentSlide +1) ;
}

function startTimer(duration, display) {
    timer = duration; 
    var minutes, seconds;
    setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10)+ (minutes * 60);
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = seconds;
        if(currentSlide < myQuestions.length +1){
            if (--timer < 0 ) {
                timer = duration;
            }
        }
        else{
            score = timer;
            scoreDisp.innerHTML = score;
        }
    }, 1000);  
}
function saveData(){
    var highScore = JSON.parse(localStorage.getItem("highScore") || "[]");
    const username = document.getElementById('user');
    highScore.push({name: username.value, score: timer});
    highScore = sort(highScore);
    highScoreDisp(highScore);
    localStorage.setItem("highScore", JSON.stringify(highScore));
}
function highScoreDisp(array){   
    dispArr = [];
    for(var i=0; i<array.length; i++){
        dispArr.push(
        `<p>
        ${i+1}. ${array[i].name} - ${array[i].score}
        </p>`
        )
    }
    first.innerHTML = dispArr.join('');
}

function sort(array){
    function compare( a, b ) {
        if ( a.score < b.score ){
          return 1;
        }
        if ( a.score > b.score ){
          return -1;
        }
        return 0;
    }
    array.sort( compare );
    return array;
}


/*  variables */
const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const result = document.getElementById('result');
const myQuestions = [
    {
        question: "Commenly used data types DO not include:",
        answers:{
            a: "1.strings",
            b: "2.boolean",
            c: "3.alerts",
            d: "4.numbers",
        },
        correctAnswer: "d"
    },
    {
        question: "The conditions in an if/else statement is enclosed with _______.",
        answers:{
            a: "1.quotes",
            b: "2.curly brackets",
            c: "3.paranthesis",
            d: "4.square brackets",
        },
        correctAnswer: "c"
    },
    {
        question: "Arrays in JavaScript can be used to store ________.",
        answers:{
            a: "1.numbers and strings",
            b: "2.other arrays",
            c: "3.boolean",
            d: "4.all of the above",
        },
        correctAnswer: "d"
    },
    {
        question: "String values must be enclosed within _______ when being assigned to variables.",
        answers:{
            a: "1.commas",
            b: "2.curly brackets",
            c: "3.quotes",
            d: "4.paranthesis",
        },
        correctAnswer: "c"
    },{
            
        question: "A very useful tool during development and debugging for printing content to the debugger is:",
        answers:{
            a: "1.JavaScript",
            b: "2.terminal/bash",
            c: "3.for loop",
            d: "4.console.log",
        },
        correctAnswer: "d"

    }
];
//display quiz right away
buildQuiz();


const display = document.querySelector('.time');
const slides = document.querySelectorAll(".slide");
const start = document.querySelector(".start");
const scoreDisp = document.querySelector(".scoreDisp");
const save = document.querySelector(".save")
const first = document.querySelector(".first")
let currentSlide = 0;
var numQuestion = myQuestions.length;
var timer;
var score;



//show the first slide
showSlide(currentSlide);

//start quiz once the button is clicked
start.addEventListener('click', startQuiz);
start.addEventListener('click', timerSetup);
save.addEventListener('click', saveData);

function startQuiz(){
    nextSlide();
    for(var i=0; i<numQuestion; i++){
        document.querySelectorAll('input[name="question' + i + '"]').forEach((elem) => {
            elem.addEventListener("change", nextSlide );
        });
    }
    if (save.addEventListener('click', nextSlide));
}
function timerSetup () {
    var fiveMinutes = 60 * 1.25;
    startTimer(fiveMinutes, display);
};
