import { observable, action } from 'mobx';
import { http } from 'bus';
import { normalize } from 'normalizr';
import { originalDictum } from 'store/schemas';
import { stores } from 'bus';
import { httpModelHandler } from 'core/utils/httpModelHandler';

export class Dicta {
  @observable originalDicta = [];

  @action('load')
  load() {
    return httpModelHandler(http.get('dicta')).then((body) => {
      const flatList = normalize(body.data, [originalDictum]);
      const models = stores.containerStore.putFlatList(flatList.entities);
      this.originalDicta = Object.values(models.originalDictum);
    }).catch(console.error);
  }

  @action('create')
  create(model) {
    return httpModelHandler(http.post('dicta', model));
  }

  @action('update')
  update(model, values) {
    return httpModelHandler(http.put('dicta/' + model.id, values)).then((body) => {
      const flatDictum = normalize(body.data, originalDictum);
      console.log(flatDictum);
      const models = stores.containerStore.putFlatList(flatDictum.entities);
    }).catch(console.error);
  }

  @action('remove')
  remove(model) {
    return httpModelHandler(http.delete('dicta/' + model.id)).then((body) => {
      this.originalDicta = this.originalDicta.filter((item) => {
        return String(item.id) !== String(model.id);
      });
    }).catch(console.error);
  }

}