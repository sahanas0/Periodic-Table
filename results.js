/*Local storage is used to get the final score from the easy/hard quiz page that was closed
finalScore retrieves the score that was saved when the user completed the quiz and questionTotal
gets the total number of questions.    
We researched this on W3 Schools: https://www.w3schools.com/html/html5_webstorage.asp
*/
var score = localStorage.getItem("finalScore");
var total = localStorage.getItem("questionTotal");

/*On the HTML page "results.html", this line updates the score information into the
id "printScoreInfo"*/
document.getElementById("printScoreInfo").innerText =
  "Your score: " + score + " / " + total;

/*When the user presses on either the go back to quiz button or the go back to periodic
button page, this function is called and accepts the parameter nextPage. this function just
changes the brower's current page and takes the user to what they pressed*/
function goToNextPage(nextPage) {
  window.location.href = nextPage;
}

/*if the user's score got half or more of the questions correct, they win and see a confetti gif
in the background. else, they see an explosion gif for losing*/

/*Confetti gif citation: https://pixabay.com/gifs/search/confetti/*/
/*Beaker explosion gif citation: https://tenor.com/search/science-explosion-gifs*/
if (score >= total / 2) {
  document.getElementById("resultGif").src = "confetti.gif";
} else {
  document.getElementById("resultGif").src = "explosion.gif";
}
