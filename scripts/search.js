document.getElementById('searchForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const query = document.getElementById('query').value;
  if (query) {
    searchRecipes(query);
  }
});

function searchRecipes(query) {
  const appId = 'c95c14e5';
  const appKey = '1aa54a0895a9cd2587024adc486a7886'
  const url = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayResults(data.hits);
    })
    .catch(error => {
      console.error('Error fetching the recipes:', error);
    });
}

function displayResults(results) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  results.forEach(hit => {
    const recipe = hit.recipe;
    const recipeDiv = document.createElement('div');
    recipeDiv.className = 'recipe';

    const recipeImage = document.createElement('img');
    recipeImage.src = recipe.image;
    recipeImage.alt = recipe.label;

    const recipeTitle = document.createElement('h3');
    recipeTitle.textContent = recipe.label;

    const showDetailsButton = document.createElement('button');
    showDetailsButton.textContent = 'Show Details';
    showDetailsButton.onclick = () => displayRecipeDetails(recipe);

    recipeDiv.appendChild(recipeImage);
    recipeDiv.appendChild(recipeTitle);
    recipeDiv.appendChild(showDetailsButton);

    resultsDiv.appendChild(recipeDiv);
  });
}

function displayRecipeDetails(recipe) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  const recipeDetailsDiv = document.createElement('div');
  recipeDetailsDiv.className = 'recipe-details';

  const recipeTitle = document.createElement('h3');
  recipeTitle.textContent = recipe.label;

  const recipeImage = document.createElement('img');
  recipeImage.src = recipe.image;
  recipeImage.alt = recipe.label;

  const ingredientsList = document.createElement('ul');
  recipe.ingredientLines.forEach(ingredient => {
    const ingredientItem = document.createElement('li');
    ingredientItem.textContent = ingredient;
    ingredientsList.appendChild(ingredientItem);
  });

  const instructions = document.createElement('p');
  instructions.innerHTML = `Visit the original recipe <a href="${recipe.url}" target="_blank">here</a> for full instructions.`;

  recipeDetailsDiv.appendChild(recipeTitle);
  recipeDetailsDiv.appendChild(recipeImage);
  recipeDetailsDiv.appendChild(document.createElement('h4')).textContent = 'Ingredients and Steps';
  recipeDetailsDiv.appendChild(ingredientsList);
  recipeDetailsDiv.appendChild(document.createElement('h4')).textContent = 'More detailed Instructions';
  recipeDetailsDiv.appendChild(instructions);

  resultsDiv.appendChild(recipeDetailsDiv);
}
