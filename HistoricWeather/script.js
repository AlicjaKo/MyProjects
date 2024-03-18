let data_type;
let table_id;
let chart_id;
var today = new Date().toISOString().split('T')[0];
let lat = 61.4991;
let long = 23.7871;
let start_date = '2024-01-01';
let end_date = '2024-01-02';
let storedCity;




// city in local storage
const storeCityInLocalStorage = (city) => {
    localStorage.setItem('selectedCity', city);
}

//  retrieve the city from local storage
const getCityFromLocalStorage = () => {
    return localStorage.getItem('selectedCity');
}


// Update the city when a new city is fetched
const fetchCityMain = async (city) => {
    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`);
        if (!response.ok) {
            throw new Error(response.status);
        } 
        else {
        const coords = await response.json();
        const resultsArray = coords.results[0];
        console.log(resultsArray);
        const cityName = resultsArray.name;

        // Update lat and long
        lat = resultsArray.latitude;
        long = resultsArray.longitude;

        if (viewType=="rain" || viewType=="wind_speed_10m") {
            fetchWeatherData();
            document.getElementById('view-city').innerHTML = cityName;
        }
        else {
            fetchOldData();
            document.getElementById('index-city1').innerHTML = cityName;
            document.getElementById('index-city2').innerHTML = cityName;
            document.getElementById('index-city3').innerHTML = cityName;
        }
        
        

        // Store the city in local storage
        storeCityInLocalStorage(city);
    }

    } catch (error) {
        console.error(error);
        document.getElementById('city-input').value = 'Invalid city name.';
    }
}





// On page load, check if there's a city stored in local storage
window.addEventListener('DOMContentLoaded', () => {
    storedCity = getCityFromLocalStorage();
    if (storedCity!==null) {
        fetchCityMain(storedCity);  
    }
    
});
////////

//switch case so the code knows which card is active
const params = new URLSearchParams(window.location.search);
const viewType = params.get('type');

switch (viewType) {
    case "rain":
        table_id = "list-cont-view";
        data_type = "rain";
        document.getElementById('rain-cloud').innerHTML = "Rain Statistics [mm]";
        chart_id = "myChart-rain";
        break;
    case "wind_speed_10m":
        table_id = "list-cont-view";
        data_type = "wind_speed_10m";
        document.getElementById('rain-cloud').innerHTML = "Wind Speed Statistics [km/h]";
        chart_id = "myChart-rain";
        break; 
    default:
        table_id = "list-cont";
        data_type = "temperature_2m";
        chart_id = "myChart";
        

}





//Make the link appear active
document.addEventListener("DOMContentLoaded", function() {
    const rainLink = document.getElementById('rain-link');
    const cloudCoverLink = document.getElementById('cloud-cover-link');

    rainLink.addEventListener('click', function(event) {
        event.preventDefault();
        rainLink.classList.add('active');
        cloudCoverLink.classList.remove('active');
        window.location.href = rainLink.getAttribute('href');
    });

    cloudCoverLink.addEventListener('click', function(event) {
        event.preventDefault();
        cloudCoverLink.classList.add('active');
        rainLink.classList.remove('active');
        window.location.href = cloudCoverLink.getAttribute('href');
    });

    
    const currentUrl = new URL(window.location.href);
    const viewType = currentUrl.searchParams.get('type');
    if (viewType === 'rain') {
        rainLink.classList.add('active');
    } else if (viewType === 'wind_speed_10m') {
        cloudCoverLink.classList.add('active');
    }
});



// Function to add data to the table
const measurementData = (dateTime, data_type) => {
    const tableBody = document.getElementById(table_id);

    if (!tableBody) {
        console.error("Table body not found");
        return;
    }

    
    const newRow = tableBody.insertRow();
    
    const [date, time] = dateTime.split('T');

    
    const dateCell = newRow.insertCell();
    const timeCell = newRow.insertCell();
    const dataTypeCell = newRow.insertCell();

    
    dateCell.textContent = date;
    timeCell.textContent = time;
    dataTypeCell.textContent = data_type;
}



//fetching data and only 20 measurements
const fetchWeatherData = async () => {
    try {
        let response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=${data_type}&past_days=${1}&forecast_days=1`);
        if (!response.ok) {
            throw new Error(response.status);
        }
        const data = await response.json();
        console.log(data.hourly);
        const { time, [data_type]: dataTypeValues } = data.hourly;
        const startIndex = Math.max(0, time.length - 20);

        ///////// chart update
        myChart.data.labels = time.slice(startIndex); 
        myChart.data.datasets[0].data = dataTypeValues.slice(startIndex); 
        myChart.update();
        //////////


        const listContainer = document.getElementById(table_id);
        if (listContainer) {
            listContainer.innerHTML = '';
            for (let i = startIndex; i < time.length; i++) {
                const listItem = measurementData(time[i], dataTypeValues[i]);
            }
        } else {
            console.error("Table container not found");
        }
        console.log(dataTypeValues.slice(startIndex));
        math(dataTypeValues.slice(startIndex));

    } catch (error) {
        console.error(error);
    }
}

