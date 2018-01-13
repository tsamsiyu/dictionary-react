import { send } from 'core/utils/api'
import { http } from 'bus'

export function fetchPage() {
    return send(http.get('dicta'))
}