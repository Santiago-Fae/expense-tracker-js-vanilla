// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;

    // Set default month filter to current month
    const currentMonth = new Date().toISOString().slice(0, 7);
    document.getElementById('filterMonth').value = currentMonth;

    // Add form reset functionality
    const expenseForm = document.getElementById('expenseForm');
    expenseForm.addEventListener('reset', resetForm);

    // Add error handling for storage
    window.addEventListener('storage', (e) => {
        if (e.key === null) {
            // Storage was cleared
            location.reload();
        }
    });

    // Add offline support
    window.addEventListener('online', () => {
        console.log('Application is online');
    });

    window.addEventListener('offline', () => {
        console.log('Application is offline');
    });
}); 