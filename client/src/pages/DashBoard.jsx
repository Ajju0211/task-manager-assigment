import Header from "../components/Header";
import MainContent from "../components/MainContent";
import TaskEditor from "../components/TaskEditor";
import Sidebar from "../components/Sidebar";
import RightSidebar from "../components/RightSidebar";
import { useTaskContext } from "../context/useTarskContext"; // 👈 Make sure this path is correct

const App = () => {
  const {
    showModal,
    setShowModal,
    tasks,
    filters,
    setFilters,
    groupedTasks,
    stats,
    setEditingTask,
    editingTask,
    formData,
    setFormData,
    handleSubmit,
    resetForm,
    teamMembers,
  } = useTaskContext();

  return (
    <div className="min-h-screen w-screen bg-gray-100">
      <Header setShowModal={setShowModal} />
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-6 ">
          <Sidebar />

          <div className="flex flex-col items-start justify-center md:flex-row">
          {/* Main Section */}
          
          <main className="max-w-7xl mx-auto p-6">
            <MainContent />
          </main>

          <RightSidebar teamMembers={teamMembers} tasks={tasks} stats={stats} />

          {/* Task Modal */}
          <TaskEditor />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
