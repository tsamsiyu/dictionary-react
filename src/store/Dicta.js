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
          console.log(response);
          resolve(response.data);
        })
        .catch((fail) => {
          if (fail.response) {
            if (String(fail.response.status) === '422') {
              console.log(fail.response.data);
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

  // @action('add')
  // add() {
  //   this.list.push(new Word())
  // }
  //
  // destroyIndex(ind) {
  //   return this.destroy(this.list[ind]);
  // }
  //
  // @action('destroy')
  // destroy(word) {
  //   return new Promise((resolve, reject) => {
  //     const ind = this.list.indexOf(word);
  //     if (ind > -1) {
  //       if (word.isNew()) {
  //         this.list.splice(ind, 1);
  //         resolve();
  //       } else {
  //         return http.delete('dicta/' + word.id).then(() => {
  //           this.list.splice(ind, 1);
  //           resolve();
  //         }).catch((fail) => {
  //           reject(fail);
  //         })
  //       }
  //     } else {
  //       reject('There is not such element in collection');
  //     }
  //   });
  // }
  //
  // @action('create')
  // create(word) {
  //   return http.post('dicta/new', word)
  //     .then((response) => {
  //       this.list.push(new Word(response.model));
  //     }).catch((fail) => {
  //       // TODO
  //       throw new Error(fail);
  //     })
  // }
  //
  // @action('update')
  // update(word) {
  //   return new Promise((resolve, reject) => {
  //     const ind = this.list.indexOf(word);
  //     if (ind > -1) {
  //       http.put('dicta/' + word.id, word)
  //         .then((response) => {
  //           this.list[ind] = new Word(response.data);
  //           resolve();
  //         })
  //         .catch((fail) => {
  //           reject(fail);
  //         })
  //     } else {
  //       reject('There is not element with such index in collection');
  //     }
  //   });
  // }
}