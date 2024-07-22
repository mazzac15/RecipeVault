import {
  initializeHeaderFooter,
  fetchRecipes,
  displaySearchResults,
} from "./utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize header and footer
  initializeHeaderFooter();

  // Set up search functionality
  const searchBtn = document.querySelector(".searchBtn");
  const searchBox = document.querySelector(".searchBox");

  searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const query = searchBox.value.trim();
    if (!query) {
      console.log("Please enter a search term.");
      return;
    }

    console.log(`Searching for recipes with: ${query}`);
    try {
      const recipes = await fetchRecipes(query);
      console.log("Search results:", recipes);
      displaySearchResults(recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  });
});
