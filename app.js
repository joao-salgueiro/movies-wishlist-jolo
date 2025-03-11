var movieInput = document.getElementById("movie-input");
var addMovieButton = document.getElementById("add-movie");
var movieList = document.getElementById("movie-list");
addMovieButton.addEventListener("click", function () {
    var movieName = movieInput.value.trim();
    if (movieName === "")
        return;
    var listItem = document.createElement("li");
    listItem.textContent = movieName;
    var watchButton = document.createElement("button");
    watchButton.textContent = "Watched";
    watchButton.addEventListener("click", function () {
        listItem.classList.toggle("watched");
    });
    listItem.appendChild(watchButton);
    movieList.appendChild(listItem);
    movieInput.value = "";
});