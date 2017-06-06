const fetch = require('node-fetch');
const link = 'https://opentdb.com/api.php?';

function getQuestion(req, res){
    let category = req.params.category || 15; //video game

    fetch(link + 'amount=1&type=multiple&category=' + category)
    .then(function(promise) {
        return promise.json();
    }).then(function(json) {
        return answer(json);
    }).then((data) => {
        res.set({
        'Access-Control-Allow-Origin': '*'
        });
        res.send(data);
    }).catch(function(err) {
        console.log(err);
    });
}
//helper function, put answer and question in array
function answer(json){
    let answers = json.results[0].incorrect_answers;
    answers.push(json.results[0].correct_answer);
    answers = shuffle(answers);
    let result = {};
    result.question = json.results[0].question;
    result.answers = answers;
    result.correct_answer = answers.indexOf(json.results[0].correct_answer);
    
    return result;
}

// shuffle an array 
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

module.exports = getQuestion;