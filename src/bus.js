import Http from 'services/Http';
import Storage from 'facades/Storage';
import { Auth } from 'store/Auth';
import { Container } from 'store/Container';
import { Dicta } from 'store/Dicta';
import { trimEnd } from 'lodash';

const baseUrl = trimEnd(process.env.REACT_APP_API_URL);
const headers = {
  'Content-Type': 'application/json',
};

if (Storage.isset('apiToken')) {
  headers['Authorization'] = 'Bearer ' + Storage.get('apiToken');
}

export const http = new Http(baseUrl, headers);

export const appName = process.env.REACT_APP_NAME;

export const stores = {
  authStore: new Auth(),
  dictaStore: new Dicta(),
  containerStore: new Container(),
};