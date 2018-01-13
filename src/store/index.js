import { createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { combineReducers, applyMiddleware } from 'redux'
import { dictaReducer as dicta } from 'store/dicta/reducer'
import { dictaFlow } from 'store/originalDicta/flow'


const reducers = combineReducers({
    dicta,
})

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(reducers, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(dictaFlow)