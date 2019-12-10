const server = "http://localhost:5000";

export class Postman {
  static async login(phone, password) {
    const body = {
      phone: phone,
      password: password
    };

    return await Postman._post(body, '/login');
  }

  static async register(username, phone, password, role) {
    const body = {
      username: username,
      phone: phone,
      password: password,
      role: role
    };

    return await Postman._post(body, '/register');
  }

  static async get_personal_data(phone_number) {
    const body = {
      phone: phone_number
    };

    return await Postman._post(body, '/get/data');
  }

  static async add_personal_data(name, email, gender, age, address) {
    const body = {
      name: name,
      email: email,
      gender: gender,
      age: age,
      address: address
    };

    return await Postman._post(body, "/add/data");
  }

  static async add_quick_log(title, content) {
    const body = {
      title: title,
      content: content,
      t: "simple"
    };

    return await Postman._post(body, "/add/log");
  }

  static async add_detailed_log(title, date, content, data) {
    const body = {
      title: title,
      date: date,
      content: content,
      data: data,
      t: "detailed"
    };

    return await Postman._post(body, "/add/log");
  }

  static async get_logs(phone_number) {
    const body = {
      phone: phone_number
    };

    return await Postman._post(body, "/get/log");
  }

  static async add_medicine(phone, med_name, desc, times, start, end) {
    const body = {
      patient_phone: phone,
      name: med_name,
      description: desc,
      times: times,
      start_time: start,
      end_time: end
    };

    return await Postman._post(body, "/add/medicine");
  }

  static async get_medicine(phone_number) {
    const body = {
      patient_phone: phone_number
    };

    return await Postman._post(body, "/get/medicine");
  }

  static async add_illness(phone, title, content, date, diseases) {
    const body = {
      phone: phone,
      title: title,
      content: content,
      date: date,
      diseases: diseases
    };

    return await Postman._post(body, "/add/diagnosis");
  }

  static async get_illness(phone_number) {
    const body = {
      phone: phone_number
    };

    return await Postman._post(body, "/get/diagnosis");
  }

  static async logout() {
    const body = {};

    return await Postman._get(body, '/logout');
  }

  static async search(name) {
    const body = {
      name: name
    };
    
    return await Postman._post(body, '/search/patient');
  }

  static async _post(body, path) {
    const response = await fetch(server + path, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    return await response.json();
  }

  static async _get(params, path) {
    let query = Object.keys(params)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join('&');

    if (query != '') {
      query = '?' + query;
    }

    const response = await fetch(server + path + query, {
      credentials: 'include'
    });

    return await response.json();
  }
}
