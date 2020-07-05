import React from 'react';
import ReactDOM from 'react-dom';
import App from './index/App';
import * as serviceWorker from './index/serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
