import { ACTIONS } from 'store/actions'

export function currentUserFetch() {
    return {
        type: ACTIONS.AUTH.CURRENT_USER_FETCHING
    }
}

export function currentUserReceived(user) {
    return {
        type: ACTIONS.AUTH.CURRENT_USER_RECEIVED,
        user
    }
}

export function currentUserRejected(error) {
    return {
        type: ACTIONS.AUTH.CURRENT_USER_REJECTED,
        error
    }
}