const AppId = "ddf8d48c";
const AppKey = "3d33a8950e1d8404435bbb9c42664ff7";

const u = "https://api.edamam.com/search?q=";
const toAdd = `&app_id=${AppId}&app_key=${AppKey}&to=20`;
var q = "";

function generateHTML(data) {
  $("#receipe-container").html("");
  var x = 0;
  for (i = 0; i < data.length; i++) {
    var generatedHTML = `<div class = "food-img"> <img src=`;
    generatedHTML += `"` + data[i].recipe.image + `"` + "/>";
    generatedHTML += `<div class="info"><div class="food-name">`;
    generatedHTML +=
      data[i].recipe.label +
      `</div><div class="btn">View Recipe</div></div></br><span class = "calorie-count">Calories: `;
    generatedHTML += parseFloat(data[i].recipe.calories).toFixed(2);
    generatedHTML += `</span></div>`;
    $("#receipe-container").append(generatedHTML);
  }
  $(".btn").each(function (index, v) {
    $(v).attr("id", index);
  });

  $(".btn").each(function (index, v) {
    $(v).on({
      click: function () {
        console.log(data[parseInt($(v).attr("id"))].recipe.ingredientLines);
        $(".dish-name").html(data[parseInt($(v).attr("id"))].recipe.label);
        $(".btn-link >a").attr(
          "href",
          data[parseInt($(v).attr("id"))].recipe.url
        );
        $(data[parseInt($(v).attr("id"))].recipe.ingredientLines).each(
          function (index, val) {
            $("#ing-list").append(`<li>${val}</li>`);
          }
        );
        $("#ig-list").show();
        $(".section").hide();
        $(".upper").hide();
      },
    });
  });
}

$("#search-box").on({
  change: function () {
    q = $("#search-box").val();
    $.ajax({
      url: u + q + toAdd,
      type: "GET",
      datatype: "json",
      success: function (data) {
        generateHTML(data.hits);
      },
      error: function () {
        console.log("request not found");
      },
    });
  },
});

window.ondblclick = function () {
  $("#ig-list").hide();
  $(".section").show();
  $(".upper").show();
};
