// Global API server variable. Change as needed.
const server = "http://localhost:5000";

// Helper class for easy API calls
export class Postman {
  // route for logging in
  static async login(phone, password) {
    const body = {
      phone: phone,
      password: password
    };

    return await Postman._post(body, '/login');
  }

  // route for registering
  static async register(username, phone, password, role) {
    const body = {
      username: username,
      phone: phone,
      password: password,
      role: role
    };

    return await Postman._post(body, '/register');
  }

  // route for getting personal data for a specific user
  static async get_personal_data(phone_number) {
    const body = {
      phone: phone_number
    };

    return await Postman._post(body, '/get/data');
  }

  // route for adding personal data for the current user.
  static async add_personal_data(name, email, gender, age, address, image) {
    const body = {
      name: name,
      email: email,
      gender: gender,
      age: age,
      address: address,
      image: image
    };

    return await Postman._post(body, "/add/data");
  }

  // route for adding a quick log for the current patient.
  static async add_quick_log(title, content) {
    const body = {
      title: title,
      content: content,
      t: "simple"
    };

    return await Postman._post(body, "/add/log");
  }

  // route for adding a detailed log for the current patient
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

  // route for getting logs for a specific patient given their phone number
  static async get_logs(phone_number) {
    const body = {
      phone: phone_number
    };

    return await Postman._post(body, "/get/log");
  }

  // route for adding medicine for a specific patient
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

  // route for getting medicine for a specific patient given their phone number
  static async get_medicine(phone_number) {
    const body = {
      patient_phone: phone_number
    };

    return await Postman._post(body, "/get/medicine");
  }

  // route for adding an illness to a specific patient given their phone number
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

  // route for getting a patient's illnesses given their phone number
  static async get_illness(phone_number) {
    const body = {
      phone: phone_number
    };

    return await Postman._post(body, "/get/diagnosis");
  }

  // route for logging out
  static async logout() {
    const body = {};

    return await Postman._get(body, '/logout');
  }

  // route for searching for a patient's phone number given a name
  static async search(name) {
    const body = {
      name: name
    };
    
    return await Postman._post(body, '/search/patient');
  }

  // route for texting a patient at a given phone number
  static async message(phone_number, message) {
    const body = {
      phone: phone_number,
      message: message
    };

    return await Postman._post(body, '/add/reminder');
  }

  // helper method for posting data to the server at a specified path
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

  // helper method for getting data from the server at a specified path
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
