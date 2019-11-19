import {Postman} from './postman.js';

document.getElementById("form").onsubmit = (e) => {
  e.preventDefault();
  const username = document.getElementById("inputUser").value;
  const phone = document.getElementById("inputPhone").value;
  const password = document.getElementById("inputPassword").value;
  const role = document.getElementById("inputRole").value;
  Postman.register(username, phone, password, role).then((res) => {
    window.location.replace('/login.html');
  }).catch(() => {
    $("#mymodal").modal('show');
  });
};