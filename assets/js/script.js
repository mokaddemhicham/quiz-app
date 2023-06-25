const questions = [{
    question: "Qu’est-ce qu’un algorithme ?",
    a: "Un organigramme",
    b: "Un organigramme ou un pseudocode",
    c: "Une décision",
    d: "Instructions pas à pas utilisées pour résoudre un problème",
    correct: "d",
    justification: "Un algorithme est une séquence d'instructions précises et ordonnées qui permet de résoudre un problème donné."
},
{
    question: "Quelles sont les trois constructions d’algorithme?",
    a: "Entrée, Sortie, Processus",
    b: "Séquence, Sélection, Répétition",
    c: "Entrée / Sortie, Décision, Répétition",
    d: "Boucle, Entrée/Sortie, Processus",
    correct: "b",
    justification: "Les trois constructions d'un algorithme sont la séquence (exécution linéaire des instructions), la sélection (prise de décisions conditionnelles) et la répétition (boucles)."
},
{
    question: "Pour répéter une tâche, nous utilisons une ____?",
    a: "Entrée",
    b: "Condition",
    c: "Boucle",
    d: "Sortie",
    correct: "c",
    justification: "Pour répéter une tâche, on utilise une boucle, qui permet d'exécuter un bloc d'instructions plusieurs fois jusqu'à ce qu'une condition spécifique soit satisfaite."
},
{
    question: "Si ....... Alors ....... Sinon ....... Fin Si vérifier ____?",
    a: "Une seule condition",
    b: "Deux conditions",
    c: "Trois conditions",
    d: "Plusieurs conditions",
    correct: "b",
    justification: "La structure \"Si... Alors... Sinon... Fin Si\" permet de vérifier une seule condition et d'exécuter différentes instructions en fonction du résultat de cette condition."
},
{
    question: "Quelle est la fonction principale d'un algorithme ?",
    a: "Générer des erreurs",
    b: "Résoudre des problèmes",
    c: "Créer des interfaces graphiques",
    d: "Stocker des données",
    correct: "b",
    justification: "La fonction principale d'un algorithme est de résoudre un problème spécifique en fournissant une séquence d'instructions claires et logiques."
},
{
    question: "Qu'est-ce qu'une variable dans un algorithme ?",
    a: "Un espace de stockage temporaire pour les données",
    b: "Un opérateur mathématique",
    c: "Une condition de contrôle",
    d: "Un type de donnée",
    correct: "a",
    justification: "Une variable dans un algorithme est utilisée pour stocker temporairement des données ou des valeurs et peut être modifiée au cours de l'exécution de l'algorithme."
},
{
    question: "Un organigramme _______?",
    a: "Vous aide à planifier le code informatique",
    b: "est un type de diagramme graphique qui représente un algorithme",
    c: "Utilise des formes pour aider à organiser un processus",
    d: "Tout les réponses sont vrais",
    correct: "d",
    justification: "Un organigramme est un type de diagramme qui représente un algorithme, un flux de travail ou un processus. L’organigramme peut également être défini comme une représentation schématique d’un algorithme (approche pas à pas pour résoudre une tâche)."
},
{
    question: "Quel est l'objectif principal d'un algorithme ?",
    a: "Résoudre un problème spécifique",
    b: "Déclarer des variables",
    c: "Afficher des résultats à l'écran",
    d: "Créer une interface utilisateur",
    correct: "a",
    justification: "L'objectif principal d'un algorithme est de fournir une solution efficace et précise à un problème donné."
}
];

// declare variables
var question = document.getElementById("question"),
    answers = document.querySelectorAll(".answer"),
    list = document.getElementsByTagName("li"),
    a_text = document.getElementById("a_text"),
    b_text = document.getElementById("b_text"),
    c_text = document.getElementById("c_text"),
    d_text = document.getElementById("d_text"),
    finalScore = document.querySelector(".box-questions"), 
    countDown = document.querySelector(".countdown"),
    ans_labels = document.querySelectorAll(".ans_label"),
    submit = document.getElementById("submit");
var nameOfPlayer = localStorage.getItem("username") ? localStorage.getItem("username") : "";
var audio = document.getElementById('backgroundQuizMusic');
var correctSound = document.getElementById('correctSound');
var wrongSound = document.getElementById('wrongSound');
var numberOfQuestions = document.getElementById('numberOfQuestions');
var currentQuestion = 0;
var score = 0;
var wrongResponses = [];

function shuffleArray(array) {
    return array.sort(function() {
        return Math.random() - 0.5;
    });
}


var numberList = [0, 1, 2, 3, 4, 5, 6, 7];
var shuffledList = shuffleArray(numberList);
var c__question;
    
// load quiz
loadQuiz();



