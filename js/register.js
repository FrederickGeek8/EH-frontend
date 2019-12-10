import { Postman } from "./postman";
import { Cookies } from "./cookies";
import { ErrorHandler } from "./error_handler";

if (Cookies.get("phone") != undefined && Cookies.get("role") != undefined) {
  if (Cookies.get("role") == "doctor") {
    window.location.replace("/info_doctor.html");
  } else {
    window.location.replace("/info.html");
  }
}

document.getElementById("form").onsubmit = e => {
  e.preventDefault();
  const username = document.getElementById("inputUser").value;
  const phone = document.getElementById("inputPhone").value;
  const password = document.getElementById("inputPassword").value;
  const role = document.getElementById("inputRole").value;
  Postman.register(username, phone, password, role)
    .then(res => ErrorHandler.handle(res))
    .then(res => {
      window.location.replace("/login.html");
    })
    .catch(err => alert(err));
};
