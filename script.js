// Expense Management Application Logic
let expenses = [];

document.getElementById('expense-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('expense-name').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const date = document.getElementById('expense-date').value;

    // Create expense object and add to array
    const expense = { id: Date.now(), name, amount, date };
    expenses.push(expense);
    
    // Reset form
    event.target.reset();

    // Update UI
    displayExpenses();
    updateTotal();
});

function displayExpenses() {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = ''; // Clear existing list

    expenses.forEach(expense => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${expense.name} - $${expense.amount.toFixed(2)} (${expense.date})
            <button onclick="deleteExpense(${expense.id})">Delete</button>
        `;
        expenseList.appendChild(listItem);
    });
}

function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    displayExpenses();
    updateTotal();
}

function updateTotal() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    document.getElementById('total-expenses').textContent = total.toFixed(2);
}
