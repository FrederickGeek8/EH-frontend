import { Postman } from "./postman";
import { Cookies } from "./cookies";
import { ErrorHandler } from "./error_handler";
import Handlebars from "handlebars";
import "./logout";

if (Cookies.get("phone") != undefined && Cookies.get("role") != undefined) {
  if (Cookies.get("role") == "patient") {
    window.location.replace("/info.html");
  }
}

document.getElementById("search").onclick = () => {
  const name = document.getElementById("name").value;

  Postman.search(name).then(res => ErrorHandler.handle(res)).then(res => {
    let source = document.getElementById("results-template").innerHTML;
    let template = Handlebars.compile(source);
    let context = res;
    let html = template(context);
    document.getElementById("results").innerHTML = html;
  });
};
