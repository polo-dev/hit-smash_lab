import React, { Component } from 'react';
import Question from './Question'
import Answers from './Answers';

export default class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            question: '',
            answers: []
        };
        this.getQuestion = this.getQuestion.bind(this);
        this.sendAnswer = this.sendAnswer.bind(this);
        this.getQuestion('player_1');
    }

    getQuestion(){
        this.props.getQuestion().then((data) => {         
            this.setState({
                'question': data.question,                 
                'answers': data.answers,
                'correct_answer': data.correct_answer 
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

    render() {  
        const question = this.state.question;
        const answers = this.state.answers;
        return (
            <div>
                <Question question={question} />
                <Answers sendAnswer={this.sendAnswer} answers={answers} />
            </div>
        )
    }
}