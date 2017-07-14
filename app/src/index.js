import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import store from './SQStore'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';

const sqStore = store

injectTapEventPlugin();
ReactDOM.render(<Provider store={sqStore}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
