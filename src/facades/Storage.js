
export default {
  get(key) {
    return localStorage.getItem(key);
  },
  set(key, val) {
    if (val === undefined) {
      this.unset(key);
    } else {
      localStorage.setItem(key, val);
    }
  },
  has(key) {
    return localStorage.hasOwnProperty(key) && localStorage.getItem(key) !== undefined;
  },
  isset(key) {
    return this.has(key) && Boolean(this.get(key));
  },
  unset(key) {
    localStorage.removeItem(key);
  }
};