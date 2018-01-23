import { send } from 'utils/api'
import { http } from 'bus'

export function fetchCurrentUser() {
    return send(http.get('users/self'))
}

export function login(data) {
    return send(http.post('login', data))
}
