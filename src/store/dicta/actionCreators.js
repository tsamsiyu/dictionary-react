import { ACTIONS } from 'store/actions';

export function fetchDicta() {
    return {
        type: ACTIONS.DICTA.REQUESTING,
    }
}

export function receivedDicta(flatList) {
    return {
        type: ACTIONS.DICTA.RECEIVED,
        flatList,
    }
}

export function rejectedDicta(error) {
    return {
        type: ACTIONS.DICTA.REJECTED,
        error,
    }
}