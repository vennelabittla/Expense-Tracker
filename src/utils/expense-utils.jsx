// Utility functions for expense calculations
export const calculateMonthlyExpenses = (expenses) => {
    const monthlyData = {};
    
    expenses.forEach(expense => {
      const date = new Date(expense.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          month: new Date(date.getFullYear(), date.getMonth(), 1).toLocaleString('default', { month: 'short' }),
          expenses: 0,
          byCategory: {}
        };
      }
      
      monthlyData[monthKey].expenses += parseFloat(expense.amount);
      
      // Track by category
      if (!monthlyData[monthKey].byCategory[expense.category]) {
        monthlyData[monthKey].byCategory[expense.category] = 0;
      }
      monthlyData[monthKey].byCategory[expense.category] += parseFloat(expense.amount);
    });
    
    // Convert to array and sort by date
    return Object.entries(monthlyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([_, data]) => data);
  };
  
  export const calculateCategoryTotals = (expenses) => {
    const categoryTotals = {};
    
    expenses.forEach(expense => {
      if (!categoryTotals[expense.category]) {
        categoryTotals[expense.category] = 0;
      }
      categoryTotals[expense.category] += parseFloat(expense.amount);
    });
    
    return Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value
    }));
  };
  
  export const getRecentExpenses = (expenses, limit = 5) => {
    return [...expenses]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  };