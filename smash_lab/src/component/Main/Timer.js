import React, { Component } from 'react';
import {Line} from 'rc-progress';

export default class Timer extends Component {
    constructor(props){
        super(props);
        this.state = {
            percent: 0
        }
        this.timeOut = null;
        this.progressBar = this.progressBar.bind(this);
        this.progressBar();
    }

    componentDidUpdate(){
        this.progressBar();
    }

    progressBar(){
        if(this.timeOut)clearTimeout(this.timeOut);
        this.timeOut = setTimeout(() => {
            this.setState({
                percent: this.props.progressBar()
            })
        },1000);
    }

    render() {
        const percent = this.state.percent;
        return (
            <Line percent={percent}/>
        )
    }
}
