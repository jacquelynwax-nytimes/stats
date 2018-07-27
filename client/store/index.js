import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import percentiles from './percentiles'
import timeFilter from './timeFilter'
import user from './user'

const reducer = combineReducers({ percentiles, timeFilter, user })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './percentiles'
export * from './timeFilter'
export * from './user'
