var cities = [];

const renderCities = () => {
document.querySelector('.cities').replaceChildren();

  for (let i = 0; i < cities.length; i++) {
    const book = cities[i];

    const template = `
    <div class="book col-md-6">
      <h4>${ city.title }</h4>
      <div>Author: <strong>${ book.author }</strong></div>
      <div>Pages: <strong>${ book.pageCount }</strong></div>
      <div>ISBN: <strong>${ book.isbn }</strong></div>
      <img src="${book.imageURL}" alt="">
    </div>`;

    document.querySelector('.cities').insertAdjacentHTML('beforeend', template);

  }

};

const fetchCities = function(city) {
  const url = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=ad7a6c47620e290c667cee3d6af14631'

  fetch(url, {
    method: 'GET',
    datatype: 'json',
  })
    .then(data => data.json())
    .then(data => console.log(data))
};

const addCities = (data) => {
  cities = [];

  for (let i = 0; i < data.items.length; i++) {
    const cityData = data.items[i];

    const city = {
      title: cityData.volumeInfo.title || null,
      author: cityData.volumeInfo.authors ? cityData.volumeInfo.authors[0] : null,
      imageURL: cityData.volumeInfo.imageLinks ? cityData.volumeInfo.imageLinks.thumbnail : null,
      pageCount: cityData.volumeInfo.pageCount || null,
      isbn: cityData.volumeInfo.industryIdentifiers ?
        cityData.volumeInfo.industryIdentifiers[0].identifier : null
    };

    cities.push(city);
  }

  rendercities();

};

document.querySelector('.search').addEventListener('click', function () {
  const search = document.querySelector('#search-query').value;

  fetchCities(search);

  document.querySelector('#search-query').value = '';
});