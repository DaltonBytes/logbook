console.log("Log your flight!");

const toggle = document.getElementById("theme-toggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggle.textContent = document.body.classList.contains("dark")
    ? "Light Mode"
    : "Dark Mode";
});

const flightLog = (() => {
  const flightList = [];

  return {
    addFlight(
      date,
      aircraft,
      tail,
      depTime,
      depICAO,
      arrTime,
      arrICAO,
      takeoffWx,
      landingWx,
    ) {
      const calculateFlightTime = (depTime, arrTime) => {
        const [depHours, depMinutes] = depTime.split(":").map(Number);
        const [arrHours, arrMinutes] = arrTime.split(":").map(Number);
        let depTotal = depHours * 60 + depMinutes;
        let arrTotal = arrHours * 60 + arrMinutes;

        if (arrTotal < depTotal) {
          arrTotal += 24 * 60;
        }
        return Math.round(((arrTotal - depTotal) / 60) * 10) / 10;
      };

      const totalFlightTime = calculateFlightTime(depTime, arrTime);

      const flight = {
        date,
        aircraft,
        tail,
        depICAO,
        arrICAO,
        totalFlightTime,
        takeoffWx,
        landingWx,
      };
      flightList.push(flight);
    },

    getFlights() {
      return flightList;
    },
  };
})();

flightLog.addFlight(
  "2025-10-26",
  "T-6B",
  "166069",
  "08:00",
  "KNGP",
  "10:00",
  "KCRP",
  "200-1/2",
  "400-1",
);
console.log(flightLog.getFlights());

function displayFlights() {
  const tableBody = document.getElementById("table-body");
  tableBody.innerText = "";
  const flights = flightLog.getFlights();

  flights.forEach((flight) => {
    const row = document.createElement("tr");

    for (const item in flight) {
      if (flight.hasOwnProperty(item)) {
        const cell = document.createElement("td");
        cell.textContent = flight[item];
        row.appendChild(cell);
      }
    }
    tableBody.appendChild(row);
  });
}

function submitNewFlight(event) {
  event.preventDefault();

  const date = document.querySelector("#date").value;
  const aircraftType = document.querySelector("#aircraft-type").value;
  const tail = document.querySelector("#tail").value;
  const depTime = document.querySelector("#departure-time").value;
  const depICAO = document.querySelector("#departure-icao").value;
  const arrTime = document.querySelector("#arrival-time").value;
  const arrICAO = document.querySelector("#arrival-icao").value;
  const takeoffWx = document.querySelector("#takeoff-weather").value;
  const landingWx = document.querySelector("#landing-weather").value;

  flightLog.addFlight(
    date,
    aircraftType,
    tail,
    depTime,
    depICAO,
    arrTime,
    arrICAO,
    takeoffWx,
    landingWx,
  );
  console.log("added flight");

  displayFlights();

  event.target.reset();
}

document
  .getElementById("flight-form")
  .addEventListener("submit", submitNewFlight);

function getWeatherData() {}

displayFlights();
