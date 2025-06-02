import React, { useState } from 'react';
import {
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  GraduationCap,
  BookOpen,
  Calendar,
  DollarSign,
  Award,
  Clock,
  Star,
  TrendingUp,
  Target,
  User,
  MapPin,
  Laptop,
  Users
} from 'lucide-react';

const ClassesPage = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState('current');
  const [newClass, setNewClass] = useState({
    className: '',
    instructor: '',
    category: 'Programming',
    cost: '',
    planned: '',
    savedAmount: '',
    startDate: '',
    duration: '',
    format: 'Online',
    priority: 'Medium',
    status: 'Planning',
    notes: ''
  });

  const categories = [
    'Programming',
    'Design',
    'Business',
    'Marketing',
    'Languages',
    'Data Science',
    'Photography',
    'Music',
    'Art',
    'Fitness',
    'Cooking',
    'Finance'
  ];

  const formats = ['Online', 'In-Person', 'Hybrid', 'Self-Paced'];
  const priorities = ['Low', 'Medium', 'High', 'Critical'];
  const statuses = ['Planning', 'Saving', 'Enrolled', 'In Progress', 'Completed', 'On Hold'];

  const [classes, setClasses] = useState([
    {
      id: 1,
      className: 'Advanced React Development',
      instructor: 'John Smith',
      category: 'Programming',
      cost: 299,
      planned: 299,
      savedAmount: 150,
      startDate: '2025-07-15',
      duration: '8 weeks',
      format: 'Online',
      priority: 'High',
      status: 'Saving',
      notes: 'Udemy course with certification',
      rating: 4.8,
      students: 15420
    },
    {
      id: 2,
      className: 'UI/UX Design Masterclass',
      instructor: 'Sarah Johnson',
      category: 'Design',
      cost: 450,
      planned: 450,
      savedAmount: 450,
      startDate: '2025-06-10',
      duration: '12 weeks',
      format: 'Online',
      priority: 'Medium',
      status: 'Enrolled',
      notes: 'Includes portfolio review',
      rating: 4.9,
      students: 8750
    },
    // Additional classes...
  ]);

  const [editingData, setEditingData] = useState({});

  const totalCost = classes.reduce((sum, item) => sum + item.cost, 0);
  const totalPlanned = classes.reduce((sum, item) => sum + item.planned, 0);
  const totalSaved = classes.reduce((sum, item) => sum + item.savedAmount, 0);
  const progressPercentage = totalPlanned > 0 ? (totalSaved / totalPlanned) * 100 : 0;
  const remainingAmount = totalPlanned - totalSaved;

  const filteredClasses = classes.filter(cls => {
    switch(activeTab) {
      case 'current':
        return ['Enrolled', 'In Progress', 'Saving'].includes(cls.status);
      case 'completed':
        return cls.status === 'Completed';
      case 'planning':
        return ['Planning', 'On Hold'].includes(cls.status);
      default:
        return true;
    }
  });

  const handleAddNew = () => {
    if (!newClass.className || !newClass.cost || !newClass.category) {
      alert('Please fill in all required fields');
      return;
    }

    const newId = Math.max(...classes.map(item => item.id)) + 1;
    const newClassEntry = {
      id: newId,
      className: newClass.className,
      instructor: newClass.instructor,
      category: newClass.category,
      cost: parseFloat(newClass.cost),
      planned: parseFloat(newClass.planned),
      savedAmount: parseFloat(newClass.savedAmount) || 0,
      startDate: newClass.startDate,
      duration: newClass.duration,
      format: newClass.format,
      priority: newClass.priority,
      status: newClass.status,
      notes: newClass.notes,
      rating: 0,
      students: 0
    };

    setClasses([...classes, newClassEntry]);
    setNewClass({
      className: '', instructor: '', category: 'Programming', cost: '', planned: '', savedAmount: '',
      startDate: '', duration: '', format: 'Online', priority: 'Medium', status: 'Planning', notes: ''
    });
    setIsAddingNew(false);
  };

  const handleEdit = (id) => {
    const item = classes.find(item => item.id === id);
    setEditingData({ ...item });
    setEditingId(id);
  };

  const handleSaveEdit = () => {
    setClasses(classes.map(item =>
      item.id === editingId ? { ...editingData } : item
    ));
    setEditingId(null);
    setEditingData({});
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      setClasses(classes.filter(item => item.id !== id));
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'Low': 'bg-gray-100 text-gray-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'High': 'bg-orange-100 text-orange-800',
      'Critical': 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status) => {
    const colors = {
      'Planning': 'bg-gray-100 text-gray-800',
      'Saving': 'bg-blue-100 text-blue-800',
      'Enrolled': 'bg-green-100 text-green-800',
      'In Progress': 'bg-purple-100 text-purple-800',
      'Completed': 'bg-emerald-100 text-emerald-800',
      'On Hold': 'bg-orange-100 text-orange-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Programming': return <Laptop size={16} />;
      case 'Design': return <Star size={16} />;
      case 'Languages': return <Users size={16} />;
      case 'Business': return <TrendingUp size={16} />;
      default: return <BookOpen size={16} />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <GraduationCap className="text-purple-600" size={40} />
                Classes Management
              </h1>
              <p className="text-gray-600 text-lg">
                Track your learning journey and educational investments
              </p>
            </div>
            <div className="flex gap-3">
              <select
                value={currentYear}
                onChange={(e) => setCurrentYear(parseInt(e.target.value))}
                className="bg-white border border-gray-300 rounded-xl px-4 py-2 text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value={2024}>2024</option>
                <option value={2025}>2025</option>
                <option value={2026}>2026</option>
              </select>
              <button
                onClick={() => setIsAddingNew(!isAddingNew)}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-2 rounded-xl flex items-center gap-2 transition-all shadow-lg"
              >
                <Plus size={16} />
                Add Class
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-purple-100 to-indigo-100 p-3 rounded-xl">
                <Target className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Cost</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalCost)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-3 rounded-xl">
                <DollarSign className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Planned</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalPlanned)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-3 rounded-xl">
                <TrendingUp className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Saved</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalSaved)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-orange-100 to-red-100 p-3 rounded-xl">
                <DollarSign className="text-orange-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Remaining</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(remainingAmount)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">Savings Progress</h3>
            <span className="text-sm text-gray-600">{progressPercentage.toFixed(1)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-purple-500 to-indigo-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Add New Class Form */}
        {isAddingNew && (
          <div className="p-6 bg-purple-50 border-b border-purple-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Class</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Class Name *"
                value={newClass.className}
                onChange={(e) => setNewClass({...newClass, className: e.target.value})}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Instructor"
                value={newClass.instructor}
                onChange={(e) => setNewClass({...newClass, instructor: e.target.value})}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <select
                value={newClass.category}
                onChange={(e) => setNewClass({...newClass, category: e.target.value})}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Total Cost *"
                value={newClass.cost}
                onChange={(e) => setNewClass({...newClass, cost: e.target.value})}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Planned Amount *"
                value={newClass.planned}
                onChange={(e) => setNewClass({...newClass, planned: e.target.value})}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Amount Saved"
                value={newClass.savedAmount}
                onChange={(e) => setNewClass({...newClass, savedAmount: e.target.value})}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <input
                type="date"
                placeholder="Start Date"
                value={newClass.startDate}
                onChange={(e) => setNewClass({...newClass, startDate: e.target.value})}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <select
                value={newClass.format}
                onChange={(e) => setNewClass({...newClass, format: e.target.value})}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {formats.map(format => (
                  <option key={format} value={format}>{format}</option>
                ))}
              </select>
              <select
                value={newClass.priority}
                onChange={(e) => setNewClass({...newClass, priority: e.target.value})}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>
            <div className="mt-4">
              <textarea
                placeholder="Notes"
                value={newClass.notes}
                onChange={(e) => setNewClass({...newClass, notes: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows="2"
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleAddNew}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Save size={16} />
                Save Class
              </button>
              <button
                onClick={() => setIsAddingNew(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Classes Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Calendar className="text-purple-600" size={28} />
                Classes Savings Plan - {currentYear}
              </h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Class Details</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Planned</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Saved</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Difference</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Category</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Notes</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredClasses.map((cls) => (
                  <tr key={cls.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      {editingId === cls.id ? (
                        <input
                          type="text"
                          value={editingData.className}
                          onChange={(e) => setEditingData({...editingData, className: e.target.value})}
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                        />
                      ) : (
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                            {getCategoryIcon(cls.category)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{cls.className}</h4>
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {editingId === cls.id ? (
                        <input
                          type="number"
                          value={editingData.planned}
                          onChange={(e) => setEditingData({...editingData, planned: parseFloat(e.target.value)})}
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                        />
                      ) : (
                        <span className="text-blue-600 font-semibold">{formatCurrency(cls.planned)}</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {editingId === cls.id ? (
                        <input
                          type="number"
                          value={editingData.savedAmount}
                          onChange={(e) => setEditingData({...editingData, savedAmount: parseFloat(e.target.value)})}
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                        />
                      ) : (
                        <span className={`font-semibold ${cls.savedAmount > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                          {cls.savedAmount > 0 ? formatCurrency(cls.savedAmount) : 'Not saved yet'}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {editingId === cls.id ? (
                        <span className="text-gray-500">Calculated</span>
                      ) : (
                        <span className={`font-medium ${
                          cls.savedAmount - cls.planned >= 0 ? 'text-green-600' :
                          cls.savedAmount === 0 ? 'text-gray-400' : 'text-red-600'
                        }`}>
                          {cls.savedAmount === 0 ? '-' :
                           cls.savedAmount - cls.planned >= 0 ?
                           `+${formatCurrency(cls.savedAmount - cls.planned)}` :
                           formatCurrency(cls.savedAmount - cls.planned)}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {editingId === cls.id ? (
                        <select
                          value={editingData.category}
                          onChange={(e) => setEditingData({...editingData, category: e.target.value})}
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                        >
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      ) : (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(cls.priority)}`}>
                          {cls.category}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {editingId === cls.id ? (
                        <input
                          type="text"
                          value={editingData.notes}
                          onChange={(e) => setEditingData({...editingData, notes: e.target.value})}
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                        />
                      ) : (
                        <span className="text-gray-600 text-sm">{cls.notes}</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {editingId === cls.id ? (
                        <div className="flex gap-2">
                          <button
                            onClick={handleSaveEdit}
                            className="text-green-600 hover:text-green-800 p-1 rounded transition-colors"
                            title="Save"
                          >
                            <Save size={16} />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="text-gray-600 hover:text-gray-800 p-1 rounded transition-colors"
                            title="Cancel"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(cls.id)}
                            className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors"
                            title="Edit"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(cls.id)}
                            className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Showing {filteredClasses.length} of {classes.length} classes
              </span>
              <div className="flex gap-8 text-sm">
                <span className="text-gray-700">
                  <strong>Total Cost:</strong> {formatCurrency(totalCost)}
                </span>
                <span className="text-gray-700">
                  <strong>Total Planned:</strong> {formatCurrency(totalPlanned)}
                </span>
                <span className="text-gray-700">
                  <strong>Total Saved:</strong> {formatCurrency(totalSaved)}
                </span>
                <span className={`font-bold ${remainingAmount > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                  <strong>Remaining:</strong> {formatCurrency(remainingAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Tips */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">📚 Learning Investment Tips</h3>
          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800">Set Clear Goals</h4>
              <p className="text-gray-700">
                Define what you want to achieve with each class. Setting clear, measurable goals can help you stay focused and motivated.
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800">Budget Wisely</h4>
              <p className="text-gray-700">
                Allocate your budget based on the priority and potential return on investment of each class. Consider both the cost and the value it adds to your skills or career.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800">Track Your Progress</h4>
              <p className="text-gray-700">
                Regularly review your progress in each class and adjust your learning plan as needed. Celebrate small milestones to keep yourself motivated.
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800">Diversify Your Learning</h4>
              <p className="text-gray-700">
                Mix different types of classes to cover a broad range of skills. This can make your learning journey more enjoyable and well-rounded.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassesPage;
