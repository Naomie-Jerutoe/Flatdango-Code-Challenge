const filmsUrl = "http://localhost:3000/";
const ul = document.querySelector(".films");
const main = document.querySelector(".main");

let movies;

function getAndDisplayFilms() {
  fetch(`${filmsUrl}films`)
    .then((res) => res.json())
    .then((films) => {
      movies = films;
      films.forEach((film) => {
        const filmList = document.createElement("li");
        filmList.innerHTML = `<span data-film-id="${film.id}">
        <a href="#" onclick="displayDetails(${film.id})">${film.title}</a>
        <button onclick="deleteFilm(${film.id})">x</button>
        <span>`;

        if (film.capacity - film.tickets_sold === 0) {
          filmList.classList.add("sold-out");
        }
        ul.appendChild(filmList);
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
      displayDetails(film.id);
    })
    .catch((error) => {
      console.log(error.message);
    });
}
getandDisplayOneFilm();

function displayDetails(filmId) {
  const film = movies.filter((movie) => movie.id == filmId);
  displayFilmDetails(film);
}

function displayFilmDetails(films) {
  films.map((film) => {
    const availableTickets = film.capacity - film.tickets_sold;
    const filmDetails = `<div class="film-container">
          <h2>${film.title}</h2>
          <div class="box">
              <img src="${film.poster}" alt="${film.title}">
          </div>
          <div class="run-show">
              <h3>Runtime: ${film.runtime}</h3>
              <h3>Showtime: ${film.showtime}</h3>
              <h3 class="tickets">Available Tickets: ${availableTickets}</h3>
              <button class="btn" onclick="buyTicket(${film.id})">Buy Ticket</button>
          </div>
      </div>`;
    main.innerHTML = filmDetails;

    if (availableTickets === 0) {
      const button = document.querySelector(".btn");
      button.innerText = "Sold Out";
    }
  });
}

function buyTicket(filmId) {
  const films = movies.filter((movie) => movie.id == filmId);
  films.map((film) => {
    const newAvailableTicket = film.capacity - film.tickets_sold;
    const newTicketsSold = film.tickets_sold + 1;

    if (newAvailableTicket > 0) {
      const updatedAvailableTickets = newAvailableTicket - 1;
      alert("Ticket bought successfully");
      const tickets = document.querySelector(".tickets");
      tickets.innerText = `Available Tickets: ${updatedAvailableTickets}`;

      fetch(`${filmsUrl}films/${filmId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tickets_sold: newTicketsSold,
        }),
      })
        .then((res) => res.json())
        .then((updatedFilm) => {
          tickets.innerText = `Available Tickets: ${updatedAvailableTickets}`;
        })
        .catch((error) => {
          console.error("Error updating ticket information:", error.message);
        });
      if (updatedAvailableTickets === 0) {
        const button = document.querySelector(".btn");
        button.innerText = "Sold Out";
      }
    } else {
      const button = document.querySelector(".btn");
      button.innerText = "Sold Out";
      alert("Sorry, this showing is sold out.");
    }
  });
}

function deleteFilm(filmId) {
  fetch(`${filmsUrl}films/${filmId}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        // Remove the film from the UI
        const filmListItem = document.querySelector(
          `li span[data-film-id="${filmId}"]`
        );
        if (filmListItem) {
          filmListItem.parentElement.remove();
        }
      } else {
        console.error("Failed to delete film from the server");
      }
    })
    .catch((error) => {
      console.error("Error deleting film:", error.message);
    });
}
