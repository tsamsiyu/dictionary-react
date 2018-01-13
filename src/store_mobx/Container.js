import { Model } from 'core/Model';
import { schemas } from 'store/schemas';
import { schema } from 'normalizr';

export class Container {
    _models = [];
    _indexes = {};

    make(schemeOrName) {
        let name;
        if (schemeOrName instanceof schema.Entity) {
            name = schemeOrName.key;
        } else {
            name = schemeOrName;
        }
        return new Model(this, schemas[name]);
    }

    put(model) {
        if (!Array.isArray(model.schema.key)) {
            this._models[model.schema.key] = [];
        }
        this._models[model.schema.key].push(model);
    }

    create(schemeOrName, data) {
        const model = this.make(schemeOrName);
        this.put(model);
        if (typeof data === 'object') {
            model.populate(data);
            data.id && this.index(model);
        } else if (data) {
            model.populate({id: data});
            this.index(model);
        }
        return model;
    }

    index(model, attr = 'id') {
        if (model.id && model.schema.key) {
            if (!this._indexes[model.schema.key]) {
                this._indexes[model.schema.key] = {};
            }
            if (!this._indexes[model.schema.key][attr]) {
                this._indexes[model.schema.key][attr] = {};
            }
            this._indexes[model.schema.key][attr][model[attr]] = model;
        }
    }

    getIndex(name, value, attr = 'id') {
        if (typeof this._indexes[name] !== 'object') {
            return null;
        }
        if (typeof this._indexes[name][attr] !== 'object') {
            return null;
        }
        return this._indexes[name][attr][value] || null;
    }

    putFlatList(entities) {
        const res = {};
        const toPopulate = [];
        Object.keys(entities).forEach((name) => {
            res[name] = [];
            Object.keys(entities[name]).forEach((id) => {
                let model = this.getIndex(name, id);
                if (!model) {
                    model = this.create(name, id);
                }
                res[name].push(model);
                toPopulate.push([model, entities[name][id]]);
            });
        });
        toPopulate.forEach(([model, object]) => {
            model.populate(object);
        });
        return res;
    }

    mapById(name, id) {
        if (!this._models[name]) {
            return null;
        }
        if (Array.isArray(id)) {
            return id.map((id) => {
                return this.getIndex(name, id);
            });
        } else {
            return this.getIndex(name, id);
        }
    }
}