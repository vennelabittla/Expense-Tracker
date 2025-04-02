import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-3xl text-center space-y-8">
        <h1 className="text-5xl font-bold text-gray-900">
          Manage Your Finances <span className="text-green-600">Smarter</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Track expenses, analyze spending patterns, and reach your financial goals with our intuitive expense management tool.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/signup"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 bg-white text-green-600 border-2 border-green-600 rounded-lg hover:bg-green-50 transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;