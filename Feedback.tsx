
import React, { useState } from 'react';

const Feedback = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const feedbacks = [
    {
      id: 1,
      student: 'John Doe',
      room: '101',
      category: 'Mess',
      subject: 'Food Quality Issue',
      message: 'The food quality has been poor lately. Need improvement in taste and hygiene.',
      priority: 'high',
      status: 'pending',
      date: '2025-06-03',
      time: '10:30 AM'
    },
    {
      id: 2,
      student: 'Jane Smith',
      room: '102',
      category: 'Maintenance',
      subject: 'AC Not Working',
      message: 'The air conditioner in my room has not been working for the past 3 days.',
      priority: 'medium',
      status: 'in-progress',
      date: '2025-06-02',
      time: '02:15 PM'
    },
    {
      id: 3,
      student: 'Mike Johnson',
      room: '103',
      category: 'General',
      subject: 'Positive Feedback',
      message: 'Thank you for the excellent service and clean facilities.',
      priority: 'low',
      status: 'resolved',
      date: '2025-06-01',
      time: '09:45 AM'
    },
    {
      id: 4,
      student: 'Sarah Wilson',
      room: '104',
      category: 'Security',
      subject: 'Security Concern',
      message: 'There have been some unauthorized people near the hostel premises.',
      priority: 'high',
      status: 'pending',
      date: '2025-06-03',
      time: '08:20 PM'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Mess': return '🍽️';
      case 'Maintenance': return '🔧';
      case 'Security': return '🛡️';
      case 'General': return '💬';
      default: return '📝';
    }
  };

  const filteredFeedbacks = selectedFilter === 'all' 
    ? feedbacks 
    : feedbacks.filter(feedback => feedback.status === selectedFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Feedback Management</h1>
        <p className="text-gray-600">View and manage student feedback and reports</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-orange-600">{feedbacks.filter(f => f.status === 'pending').length}</div>
          <div className="text-gray-600">Pending</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-blue-600">{feedbacks.filter(f => f.status === 'in-progress').length}</div>
          <div className="text-gray-600">In Progress</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-green-600">{feedbacks.filter(f => f.status === 'resolved').length}</div>
          <div className="text-gray-600">Resolved</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-gray-600">{feedbacks.length}</div>
          <div className="text-gray-600">Total</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedFilter === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Feedback
          </button>
          <button
            onClick={() => setSelectedFilter('pending')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedFilter === 'pending' 
                ? 'bg-orange-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setSelectedFilter('in-progress')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedFilter === 'in-progress' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setSelectedFilter('resolved')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedFilter === 'resolved' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Resolved
          </button>
        </div>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedbacks.map((feedback) => (
          <div key={feedback.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{getCategoryIcon(feedback.category)}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{feedback.subject}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>{feedback.student}</span>
                    <span>•</span>
                    <span>Room {feedback.room}</span>
                    <span>•</span>
                    <span>{feedback.date} at {feedback.time}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(feedback.priority)}`}>
                  {feedback.priority.charAt(0).toUpperCase() + feedback.priority.slice(1)} Priority
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(feedback.status)}`}>
                  {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
                </span>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">{feedback.message}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Category: {feedback.category}</span>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Reply</button>
                <button className="text-green-600 hover:text-green-800 text-sm font-medium">Mark Resolved</button>
                <button className="text-orange-600 hover:text-orange-800 text-sm font-medium">In Progress</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
