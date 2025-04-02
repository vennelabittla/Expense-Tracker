import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CreditCard, PieChart, Settings } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { icon: <LayoutDashboard />, label: 'Dashboard', path: '/dashboard' },
    { icon: <CreditCard />, label: 'Expenses', path: '/expenses' },
    { icon: <PieChart />, label: 'Analytics', path: '/analytics' },
    { icon: <Settings />, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="w-64 h-full bg-white border-r border-gray-100">
      <div className="h-16 flex items-center px-6 border-b">
        <h1 className="text-xl font-bold text-gray-800">Finance Manager</h1>
      </div>
      
      <nav className="mt-6 px-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-3 mb-2 rounded-lg
              ${location.pathname === item.path 
                ? 'bg-green-100 text-green-700' 
                : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;