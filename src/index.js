import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home/Home.jsx';
import './reset.css';
import './index.css';

ReactDOM.render(<Home />, document.getElementById('app'));

module.hot.accept();
