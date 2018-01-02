import { Model } from 'core/Model';
import { schemas } from 'store/schemas';
import { schema } from 'normalizr';

export class Container {
    _models = [];

    make(name, data) {
        if (name instanceof schema.Entity) {
            name = name.key;
        }
        return new Model(this, schemas[name], data);
    }

    put(name, model) {
        if (name instanceof schema.Entity) {
            name = name.key;
        }
        if (!Array.isArray(this._models[name])) {
            this._models[name] = {};
        }
        // if (!model instanceof Model) {
            // console.log('make', model);
            model = this.make(name, model);
        // }
        if (!model.id) {
            model.hashCode = Math.random().toString(36).substring(7);
        } else {
            model.hashCode = model.id;
        }
        this._models[name][model.hashCode] = model;
        return model;
    }

    putFlatList(entities) {
        const res = {};
        Object.keys(entities).forEach((name) => {
            res[name] = {};
            Object.keys(entities[name]).forEach((id) => {
                const model = this.put(name, entities[name][id]);
                res[name][model.hashCode] = model;
            });
        });
        return res;
    }

    mapById(name, id) {
        if (!this._models[name]) {
            return null;
        }
        if (Array.isArray(id)) {
            return id.map((id) => {
                return this._models[name][id];
            });
        } else {
            return this._models[name][id];
        }
    }
}