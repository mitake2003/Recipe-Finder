const urlParams = new URLSearchParams(window.location.search);
const mealId = urlParams.get('id');
if (mealId === null) {
  alert('No meal ID specified.');
} else {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(response => response.json())
    .then(data => {
      if (data.meals === null) {
        alert('Meal not found.');
        return;
      }
      const meal = data.meals[0];
      document.title = meal.strMeal;
      document.querySelector('#results').innerHTML = `
        <div class="card">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <div class="card-body">
            <h2>${meal.strMeal}</h2>
            <p>${meal.strArea} | ${meal.strCategory}</p>
            <h3>Ingredients</h3>
            <ul>
              ${generateIngredientsList(meal)}
            </ul>
            <h3>Instructions</h3>
            <p>${meal.strInstructions}</p>
          </div>
        </div>
      `;
    })
    .catch(error => {
      alert('An error occurred while fetching data from the API.');
      console.error(error);
    });
}

function generateIngredientsList(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient === null || ingredient === '') {
      break;
    }
    ingredients.push(`<li>${ingredient} - ${measure}</li>`);
  }
  return ingredients.join('');
}

      
