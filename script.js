
function buildQuiz(){
    //varuiable to store html output
    const output = [];

    output.push(
        `<div class="slide"> 
            <button class="start"> click to start </button>
        </div>`
    )
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
                `<div class="slide">
                <div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answersArray.join('')} </div>
                </div>`
            );
        }

    );
    quizContainer.innerHTML = output.join('');

}

function showResults(){
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');
    //keep track ofthe correct answers 
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
        
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        // if answer is correct 
        if(userAnswer === currentQuestion.correctAnswer){
            //add to the number of correct answers
            numCorrect++;

            //color the answers green 
            answerContainers[questionNumber].style.color = 'lightgreen';
        }
        //if answer is wrong
        else{
            //color the answer red
            answerContainers[questionNumber].style.color = 'red';
        }
    });
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}
function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
}
function nextSlide(){
    showSlide(currentSlide +1) ;
}


/*  variables */
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const myQuestions = [
    {
        question: "Commenly used data types DO not include",
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

const slides = document.querySelectorAll(".slide");
const start = document.querySelector(".start");
let currentSlide = 0;
var numQuestion = myQuestions.length;
debugger;

//show the first slide
showSlide(currentSlide);
//on submit, show results

submitButton.addEventListener('click', showResults);
start.addEventListener('click', startQuiz);
function startQuiz(){
    nextSlide();
    for(var i=0; i<numQuestion; i++){
        document.querySelectorAll('input[name="question' + i + '"]').forEach((elem) => {
            elem.addEventListener("change", nextSlide );
            numm =+ 1;
        });
    }
}
