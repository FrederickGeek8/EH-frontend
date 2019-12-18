// Cookie manager helper class
export class Cookies {
  // set a key-value pair for a cookie
  static set(key, value) {
    let obj = {};
    obj[key] = value;
    document.cookie = Cookies._encode(obj);
  }

  // get a cookie value for a specified key
  static get(key) {
    let obj = Cookies._decode();
    return obj[key];
  }

  // clear all site-specific cookies
  static clear() {
    const decode = Cookies._decode();
    for (let key in decode) {
      document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  }

  // helper function to translate the cookie string to an object
  static _decode() {
    var obj = {};
    if (document.cookie != "") {
      document.cookie.split(';').forEach(value => {
        const splitted = value.split('=');
        obj[splitted[0].trim()] = splitted[1].trim();
      });
    }
    

    return obj;
  }

  // helper function to translate an object to a cookie string
  static _encode(input) {
    var encoded = "";
    for (let key in input) {
      encoded += `${key}=${input[key]};`;
    }

    return encoded;
  }
}