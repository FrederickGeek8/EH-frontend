import { Postman } from "./postman";
import { Cookies } from "./cookies";
import { ErrorHandler } from "./error_handler";
import Handlebars from "handlebars";
import "./logout.js";

// Basic login check
if (Cookies.get("phone") == undefined) {
  window.location.replace("/login.html");
}

// Get personal data
Postman.get_personal_data(Cookies.get("phone"))
  .then(res => ErrorHandler.handle(res))
  .then(res => {
    let source = document.getElementById("personal-template").innerHTML;
    let template = Handlebars.compile(source);
    let context = res["data"];
    let html = template(context);
    document.getElementById("personal-container").innerHTML = html;
    document.getElementById("name").innerText = res["data"]["name"];

    document.getElementById("new_name").value = res["data"]["name"];
    document.getElementById("new_email").value = res["data"]["email"];
    document.getElementById("new_gender").value = res["data"]["gender"];
    document.getElementById("new_age").value = res["data"]["age"];
    document.getElementById("new_addr").value = res["data"]["address"];
  })
  .then(_ => {
    $(".container").fadeIn("slow");
  })
  .catch(err => {
    console.log(err);
  });

// Get personal logs
Postman.get_logs(Cookies.get("phone"))
  .then(res => ErrorHandler.handle(res))
  .then(res => {
    console.log(res);
    let source = document.getElementById("logs-template").innerHTML;
    let template = Handlebars.compile(source);
    let context = res;
    let html = template(context);
    document.getElementById("personal-logs").innerHTML = html;
  })
  .catch(err => alert(err));

// Get medicine
Postman.get_medicine(Cookies.get("phone"))
    .then(res => ErrorHandler.handle(res))
    .then(res => {
      console.log(res);
      let source = document.getElementById("med-template").innerHTML;
      let template = Handlebars.compile(source);
      let context = res;
      let html = template(context);
      document.getElementById("personal-meds").innerHTML = html;
    })
    .catch(err => alert(err));

document.getElementById("save_data").onclick = _ => {
  const name = document.getElementById("new_name").value;
  const email = document.getElementById("new_email").value;
  const gender = document.getElementById("new_gender").value;
  const age = document.getElementById("new_age").value;
  const address = document.getElementById("new_addr").value;
  Postman.add_personal_data(name, email, gender, age, address)
    .then(res => ErrorHandler.handle(res))
    .then(() => {
      window.location.reload(false);
    })
    .catch(err => {
      console.log(err);
    });
};

document.getElementById("save_log").onclick = _ => {
  const title = document.getElementById("simple_title").value;
  const content = document.getElementById("simple_content").value;
  Postman.add_quick_log(title, content)
    .then(res => ErrorHandler.handle(res))
    .then(() => {
      window.location.reload(false);
    })
    .catch(err => {
      console.log(err);
    });
};

document.getElementById("save_detailed_log").onclick = _ => {
  const title = document.getElementById("detailed_title").value;
  const content = document.getElementById("detailed_content").value;

  const date = document.getElementById("detailed_date").value;
  const e1 = document.getElementById("detailed_symptom1");
  const sym1 = e1.options[e1.selectedIndex].value;
  const data1 = document.getElementById("detailed_data1").value;
  const e2 = document.getElementById("detailed_symptom2");
  const sym2 = e2.options[e2.selectedIndex].value;
  const data2 = document.getElementById("detailed_data2").value;
  const e3 = document.getElementById("detailed_symptom3");
  const sym3 = e3.options[e3.selectedIndex].value;
  const data3 = document.getElementById("detailed_data3").value;

  const data = {
    [sym1]: data1,
    [sym2]: data2,
    [sym3]: data3
  };

  if ("None" in data) {
    delete data["None"];
  }

  Postman.add_detailed_log(title, date, content, data)
    .then(res => ErrorHandler.handle(res))
    .then(() => {
      window.location.reload(false);
    })
    .catch(err => {
      console.log(err);
    });
};
