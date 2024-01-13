const filmsUrl = "http://localhost:3000/";
const ul = document.querySelector(".films");
const main = document.querySelector(".main");

let movies;

function getAndDisplayFilms() {
  fetch(`${filmsUrl}films`)
    .then((res) => res.json())
    .then((films) => {
      movies = films;
      films.map((film) => {
        const allFilms = `<li><a href="#">${film.title}</a></li>`;
        ul.insertAdjacentHTML("beforeend", allFilms);
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
}

getAndDisplayFilms();

function getandDisplayOneFilm() {
  fetch(`${filmsUrl}films/1`)
    .then((res) => res.json())
    .then((film) => {
      const availableTickets = film.capacity - film.tickets_sold;
      const oneFilm = `<div class="film-container">
        <h2>${film.title}</h2>
        <div class="box">
            <img src="${film.poster}"
                alt="${film.title}">
        </div>
        <div class="run-show">
            <h3>Runtime: ${film.runtime}</h3>
            <h3>Showtime: ${film.showtime}</h3>
            <h3>Available Tickets: ${availableTickets}</h3>
            <button onclick="buyTicket(${availableTickets})">Buy Ticket</button>
        </div>
    </div>`;
      main.insertAdjacentHTML("beforeend", oneFilm);
    })
    .catch((error) => {
      console.log(error.message);
    });
}
getandDisplayOneFilm();
