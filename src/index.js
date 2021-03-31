import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import configureStore from './configureStore';
import { v4 as uuid } from 'uuid';

const initialFiles = {
    [ uuid() ]: {
        name: 'hello_js.js',
        content: "console.log( 'Hello JavaScript!' )",
    },
    [ uuid() ]: {
        name: 'hello_py.py',
        content: "print( 'Hello Python!' )",
    },
    [ uuid() ]: {
        name: 'hello.txt',
        content: 'Hello',
    },
};
const store = configureStore( {
    files: initialFiles,
    openFiles: Object.keys( initialFiles ).slice( 0, 2 ),
    activeFile: Object.keys( initialFiles )[ 0 ],
} );

ReactDOM.render(
    <React.StrictMode>
        <Provider store={ store }>
            <App />
        </Provider>
    </React.StrictMode>, document.getElementById( 'root' ),
);
