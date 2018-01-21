import { send } from 'utils/api'
import { http } from 'bus'

export default {
    fetchDictaPage() {
        return send(http.get('dicta'))
    },
    createDictum(dictum) {
        return send(http.post('dicta', dictum))
    }
}