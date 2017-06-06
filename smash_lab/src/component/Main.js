import React, { Component } from 'react';
import Answers from './Main/Answers';
import './Main/Main.css';

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
        if(index === this.state.correct_answer){
            console.log('bravo');
            this.props.attack('player_2');
        }else{
            console.log('perdu');
            this.props.attack('player_1');
        }
        this.getQuestion();
    }

    render() {  
        const question = this.state.question;
        const answers = this.state.answers;
        return (
            <div>
                <h2 className="question">{question}</h2>
                <Answers sendAnswer={this.sendAnswer} answers={answers} />
            </div>
        )
    }
}