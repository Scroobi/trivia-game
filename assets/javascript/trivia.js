//question array of objects with question, answer choices, and correct choices

var questions = [{
    question: "What is Aizawa's hero name?",
    choices: ["Eraserhead", "Sleepyhead", "Eraserstraps", "Captain Exhausted"],
    answer: "Eraserhead"

},
{
    question: "Who did Tsuyu team up with in the final exam?",
    choices: ["Minoru Mineta", "Fumikage Tokoyami", "Denki Kaminari", "Momo Yaoyorozu"],
    answer: "Fumikage Tokoyami"
},
{
    question: "What position did Mineta get in the final exam?",
    choices: ["7th", "8th", "9th", "10th"],
    answer: "9th"
},
{
    question: "What's the name of the group within the League Of Villains that Dabi leads?",
    choices: ["Vanguard Attack Squad", "Frontier Action Squad", "Frontier Attack Squad", "Vanguard Action Squad"],
    answer: "Vanguard Action Squad"
},
{
    question: "At what time is Tokoyami at his strongest?",
    choices: ["Dusk", "Day", "Dawn", "Night"],
    answer: "Night"
},
{

    question: "What punch does All Might use to defeat All For One?",
    choices: ["Global Smash", "American Smash", "Planetary Smash", "United States Of Smash"],
    answer: "Justice-Beaver"
}];

//additional variables needed for game to run properly 
var correct = 0;
var incorrect = 0;
var unanswerred = 0;
var timeLeft = 16;
var counter;
questionIndex = 0;




//initial start button to begin game via the function as well as hiding start button
$(".startbutton").on("click", function () {

    $(this).hide();
    game(questionIndex);

})

//timer function
function timer() {

    // if this occurs timer stops
    if (timeLeft === 0) {
        clearInterval(counter);
        //console.log("timer has stopped")

        // if not at zero it ticks down to zero and displays time
    } else {
        timeLeft--;
        //console.log("Seconds Remaining:" + timeLeft);
        $(".timer").html("<p>Seconds Remaining: <p>" + timeLeft);
    };
    //if time gets to zero, displays that you did not answer a question and continues game
    if (timeLeft === 0) {
        $(".answer").html(`<p> You did not select an answer before time ran out!</p>`);
        unanswerred++;
        questionIndex++
        setTimeout(function () { game(questionIndex) }, 3000);
        clearInterval(counter);
    }

};


//allows game to proceed 
function game(index) {
    //empties answer and choices display in case something is already there
    $(".answer").empty();
    $(".choices").empty();

    if (index < questions.length) {
        // if index is smaller then question length timer begins
        timeLeft = 16;
        counter = setInterval(timer, 1000)
        //displays question at current index
        $(".question").html("<p>" + questions[index].question + "</p>");
        // at current question index, for each choice index a button is created ad append to the last, and a value of said choice index is added to each button as they are "created"
        for (i = 0; i < questions[index].choices.length; i++) {
            $(".choices").append(`<button type='button' class='btn btn-dark choicebtn' value=${questions[index].choices[i]}>  ${questions[index].choices[i]}  </button>`);
        }
    } else {
        // if index becomes larger then questions.length finally correct/incorrect/unanswerred amount shows and restart function is invoked
        $(".qright").show();
        $(".qwrong").show();
        $(".qunanswered").show();
        $(".qright").html(`<p> Correct Answers: ${correct} </p>`);
        $(".qwrong").html(`<p> Incorrect Answers: ${incorrect} </p>`);
        $(".qunanswered").html(`<p> Unanswered Answers: ${unanswerred} </p>`)
        $(".question").hide();
        $(".timer").hide();
        restart();

    }

};
//if any of the ".choicebtns" are clicked the following will happen
$(document).on("click", ".choicebtn", function () {
    // answerGuessed set to value of button clicked
    var answerGuessed = $(this).attr("value")
    //console.log("Answer is" + answerGuessed)
    // if value of button clicked is equal to answer at current index, correct count is increased and correct HTML displayed
    if (answerGuessed === questions[questionIndex].answer) {
        $(".answer").html(`<p> You got the correct Answer! </p>`);
        correct++;
        //if correct answer not selected.. IE they do not equal, then incorrect value increases and incorrect message is displayed on DOM
    } else {
        $(".answer").html(`<p> You guessed the wrong Answer! Try again next time! </p>`);
        incorrect++;


    }

    //console.log(timeLeft);

    //regardeless of what is clicked question index increases so questions/choices/answer will continue until index is no longer less then question.length see approx line 87
    questionIndex++;
    //waits 3 seconds before game function invoked, leading to next question
    setTimeout(function () { game(questionIndex) }, 3000);
    //clears interval, because if not cleared mutiple intervals will be invoked each time a new question is genrated, exponentiall increasing countdown from 16
    clearInterval(counter);
});

//restart function--invoked at end of game function, will be invoked at the end of each game once index is no longer smaller then question.length, start button shows, and when clicked it resets all variables necessary, and game function called again. 
function restart() {

    $(".startbutton").show();

    $(".startbutton").on("click", function () {


        correct = 0;
        incorrect = 0;
        unanswerred = 0;
        questionIndex = 0;
        i = 0;
        clearInterval(counter);
        $(".question").show();
        $(".timer").show();
        $(".qright").hide();
        $(".qwrong").hide();
        $(".qunanswered").hide();
        $(this).hide();

        game(questionIndex);


    });

}; 