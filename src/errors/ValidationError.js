import {set} from 'lodash';
import { ExtendableError } from 'core/ExtendableError';

export class ValidationError extends ExtendableError {
  constructor(message) {
    if (typeof message === 'object') {
      super('Invalid input error')
      this.dotFails = message
      this.formFails = {}
      this.fails = []
      Object.keys(message).forEach((dotKey) => {
        const formKey = dotKey.replace(/\.(\d+)(\.)?/, '[$1]$2');
        this.formFails[formKey] = this.dotFails[dotKey];
      });
      Object.keys(message).forEach((key) => {
        set(this.fails, key, message[key]);
      });
    } else {
      super(message);
    }
  }
}