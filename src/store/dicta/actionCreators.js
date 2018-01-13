import { ACTIONS } from 'store/actions';

export function fetchDicta() {
    return {
        type: ACTIONS.DICTA.FETCH,
    }
}

export function requestingDicta() {
    return {
        type: ACTIONS.DICTA.FETCHING,
    }
}

export function receivedDicta(dicta) {
    return {
        type: ACTIONS.DICTA.FETCHED,
        dicta,
    }
}

export function rejectedDicta(error) {
    return {
        type: ACTIONS.DICTA.FAILED,
        error,
    }
}