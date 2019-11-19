import { Postman } from "./postman.js";
import { Cookies } from "./cookies.js";
import { ErrorHandler } from "./error_handler";

document.getElementById("form").onsubmit = e => {
  e.preventDefault();
  const phone = document.getElementById("inputPhone").value;
  const password = document.getElementById("inputPassword").value;
  const role = document.getElementById("inputRole").value;
  Postman.login(phone, password, role)
    .then(res => ErrorHandler.handle(res))
    .then(() => {
      Cookies.set('phone', phone);
      window.location.replace("/info.html");
    })
    .catch((err) => {
      $("#error-body").text(err);
      $("#mymodal").modal("show");
    });
};
