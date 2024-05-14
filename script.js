$(document).ready(function () {
  $("#searchBtn").click(function () {
    var searchTerm = $("#searchInput").val().trim();
    if (searchTerm !== "") {
      searchRecipes(searchTerm);
    }
  });
  $("#searchInput").keypress(function (event) {
    if (event.which === 13) {
      // 13 is the key code for Enter key
      var searchTerm = $(this).val().trim();
      if (searchTerm !== "") {
        searchRecipes(searchTerm);
      }
    }
  });
});

function searchRecipes(searchTerm) {
  var apiUrl =
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchTerm;

  $.ajax({
    url: apiUrl,
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data.meals);
      displayResults(data.meals);
    },
    error: function (xhr, status, error) {
      console.error("Error fetching data:", error);
    },
  });
}

function displayResults(meals) {
  var resultsContainer = $("#resultsContainer");
  resultsContainer.empty();
  // var recipeElement = $("<div>").addClass("recipe");
  // var imageElement = $('<img>').attr('src', meals.strMealThumb).appendTo(recipeElement);
  // var titleElement = $("<h2>").text(meals.strMeal).appendTo(recipeElement);
  // var summaryElement = $('<p>').text(meals.strInstructions).appendTo(recipeElement);
  // resultsContainer.append(recipeElement);

  $.each(meals, function (index, meal) {
    var recipeElement = $("<div>")
      .addClass("recipe")
      .append($("<img>").attr("src", meal.strMealThumb))
      .append($("<h2>").text(meal.strMeal))
      .append($("<h5>").text("Origin: " + meal.strArea))
      .append($("<h5>").text("Category: " + meal.strCategory))
      .append($("<h4>").text("Ingredients"))
      .append($("<ul>"));

    for (var i = 1; i <= 20; i++) {
      // Assuming maximum 20 ingredients
      var ingredient = meal["strIngredient" + i];
      var measure = meal["strMeasure" + i];
      if (ingredient && ingredient.trim() !== "") {
        $("<li>")
          .text( ingredient+ " (" + measure +")")
          .appendTo(recipeElement.find("ul"));
      } else {
        // Break loop if there are no more ingredients
        break;
      }
    }

    $("<p>").text(meal.strInstructions).appendTo(recipeElement);

    resultsContainer.append(recipeElement);
  });
}
