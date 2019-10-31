import { createStore, applyMiddleware, compose } from 'redux'
import { rootReducer } from '../reducers/rootReducer'
import thunk from 'redux-thunk'

// this is to use redux devtools in the browser
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const rootStore = createStore(
  rootReducer, composeEnhancers(applyMiddleware(thunk)))
