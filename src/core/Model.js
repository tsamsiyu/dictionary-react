export class Model {

    constructor(container, schema) {
        this.container = container;
        this.schema = schema;

        Object.defineProperty(this, 'relations', {
            writable: false,
            enumerable: false,
            configurable: false,
            value: Object.keys(schema.schema).reduce((reducer, name) => {
                const relationSchema = schema.schema[name];
                if (Array.isArray(relationSchema)) {
                    reducer[name] = {
                        name,
                        key: relationSchema[0].key,
                        list: true,
                        schema: relationSchema[0],
                    };
                } else {
                    reducer[name] = {
                        name,
                        key: relationSchema.key,
                        list: false,
                        schema: relationSchema,
                    };
                }
                return reducer;
            }, {}),
        });
    }

    populate(data) {
        if (typeof data === 'object') {
            this._initialData = {};
            Object.keys(data).forEach((attribute) => {
                let value;
                if (this.relations[attribute]) {
                    value = this.container.mapById(this.relations[attribute].key, data[attribute]);
                } else {
                    value = data[attribute];
                }
                Object.defineProperty(this._initialData, attribute, {
                    configurable: false,
                    enumerable: false,
                    writable: false,
                    value,
                });
                Object.defineProperty(this, attribute, {
                    configurable: false,
                    enumerable: false,
                    writable: true,
                    value: this._initialData[attribute],
                });
            });
        }
    }
}