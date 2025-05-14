// Get all expenses from local storage
function getExpenses() {
    const expenses = localStorage.getItem('expenses');
    return expenses ? JSON.parse(expenses) : [];
}

// Save expenses to local storage
function saveExpenses(expenses) {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Add a new expense
function addExpense(expense) {
    const expenses = getExpenses();
    expense.id = Date.now(); // Generate unique ID
    expenses.push(expense);
    saveExpenses(expenses);
    return expense;
}

// Update an existing expense
function updateExpense(updatedExpense) {
    const expenses = getExpenses();
    const index = expenses.findIndex(expense => expense.id === updatedExpense.id);
    if (index !== -1) {
        expenses[index] = updatedExpense;
        saveExpenses(expenses);
        return true;
    }
    return false;
}

// Delete an expense
function deleteExpense(id) {
    const expenses = getExpenses();
    const filteredExpenses = expenses.filter(expense => expense.id !== id);
    saveExpenses(filteredExpenses);
}

// Get all budgets from local storage
function getBudgets() {
    const budgets = localStorage.getItem('budgets');
    return budgets ? JSON.parse(budgets) : {};
}

// Save budgets to local storage
function saveBudgets(budgets) {
    localStorage.setItem('budgets', JSON.stringify(budgets));
}

// Set budget for a category
function setBudget(category, amount) {
    const budgets = getBudgets();
    budgets[category] = amount;
    saveBudgets(budgets);
}

// Get budget for a category
function getBudget(category) {
    const budgets = getBudgets();
    return budgets[category] || 0;
}

// Get total expenses for a category
function getCategoryTotal(category) {
    const expenses = getExpenses();
    let total = 0;
    expenses.forEach(expense => {
        if (expense.category === category) {
            total += expense.amount;
        }
    });
    return total;
}

// Get expenses for a specific month
function getMonthlyExpenses(year, month) {
    const expenses = getExpenses();
    return expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getFullYear() === year && expenseDate.getMonth() === month;
    });
}

// Get expenses by category
function getExpensesByCategory(category) {
    const expenses = getExpenses();
    return category === 'all' 
        ? expenses 
        : expenses.filter(expense => expense.category === category);
} 