function loadQuiz(){
   
    audio.pause();
    audio.currentTime = 0;
    audio.play();
    deselectAnswers();
    submit.disabled = false;
    numberOfQuestions.innerHTML = `${++currentQuestion}/${questions.length}`;
    currentQuestion--;
    c__question = shuffledList[currentQuestion];
    question.innerHTML = questions[c__question].question;

    a_text.innerHTML = questions[c__question].a;
    b_text.innerHTML = questions[c__question].b;
    c_text.innerHTML = questions[c__question].c;
    d_text.innerHTML = questions[c__question].d;
    secondes = 0;
    removeStyleFromLabels();
    cron = setInterval(() => { time(); checkTime();}, 10);
}

function deselectAnswers() {
    for(var i = 0; i < answers.length; i++){
        answers[i].checked = false;
    }
}

function getSelected(){
    var answer;
    for(var i = 0; i < answers.length; i++){
        if(answers[i].checked){
            answer = answers[i].id;
        }
    }
    return answer;
}

function removeStyleFromLabels(){
    ans_labels.forEach((e)=>{
        e.style.color = "black";
        e.style.fontWeight = "normal";
    });
}



submit.addEventListener("click", ()=>{
    // Get Answer
    var answer = getSelected();
    
    // checking Answers
    if(answer){
        submit.disabled = true;
        audio.currentTime = 0;
        audio.pause();
        clearInterval(cron);
        checkAnswer(answer);
        if(currentQuestion < questions.length){
            setTimeout(loadQuiz, 2000);
        }else{
            setTimeout(displayResult, 2000, nameOfPlayer);
        }
    }
});

function checkAnswer(answer){
    let arrayOfAnswers = [...answers];
        const el = arrayOfAnswers.find((e) => {
            return e.id == answer;
        });
        let label = el.id + '_text';
        
        if(answer === questions[c__question].correct){
            score++;
            document.getElementById(label).style.color = "green";
            document.getElementById(label).style.fontWeight = "bold";
            correctSound.play();
            setTimeout(()=>{
                correctSound.pause();
            }, 2000);
        }else{
            wrongResponses.push(c__question);
            document.getElementById(label).style.color = "red";
            document.getElementById(questions[c__question].correct+'_text').style.color = "green";
            document.getElementById(questions[c__question].correct+'_text').style.fontWeight = "bold";
            wrongSound.play();
            setTimeout(()=>{
                wrongSound.pause();
            }, 2000);
        }
        currentQuestion++;

}

 // timer

 var timer = document.querySelector(".timer");
 var secondes = 0;
 var millisecondes = 0;
 var cron;

 function time(){
    if ((millisecondes += 10) == 1000) {
      millisecondes = 0;
      secondes++;
    }
    document.getElementById('second').innerHTML = returnData(secondes);
  }
  
  function returnData(input) {
    return input >= 10 ? input : `0${input}`
  }


function checkTime(){
    if(secondes >= 10){
        clearInterval(cron);
        currentQuestion++;
        let c_question = currentQuestion - 1;
        document.getElementById(questions[shuffledList[c_question]].correct+'_text').style.color = "green";
        document.getElementById(questions[shuffledList[c_question]].correct+'_text').style.fontWeight = "bold";
        wrongResponses.push(shuffledList[c_question]);
        if(currentQuestion < questions.length){
            setTimeout(loadQuiz, 2000);
        }else{
            setTimeout(displayResult, 2000,nameOfPlayer);
        }
    }
  }


function displayResult(name){
    audio.currentTime = 0;
    audio.pause();
    secondes = 0;
    clearInterval(cron);

    let res = (score * 100)/questions.length;
    let message, icon = '';
    if(res < 50){
        message = 'échoué';
        icon = 'xmark';
    }else if(res == 50){
        message = 'Bien';
        icon = 'check';
    }else{
        message = 'Trés bien';
        icon = 'check';
    }

    var justifications = '';
    if(wrongResponses.length != 0){
        justifications = `<table class="table table-bordered text-center my-2"><thead><tr>
                            <th>Question</th>
                            <th>Justification</th>
                            </tr></thead>`;

        for(let i = 0; i < wrongResponses.length; i++){
            justifications += `<tr>
            <td>${questions[wrongResponses[i]].question}</td>
            <td>${questions[wrongResponses[i]].justification}</td>
            </tr>`;
        }

        justifications += '</table>';
    }

    finalScore.innerHTML = '<table class="table table-bordered text-center"><thead><tr><th colspan="2">Bonjour ' + name + '</th></tr><tr><th colspan="2"><i class="fa-regular fa-circle-'+ icon +'"></i></th></tr></thead><tr><td>Score</td><td>' + res + '%</td></tr><tr><td>Résultat</td><td>'+ message +'</td></tr></table>'+justifications;

    submit.innerHTML = 'Recommencer';
    submit.disabled = false;
    submit.setAttribute('onclick','location.replace("../index.html")');
    submit.classList.add('mb-3');
    
}
