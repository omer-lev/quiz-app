var questions = [];
let questionCounter = 0;
var score = 10;

$('li').on('click', (e) => {
    checkAnswer(e.target.innerText);
})

$.ajax({
    method: 'GET',
    url: 'https://opentdb.com/api.php?amount=10'
}).done(res => {
    $('.loading').css('display', 'none');

    questions = res.results;
    setQuestion();
});


const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};


const setQuestion = () => {
    var answers = [
        ...questions[questionCounter].incorrect_answers, 
        questions[questionCounter].correct_answer
    ];
    shuffleArray(answers);

    for (let i = 1; i < 5; i++) {
        $(`.options ul li:nth-child(${i}) div`).html(answers[i-1]);
    }

    $('.question h3').html(questions[questionCounter].question)
    $('.counter span').html(questionCounter + 1);

    $('.container').css('padding', 0);

    $('.content').css('display', 'block');
};

const checkAnswer = (answer) => {
    if (answer != questions[questionCounter].correct_answer) {
        score--;
    }

    if (questionCounter < questions.length - 1) {
        questionCounter++;
        setQuestion();
    } else {
        gameOver();
    }
};

const gameOver = () => {
    $('.options').css('display', 'none');
    
    $('.final-score').css('display', 'block');
    $('.final-score h2 span').html(score);

    $('.question').html('<h2>Quiz finished!</h2>')
    $('.counter').html('<a href="/">Play again</a>');
};