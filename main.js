var cities = [];
var selectedCity = [];
var currentWeather = [];
var fiveDayForecast = [];

const fetchCities = function(city) {
  const url = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=ad7a6c47620e290c667cee3d6af14631'

  fetch(url, {
    method: 'GET',
    datatype: 'json',
  })
    .then(data => data.json())
    .then(data => addCities(data))
};

const addCities = (data) => {
  cities = [];

  for (let i = 0; i < data.length; i++) {
    const cityData = data[i];

    const city = {
      name: cityData.name || null,
      state: cityData.state || null,
      country: cityData.country || null,
      lon: cityData.lon || null,
      lat: cityData.lat || null
    };

    cities.push(city);
  }

  renderCities();
};

const renderCities = () => {
document.querySelector('.cities').replaceChildren();

  for (let i = 0; i < cities.length; i++) {
    const city  = cities[i];

    let template = `<button type="button" class="city${i} list-group-item list-group-item-action">${city.name}, ${city.state}, ${city.country}</button>`;

    if (city.state === null) {
      template = `<button type="button" class="city${i} list-group-item list-group-item-action">${city.name}, ${city.country}</button>`;
    }

    document.querySelector('.cities').insertAdjacentHTML('beforeend', template);

    document.querySelector(`.city${i}`).addEventListener('click', function(){
      document.querySelector('.cities').replaceChildren()
      selectedCity = [];
      
      const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + city.lat + '&lon=' + city.lon + '&appid=ad7a6c47620e290c667cee3d6af14631';

      fetch(url, {
        method: 'GET',
        datatype: 'json',
      })
        .then(data => data.json())
        .then(data => console.log(data))

      selectedCity.push(city)
    })
  }
};

document.querySelector('.search-btn').addEventListener('click', function () {
  const search = document.querySelector('.search-query').value;

  fetchCities(search);

  document.querySelector('.search-query').value = '';
});

// const addCurrentWeather = function(data) {
//   currentWeather = [];

//   for (let i = 0; i < data.length; i++) {
//     const weatherData = data[i];

//     const weather = {
//       name: cityData.name || null,
//       state: cityData.state || null,
//       country: cityData.country || null,
//       longitude: cityData.lon || null,
//       latitude: cityData.lat || null
//     };

//     cities.push(city);
//   }
// }