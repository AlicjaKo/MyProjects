const displayData = (data) => { 

//current
    document.getElementById("current-temp").innerText = `${data.properties.timeseries[ind].data.instant.details.air_temperature}°C`;
    document.getElementById("current-icon").src = `./${data.properties.timeseries[ind].data.next_1_hours.summary.symbol_code}.png`;
    document.getElementById("rel-humid").innerText = `${data.properties.timeseries[ind].data.instant.details.relative_humidity}%`;
    document.getElementById("air-pres").innerText = `${data.properties.timeseries[ind].data.instant.details.air_pressure_at_sea_level}hPa`;
    document.getElementById("cloud-cov").innerText = `${data.properties.timeseries[ind].data.instant.details.cloud_area_fraction}%`;
    document.getElementById("wind-speed").innerText = `${data.properties.timeseries[ind].data.instant.details.wind_speed}m/s`;

//1h
    document.getElementById("1h-img").src = `./${data.properties.timeseries[ind+1].data.next_1_hours.summary.symbol_code}.png`;
    document.getElementById("1h-temp").innerText = `${data.properties.timeseries[ind+1].data.instant.details.air_temperature}°C`;

//2h
    document.getElementById("2h-img").src = `./${data.properties.timeseries[ind+2].data.next_1_hours.summary.symbol_code}.png`;
    document.getElementById("2h-temp").innerText = `${data.properties.timeseries[ind+2].data.instant.details.air_temperature}°C`;

//3h
    document.getElementById("3h-img").src = `./${data.properties.timeseries[ind+3].data.next_1_hours.summary.symbol_code}.png`;
    document.getElementById("3h-temp").innerText = `${data.properties.timeseries[ind+3].data.instant.details.air_temperature}°C`;
}

//adding time
var hour = new Date();
var ind = (hour.getHours() - 2);
function addLeadingZero(number) {
  return (number < 10 ? '0' : '') + number;
}

document.getElementById("1h-t").innerText = `${addLeadingZero(hour.getHours() + 1)}:00`;
document.getElementById("2h-t").innerText = `${addLeadingZero(hour.getHours() + 2)}:00`;
document.getElementById("3h-t").innerText = `${addLeadingZero(hour.getHours() + 3)}:00`;
//////////////////////////////

//current time
var today = new Date();
var time = today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
document.getElementById("current-time").innerText = `Time: ${time}`;

const fetchWeatherData = async () => {
    try {
        const response = await fetch("https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=61.49780&lon=23.7610");
        const data = await response.json();
        console.log(data.properties.timeseries[0].data.instant.details);
        displayData(data);

    } catch (error) {
        console.error(error);
    }
}

fetchWeatherData();

