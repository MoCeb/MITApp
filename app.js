// Motivational quotes data
const quotes = [
    {
        text: "Believe in yourself. You are braver than you think, more talented than you know, and capable of more than you imagine.",
        author: "Unknown"
    },
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        author: "Winston Churchill"
    },
    // Add more quotes here
];

// Index to track the currently displayed quote
let currentQuoteIndex = 0;

// Function to display the next quote
function displayNextQuote() {
    const quoteTextElement = document.getElementById('quoteText');
    const authorElement = document.querySelector('.author');

    if (currentQuoteIndex >= quotes.length) {
        currentQuoteIndex = 0; // Reset to the first quote when reaching the end
    }

    const quote = quotes[currentQuoteIndex];
    quoteTextElement.textContent = `"${quote.text}"`;
    authorElement.textContent = `- ${quote.author}`;

    currentQuoteIndex++;
}

// Retrieve existing to-do items from local storage when the page loads
function getSavedToDoItems() {
    const savedItemsJSON = localStorage.getItem('todoItems');
    return savedItemsJSON ? JSON.parse(savedItemsJSON) : [];
}

// Save the updated to-do items to local storage
function saveToDoItems(items) {
    localStorage.setItem('todoItems', JSON.stringify(items));
}

// Function to update the to-do list in the HTML
function updateToDoList() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    const savedItems = getSavedToDoItems();

    savedItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.text} - Due: ${item.dueDate}</span>
            <button class="delete" data-index="${index}">Delete</button>
        `;

        todoList.appendChild(li);
    });
}

// Add a new task to the to-do list
function addTask() {
    const taskInput = document.getElementById('task');
    const dueDateInput = document.getElementById('dueDate');
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;

    if (taskText !== '') {
        const savedItems = getSavedToDoItems();
        savedItems.push({ text: taskText, dueDate: dueDate });

        saveToDoItems(savedItems);
        taskInput.value = '';
        dueDateInput.value = '';

        // Update the to-do list in the HTML
        updateToDoList();
    }
}

// Delete a task from the to-do list
function deleteTask(index) {
    const savedItems = getSavedToDoItems();
    savedItems.splice(index, 1);
    saveToDoItems(savedItems);

    // Update the to-do list in the HTML
    updateToDoList();
}

// Attach event listeners
document.getElementById('newQuoteBtn').addEventListener('click', displayNextQuote);
document.getElementById('addTaskBtn').addEventListener('click', addTask);
document.getElementById('todoList').addEventListener('click', function (event) {
    if (event.target.classList.contains('delete')) {
        const index = event.target.getAttribute('data-index');
        deleteTask(index);
    }
});

// Initial display of a quote and the to-do list when the page loads
displayNextQuote();
updateToDoList();
