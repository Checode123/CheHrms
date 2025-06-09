
import React, { useState } from 'react';

const Notices = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: '',
    content: '',
    priority: 'medium',
    category: 'general'
  });

  const [notices, setNotices] = useState([
    {
      id: 1,
      title: 'Hostel Fee Payment Reminder',
      content: 'All students are reminded to pay their hostel fees before the end of this month. Late fees will apply after the deadline.',
      priority: 'high',
      category: 'finance',
      author: 'Warden',
      date: '2025-06-03',
      time: '10:00 AM',
      views: 45,
      status: 'active'
    },
    {
      id: 2,
      title: 'Maintenance Work - Block A',
      content: 'Maintenance work will be carried out in Block A on Saturday from 9 AM to 5 PM. Water supply may be interrupted.',
      priority: 'medium',
      category: 'maintenance',
      author: 'Maintenance Team',
      date: '2025-06-02',
      time: '02:30 PM',
      views: 67,
      status: 'active'
    },
    {
      id: 3,
      title: 'New Mess Menu Available',
      content: 'A new mess menu has been introduced with healthier options. Check the mess notice board for details.',
      priority: 'low',
      category: 'mess',
      author: 'Mess Committee',
      date: '2025-06-01',
      time: '08:15 AM',
      views: 23,
      status: 'active'
    },
    {
      id: 4,
      title: 'Security Alert',
      content: 'Please ensure that you do not allow unauthorized persons into the hostel premises. Report any suspicious activity immediately.',
      priority: 'high',
      category: 'security',
      author: 'Security Head',
      date: '2025-05-31',
      time: '07:45 PM',
      views: 89,
      status: 'active'
    },
    {
      id: 5,
      title: 'Hostel Day Celebration',
      content: 'Join us for the annual Hostel Day celebration on June 15th. Various cultural activities and competitions will be organized.',
      priority: 'medium',
      category: 'events',
      author: 'Student Committee',
      date: '2025-05-30',
      time: '11:20 AM',
      views: 156,
      status: 'archived'
    }
  ]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'finance': return '💰';
      case 'maintenance': return '🔧';
      case 'mess': return '🍽️';
      case 'security': return '🛡️';
      case 'events': return '🎉';
      case 'general': return '📢';
      default: return '📋';
    }
  };

  const handleCreateNotice = () => {
    if (newNotice.title && newNotice.content) {
      const currentDate = new Date();
      const createdNotice = {
        id: notices.length + 1,
        title: newNotice.title,
        content: newNotice.content,
        priority: newNotice.priority,
        category: newNotice.category,
        author: 'Warden',
        date: currentDate.toISOString().split('T')[0],
        time: currentDate.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        }),
        views: 0,
        status: 'active'
      };
      
      setNotices([createdNotice, ...notices]);
      console.log('Notice created successfully:', createdNotice);
      setShowCreateForm(false);
      setNewNotice({ title: '', content: '', priority: 'medium', category: 'general' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Notice Management</h1>
            <p className="text-gray-600">Create and manage important announcements</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Create Notice
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-blue-600">{notices.filter(n => n.status === 'active').length}</div>
          <div className="text-gray-600">Active Notices</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-red-600">{notices.filter(n => n.priority === 'high').length}</div>
          <div className="text-gray-600">High Priority</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-green-600">{notices.reduce((sum, n) => sum + n.views, 0)}</div>
          <div className="text-gray-600">Total Views</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-gray-600">{notices.length}</div>
          <div className="text-gray-600">Total Notices</div>
        </div>
      </div>

      {/* Create Notice Form */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Create New Notice</h2>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notice Title</label>
                <input
                  type="text"
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                  placeholder="Enter notice title..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={newNotice.priority}
                    onChange={(e) => setNewNotice({ ...newNotice, priority: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newNotice.category}
                    onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="general">General</option>
                    <option value="finance">Finance</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="mess">Mess</option>
                    <option value="security">Security</option>
                    <option value="events">Events</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notice Content</label>
                <textarea
                  value={newNotice.content}
                  onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                  placeholder="Enter notice content..."
                  rows={6}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNotice}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Notice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notices List */}
      <div className="space-y-4">
        {notices.map((notice) => (
          <div key={notice.id} className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${getPriorityColor(notice.priority)}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{getCategoryIcon(notice.category)}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{notice.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>{notice.author}</span>
                    <span>•</span>
                    <span>{notice.date} at {notice.time}</span>
                    <span>•</span>
                    <span>{notice.views} views</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(notice.priority)}`}>
                  {notice.priority.charAt(0).toUpperCase() + notice.priority.slice(1)}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  notice.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {notice.status.charAt(0).toUpperCase() + notice.status.slice(1)}
                </span>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">{notice.content}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Category: {notice.category.charAt(0).toUpperCase() + notice.category.slice(1)}</span>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                <button className="text-orange-600 hover:text-orange-800 text-sm font-medium">Archive</button>
                <button className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notices;
