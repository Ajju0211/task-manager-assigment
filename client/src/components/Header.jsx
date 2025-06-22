
import { Menu, Plus } from 'lucide-react';


const Header = ({ setShowModal }) => {
  return (
    <header className="bg-white w-full border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Menu className="w-6 h-6 text-gray-600" />
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">MERN Stack</span>
              <span className="text-gray-400">▶</span>
              <span className="text-blue-600 font-medium">Task Manager</span>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Task
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
