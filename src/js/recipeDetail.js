import {
  loadHeaderFooter,
  fetchRecipeById,
  displayRecipeDetails,
} from "./utils.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();

  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get("id");

  if (!recipeId) {
    // console.log("No recipe ID found in URL");
    return;
  }

  try {
    const recipe = await fetchRecipeById(recipeId);
    // console.log("fetched recipe details:", recipe);
    if (recipe) {
      displayRecipeDetails(recipe);
    } else {
      // console.error("Recipe not found");
    }
  } catch (error) {
    // console.error("Error fetching recipe details:", error);
  }
});
