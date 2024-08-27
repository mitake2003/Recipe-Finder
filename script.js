const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const loadingMessage = document.querySelector('#loading-message');

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const keyword = searchInput.value.trim();
  if (keyword.length === 0) {
    alert('Please enter a keyword to search for recipes.');
    return;
  }
  loadingMessage.style.display = 'block';
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`)
    .then(response => response.json())
    .then(data => {
      loadingMessage.style.display = 'none';
      if (data.meals === null) {
        alert('No recipes found.');
        return;
      }
      const results = data.meals.map(meal => `
        <div class="card">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <div class="card-body">
            <h2>${meal.strMeal}</h2>
            <p>${meal.strArea} | ${meal.strCategory}</p>
            <a href="results.html?id=${meal.idMeal}">View Recipe</a>
          </div>
        </div>
      `).join('');
      document.querySelector('#results').innerHTML = results;
    })
    .catch(error => {
      loadingMessage.style.display = 'none';
      alert('An error occurred while fetching data from the API.');
      console.error(error);
    });
});
