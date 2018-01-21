import { ValidationError } from "errors/ValidationError"
import { ServerError } from "errors/ServerError"

export function send(promise) {
    return promise
        .then((response) => {
            return response.data;
        })
        .catch((fail) => {
            if (fail.response) {
                if (String(fail.response.status) === '422') {
                    throw new ValidationError(fail.response.data);
                } else {
                    throw new ServerError(fail.response.data);
                }
            } else {
                throw fail;
            }
        });
}