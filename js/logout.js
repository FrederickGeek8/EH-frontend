import { Postman } from "./postman";
import { Cookies } from "./cookies";
import { ErrorHandler } from "./error_handler";

document.getElementById("logoutButton").onclick = () => {
  Postman.logout()
    .then(res => ErrorHandler.handle(res))
    .then(_ => Cookies.clear())
    .then(_ => window.location.replace("/login.html"))
    .catch(err => alert(err));
};
