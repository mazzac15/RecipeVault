
//header and footer templates//
export function renderListWithTemplate(
    templateFn,
    parentElement,
    list,
    position = "afterbegin",
    clear = false
  ) {
    const htmlStrings = list.map(templateFn);
    // if clear is true we need to clear out the contents of the parent.
    if (clear) {
      parentElement.innerHTML = "";
    }
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
  }
  
  export function renderWithTemplate(
    template,
    parentElement,
    data,
    callback
  ) {
    parentElement.insertAdjacentHTML("afterbegin", template);
  
    if (callback) {
      callback(data);
    };
  }
  
  async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
  }
  
  // function to dynamically load the header and footer into a page
  export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate("../partials/header.html");
    const headerElement = document.querySelector("#main-header");
    const footerTemplate = await loadTemplate("../partials/footer.html");
    const footerElement = document.querySelector("#main-footer");
  
    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);

    initializeHeaderFooter();
  }
  
export function setupSearchButton() {
    const searchBox = document.querySelector(".searchBox");
    const searchBtn = document.querySelector(".searchBtn");
    const recipeContainer = document.querySelector(".recipe-container");
    if (searchBtn) {
        searchBtn.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("Button Clicked");
        });
    }
}

export function setupHamburgerMenu() {
    const menuToggle = document.querySelector(".menu-toggle");
    const sidenav = document.querySelector(".sidenav");
    const main = document.querySelector("main");
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    if (menuToggle && sidenav) {
        menuToggle.addEventListener("click", () => {
            const isOpen = sidenav.classList.toggle("open");
            if (isOpen) {
                main.style.marginLeft = "250px";
                header.style.marginLeft = "250px";
                footer.style.marginLeft = "250px";
            } else {
                main.style.marginLeft = "0";
                header.style.marginLeft = "0";
                footer.style.marginLeft = "0";
            }
        });
    }
}

//footer//
export function setCurrentYear() {
    const currentYearElement = document.getElementById("currentYear");
    if (currentYearElement) {
        const currentYear = new Date().getFullYear();
        currentYearElement.textContent = currentYear;
    }
}

//initialize header and footer//
export function initializeHeaderFooter() {
    setCurrentYear();
    setupSearchButton();
    setupHamburgerMenu();
}

// Fetch recipes from API //
export async function fetchRecipes(query) {
    const url = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=10&q=${encodeURIComponent(query)}`;
    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": "97bdfcfb35mshee066a5fa7f7cc3p158394jsned4965d6ab2b",
            "x-rapidapi-host": "tasty.p.rapidapi.com"
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error("Network response was not okay");
        }
        const result = await response.json();
        console.log("Fetched data: ", result);
        return result.results;
    } catch (error) {
        console.error("fetch error:", error);
        return [];
    }
}

// Display search results //
export function displaySearchResults(recipes) {
    const recipeContainer = document.querySelector(".recipe-container");
    recipeContainer.innerHTML = ""; // Clear previous results
    if (recipes.length === 0) {
        recipeContainer.innerHTML = "<p>No results found.<p>";
        return;
    }

    recipes.forEach(recipe => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");
        recipeCard.innerHTML = `
            <img src="${recipe.thumbnail_url}" alt="${recipe.name}" />    
            <h3>${recipe.name}</h3>
            <a href="/recipe-detail/index.html?id=${recipe.id}" target="_blank">View Recipe</a>
        `;
        recipeContainer.appendChild(recipeCard);
    });
}

export async function fetchRecipeById(id) {
    const url = `https://tasty.p.rapidapi.com/recipes/get-more-info?id=${encodeURIComponent(id)}`;
    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": "97bdfcfb35mshee066a5fa7f7cc3p158394jsned4965d6ab2b",
            "x-rapidapi-host": "tasty.p.rapidapi.com" 
        }
    };

    try {
        const response = await fetch(url, options);
        if(!response.ok) {
            throw new Error("Network response was not okay");
        }
        const result = await response.json();
        console.log("Fetched recipe: ", result);
        return result;
    } catch (error) {
        console.error("fetch error:", error);
        return null;
    }
}
// Display recipe details //
export function displayRecipeDetails(recipe) {
    document.getElementById("recipe-title").textContent = recipe.name;
    document.getElementById("recipe-image").src = recipe.thumbnail_url;

    const ingredientsList = document.getElementById("recipe-ingredients");
    recipe.sections[0].components.forEach(component => {
        const li = document.createElement("li");
        li.textContent = component.raw_text;
        ingredientsList.appendChild(li);
    });

    const instructionsList = document.getElementById("recipe-instructions");
    recipe.instructions.forEach(instruction => {
        const li = document.createElement("li");
        li.textContent = instruction.display_text;
        instructionsList.appendChild(li);
    });
}

//Featured recipe home page//
export async function fetchFeaturedRecipes() {
    const url = `https://tasty.p.rapidapi.com/feeds/list?size=5&timezone=%2B0700&vegetarian=false&from=0`
    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": "97bdfcfb35mshee066a5fa7f7cc3p158394jsned4965d6ab2b",
            "x-rapidapi-host": "tasty.p.rapidapi.com"
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error("Network response was not okay");
        }
        const result = await response.json();
        console.log("Fetched data: ", result);
        return result.results;
    } catch (error) {
        console.error("fetch error:", error);
        return [];
    }
}

export function displayFeaturedRecipes(featuredRecipes) {
    const featuredContainer = document.querySelector(".featured-container")
    if (!featuredContainer) return;

    featuredContainer.innerHTML = ""; //clear previous content

    console.log("Featured recipe data: ", featuredRecipes)

    featuredRecipes.forEach(featuredItem => {
        if (featuredItem.type === "item" && featuredItem.item) {
            const recipe = featuredItem.item;
            const recipeCard = document.createElement("div");
            recipeCard.classList.add("featured-item");

            // const thumbnailUrl = recipe.thumbnail_urls ? recipe.thumbnail_urls[0] : "";

            const featuredContent = `
                <div class="featured-content">
                    <img src="${recipe.thumbnail_url}" alt="${recipe.name}">
                    <h2>${recipe.name}</h2>
                    <p>${recipe.description || ""}</p>
                    <a href="/recipe-detail/index.html?id=${recipe.id}" target="_blank">View Recipe Directions</a>
                </div>
            `;
  
            recipeCard.innerHTML = featuredContent;
            featuredContainer.appendChild(recipeCard);
        }
    });
}

  
