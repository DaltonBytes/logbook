console.log("Log your flight!");

//add a flight to the array

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

// display all flights in a table format
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

displayFlights();
// get weather data for takeoff and landing
function getWeatherData() {}
