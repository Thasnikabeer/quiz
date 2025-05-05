import { Menu, User, Settings, HelpCircle } from 'lucide-react';

const Navbar = ({ onMenuClick }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 z-10">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button 
            onClick={onMenuClick}
            className="p-1 mr-4 text-primary-600 rounded-full hover:bg-primary-50 lg:hidden focus:outline-none focus:ring-2 focus:ring-primary-200"
            aria-label="Menu"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold text-primary-600">QuizApp</h1>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-1 text-gray-500 rounded-full hover:bg-primary-50 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-200">
            <HelpCircle size={20} />
          </button>
          <button className="p-1 text-gray-500 rounded-full hover:bg-primary-50 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-200">
            <Settings size={20} />
          </button>
          <div className="relative">
            <button className="flex items-center text-sm font-medium text-gray-600 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-200 rounded-full">
              <span className="sr-only">Open user menu</span>
              <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                <User size={18} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;