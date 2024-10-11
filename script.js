// Expense Management Application Logic
let expenses = [];
let editIndex = -1;

document.getElementById('expense-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('expense-name').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const date = document.getElementById('expense-date').value;
    
    if (editIndex === -1) {
        // Add new expense
        const expense = { id: Date.now(), name, amount, date };
        expenses.push(expense);
    } else {
        // Edit existing expense
        expenses[editIndex] = { ...expenses[editIndex], name, amount, date };
        editIndex = -1;
    }
    
    // Reset form
    event.target.reset();
    displayExpenses();
    updateTotal();
});

function displayExpenses() {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = ''; // Clear existing list

    expenses.forEach((expense, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${expense.name} - $${expense.amount.toFixed(2)} (${expense.date})
            <button onclick="editExpense(${index})">Edit</button>
            <button onclick="deleteExpense(${expense.id})">Delete</button>
        `;
        expenseList.appendChild(listItem);
    });
}

function editExpense(index) {
    editIndex = index;
    const expense = expenses[index];
    document.getElementById('expense-name').value = expense.name;
    document.getElementById('expense-amount').value = expense.amount;
    document.getElementById('expense-date').value = expense.date;
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
