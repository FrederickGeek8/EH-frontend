import { Cookies } from "./cookies";
import { Postman } from "./postman";
import { ErrorHandler } from "./error_handler";
import Handlebars from "handlebars";
import "./logout";

if (Cookies.get("phone") == undefined) {
  window.location.replace("/login.html");
}

var current_phone = -1;

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
    alert(err);
  });

document.getElementById("add_med").onclick = () => {
  const med_name = document.getElementById("med-name").value;
  const desc = document.getElementById("med-desc").value;
  const time_1 = document.getElementById("med-time-1").value;
  const time_2 = document.getElementById("med-time-2").value;
  const time_3 = document.getElementById("med-time-3").value;
  const start = document.getElementById("start-date").value;
  const end = document.getElementById("end-date").value;
  let times = {};

  if (time_1 != "") {
    times[0] = time_1;
  }

  if (time_2 != "") {
    times[1] = time_2;
  }

  if (time_3 != "") {
    times[2] = time_3;
  }

  Postman.add_medicine(current_phone, med_name, desc, times, start, end)
    .then(res => ErrorHandler.handle(res))
    .then(_ => Postman.get_medicine(current_phone))
    .then(res => ErrorHandler.handle(res))
    .then(res => {
      let source = document.getElementById("med-template").innerHTML;
      let template = Handlebars.compile(source);
      let context = res;
      let html = template(context);
      document.getElementById("patient-meds").innerHTML = html;

      $('input').val('');
      $('textarea').val('');
    })
    .catch(err => alert(err));
};

document.getElementById("add_ill_btn").onclick = _ => {
  const title = document.getElementById("ill-title").value;
  const content = document.getElementById("ill-desc").value;
  const date = document.getElementById("ill-date").value;
  const dis1 = document.getElementById("ill-dis1").value;
  const dis1_data = document.getElementById("ill-dis1_data").value;
  const dis2 = document.getElementById("ill-dis2").value;
  const dis2_data = document.getElementById("ill-dis2_data").value;
  const dis3 = document.getElementById("ill-dis3").value;
  const dis3_data = document.getElementById("ill-dis3_data").value;
  
  let diseases = {
    [dis1]: dis1_data,
    [dis2]: dis2_data,
    [dis3]: dis3_data
  };

  if ("" in diseases) {
    delete diseases[""];
  }

  Postman.add_illness(current_phone, title, content, date, diseases)
    .then(res => ErrorHandler.handle(res))
    .then(_ => Postman.get_illness(current_phone))
    .then(res => ErrorHandler.handle(res))
    .then(res => {
      let source = document.getElementById("ill-template").innerHTML;
      let template = Handlebars.compile(source);
      let context = res;
      let html = template(context);
      document.getElementById("patient-ill").innerHTML = html;

      $('input').val('');
      $('textarea').val('');
    })
    .catch(err => alert(err));
};

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

document.getElementById("retrieve_data").onclick = () => {
  current_phone = document.getElementById("inputPhone").value;

  Postman.get_personal_data(current_phone)
    .then(res => ErrorHandler.handle(res))
    .then(res => {
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

  Postman.get_logs(current_phone)
    .then(res => ErrorHandler.handle(res))
    .then(res => {
      let source = document.getElementById("logs-template").innerHTML;
      let template = Handlebars.compile(source);
      let context = res;
      let html = template(context);
      document.getElementById("patient-logs").innerHTML = html;
    })
    .catch(err => alert(err));

  Postman.get_medicine(current_phone)
    .then(res => ErrorHandler.handle(res))
    .then(res => {
      let source = document.getElementById("med-template").innerHTML;
      let template = Handlebars.compile(source);
      let context = res;
      let html = template(context);
      document.getElementById("patient-meds").innerHTML = html;
    })
    .catch(err => alert(err));

  Postman.get_illness(current_phone)
    .then(res => ErrorHandler.handle(res))
    .then(res => {
      let source = document.getElementById("ill-template").innerHTML;
      let template = Handlebars.compile(source);
      let context = res;
      let html = template(context);
      document.getElementById("patient-ill").innerHTML = html;
    })
    .catch(err => alert(err));

  $(".accordion").show();
};
