// Initialize expense elements
const expenseForm = document.getElementById('expenseForm');
const expensesList = document.getElementById('expensesList');
const filterCategory = document.getElementById('filterCategory');
const filterMonth = document.getElementById('filterMonth');

// Initialize event listeners
function initializeExpenseEvents() {
    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleAddExpense();
    });

    filterCategory.addEventListener('change', loadExpenses);
    filterMonth.addEventListener('change', loadExpenses);
}

// Handle add/edit expense
function handleAddExpense() {
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;

    const expense = {
        amount,
        category,
        date,
        description
    };

    // Check if we're editing an existing expense
    const editId = expenseForm.dataset.editId;
    if (editId) {
        expense.id = parseInt(editId);
        updateExpense(expense);
    } else {
        addExpense(expense);
    }

    resetForm();
    loadExpenses();
    updateBudgetStatus();
    checkBudgetLimit(category);
}

// Load and display expenses
function loadExpenses() {
    const selectedCategory = filterCategory.value;
    const selectedMonth = filterMonth.value;
    
    let expenses = getExpensesByCategory(selectedCategory);

    if (selectedMonth) {
        const [year, month] = selectedMonth.split('-').map(Number);
        expenses = expenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate.getFullYear() === year && expenseDate.getMonth() === month - 1;
        });
    }

    renderExpenses(expenses);
}

// Render expenses list
function renderExpenses(expenses) {
    expensesList.innerHTML = '';

    if (expenses.length === 0) {
        expensesList.innerHTML = '<p>No expenses found.</p>';
        return;
    }

    expenses.forEach(expense => {
        const expenseElement = createExpenseElement(expense);
        expensesList.appendChild(expenseElement);
    });
}

// Create expense element
function createExpenseElement(expense) {
    const div = document.createElement('div');
    div.className = 'expense-item';
    
    const date = new Date(expense.date).toLocaleDateString();
    const amount = expense.amount.toFixed(2);
    
    div.innerHTML = `
        <div class="expense-date">${date}</div>
        <div class="expense-category">${expense.category}</div>
        <div class="expense-amount">$${amount}</div>
        <div class="expense-description">${expense.description}</div>
        <div class="actions">
            <button class="edit" onclick="handleEdit(${expense.id})">Edit</button>
            <button class="delete" onclick="handleDelete(${expense.id})">Delete</button>
        </div>
    `;
    
    return div;
}

// Handle edit expense
function handleEdit(id) {
    const expenses = getExpenses();
    const expense = expenses.find(exp => exp.id === id);
    
    if (expense) {
        document.getElementById('amount').value = expense.amount;
        document.getElementById('category').value = expense.category;
        document.getElementById('date').value = expense.date;
        document.getElementById('description').value = expense.description;
        
        // Change form submit button to update
        const submitButton = expenseForm.querySelector('button[type="submit"]');
        submitButton.textContent = 'Update Expense';
        
        // Store the expense ID for update
        expenseForm.dataset.editId = id;
        
        // Scroll to form
        expenseForm.scrollIntoView();
    }
}

// Handle delete expense
function handleDelete(id) {
    if (confirm('Are you sure you want to delete this expense?')) {
        deleteExpense(id);
        loadExpenses();
        updateBudgetStatus();
    }
}

// Reset form
function resetForm() {
    expenseForm.reset();
    const submitButton = expenseForm.querySelector('button[type="submit"]');
    submitButton.textContent = 'Add Expense';
    delete expenseForm.dataset.editId;
}

// Initialize expense functionality
initializeExpenseEvents();
loadExpenses(); 