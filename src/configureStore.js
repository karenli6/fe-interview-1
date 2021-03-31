import { createStore, applyMiddleware, compose } from 'redux';
import { appReducer } from './store';

export default function configureStore( preloadedState ) {
    const middlewares = [ require( 'redux-immutable-state-invariant' ).default() ];
    const middlewareEnhancer = applyMiddleware( ...middlewares );

    const enhancers = [ middlewareEnhancer ];

    if ( window.__REDUX_DEVTOOLS_EXTENSION__ ) enhancers.push( window.__REDUX_DEVTOOLS_EXTENSION__() );

    const composedEnhancers = compose( ...enhancers );

    const store = createStore( appReducer, preloadedState, composedEnhancers );

    return store;
}
