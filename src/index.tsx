import React from 'react';
import './index.css';
import store from "./Redux/redux_store";
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import {HashRouter} from "react-router-dom";

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);
