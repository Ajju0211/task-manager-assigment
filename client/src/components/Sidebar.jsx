import { MessageSquare, CheckCircle, Calendar, User, BarChart3 } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-16 flex flex-col items-center gap-4 pt-4">
      <div className="p-3 bg-blue-100 rounded-lg">
        <div className="w-6 h-6 bg-blue-600 rounded grid grid-cols-2 gap-0.5">
          <div className="bg-white rounded-sm"></div>
          <div className="bg-white rounded-sm"></div>
          <div className="bg-white rounded-sm"></div>
          <div className="bg-white rounded-sm"></div>
        </div>
      </div>

      <div className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer" title="Messages">
        <MessageSquare className="w-6 h-6 text-gray-400" />
      </div>

      <div className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer" title="Tasks">
        <CheckCircle className="w-6 h-6 text-gray-400" />
      </div>

      <div className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer" title="Calendar">
        <Calendar className="w-6 h-6 text-gray-400" />
      </div>

      <div className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer" title="Team">
        <User className="w-6 h-6 text-gray-400" />
      </div>

      <div className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer" title="Analytics">
        <BarChart3 className="w-6 h-6 text-gray-400" />
      </div>
    </div>
  );
};

export default Sidebar;