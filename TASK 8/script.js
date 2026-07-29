const username = localStorage.getItem("username") || "Guest";

document.getElementById("welcome").innerHTML =
"Welcome, <span>" + username + "</span>";

const quiz = [

{
question:"1. Which animal is known as the 'King of the Jungle'?",
options:["Tiger","Lion","Elephant","Leopard"],
answer:1
},

{
question:"2. Which is the fastest land animal?",
options:["Horse","Tiger","Cheetah","Leopard"],
answer:2
},

{
question:"3. Which mammal can fly?",
options:["Bat","Eagle","Flying Fish","Owl"],
answer:0
},

{
question:"4. Which is the largest mammal in the world?",
options:["Elephant","Blue Whale","Giraffe","Hippopotamus"],
answer:1
},

{
question:"5. What do pandas mainly eat?",
options:["Grass","Bamboo","Leaves","Fruits"],
answer:1
},

{
question:"6. Which bird is the national bird of India?",
options:["Parrot","Peacock","Eagle","Sparrow"],
answer:1
},

{
question:"7. Which animal has black and white stripes?",
options:["Tiger","Horse","Zebra","Deer"],
answer:2
},

{
question:"8. Which animal is known as the 'Ship of the Desert'?",
options:["Camel","Horse","Donkey","Yak"],
answer:0
},

{
question:"9. Which is the tallest animal in the world?",
options:["Elephant","Giraffe","Camel","Ostrich"],
answer:1
},

{
question:"10. Which sea animal has eight arms?",
options:["Starfish","Jellyfish","Octopus","Crab"],
answer:2
}

];

let currentQuestion = 0;
let score = 0;

let timer;
let timeLeft = 30;

loadQuestion();

function loadQuestion(){

clearInterval(timer);

timeLeft = 30;

document.getElementById("timer").innerHTML =
timeLeft + "s";

document.getElementById("questionNumber").innerHTML =
"Question " + (currentQuestion + 1) + " of " + quiz.length;

document.getElementById("question").innerHTML =
quiz[currentQuestion].question;

let answers = "";

for(let i=0;i<quiz[currentQuestion].options.length;i++){

answers += `
<label>
<input type="radio" name="option" value="${i}">
${quiz[currentQuestion].options[i]}
</label>
`;

}

document.getElementById("answers").innerHTML = answers;

startTimer();

}

function startTimer(){

timer = setInterval(function(){

timeLeft--;

document.getElementById("timer").innerHTML =
timeLeft + "s";

if(timeLeft <= 0){

clearInterval(timer);

alert("⏰ Time's Up!");

currentQuestion++;

if(currentQuestion < quiz.length){

loadQuestion();

}
else{

showResult();

}

}

},1000);

}

function nextQuestion(){

clearInterval(timer);

let selected =
document.querySelector('input[name="option"]:checked');

if(selected == null){

alert("Please select an answer!");

startTimer();

return;

}

if(Number(selected.value) == quiz[currentQuestion].answer){

score++;

}

currentQuestion++;

if(currentQuestion < quiz.length){

loadQuestion();

}
else{

showResult();

}

}

function showResult(){

clearInterval(timer);

let percentage = (score/quiz.length)*100;

let message="";
let badge="";

if(percentage >= 90){

message="🏆 Excellent!";
badge="🥇 Gold Badge";

}
else if(percentage >= 70){

message="😊 Very Good!";
badge="🥈 Silver Badge";

}
else if(percentage >= 50){

message="👍 Good Job!";
badge="🥉 Bronze Badge";

}
else{

message="📚 Keep Practicing!";
badge="⭐ Better Luck Next Time";

}

document.querySelector(".quiz-container").innerHTML = `

<h1>🎉 Quiz Completed 🎉</h1>

<h2>${username}</h2>

<h2>Your Score: ${score} / ${quiz.length}</h2>

<h2>Percentage: ${percentage}%</h2>

<h2>${message}</h2>

<h2>${badge}</h2>

<button onclick="location.reload()">Restart Quiz</button>

`;

}