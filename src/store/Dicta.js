import { observable, action } from 'mobx';
import { http } from 'bus';
import { ValidationError } from "errors/ValidationError";
import { normalize } from 'normalizr';
import { originalDictum } from 'store/schemas';
import { stores } from 'bus';

export class Dicta {
  @observable originalDicta = [];

  @action('load')
  load() {
    return http.get('dicta')
      .then((response) => {
        const flatList = normalize(response.data.data, [originalDictum]);
        const models = stores.containerStore.putFlatList(flatList.entities);
        console.log(models);
        this.originalDicta = Object.values(models.originalDictum);
      }).catch((fail) => {
        console.error(fail);
      });
  }

  @action('create')
  create(object) {
    return new Promise((resolve, reject) => {
      http.post('dicta', object)
        .then((response) => {
          resolve(response.data);
        })
        .catch((fail) => {
          if (fail.response) {
            if (String(fail.response.status) === '422') {
              reject(new ValidationError(fail.response.data));
            } else {
              reject(fail.response.data);
            }
          } else {
            reject(fail);
          }
        });
    });
  }

  @action('remove')
  remove(model) {
    return new Promise((resolve, reject) => {
      const index = this.originalDicta.indexOf(model);
      if (index > -1) {
        return http.delete('dicta/' + model.id)
          .then((response) => {
            this.originalDicta.splice(index, 1);
            resolve();
          })
          .catch((fail) => {
            if (fail.response) {
              if (String(fail.response.status) === '422') {
                reject(new ValidationError(fail.response.data));
              } else {
                reject(fail.response.data);
              }
            } else {
              reject(fail);
            }
          });
      } else {
        reject(new Error('Model not found')); // TODO: add NotFound exception
      }
    });
  }

}