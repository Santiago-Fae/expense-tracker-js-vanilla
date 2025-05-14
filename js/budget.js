// Initialize budget elements
const budgetForm = document.querySelector('.budget-form');
const budgetStatus = document.getElementById('budgetStatus');
const setBudgetButton = document.getElementById('setBudget');

// Initialize event listeners
function initializeBudgetEvents() {
    setBudgetButton.addEventListener('click', handleSetBudget);
}

// Handle set budget button click
function handleSetBudget() {
    const category = document.getElementById('budgetCategory').value;
    const amount = parseFloat(document.getElementById('budgetAmount').value);

    if (isNaN(amount) || amount < 0) {
        alert('Please enter a valid budget amount');
        return;
    }

    setBudget(category, amount);
    updateBudgetStatus();
}

// Check if budget limit is exceeded
function checkBudgetLimit(category) {
    const budget = getBudget(category);
    if (budget > 0) {
        const spent = getCategoryTotal(category);
        if (spent > budget) {
            alert(`Budget limit exceeded for ${category}!`);
        }
    }
}

// Update budget status display
function updateBudgetStatus() {
    const budgets = getBudgets();
    let statusHTML = '';

    for (const [category, budget] of Object.entries(budgets)) {
        const spent = getCategoryTotal(category);
        const remaining = budget - spent;
        const percentage = (spent / budget) * 100;

        let statusClass = 'bg-success';
        if (percentage >= 100) {
            statusClass = 'bg-danger';
        } else if (percentage >= 75) {
            statusClass = 'bg-warning';
        }

        statusHTML += `
            <div class="${statusClass}">
                <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                <p>Budget: $${budget.toFixed(2)}</p>
                <p>Spent: $${spent.toFixed(2)}</p>
                <p>Remaining: $${remaining.toFixed(2)}</p>
                <div class="progress-bar">
                    <div class="progress" style="width: ${percentage}%"></div>
                </div>
            </div>
        `;
    }

    budgetStatus.innerHTML = statusHTML || '<p>No budgets set yet.</p>';
}

// Initialize budget functionality
initializeBudgetEvents();
updateBudgetStatus(); 