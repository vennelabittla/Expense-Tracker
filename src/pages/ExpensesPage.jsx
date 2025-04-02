import { useState, useEffect } from 'react';
import ExpenseForm from '../components/expenses/ExpenseForm';
import ExpenseList from '../components/expenses/ExpenseList';
import CategoryManager from '../components/expenses/CategoryManager';
import MonthlyExpenseManager from '../components/expenses/MonthlyExpenseManager';

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });
  
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);

  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem('categories');
    return savedCategories ? JSON.parse(savedCategories) : [
      { id: 1, name: 'Food', color: '#2B992B' },
      { id: 2, name: 'Transport', color: '#4EC24E' },
      { id: 3, name: 'Entertainment', color: '#76D076' },
      { id: 4, name: 'Utilities', color: '#9EDE9E' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    setFilteredExpenses(expenses); // Update filtered expenses when expenses change
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const handleAddExpense = (newExpense) => {
    const expenseWithId = {
      ...newExpense,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };
    setExpenses([expenseWithId, ...expenses]);
  };

  const handleDeleteExpense = (expenseId) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      setExpenses(expenses.filter(expense => expense.id !== expenseId));
    }
  };

  const handleEditExpense = (expenseToEdit) => {
    const updatedExpenses = expenses.map(expense =>
      expense.id === expenseToEdit.id ? expenseToEdit : expense
    );
    setExpenses(updatedExpenses);
  };

  const handleMonthSelect = (filteredExpenses) => {
    setFilteredExpenses(filteredExpenses);
  };

  // Calculate category totals based on filtered expenses
  const expensesByCategory = filteredExpenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = [];
    }
    acc[expense.category].push(expense);
    return acc;
  }, {});

  const categoryTotals = Object.entries(expensesByCategory).map(([category, expenses]) => ({
    category,
    total: expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0)
  }));

  return (
    <div className="space-y-6">
      <MonthlyExpenseManager 
        expenses={expenses}
        onMonthSelect={handleMonthSelect}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ExpenseList 
            expenses={filteredExpenses}
            onDeleteExpense={handleDeleteExpense}
            onEditExpense={handleEditExpense}
            categories={categories}
          />
        </div>
        <div>
          <ExpenseForm 
            onAddExpense={handleAddExpense} 
            categories={categories}
          />
        </div>
      </div>
      
      <CategoryManager 
        categories={categories} 
        setCategories={setCategories}
        categoryTotals={categoryTotals}
      />
    </div>
  );
};

export default ExpensesPage;