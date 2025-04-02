import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Wallet, TrendingUp, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const [expenses] = useState([
    { month: 'Jan', amount: 1200 },
    { month: 'Feb', amount: 1800 },
    { month: 'Mar', amount: 1400 },
    { month: 'Apr', amount: 2000 },
    { month: 'May', amount: 1600 }
  ]);

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  
  return (
    <div className="p-6 space-y-6 bg-secondary-light min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white shadow-lg border-none">
          <CardHeader className="flex flex-row items-center space-x-4">
            <Wallet className="text-primary" />
            <CardTitle className="text-secondary">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">${totalExpenses}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-lg border-none">
          <CardHeader className="flex flex-row items-center space-x-4">
            <TrendingUp className="text-primary-light" />
            <CardTitle className="text-secondary">Monthly Average</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">
              ${(totalExpenses / expenses.length).toFixed(2)}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-lg border-none">
          <CardHeader className="flex flex-row items-center space-x-4">
            <AlertCircle className="text-danger" />
            <CardTitle className="text-secondary">Budget Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-danger">70% Used</p>
          </CardContent>
        </Card>
      </div>

      <Card className="h-96 bg-white shadow-lg border-none">
        <CardHeader>
          <CardTitle className="text-secondary">Expense Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={expenses}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F5F5F5" />
              <XAxis dataKey="month" stroke="#000000" />
              <YAxis stroke="#000000" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #000000' 
                }}
              />
              <Bar dataKey="amount" fill="#006400" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;