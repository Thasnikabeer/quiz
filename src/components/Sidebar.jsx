import { Home, BookOpen, PlusCircle, ListChecks, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={20} /> },
    { path: '/builder', label: 'Quiz Builder', icon: <PlusCircle size={20} /> },
    { path: '/my-quizzes', label: 'My Quizzes', icon: <ListChecks size={20} /> },
    { path: '/library', label: 'Quiz Library', icon: <BookOpen size={20} /> },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden" 
          onClick={onClose}
        ></div>
      )}
      
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-primary-600 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-primary-500">
          <h2 className="text-xl font-bold text-white">QuizApp</h2>
          <button 
            onClick={onClose}
            className="p-1 text-white/80 rounded-full hover:bg-primary-500 lg:hidden focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="px-4 py-6">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition duration-200 ${
                    location.pathname === item.path
                      ? 'bg-primary-700 text-white'
                      : 'text-white/90 hover:bg-primary-500'
                  }`}
                  onClick={onClose}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;