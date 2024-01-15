// Define the URL for the films API
const filmsUrl = "http://localhost:3000/";

// Select the <ul> element with the class 'films' and the main container element
const ul = document.querySelector(".films");
const main = document.querySelector(".main");

// Declare a variable to store the fetched movies
let movies;

// Function to fetch and display films from the API
function getAndDisplayFilms() {
  // Fetch films from the API
  fetch(`${filmsUrl}films`)
    .then((res) => res.json())
    .then((films) => {
      // Store the fetched films in the 'movies' variable
      movies = films;

      // Loop through each film and create a list item with a link and delete button
      films.forEach((film) => {
        const filmList = document.createElement("li");
        filmList.innerHTML = `<span data-film-id="${film.id}">
        <a href="#" onclick="displayDetails(${film.id})">${film.title}</a>
        <button onclick="deleteFilm(${film.id})">x</button>
        </span>`;

        // Add 'sold-out' class to the list item if the film is sold out
        if (film.capacity - film.tickets_sold === 0) {
          filmList.classList.add("sold-out");
        }

        // Append the list item to the films <ul>
        ul.appendChild(filmList);
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
}

// Call the function to fetch and display films
getAndDisplayFilms();

// Function to fetch and display details of one film
function getandDisplayOneFilm() {
  // Fetch details of a specific film (e.g., film with ID 1)
  fetch(`${filmsUrl}films/1`)
    .then((res) => res.json())
    .then((film) => {
      // Display details of the specified film
      displayDetails(film.id);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

// Call the function to fetch and display details of one film
getandDisplayOneFilm();

// Function to display details of a film
function displayDetails(filmId) {
  // Filter the movies array to get the film with the specified ID
  const film = movies.filter((movie) => movie.id == filmId);
  // Display the details of the film
  displayFilmDetails(film);
}

// Function to display the HTML details of a film
function displayFilmDetails(films) {
  films.map((film) => {
    // Calculate the number of available tickets
    const availableTickets = film.capacity - film.tickets_sold;
    // Create HTML for film details
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
    // Update the main container with the film details
    main.innerHTML = filmDetails;

    // If available tickets are 0, update the button text to "Sold Out"
    if (availableTickets === 0) {
      const button = document.querySelector(".btn");
      button.innerText = "Sold Out";
    }
  });
}

// Function to handle the process of buying a ticket
function buyTicket(filmId) {
  // Filter the movies array to get the film with the specified ID
  const films = movies.filter((movie) => movie.id == filmId);
  // Process the buying of a ticket for the film
  films.map((film) => {
    // Calculate the new available tickets and new tickets sold
    const newAvailableTicket = film.capacity - film.tickets_sold;
    const newTicketsSold = film.tickets_sold + 1;

    // Check if there are still available tickets
    if (newAvailableTicket > 0) {
      // Calculate the updated available tickets
      const updatedAvailableTickets = newAvailableTicket - 1;

      // Alert the user about the successful purchase
      alert("Ticket bought successfully");

      // Update the UI with the new available ticket count
      const tickets = document.querySelector(".tickets");
      tickets.innerText = `Available Tickets: ${updatedAvailableTickets}`;

      // Update the film data on the server
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
          // Update the UI with the new available ticket count from the server response
          tickets.innerText = `Available Tickets: ${updatedAvailableTickets}`;

          // If available tickets are now 0, update the button text to "Sold Out"
          if (updatedAvailableTickets === 0) {
            const button = document.querySelector(".btn");
            button.innerText = "Sold Out";
          }
        })
        .catch((error) => {
          console.error("Error updating ticket information:", error.message);
        });
    } else {
      // If no available tickets, update the button text to "Sold Out" and alert the user
      const button = document.querySelector(".btn");
      button.innerText = "Sold Out";
      alert("Sorry, this showing is sold out.");
    }
  });
}

// Function to delete a film from the server
function deleteFilm(filmId) {
  // Send a DELETE request to the server to delete the film
  fetch(`${filmsUrl}films/${filmId}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        // If deletion is successful, remove the film from the UI
        const filmListItem = document.querySelector(
          `li span[data-film-id="${filmId}"]`
        );
        if (filmListItem) {
          filmListItem.parentElement.remove();
        }
      } else {
        // If deletion fails, log an error message
        console.error("Failed to delete film from the server");
      }
    })
    .catch((error) => {
      // Log an error if there's an issue with the DELETE request
      console.error("Error deleting film:", error.message);
    });
}
