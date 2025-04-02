import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const ExpenseChart = () => {
  const [data] = useState([
    { name: 'Jan', income: 5000, expenses: 3400 },
    { name: 'Feb', income: 4800, expenses: 2800 },
    { name: 'Mar', income: 5200, expenses: 3200 },
    { name: 'Apr', income: 4900, expenses: 2600 },
    { name: 'May', income: 5300, expenses: 3100 },
    { name: 'Jun', income: 5100, expenses: 2900 }
  ]);

  const currentMonth = data[data.length - 1];
  const previousMonth = data[data.length - 2];
  const expenseChange = ((currentMonth.expenses - previousMonth.expenses) / previousMonth.expenses) * 100;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-normal">Cash Flow</CardTitle>
        <div className="flex items-center space-x-2">
          {expenseChange > 0 ? (
            <ArrowUpRight className="text-red-500 w-4 h-4" />
          ) : (
            <ArrowDownRight className="text-green-500 w-4 h-4" />
          )}
          <span className={`text-sm ${expenseChange > 0 ? 'text-red-500' : 'text-green-500'}`}>
            {Math.abs(expenseChange).toFixed(1)}%
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px'
                }}
              />
              <Bar dataKey="income" fill="#4ade80" name="Income" />
              <Bar dataKey="expenses" fill="#f43f5e" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseChart;