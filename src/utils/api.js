import { ValidationError } from "errors/ValidationError"

export function send(promise) {
    return promise
        .then((response) => {
            return response.data;
        })
        .catch((fail) => {
            if (fail.response) {
                if (String(fail.response.status) === '422') {
                    return new ValidationError(fail.response.data);
                } else {
                    console.error(fail);
                    return fail.response.data;
                }
            } else {
                console.error(fail);
                return fail;
            }
        });
}