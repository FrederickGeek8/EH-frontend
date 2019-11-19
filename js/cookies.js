export class Cookies {
  static set(key, value) {
    let obj = {};
    obj[key] = value;
    document.cookie = Cookies._encode(obj);
  }

  static get(key) {
    let obj = Cookies._decode();
    return obj[key];
  }

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

  static _encode(input) {
    var encoded = "";
    for (let key in input) {
      encoded += `${key}=${input[key]};`;
    }

    return encoded;
  }
}