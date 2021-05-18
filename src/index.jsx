import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/pages/App";
import './index.scss';
import {createStore} from "redux";
import reducers from "./reducers/reducers";
import {Provider} from "react-redux";

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

/*const store = createStore(reducers);*/

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Provider>
    , document.getElementById('root'));