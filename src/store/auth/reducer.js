import { ACTIONS } from 'store/actions'
import { STATUSES } from 'store/statuses'
import Storage from 'facades/Storage'

const initialState = {
    status: null,
    user: null,
    error: null,
    token: Storage.get("apiToken"),
}

export function authReducer(state = initialState, {type, user, error}) {
    switch(type) {
        case ACTIONS.AUTH.CURRENT_USER_FETCHING:
            return { ...state, status: STATUSES.REQUESTING }
        case ACTIONS.AUTH.CURRENT_USER_RECEIVED:
            return { status: STATUSES.COMPLETED, user, error }
        case ACTIONS.AUTH.CURRENT_USER_REJECTED:
            return { ...state, status: STATUSES.FAILED, error }
        case ACTIONS.AUTH.LOGIN_RECEIVED:
            Storage.set("apiToken", user.api_token)
            return { ...state, status: STATUSES.COMPLETED, user, token: user.api_token }
        default:
            return state;
    }
}