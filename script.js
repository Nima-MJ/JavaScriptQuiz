const quizCOntainer = document.getElementById('quiz');
const resultsCOntainer = document.getElementById('results');
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
        {
            question: "A very useful tool during development and debugging for printing content to the debugger is:",
            answers:{
                a: "1.JavaScript",
                b: "2.terminal/bash",
                c: "3.for loop",
                d: "4.console.log",
            },
            correctAnswer: "d"
        }
    }
]

function buildQuiz(){}

function showResults(){}

//display quiz right away
buildQuiz();

//on submit, show results
submitButton.addEventListener('click', showResults);