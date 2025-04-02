import { Bell, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="h-16 bg-white border-b border-gray-100 px-6 flex items-center justify-end">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-green-600" />
          </div>
          <span className="text-sm font-medium">John Doe</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;