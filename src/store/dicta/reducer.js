import { ACTIONS } from 'store/actions'

const initialState = {
    requesting: false,
    error: null,
    originalDicta: [],
    translationDicta: [],
    translationGroups: [],
}

export function dictaReducer(state = initialState, action) {
    switch(action.type) {
        case ACTIONS.DICTA.REQUESTING: 
            return { ...state, loading: true }
        case ACTIONS.DICTA.RECEIVED: 
            return { ...state, loading: false, ...action.flatList.entities }
        case ACTIONS.DICTA.REJECTED:
            return { ...state, loading: false, error: action.error }
        default:
            return state
    }
}