import { Cookies } from "./cookies";
import { Postman } from "./postman";
import { ErrorHandler } from "./error_handler";
import Handlebars from "handlebars";
import "./logout";

if (Cookies.get("phone") == undefined) {
  window.location.replace("/login.html");
}

Postman.get_personal_data(Cookies.get("phone"))
  .then(res => ErrorHandler.handle(res))
  .then(res => {
    console.log(res);
    let source = document.getElementById("personal-template").innerHTML;
    let template = Handlebars.compile(source);
    let context = res["data"];
    let html = template(context);
    document.getElementById("personal-container").innerHTML = html;
    document.getElementById("name").innerText = res["data"]["name"];
  })
  .then(_ => {
    $(".container").fadeIn("slow");
  })
  .catch(err => {
    alert(err);
  });

document.getElementById("retrieve_data").onclick = () => {
  const phone_number = document.getElementById("inputPhone").value;

  Postman.get_personal_data(phone_number)
    .then(res => ErrorHandler.handle(res))
    .then(res => {
      console.log(res);
      let source = document.getElementById("patient-template").innerHTML;
      let template = Handlebars.compile(source);
      let context = res["data"];
      let html = template(context);
      document.getElementById("patient-container").innerHTML = html;
      document.getElementById("patient-name").innerText = res["data"]["name"];
    })
    .catch(err => {
      alert(err);
    });
};
