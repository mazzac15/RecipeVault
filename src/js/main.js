import {
  loadHeaderFooter,
  fetchFeaturedRecipes,
  displayFeaturedRecipes,
} from "./utils.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();

  const featuredRecipes = await fetchFeaturedRecipes();
  displayFeaturedRecipes(featuredRecipes);
});