fetchWeatherData();


// Chart initialization
const ctx = document.getElementById(chart_id);
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [], 
        datasets: [{
            label: '', 
            data: [],
            borderWidth: 1,
            
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            },
            x: {
                ticks: {
                    maxRotation: 80,
                    minRotation: 80
                }
            }
        },
        plugins: {
            legend: {
                display: false 
            }
        },
    }
});



//////////////// View 2,3 fetch

const fetchCloudRain = async (sinceWhen) => {
    try {
        let response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=${data_type}&past_days=${sinceWhen}&forecast_days=1`);
        
        if (!response.ok) {
            throw new Error(response.status);
        }
        const data = await response.json();
        
        const { time, [data_type]: dataTypeValues } = data.hourly;

        ///////// chart update
        myChart.data.labels = time; 
        myChart.data.datasets[0].data = dataTypeValues; 
        myChart.update();
        //////////

        const listContainer = document.getElementById(table_id);
        if (listContainer) {
            //////////Clear the table
            listContainer.innerHTML = '';
            
            ///////// Insert new data
            
            for (let i = 0; i < time.length; i++) {
                const listItem = measurementData(time[i], dataTypeValues[i]);
            }
        } else {
            console.error("Table container not found");
        }

        math(dataTypeValues);

    } catch (error) {
        console.error(error);
    }
}

const calculateMean = (arr) => {
    const sum = arr.reduce((acc, curr) => acc + curr, 0);
    const mean = sum / arr.length;
    const roundedMean = mean.toFixed(1);
    return roundedMean;
}


const calculateMedian = (arr) => {
    arr.sort((a, b) => a - b);
    const length = arr.length;
    let median;
    if (length % 2 === 0) {
        const midIndex = length / 2;
        median = (arr[midIndex - 1] + arr[midIndex]) / 2;
    } else {
        median = arr[Math.floor(length / 2)];
    }
    return median.toFixed(1);
};


const calculateMode = (arr) => {
    const frequencyCounter = {};

    arr.forEach((element) => {
        frequencyCounter[element] = (frequencyCounter[element] || 0) + 1;
    });

    let maxFrequency = 0;
    let modes = [];

    for (const key in frequencyCounter) {
        if (frequencyCounter[key] > maxFrequency) {
            maxFrequency = frequencyCounter[key];
            modes = [parseFloat(key)];
        } else if (frequencyCounter[key] === maxFrequency) {
            modes.push(parseFloat(key));
        }
    }

    // Return the smallest mode
    return modes.length === 0 ? [] : [Math.min(...modes)];
};


const calculateRange = (arr) => {
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min;
    return parseFloat(range.toFixed(1));
};

const calculateStandardDeviation = (arr) => {
    const mean = calculateMean(arr);
    const squaredDifferences = arr.map(num => Math.pow(num - mean, 2));
    const meanSquaredDifference = calculateMean(squaredDifferences);
    const standardDeviation = Math.sqrt(meanSquaredDifference);
    return parseFloat(standardDeviation.toFixed(1));
};

const calculateVariance = (arr) => {
    const mean = calculateMean(arr);
    const squaredDifferences = arr.map(num => Math.pow(num - mean, 2));
    return calculateMean(squaredDifferences);
};


const math = (retrivedData) => {
    const meanValue = calculateMean(retrivedData);
    document.getElementById('mean').innerHTML = meanValue;

    const medianValue = calculateMedian(retrivedData);
    document.getElementById('median').innerHTML = medianValue;

    const modeValue = calculateMode(retrivedData);
    document.getElementById('mode').innerHTML = modeValue;

    const rangeValue = calculateRange(retrivedData);
    document.getElementById('range').innerHTML = rangeValue;

    const sdValue = calculateStandardDeviation(retrivedData);
    document.getElementById('sd').innerHTML = sdValue;

    const minValue = Math.min(...retrivedData);
    document.getElementById('min').innerHTML = minValue;

    const maxValue = Math.max(...retrivedData);
    document.getElementById('max').innerHTML = maxValue;

    const varValue = calculateVariance(retrivedData);
    document.getElementById('var').innerHTML = varValue;

}


document.getElementById('city_form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const cityInput = document.getElementById('city-input').value.trim(); 

    // Regular expression to match only letters
    const lettersRegex = /^[a-zA-Z]+$/;

    if (cityInput && lettersRegex.test(cityInput)) { 
        fetchCityMain(cityInput);
    } else {
        document.getElementById('city-input').value = 'Invalid city name.';
    }
});





/////// Fetchn=ing data in the form after switching tabs

//updateing data
//  local storage
const storeFormDataInLocalStorage = (start_date, end_date, data_type) => {
    localStorage.setItem('formData', JSON.stringify({ start_date, end_date, data_type }));
}

// data from local storage
const getFormDataFromLocalStorage = () => {
    const formData = localStorage.getItem('formData');
    return formData ? JSON.parse(formData) : null;
}

// Populate form fields with stored data
const populateFormFields = (formData) => {
    if (formData) {
        document.getElementById('start_date').value = formData.start_date;
        document.getElementById('end_date').value = formData.end_date;
        document.getElementById('option').value = formData.data_type;
        document.getElementById('mesurment').innerHTML = document.getElementById('option').selectedOptions[0].text;
    }
}
//////update data from form
window.addEventListener('DOMContentLoaded', () => {
    storedCity = getCityFromLocalStorage();
    if (storedCity !== null) {
        if (viewType == "rain" || viewType == "wind_speed_10m") {
            document.getElementById('view-city').innerHTML = storedCity;
            fetchCityMain(storedCity);
        } else {
            document.getElementById('city-input').value = storedCity;

            fetchCityMain(storedCity);

            
        }

    }

    // Simulate submission
    const formData = getFormDataFromLocalStorage();
    if (formData) {
        document.getElementById('start_date').value = formData.start_date;
        document.getElementById('end_date').value = formData.end_date;
        document.getElementById('option').value = formData.data_type;
        document.getElementById('mesurment').innerHTML = document.getElementById('option').selectedOptions[0].text;
    }
    submitForm();
});

// Function to simulate form submission
function submitForm() {
    document.getElementById('dateForm').dispatchEvent(new Event('submit'));
}

/////


///// submitting form
document.getElementById('dateForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    start_date = document.getElementById('start_date').value;
    end_date = document.getElementById('end_date').value;
    data_type = document.getElementById('option').value;
    
    selected_option_text = document.getElementById('option').selectedOptions[0].text; 
    
    document.getElementById('mesurment').innerHTML = selected_option_text; 

    storeFormDataInLocalStorage(start_date, end_date, data_type);

    fetchOldData();
});

const fetchOldData = async () => {
    try {
        const response = await fetch(`https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${long}&start_date=${start_date}&end_date=${end_date}&hourly=${data_type}&timezone=auto`);
        if (!response.ok) {
            throw new Error(response.status);
        }
        const data = await response.json();
        console.log(data.hourly);
        const { time, [data_type]: dataTypeValues } = data.hourly;

        ///////// chart update
        myChart.data.labels = time; 
        myChart.data.datasets[0].data = dataTypeValues; 
        myChart.update();
        //////////

        const listContainer = document.getElementById(table_id);
        if (listContainer) {
            listContainer.innerHTML = '';
            for (let i = 0; i < time.length; i++) {
                const listItem = measurementData(time[i], dataTypeValues[i]);
            }
        } else {
            console.error("Table container not found");
        }

    } catch (error) {
        console.error(error);
    }
}



let threeYearsAgo = new Date();
threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);
let formattedToday = today;
let formattedThreeYearsAgo = threeYearsAgo.toISOString().split('T')[0];

// Set the maximum and minimum attributes for the date input fields
document.getElementById('start_date').setAttribute('max', formattedToday);
document.getElementById('start_date').setAttribute('min', formattedThreeYearsAgo);
document.getElementById('end_date').setAttribute('max', formattedToday);
document.getElementById('end_date').setAttribute('min', formattedThreeYearsAgo);
