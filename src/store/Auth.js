import { observable, action } from 'mobx';
import { http } from 'bus';

export class Auth {
  @observable loaded = false;
  @observable user;
  @observable isAuthenticated = false;

  @action('load')
  load() {
    http.get('users/self')
      .then((response) => {
        this.user = response.data;
        this.isAuthenticated = true;
        this.loaded = true;
      })
      .catch((fail) => {
        this.isAuthenticated = false;
        this.loaded = true;
      });
  }

  @action('login')
  login(email, password) {
    http.post('login', {email, password}).then((response) => {
      if (response.data.api_token) {
        localStorage.setItem('apiToken', response.data.api_token);
        console.log('eee');
        this.isAuthenticated = true;
      }
    }).catch(() => {
      localStorage.setItem('apiToken', null);
      this.isAuthenticated = false;
    })
  }
}