import React, { useState, useEffect } from 'react';
import { Menu, Star, MessageSquare, Eye, Calendar, Globe, BarChart3, Camera, CheckCircle, MoreHorizontal, Plus, Filter, X, Edit2, Trash2, User, Clock, AlertCircle } from 'lucide-react';

const CollaborativeTaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    assignee: ''
  });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    status: 'To Do'
  });

  // Team members for assignment
  const teamMembers = [
    'Alice Johnson',
    'Bob Smith', 
    'Charlie Brown',
    'Diana Prince',
    'Eve Wilson',
    'Frank Miller',
    'Grace Lee',
    'Henry Davis'
  ];

  // Sample initial tasks
  useEffect(() => {
    setTasks([
      {
        _id: '1',
        title: 'Design Database Schema',
        description: 'Create MongoDB schema for users and tasks collections with proper relationships',
        assignedTo: 'Alice Johnson',
        status: 'In Progress',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-16')
      },
      {
        _id: '2',
        title: 'Setup Express API Routes',
        description: 'Implement RESTful API endpoints for CRUD operations on tasks',
        assignedTo: 'Bob Smith',
        status: 'Done',
        createdAt: new Date('2024-01-14'),
        updatedAt: new Date('2024-01-15')
      },
      {
        _id: '3',
        title: 'Create React Components',
        description: 'Build functional components with hooks for task management UI',
        assignedTo: 'Charlie Brown',
        status: 'To Do',
        createdAt: new Date('2024-01-16'),
        updatedAt: new Date('2024-01-16')
      },
      {
        _id: '4',
        title: 'Implement Task Filtering',
        description: 'Add filtering functionality by status and assignee with dynamic updates',
        assignedTo: 'Diana Prince',
        status: 'In Progress',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-16')
      },
      {
        _id: '5',
        title: 'Write API Documentation',
        description: 'Document all API endpoints with request/response examples',
        assignedTo: 'Eve Wilson',
        status: 'To Do',
        createdAt: new Date('2024-01-16'),
        updatedAt: new Date('2024-01-16')
      }
    ]);
  }, []);

  // API simulation functions (replace with actual API calls)
  const createTask = async (taskData) => {
    const newTask = {
      _id: Date.now().toString(),
      ...taskData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setTasks(prev => [...prev, newTask]);
    return newTask;
  };

  const updateTask = async (taskId, updates) => {
    const updatedTask = {
      ...tasks.find(t => t._id === taskId),
      ...updates,
      updatedAt: new Date()
    };
    setTasks(prev => prev.map(task => 
      task._id === taskId ? updatedTask : task
    ));
    return updatedTask;
  };

  const deleteTask = async (taskId) => {
    setTasks(prev => prev.filter(task => task._id !== taskId));
  };

  // Form handlers
  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.assignedTo) {
      alert('Please fill in all required fields');
      return;
    }
    
    try {
      if (editingTask) {
        await updateTask(editingTask._id, formData);
      } else {
        await createTask(formData);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Failed to save task. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      assignedTo: '',
      status: 'To Do'
    });
    setShowModal(false);
    setEditingTask(null);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      assignedTo: task.assignedTo,
      status: task.status
    });
    setShowModal(true);
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task. Please try again.');
      }
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const statusMatch = !filters.status || task.status === filters.status;
    const assigneeMatch = !filters.assignee || task.assignedTo === filters.assignee;
    return statusMatch && assigneeMatch;
  });

  // Group tasks by status
  const groupedTasks = {
    'To Do': filteredTasks.filter(task => task.status === 'To Do'),
    'In Progress': filteredTasks.filter(task => task.status === 'In Progress'),
    'Done': filteredTasks.filter(task => task.status === 'Done')
  };

  // Helper functions
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Done':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'In Progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Done':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getAvatarColor = (name) => {
    const colors = ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-indigo-500', 'bg-orange-500'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const done = tasks.filter(t => t.status === 'Done').length;
    const inProgress = tasks.filter(t => t.status === 'In Progress').length;
    const toDo = tasks.filter(t => t.status === 'To Do').length;
    
    return { total, done, inProgress, toDo };
  };

  const stats = getTaskStats();

  const TaskCard = ({ task }) => (
    <div className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          {getStatusIcon(task.status)}
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
            {task.status}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleEdit(task)}
            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
            title="Edit Task"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(task._id)}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
            title="Delete Task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <h3 className="font-medium text-gray-900 mb-2">{task.title}</h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{task.description}</p>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 ${getAvatarColor(task.assignedTo)} rounded-full flex items-center justify-center text-white text-xs font-medium`}>
            {getInitials(task.assignedTo)}
          </div>
          <span className="text-sm text-gray-700">{task.assignedTo}</span>
        </div>
      </div>

      {task.status !== 'Done' && (
        <div className="pt-3 border-t">
          <select
            value={task.status}
            onChange={(e) => updateTaskStatus(task._id, e.target.value)}
            className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      )}

      <div className="flex items-center justify-between mt-3 pt-2 border-t text-xs text-gray-500">
        <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
        <span>ID: {task._id.slice(-4)}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
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

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
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

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Collaborative Task Manager</h1>
              
              {/* Filters */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-500" />
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Status</option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                  
                  <select
                    value={filters.assignee}
                    onChange={(e) => setFilters({...filters, assignee: e.target.value})}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Assignees</option>
                    {teamMembers.map(member => (
                      <option key={member} value={member}>{member}</option>
                    ))}
                  </select>
                  
                  {(filters.status || filters.assignee) && (
                    <button
                      onClick={() => setFilters({status: '', assignee: ''})}
                      className="text-gray-500 hover:text-gray-700 p-1"
                      title="Clear Filters"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Stats Overview */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Tasks</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                  <div className="p-2 bg-gray-100 rounded-full">
                    <BarChart3 className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">To Do</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.toDo}</p>
                  </div>
                  <div className="p-2 bg-gray-100 rounded-full">
                    <AlertCircle className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">In Progress</p>
                    <p className="text-2xl font-bold text-blue-900">{stats.inProgress}</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-green-900">{stats.done}</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-full">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-3 gap-6">
              {Object.entries(groupedTasks).map(([status, statusTasks]) => (
                <div key={status}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-medium text-gray-700 uppercase tracking-wide">{status}</h2>
                    <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {statusTasks.length}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {statusTasks.length === 0 ? (
                      <div className="bg-white rounded-lg p-6 text-center border-2 border-dashed border-gray-200">
                        <p className="text-gray-500 text-sm">No tasks in {status.toLowerCase()}</p>
                      </div>
                    ) : (
                      statusTasks.map(task => (
                        <TaskCard key={task._id} task={task} />
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Team & Assignment Info */}
          <div className="w-80 space-y-6">
            {/* Team Members */}
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <h3 className="font-medium text-gray-900 mb-4">TEAM MEMBERS</h3>
              <div className="space-y-3">
                {teamMembers.slice(0, 6).map(member => {
                  const memberTasks = tasks.filter(t => t.assignedTo === member);
                  return (
                    <div key={member} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 ${getAvatarColor(member)} rounded-full flex items-center justify-center text-white text-xs font-medium`}>
                          {getInitials(member)}
                        </div>
                        <span className="text-sm text-gray-700">{member}</span>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {memberTasks.length} tasks
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <h3 className="font-medium text-gray-900 mb-4">QUICK STATS</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Tasks</span>
                  <span className="font-medium text-gray-900">{stats.inProgress}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Completion Rate</span>
                  <span className="font-medium text-green-600">
                    {stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Team Members</span>
                  <span className="font-medium text-gray-900">{teamMembers.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task Creation/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingTask ? 'Edit Task' : 'Create New Task'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter task title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter task description"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assign To *
                  </label>
                  <select
                    required
                    value={formData.assignedTo}
                    onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select team member</option>
                    {teamMembers.map(member => (
                      <option key={member} value={member}>{member}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  {editingTask ? 'Update Task' : 'Create Task'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollaborativeTaskManager;