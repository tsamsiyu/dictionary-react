import { http } from 'bus';

export class SnapBug {
    static notify(e) {
        http.post('snap-bug', {
            message: e.message,
            trace: e.stack,
        });
    }
}