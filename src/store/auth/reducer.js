import { ACTIONS } from 'store/actions'
import { STATUSES } from 'store/statuses'

const initialState = {
    status: null,
    user: null,
    error: null
}

export function authReducer(state = initialState, {type, user, error}) {
    console.log(type);
    switch(type) {
        case ACTIONS.AUTH.CURRENT_USER_FETCHING:
            return { ...state, status: STATUSES.REQUESTING }
        case ACTIONS.AUTH.CURRENT_USER_RECEIVED:
            return { status: STATUSES.COMPLETED, user, error }
        case ACTIONS.AUTH.CURRENT_USER_REJECTED:
            return { ...state, status: STATUSES.FAILED, error }
        default:
            return state;
    }
}