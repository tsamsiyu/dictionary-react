import { send } from 'utils/api'
import { http } from 'bus'

export function fetchCurrentUser() {
    return send(http.get('users/self'))
}