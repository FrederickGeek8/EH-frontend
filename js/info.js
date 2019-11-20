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


document.getElementById("save_data").onclick = _=> {
  const name = document.getElementById("new_name").value;
  const email = document.getElementById("new_email").value;
  const gender = document.getElementById("new_gender").value;
  const age = document.getElementById("new_age").value;
  const address = document.getElementById("new_addr").value;
  Postman.add_patient_data(name, email, gender, age, address)
    .then(res => ErrorHandler.handle(res))
    .then(() => {
      window.location.replace("/info.html");
    }).catch(err => {
      console.log(err);
    })
}

document.getElementById("save_log").onclick = _=> {
  const title = document.getElementById("simple_title").value;
  const content = document.getElementById("simple_content").value;
  Postman.add_quick_log(title, content)
    .then(res => ErrorHandler.handle(res))
    .then(() => {
      window.location.replace("/info.html");
    }).catch(err => {
      console.log(err);
    })
}

document.getElementById("save_detailed_log").onclick = _=> {
  const title = document.getElementById("detailed_title").value;
  const content = document.getElementById("detailed_content").value;
  const date = document.getElementById("detailed_date").value;
  const e1 = document.getElementById("detailed_sympton1");
  const sym1 = e1.options[e1.selectedIndex].value;
  const data1 = document.getElementById("detailed_data1").value;
  const e2 = document.getElementById("detailed_sympton1");
  const sym2 = e2.options[e2.selectedIndex].value;
  const data2 = document.getElementById("detailed_data2").value;
  const e3 = document.getElementById("detailed_sympton1");
  const sym3 = e3.options[e3.selectedIndex].value;
  const data3 = document.getElementById("detailed_data3").value;
  const data = {
    sym1: data1,
    sym2: data2,
    sym3: data3
  }
  Postman.add_detailed_log(title, date, content, data)
    .then(res => ErrorHandler.handle(res))
    .then(() => {
      window.location.replace("/info.html");
    }).catch(err => {
      console.log(err);
    })
}