import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Wallet, TrendingUp, AlertCircle } from 'lucide-react';
import { useCurrency } from '../context/ThemeProvider';

const DashboardPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [totalBalance] = useState(() => localStorage.getItem('totalBalance') || 0);
  const { formatCurrency } = useCurrency();

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    setExpenses(savedExpenses);
    const monthlyExpenses = processMonthlyExpenses(savedExpenses);
    setMonthlyData(monthlyExpenses);
  }, []);

  const processMonthlyExpenses = (expenseData) => {
    const monthlyMap = expenseData.reduce((acc, expense) => {
      const date = new Date(expense.date);
      const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      if (!acc[monthYear]) {
        acc[monthYear] = 0;
      }
      acc[monthYear] += parseFloat(expense.amount);
      return acc;
    }, {});

    return Object.entries(monthlyMap)
      .map(([month, amount]) => ({ month, amount }))
      .slice(-5);
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  const monthlyAverage = expenses.length > 0 ? totalExpenses / monthlyData.length : 0;
  const budgetUsedPercentage = totalBalance > 0 ? ((totalExpenses / totalBalance) * 100).toFixed(0) : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-dark-card border-dark-border">
          <CardHeader className="flex flex-row items-center space-x-4">
            <Wallet className="text-green-400" />
            <CardTitle className="text-base">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {formatCurrency(totalExpenses)}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-dark-border">
          <CardHeader className="flex flex-row items-center space-x-4">
            <TrendingUp className="text-green-400" />
            <CardTitle className="text-base">Monthly Average</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {formatCurrency(monthlyAverage)}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-dark-border">
          <CardHeader className="flex flex-row items-center space-x-4">
            <AlertCircle className="text-green-400" />
            <CardTitle className="text-base">Budget Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{budgetUsedPercentage}% Used</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle>Expense Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                <XAxis 
                  dataKey="month" 
                  stroke="#a0aec0"
                />
                <YAxis 
                  stroke="#a0aec0"
                  tickFormatter={(value) => formatCurrency(value)}
                />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), 'Amount']}
                  contentStyle={{
                    backgroundColor: '#333333',
                    border: '1px solid #404040',
                    color: '#ffffff'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#4EC24E"
                  strokeWidth={2}
                  dot={{ fill: '#4EC24E' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;