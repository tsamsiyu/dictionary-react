import { createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { combineReducers, applyMiddleware } from 'redux'
import { dictaReducer } from 'store/dicta/reducer'
import { authReducer } from 'store/auth/reducer'
import { dictaFlow } from 'store/dicta/flow'
import { authFlow } from 'store/auth/flow'
import { createLogger } from 'redux-logger'
import { reducer as formReducer } from 'redux-form'

const sagaMiddleware = createSagaMiddleware()
const loggerMiddleware = createLogger({
    collapsed: true
})

const rootReducer = combineReducers({
    dicta: dictaReducer,
    auth: authReducer,
    form: formReducer,
})

const middlewares = applyMiddleware(
    sagaMiddleware,
    loggerMiddleware,
);

export const store = createStore(rootReducer, middlewares)

sagaMiddleware.run(authFlow)
sagaMiddleware.run(dictaFlow)