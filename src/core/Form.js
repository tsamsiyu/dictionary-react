import MobxForm from 'mobx-react-form';

export class Form extends MobxForm {
  fillErrors(object, field) {
    field = field || this;
    Object.keys(object).forEach((key) => {
      try {
        if (Array.isArray(object[key])) {
          if (typeof object[key][0] === 'string') {
            field.$(key).invalidate(object[key][0]);
          } else {
            object[key].forEach((item, ind) => {
              const actualInd = field.fields.get(key).fields.keys()[ind];
              this.fillErrors(item, field.$(`${key}[${actualInd}]`));
            });
          }
        } else if (typeof object[key] === 'object') {
          this.fillErrors(object[key], field.$(key));
        }
      } catch (e) {
        const el = field.name ? `parent field '${field.name}'`: 'form';
        console.error(`Undefined field '${key}' in ${el}`);
      }
    });
  }
}