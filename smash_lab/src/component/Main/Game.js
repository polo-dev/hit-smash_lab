import React, { Component } from 'react';
import Question from './Question'
import Answers from './Answers';
import Timer from './Timer';

export default class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            question: '',
            answers: []
        };
        this.getQuestion = this.getQuestion.bind(this);
        this.sendAnswer = this.sendAnswer.bind(this);
        this.progressBar = this.progressBar.bind(this);
        this.getQuestion('player_1');
    }

    getQuestion(){
        this.props.getQuestion().then((data) => {         
            this.setState({
                'question': data.question,                 
                'answers': data.answers,
                'correct_answer': data.correct_answer,
                'time': Date.now() 
            });
        });
    }

    sendAnswer(index){
        const ennemy = (this.props.player === 'player_1')?'player_2':'player_1';
        if(index === this.state.correct_answer){
            this.props.attack(ennemy);
        }else{
            this.props.attack(this.props.player);
        }
        this.getQuestion();
    }

    progressBar(){
        let time = Date.now();
        let percent = (time - this.state.time)/70;
        return percent;
    }

    render() {  
        const question = this.state.question;
        const answers = this.state.answers;
        return (
            <div>
                <Question question={question} />
                <Answers sendAnswer={this.sendAnswer} answers={answers} />
                <Timer progressBar={this.progressBar}/>
            </div>
        )
    }
}