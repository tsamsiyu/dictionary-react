import { ACTIONS } from 'store/actions'

const initialState = {
    fail: null,
    error: null,
    originalDicta: [],
    translationDicta: [],
    translationGroups: [],
}

export function dictaReducer(state = initialState, action) {
    switch(action.type) {
        case ACTIONS.DICTA.FETCH_REQUEST: 
            return { ...state }
        case ACTIONS.DICTA.FETCH_RECEIVED: 
            return { ...state, ...action.flatList.entities }
        case ACTIONS.DICTA.FETCH_REJECTED:
            return { ...state, fail: action.fail }
        case ACTIONS.DICTA.CREATE_INVALIDATED:
            return { ...state, error: action.error }
        default:
            return state
    }
}