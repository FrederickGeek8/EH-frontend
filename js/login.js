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
  const phone = document.getElementById("inputPhone").value;
  const password = document.getElementById("inputPassword").value;
  Postman.login(phone, password)
    .then(res => ErrorHandler.handle(res))
    .then(res => {
      Cookies.set("phone", phone);
      Cookies.set("role", res["role"]);
      if (res["role"] == "doctor") {
        window.location.replace("/info_doctor.html");
      } else {
        window.location.replace("/info.html");
      }
    })
    .catch(err => alert(err));
};
