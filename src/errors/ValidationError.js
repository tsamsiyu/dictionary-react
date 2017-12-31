import {set} from 'lodash';
import { ExtendableError } from 'core/ExtendableError';

export class ValidationError extends ExtendableError {
  constructor(message) {
    if (typeof message === 'object') {
      super('Invalid input error');
      this.fails = [];
      Object.keys(message).forEach((key) => {
        set(this.fails, key, message[key]);
      });
    } else {
      super(message);
    }
  }
}