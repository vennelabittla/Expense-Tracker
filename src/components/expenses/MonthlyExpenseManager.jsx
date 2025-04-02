import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Plus, Wallet } from 'lucide-react';
import { formatCurrency } from '../../utils/currencyUtils';

const MonthlyExpenseManager = ({ expenses, onMonthSelect }) => {
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [totalBalance, setTotalBalance] = useState(() => {
    return localStorage.getItem('totalBalance') || 0;
  });
  const [isBalanceDialogOpen, setIsBalanceDialogOpen] = useState(false);
  const [newBalance, setNewBalance] = useState('');

  // Calculate totals
  const months = [...new Set(expenses.map(expense => {
    const date = new Date(expense.date);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  }))].sort((a, b) => b.localeCompare(a));

  const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  const remainingBalance = parseFloat(totalBalance) - totalExpenses;

  const handleMonthChange = (event) => {
    const month = event.target.value;
    setSelectedMonth(month);
    
    if (month === 'all') {
      onMonthSelect(expenses);
    } else {
      const filteredExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        const expenseMonth = `${expenseDate.getFullYear()}-${String(expenseDate.getMonth() + 1).padStart(2, '0')}`;
        return expenseMonth === month;
      });
      onMonthSelect(filteredExpenses);
    }
  };

  const handleBalanceUpdate = () => {
    const updatedBalance = parseFloat(newBalance);
    if (!isNaN(updatedBalance)) {
      setTotalBalance(updatedBalance);
      localStorage.setItem('totalBalance', updatedBalance);
      setIsBalanceDialogOpen(false);
      setNewBalance('');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Balance Overview</CardTitle>
          <button
            onClick={() => setIsBalanceDialogOpen(true)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            <Plus className="w-4 h-4" /> Update Balance
          </button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-4">
              <Wallet className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Total Balance</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(totalBalance, 'INR').formatted}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Wallet className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Remaining Balance</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(remainingBalance, 'INR').formatted}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
        >
          <option value="all">All Months</option>
          {months.map(month => (
            <option key={month} value={month}>
              {new Date(month).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
            </option>
          ))}
        </select>
      </div>

      <Dialog open={isBalanceDialogOpen} onOpenChange={setIsBalanceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Total Balance</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <input
              type="number"
              value={newBalance}
              onChange={(e) => setNewBalance(e.target.value)}
              placeholder="Enter new balance"
              className="w-full px-4 py-2 rounded border border-gray-300"
            />
          </div>
          <DialogFooter>
            <button
              onClick={() => setIsBalanceDialogOpen(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleBalanceUpdate}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
            >
              Update Balance
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MonthlyExpenseManager;