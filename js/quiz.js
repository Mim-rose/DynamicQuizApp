// JavaScript for the quiz page
const MyQuizApp = document.querySelector(".MyQuizApp");
const MyBtn = document.querySelector(".MyBtn button");
const RulesBox = document.querySelector(".RulesBox");
const exitButton = document.querySelector(".buttons .ExitButton");
const ContinueButton = document.querySelector(".buttons .ContinueButton");
const Questions = document.querySelector(".Questions");
const NextBtn = document.querySelector(".footer .nextBtn");
const option_list = document.querySelector(".MyOptions");
const timeCount = document.querySelector(".TimeCount .Seconds");
const timeline = document.querySelector(".QuestionsHeader .time_lines");
const resultPage = document.getElementById('resultPage');  // Add this line

let que_count = 0;
let score = 0;  // Initialize score to 0
let counter;
let counterLine;
let optionSelectedFlag = false;
let widthValue = 0;

MyBtn.onclick = () => {
    RulesBox.classList.add("activeInfo");
};

exitButton.onclick = () => {
    RulesBox.classList.remove("activeInfo");
};

ContinueButton.onclick = () => {
    RulesBox.classList.remove("activeInfo");
    Questions.classList.add("activeQuiz");
    showQuestions(0);
    startTimer(15);
    startTimerLine(0);
    NextBtn.disabled = true;
    NextBtn.classList.add("disabled");
};

NextBtn.onclick = () => {
    if (optionSelectedFlag) {
        if (que_count < questions.length - 1) {
            que_count++;
            showQuestions(que_count);
            startTimer(15);
            startTimerLine(0);
            optionSelectedFlag = false;
            NextBtn.disabled = true;
            NextBtn.classList.add("disabled");
        } else {
            console.log("Quiz completed, showing results");
            Questions.classList.remove('activeQuiz'); // Hide quiz page
            resultPage.classList.add('active');  // Show result page
            showResultPage(score, questions.length);
        }
    }
};

function showQuestions(index) {
    const que_text = document.querySelector('.text3');
    const options_list = document.querySelector(".MyOptions");

    let optionsHTML = "";
    questions[index].options.forEach(option => {
        optionsHTML += `<div class="options">${option}</div>`;
    });

    let que_tag = `<span>${questions[index].numb}. ${questions[index].question}</span>`;
    que_text.innerHTML = que_tag;
    options_list.innerHTML = optionsHTML;

    const total_que = document.querySelector(".total_que");
    let total_queTag = `<p>${questions[index].numb} of ${questions.length}</p>`;
    total_que.innerHTML = total_queTag;

    const options = options_list.querySelectorAll(".options");

    options.forEach(option => {
        option.replaceWith(option.cloneNode(true));
    });

    options_list.querySelectorAll(".options").forEach(option => {
        option.addEventListener("click", function () {
            optionSelected(this);
        });
    });
}

let tickIcon = '<div class="tick icon"> <i class="fas fa-check"></i></div>';
let crossIcon = '<div class="cross icon"> <i class="fas fa-times"></i></div>';

function optionSelected(answer) {
    let userAns = answer.textContent.trim().toLowerCase();
    let correctAns = questions[que_count].answer.trim().toLowerCase();

    if (userAns === correctAns) {
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
        score++;  // Increment the score
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIcon);

        document.querySelectorAll(".options").forEach(opt => {
            if (opt.textContent.trim().toLowerCase() === correctAns) {
                opt.classList.add("correct");
                opt.insertAdjacentHTML("beforeend", tickIcon);
            }
        });
    }

    document.querySelectorAll(".options").forEach(option => {
        option.classList.add("disabled");
    });

    clearInterval(counter);
    clearInterval(counterLine);
    optionSelectedFlag = true;
    NextBtn.disabled = false;
    NextBtn.classList.remove("disabled");
}

function startTimer(time) {
    clearInterval(counter);
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time < 10 ? "0" + time : time;
        time--;
        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";
            disableOptions();
            showCorrectAnswer();
            optionSelectedFlag = true;
            NextBtn.disabled = false;
            NextBtn.classList.remove("disabled");
        }
    }
}

function disableOptions() {
    document.querySelectorAll(".options").forEach(option => {
        option.classList.add("disabled");
    });
}

function showCorrectAnswer() {
    let correctAns = questions[que_count].answer.trim().toLowerCase();
    document.querySelectorAll(".options").forEach(opt => {
        if (opt.textContent.trim().toLowerCase() === correctAns) {
            opt.classList.add("correct");
            opt.insertAdjacentHTML("beforeend", tickIcon);
        }
    });
}

function startTimerLine(time) {
    clearInterval(counterLine);
    timeline.style.width = "0px";
    time = 0;
    counterLine = setInterval(timer, 50);
    function timer() {
        if (time > 549) {
            clearInterval(counterLine);
        } else {
            time += 1;
            timeline.style.width = time + "px";
        }
    }
}

// result page
document.addEventListener('DOMContentLoaded', function () {
    const resultPage = document.getElementById('resultPage');
    const scoreSpan = document.querySelector('.score');
    const totalSpan = document.querySelector('.total');
    const feedbackText = document.querySelector('.feedback-text');
    const replayBtn = document.querySelector('.replay-btn');
    const quitBtn = document.querySelector('.quit-btn');
	const Questions = document.querySelector(".Questions");
	let que_count = 0;
	let score = 0;


    // Function to display the result
    window.showResultPage = function (score, totalQuestions) {
        console.log("showResultPage called with score:", score, "and totalQuestions:", totalQuestions);
        scoreSpan.textContent = score;
        totalSpan.textContent = totalQuestions;
        resultPage.classList.add('active');

        // Provide feedback based on the score out of 7
        let feedback = "I Am Sorry You Got " + score + " Out Of " + totalQuestions;
        if (score === totalQuestions) {
            feedback = "Perfect! You aced the quiz with a score of " + score + " out of " + totalQuestions + "!";
        } else if (score >= totalQuestions * 0.7) {
            feedback = "Great job! You scored " + score + " out of " + totalQuestions + ".";
        } else if (score >= totalQuestions * 0.5) {
            feedback = "Good effort! You got " + score + " out of " + totalQuestions + ".";
        } else {
            feedback = "Nice try! You got " + score + " out of " + totalQuestions + ".";
        }
        feedbackText.textContent = feedback;
    };

    // Replay Button Functionality
    replayBtn.addEventListener('click', function () {
        resultPage.classList.remove('active');
		Questions.classList.add("activeQuiz");
	    // Reset quiz state (if needed)
		showQuestions(0);
		score = 0;
		clearInterval(counter);
		clearInterval(counterLine);

    });

    // Quit Button Functionality
    quitBtn.addEventListener('click', function () {
        // Navigate to the welcome page
		Questions.classList.remove("activeQuiz");

        resultPage.classList.remove('active');
		MyQuizApp.classList.add('active');
    });
});


