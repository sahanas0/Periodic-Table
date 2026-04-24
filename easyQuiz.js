/*We got inspiration for this quiz game from CodePicker on Medium: 
https://medium.com/@codepicker57/building-an-interactive-quiz-with-html-css-and-javascript-efe9bd8129e2

In the original code, they created an array of objects with question, options, and answer properties. We 
decided to split it into three seperate arrays because it was easier to understand, organize, and add new questions. 
*/

//Creating all the easy quiz questions
var easyQuestions = new Array();
easyQuestions[0] = "What is the atomic number of He?";
easyQuestions[1] = "Which is more electronegative: O or N?";
easyQuestions[2] = "What is the atomic mass of Neon?";
easyQuestions[3] = "Which element is represented by the symbol K?";
easyQuestions[4] = "What is the atomic number of Lu?";
easyQuestions[5] = "Which element is represented by the symbol Fm?";
easyQuestions[6] = "Which element has 56 protons?";
easyQuestions[7] = "Which neutral element has 27 electrons?";
easyQuestions[8] = "What is the atomic mass of Titanium?";
easyQuestions[9] = "Which element is represented by the symbol Au?";

easyQuestions[10] = "Which element is represented by the symbol No?";
easyQuestions[11] = "Which element is represented by the symbol W?";
easyQuestions[12] = "Which element is represented by the symbol Rb?";
easyQuestions[13] = "What is the atomic number of Fe?";
easyQuestions[14] = "What is the atomic number of Po?";
easyQuestions[15] = "What is the atomic number of S?";
easyQuestions[16] = "Which element has 29 protons?";
easyQuestions[17] = "Which element has 7 protons?";
easyQuestions[18] = "What is the atomic mass of Mercury?";
easyQuestions[19] = "What is the atomic mass of Silver?";

//Created all the options that the user could select
var easyOptions = new Array();
easyOptions[0] = ["10", "2", "33", "15"];
easyOptions[1] = ["O","N","Both are equally electronegative","They have electron affinity, not negativity"];
easyOptions[2] = ["16.07", "15.99", "20.18", "107.89"];
easyOptions[3] = ["Krypton", "Potassium", "Gallium", "Calcium"];
easyOptions[4] = ["14", "3", "56", "71"];
easyOptions[5] = ["Radium", "Rutherfordium", "Bohrium", "Fermium"];
easyOptions[6] = ["Ruthenium", "Rhodium", "Barium", "Bohrium"];
easyOptions[7] = ["Cobalt", "Copper", "Calcium", "Caesium"];
easyOptions[8] = ["100.92", "166.84", "22.90", "47.87"];
easyOptions[9] = ["Silver", "Gold", "Actinium", "Americium"];
easyOptions[10] = ["Indium", "Silver", "Nobelium", "Fermium"];
easyOptions[11] = ["Platinum", "Tellurium", "Tungsten", "Krypton"];
easyOptions[12] = ["Francium", "Carbon", "Magnesium", "Rubidium"];
easyOptions[13] = ["8", "26", "20", "31"];
easyOptions[14] = ["77", "84", "98", "53"];
easyOptions[15] = ["16", "19", "39", "41"];
easyOptions[16] = ["Astatine", "Boron", "Copper", "Phosporus"];
easyOptions[17] = ["Nitrogen", "Osmium", "Vanadium", "Xenon"];
easyOptions[18] = ["300.68", "100.58", "199.56", "200.59"];
easyOptions[19] = ["196.97", "107.87", "3464", "3930"];

/*Here, the original code stored the answers as strings, but we decided to store the answers based
on the index numbers because it was more efficient for checking if the user clicked the right button. */
var easyAnswers = new Array();
easyAnswers = [1, 0, 2, 1, 3, 3, 2, 0, 3, 1, 2, 2, 3, 1, 1, 0, 2, 0, 3, 1];

/*Selecting 4 random indices. if the randomly generated number from the math.random function
is already in the chosen indexes array, then it is not included and the loop continues until 
there are 4 elements inside chosenIndexes.      

Also, the original code showed ALL the questions from their bank, but we decided to use Math.random() to 
randomly generate a few questions so that the quiz is different each time the user plays it. */
var chosenIndexes = [];

while (chosenIndexes.length < 4) {
  var r = Math.floor(Math.random() * easyQuestions.length);

  if (!chosenIndexes.includes(r)) {
    chosenIndexes.push(r);
  }
}

var qElement = document.getElementById("question");
var optionsElement = document.getElementById("options");

var currentQuestion = 0;
var score = 0;

//We added this variable (different from original internet source code) to show the number question that the user is on.
var showQuestionNumber = 1;

function showQuestion() {
  //Real index gets the index of the randomly selected question in the OVERALL "easyQuestions" array
  var realIndex = chosenIndexes[currentQuestion];

  qElement.innerText = showQuestionNumber + ". " + easyQuestions[realIndex];

  //clear what was previously in the options element
  optionsElement.innerHTML = "";

  //this loop makes a new button for each answer choice
  //each element in easyOptions has 4 "sub elements" like for example easyOptions[0] = [10,2,33,15]
  for (let i = 0; i < easyOptions[realIndex].length; i++) {
    let btn = document.createElement("button");
    btn.className = "button-style";
    //put the answer choice on the button
    btn.innerText = easyOptions[realIndex][i];

    /*when the user clicks on the button, the function selectAnswer is called
        the parameter i means the the button number (Out of the sub 4 elements) the user clicked
        the parameter realIndex is the question that we are on
        the parameter btn gives the specific button we are on (so the color can be changed based on correct/wrong)
        */
    btn.addEventListener("click", function () {
      selectAnswer(i, realIndex, btn);
    });

    //this adds the button to the webpage so you can see it
    optionsElement.appendChild(btn);
  }
}

/*this function accepts three parameters: chosenOption, realIndex, and button
    chosenOption is used to check if the answer the user selected is correct
    real index is the index of the question the user is on 
    button is passed so the background color can be changed 
*/
function selectAnswer(chosenOption, realIndex, button) {
  /*if the option the user chose is the same answer as in the easyAnswers array, the 
    score increases and the background of the button changes to green. if it is not
    the same, the background of the color changes to red. 
    In the original code, they did not change the background. we added this ourselves*/
  if (chosenOption === easyAnswers[realIndex]) {
    score++;
    button.style.background = "lightgreen";
  } else {
    button.style.background = "red";
  }

  //put all buttons in a variable
  var allBtns = optionsElement.querySelectorAll("button");
  //disable all the buttons so they cannot be pressed anymore after they select the answer
  for (var i = 0; i < allBtns.length; i++) {
    allBtns[i].disabled = true;
  }

  /*this function waits .7 seconds before moving on to the next question.
    first, it increments the current question number, and then it checks if 
    there are still questions left in the chosenIndexes array. if there is, 
    it calls the function show question, but if not, then it calls the function showresult. */
  setTimeout(function () {
    currentQuestion++;
    showQuestionNumber++;

    if (currentQuestion < chosenIndexes.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 700);
}

/*In the original code, they showed the results on the same page using innerHTML, but we decided to 
save it to localStorage and navigate to a separate page, "results.html" because it was easier to organize
and centralize the gifs, and it also reduced the amount of redundant code becuase it would have been the
same for the easy and hard quizzes. */
function showResult() {
  localStorage.setItem("finalScore", score);
  localStorage.setItem("questionTotal", chosenIndexes.length);
  window.location.href = "results.html";
}

//This starts the quiz by showing the first question
showQuestion();
