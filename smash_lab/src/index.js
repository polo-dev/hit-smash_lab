import React from 'react';
import ReactDOM from 'react-dom';
import SmashLab from './SmashLab';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<SmashLab />, document.querySelector('main'));
registerServiceWorker();
