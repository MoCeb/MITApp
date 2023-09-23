const quotes = [
    "Believe in yourself!",
    "The only way to do great work is to love what you do.",
    "Don't count the days, make the days count."
];

let currentQuoteIndex = 0;

function getNextQuote() {
    document.getElementById("quote").textContent = quotes[currentQuoteIndex];
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
}

document.getElementById("newQuoteBtn").addEventListener("click", getNextQuote);

const todoList = document.getElementById("todoList");
const taskInput = document.getElementById("task");
const addTaskBtn = document.getElementById("addTaskBtn");

addTaskBtn.addEventListener("click", function() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="delete">Delete</button>
        `;
        todoList.appendChild(li);
        taskInput.value = "";
        li.querySelector(".delete").addEventListener("click", function() {
            todoList.removeChild(li);
        });
    }
});
