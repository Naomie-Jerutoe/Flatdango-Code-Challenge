# Flatdango Code Challenge

The project involves the integration of JavaScript, HTML, and CSS.

Github Repo: [Link](https://github.com/Naomie-Jerutoe/Flatdango-Code-Challenge.git)

## Author

Naomi Lagat

## Description

This is a simple web application that allows users to view details of available movies, purchase tickets, and manage the movie list. The application fetches data from a server and users can see movie details, buy tickets, mark sold-out movies, and delete movies.

## Features

1. **View Movie List:** See a menu of all available movies on the left side of the page in the `ul#films` element. The movies are displayed with their titles, and sold-out movies are marked.

2. **View Movie Details:** Click on a movie title in the menu to view its details, including the poster, title, runtime, showtime, and available tickets.

3. **Buy Tickets:** Purchase tickets for a movie. The number of available tickets is displayed, and once all tickets are sold out, the "Buy Ticket" button changes to "Sold Out."

4. **Sold-Out Movies:** When a movie is sold out, it is indicated by changing the button text to "Sold Out" and marking the movie in the menu.

5. **Delete Movie:** Delete a movie from the server by clicking the "x" button next to each movie in the menu.

## Behaviour Driven Development

- The application fetches movie data from the server using a RESTful API.
- The movie list is displayed on the left, and details are shown on the right.
- Users can buy tickets, and the available ticket count is updated in real-time.
- Sold-out movies are marked as "Sold Out" in the menu.
- Movies can be deleted from both the UI and the server.

## Set up & Instructions

1.Clone the repository to your local machine.

2.Open index.html in a web browser to launch the application.

3.Interact with the application by clicking on the movies in the menu to view them, purchasing tickets, and deleting a movie.

## License

The MIT License (MIT)

Copyright (c) 2023 Naomi Lagat

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
