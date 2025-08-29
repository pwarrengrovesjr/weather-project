var cities = [];

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
      country: cityData.country || null
    };

    cities.push(city);
  }

  renderCities();
};

const renderCities = () => {
document.querySelector('.city-options').replaceChildren();

  for (let i = 0; i < cities.length; i++) {
    const city  = cities[i];

    const template = `<li class="city-option${i} list-group-item">${city.name}, ${city.state}, ${city.country}</li>`;

    document.querySelector('.city-options').insertAdjacentHTML('beforeend', template);

  }

};

document.querySelector('.search-btn').addEventListener('click', function () {
  const search = document.querySelector('.search-query').value;

  fetchCities(search);
});