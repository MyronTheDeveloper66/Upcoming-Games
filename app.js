// Game Class
class Game {
    constructor(title, date, price) {
        this.title = title;
        this.date = date;
        this.price = price;
        this.releaseMonth = new Date(date).getMonth();
    }
}

// UI Class 
// Contains functions for manipulating the UI
class UI {
    // adds games to UI
    addGame (game) {
        // grab the game list element
        const list = document.getElementById('game-list');
        // create the table row
        const row = document.createElement('tr');
        // add the table data containing the object values
        row.innerHTML = 
        `
        <td>${game.title}</td>
        <td>${game.date}</td>
        <td>$${game.price}</td>
        <td><a href="#" class="delete"</a>X</td>
        `
        list.appendChild(row);

    }

    showAlert(message, className) {
        // create div
        const div = document.createElement('div');
        // add class
        div.className = `alert ${className}`;
        // add text
        div.appendChild(document.createTextNode(message));
        // Get a parent
        const container = document.querySelector('.container');

        const form = document.querySelector('#game-form');
        // Insert alert
        // insertBefore() takes two parameters
        // what I want to insert and what I want to insert before
        container.insertBefore(div, form);

        // disappear after 3 seconds with Timeout
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    // clears input fields after successful submission
    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('date').value = '';
        document.getElementById('price').value = '';
    }
    // Clears date field after wrong date is entered
    clearDate() {
        document.getElementById('date').value = '';
    }
}

// Event Listener

document.getElementById('game-form').addEventListener('submit', 
    function(e) {

        const title = document.getElementById('title').value;
        const date = document.getElementById('date').value;
        const price = document.getElementById('price').value;

        const game = new Game(title, date, price);
        
        // Instatiate UI
        const ui = new UI();
        
        // Validation
        // variable holding current date
        const currentDate = Date.now();
        // variable converting date input from string to date format
        const convertedDate = Date.parse(date);

        if( title === '' || date === '' || price === '') {
            ui.showAlert('Please fill out all fields', 'error');
        } else if(convertedDate < currentDate) {
            ui.showAlert('Please enter an upcoming date', 'error');
            ui.clearDate();
        } else {
            //Use addgame() to submit the new game
            ui.addGame(game);

            ui.showAlert('Game added!', 'success');

            ui.clearFields();
        }

        e.preventDefault();
    }
)