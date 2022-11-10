class AlarmClock {
  constructor(hours, minutes, seconds, format) {
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
    this.format = format;
  }

  display = (x) => {
    x.innerHTML += `
    ${this.hours % 12 < 10 ? "0" + (this.hours % 12) : this.hours % 12}
    : ${this.minutes < 10 ? "0" + this.minutes : this.minutes}
    : ${this.seconds < 10 ? "0" + this.seconds : this.seconds}
     ${this.format}
    `;
  };

  displayClock = () => {
    let clk = document.getElementById("clock");
    clk.innerHTML = "";
    this.display(clk);
  };
}

class Alarms extends AlarmClock {
  constructor(hours, minutes, seconds, format) {
    super(hours, minutes, seconds, format);
  }

  static #i = 0;
  static #timer = [];
  alarms_ul = document.getElementById("alarms_ul");

  #months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  updateTotalAlarms(alarm_time, duration) {
    Alarms.#timer[Alarms.#i] = setTimeout(() => {
      alert("Times up");
      console.log("Alarm Deleted");
      document.getElementById(alarm_time).remove();
      Alarms.#i--;
    }, duration);
    //  console.log("updated timer index i = " + Alarms.#i);
    //  console.log("updated timer at i = " + Alarms.#timer[Alarms.#i]);
  }

  // Delete Alarm function
  deleteAlarm = (id) => {
    //  console.log("id = " + id);
    clearInterval(Alarms.#timer[Alarms.#i]);
  };

  // Display Alarm List
  displayAlarms = (time) => {
    let alarmTime = time;
    console.log("time = " + time);
    //create newLi tag to append to the alarms List
    let newLi = document.createElement("li");
    newLi.className = "alarms-li";
    newLi.id = time;
    newLi.innerHTML = `
      <span class="fa-li"><i class="fas fa-bell fa-2x"></i></span>
      ${this.#months[alarmTime.getMonth()]}
      ${alarmTime.getDate()},       
      `;
    this.display(newLi);

    //  console.log("time = " + time);
    newLi.innerHTML += `<button type="submit" id="${
      Alarms.#i
    }" class="deleteAlarm">Delete</button> `;

    alarms_ul.appendChild(newLi);
    var b = document.getElementById(Alarms.#i);
    b.onclick = this.deleteAlarm(Alarms.#i);
  };

  setAlarm = (alarm_time) => {
    let curr_time = new Date();
    //    console.log("alarm_time 1 = " + alarm_time);
    //   console.log("timer 1 = " + Alarms.#timer);
    let duration = alarm_time - curr_time;
    //  console.log("duration 1 = " + duration);
    if (duration < 0) {
      alert("Time has already passed");
    } else {
      this.displayAlarms(alarm_time);
      Alarms.#i += 1;
      this.updateTotalAlarms(alarm_time, duration);
    }
  };

  static removeAlarm(el) {
    if (el.classList.contains("deleteAlarm")) {
      el.parentElement.remove();
    }
  }
}

let start = () => {
  let today = new Date();
  let clock = new AlarmClock(
    today.getHours(),
    today.getMinutes(),
    today.getSeconds(),
    today.getHours() < 12 ? "A.M" : "P.M"
  );
  clock.displayClock();
  setTimeout(start, 1000);
};

// Displays Clock
document.addEventListener("DOMContentLoaded ", start());

// Add Alarm
document.querySelector("#submit_alarm_time").addEventListener("click", (e) => {
  e.preventDefault();
  let alarmsInput = document.getElementById("alarm_input");
  let alarm = alarmsInput.value;
  alarmsInput.value = "";
  if (alarm !== "") {
    let alarmTime = new Date(alarm);
    let a = new Alarms(
      alarmTime.getHours(),
      alarmTime.getMinutes(),
      alarmTime.getSeconds(),
      alarmTime.getHours() < 12 ? "A.M" : "P.M"
    );
    a.setAlarm(alarmTime);
  } else {
    alert("Select Alarm Time !!!");
  }
});

document.getElementById("alarms_ul").addEventListener("click", (e) => {
  Alarms.removeAlarm(e.target);
});
