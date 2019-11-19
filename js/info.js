import { Postman } from "./postman";
import { Cookies } from "./cookies";
import { ErrorHandler } from "./error_handler";
import Handlebars from "handlebars";

Postman.get_patient(Cookies.get("phone"))
  .then(res => ErrorHandler.handle(res))
  .then(res => {
    console.log(res);
    let source = document.getElementById("personal-template").innerHTML;
    let template = Handlebars.compile(source);
    let context = res["data"];
    let html = template(context);
    document.getElementById("personal-container").innerHTML = html;
    document.getElementById("name").innerText = res["data"]["name"];
  }).then(_ => {
    $(".container").fadeIn("slow");
  }).catch(err => {
    console.log(err);
  });


