/*We got inspiration for this quiz game from CodePicker on Medium: 
https://medium.com/@codepicker57/building-an-interactive-quiz-with-html-css-and-javascript-efe9bd8129e2

In the original code, they created an array of objects with question, options, and answer properties. We 
decided to split it into three seperate arrays because it was easier to understand, organize, and add new questions. 
*/

//Creating all the hard quiz questions
var hardQuestions = new Array();
hardQuestions[0] = "What are the periodic trends for ionization energy?";
hardQuestions[1] = "What are the periodic trends for atomic radius?";
hardQuestions[2] = "How many neutrons does Gallium have given an atomic mass of 72 amu?";
hardQuestions[3] = "How many electrons does Barium have given a charge of 3+?";
hardQuestions[4] = "How many electrons does Selenium have given a charge of 2-?";
hardQuestions[5] = "What are the periodic trends for electronegativity?";
hardQuestions[6] = "Which element has this configuration: 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 6s2";
hardQuestions[7] = "Which element can form stable ions with either +2 or +4 charge";
hardQuestions[8] = "Which element can have a positive OR negative charge of 4?";
hardQuestions[9] = "Which element has this configuration: 1s2 2s2 2p4";
hardQuestions[10] = "According to the trend, which element has the highest electronegativity?";
hardQuestions[11] = "How many neutrons does Xenon-131 have?";
hardQuestions[12] = "Which element has the highest atomic radius according to the trend?";
hardQuestions[13] = "What is the boiling point of Thorium?";
hardQuestions[14] = "How many valence electrons does Phosphorus have?";
hardQuestions[15] = "Which element has this configuration: [Ar] 3d10 4s2 4p3";
hardQuestions[16] = "Which transition metal has an atomic mass of 190.23 amu?";
hardQuestions[17] = "How many electrons does Bromine-80 have?";
hardQuestions[18] = "How many protons does Europium-123 have with a +2 charge?";
hardQuestions[19] = "How many electrons does Nitrogen have with a given charge of 3-?";
hardQuestions[20] = "What is the boiling point of Argon?";

//Created all the options that the user could select
var hardOptions = new Array();
hardOptions[0] = ["Increases across, decreases down", "Increases down, decreases across", "Increases across, increases down", "decreases across, decreases down"];
hardOptions[1] = ["Increases across, decreases down", "Decreases across, increases down", "Increases across, increases down", "decreases across, decreases down"];
hardOptions[2] = ["41", "68", "39", "45"];
hardOptions[3] = ["65", "59", "53", "56"];
hardOptions[4] = ["34.2", "32", "36", "34"];
hardOptions[5] = ["Increases across, decreases down", "Increases down, decreases across", "Increases across, increases down","decreases across, decreases down"];
hardOptions[6] = ["Bismuth", "Mercury", "Cerium", "Zirconium"];
hardOptions[7] = ["Lead", "Copper", "Carbon", "Hassium"];
hardOptions[8] = ["Dysprosium", "Antimony", "Carbon", "Lead"];
hardOptions[9] = ["Carbon", "Nitrogen", "Flourine", "Oxygen"];
hardOptions[10] = ["Fluorine", "Oxygen", "Chlorine", "Nitrogen"];
hardOptions[11] = ["54", "131", "77", "185"];
hardOptions[12] = ["Cesium", "Francium", "Radium", "Barium"];
hardOptions[13] = ["4788°C", "3230°C", "5555°C", "2900°C"];
hardOptions[14] = ["3", "15", "8", "5"];
hardOptions[15] = ["Gallium", "Germanium", "Arsenic", "Selenium"];
hardOptions[16] = ["Osmium", "Iridium", "Platinum", "Rhenium"];
hardOptions[17] = ["35", "45", "80", "115"];
hardOptions[18] = ["61", "65", "63", "59"];
hardOptions[19] = ["7", "4", "13", "10"];
hardOptions[20] = ["-195.8°C", "-185.8°C", "-246.1°C", "-108.1°C"];

/*Here, the original code stored the answers as strings, but we decided to store the answers based
on the index numbers because it was more efficient for checking if the user clicked the right button. */
var hardAnswers = [0, 1, 0, 2, 2, 0, 1, 0, 2, 3, 0, 2, 1, 0, 3, 2, 1, 0, 2, 3, 1];

/*Selecting 4 random indices. if the randomly generated number from the math.random function
is already in the chosen indexes array, then it is not included and the loop continues until 
there are 4 elements inside chosenIndexes. 

Also, the original code showed ALL the questions from their bank, but we decided to use Math.random() to 
randomly generate a few questions so that the quiz is different each time the user plays it. */
var chosenIndexes = [];

while (chosenIndexes.length < 4) {
  var r = Math.floor(Math.random() * hardQuestions.length);

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
  ////Real index gets the index of the randomly selected question in the OVERALL "hardQuestions" array
  var realIndex = chosenIndexes[currentQuestion];

  qElement.innerText = showQuestionNumber + ". " + hardQuestions[realIndex];

  //clear what was previously in the options element
  optionsElement.innerHTML = "";

  //this loop makes a new button for each answer choice
  //each element in hardOptions has 4 "sub elements" like for example hardOptions[0] = [10,2,33,15]
  for (let i = 0; i < hardOptions[realIndex].length; i++) {
    let btn = document.createElement("button");
    btn.className = "button-style";
    //put the answer choice on the button
    btn.innerText = hardOptions[realIndex][i];

    //when the user clicks on the button, the function selectAnswer is called
    //the parameter i means the the button number (Out of the sub 4 elements) the user clicked
    //the parameter realIndex is the question that we are on
    //the parameter btn gives the specific button we are on (so the color can be changed based on correct/wrong)
    btn.addEventListener("click", function () {
      selectAnswer(i, realIndex, btn);
    });

    //this addsthe button to the webpage so you can see it
    optionsElement.appendChild(btn);
  }
}

/*this function accepts three parameters: chosenOption, realIndex, and button
    chosenOption is used to check if the answer the user selected is correct
    real index is the index of the question the user is on 
    button is passed so the background color can be changed 
*/
function selectAnswer(chosenOption, realIndex, button) {
  /*if the option the user chose is the same answer as in the hardAnswers array, the 
    score increases and the background of the button changes to green. if it is not
    the same, the background of the color changes to red. 
    In the original code, they did not change the background. we added this ourselves*/
  if (chosenOption === hardAnswers[realIndex]) {
    score++;
    button.style.background = "lightgreen";
  } else {
    button.style.background = "red";
  }

  // Disable buttons
  var allBtns = optionsElement.querySelectorAll("button");
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
