import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'semantic-ui-css/semantic.min.css';
import './index.css'
import App from './containers/App/App'
import * as serviceWorker from './serviceWorker'
// const result = require('dotenv').config()
// if(result.error){
// 	throw result.error;
// }
// console.log(process.cwd());
// console.log(process.env.REACT_APP_END_POINT);
ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
