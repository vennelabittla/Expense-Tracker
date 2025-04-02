import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const RecentTransactions = () => {
  const [transactions] = useState([
    {
      id: 1,
      title: 'Grocery Shopping',
      amount: -120.50,
      category: 'Food',
      date: '2024-01-08',
      type: 'expense'
    },
    {
      id: 2,
      title: 'Salary Deposit',
      amount: 5000.00,
      category: 'Income',
      date: '2024-01-07',
      type: 'income'
    },
    {
      id: 3,
      title: 'Netflix Subscription',
      amount: -15.99,
      category: 'Entertainment',
      date: '2024-01-06',
      type: 'expense'
    },
    {
      id: 4,
      title: 'Freelance Payment',
      amount: 850.00,
      category: 'Income',
      date: '2024-01-05',
      type: 'income'
    }
  ]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex flex-col">
                <span className="font-medium">{transaction.title}</span>
                <span className="text-sm text-gray-500">{transaction.category}</span>
              </div>
              <div className="flex items-center space-x-2">
                {transaction.type === 'income' ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
                <span
                  className={`font-medium ${
                    transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  ${Math.abs(transaction.amount).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;