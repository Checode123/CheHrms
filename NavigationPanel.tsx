
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavigationPanel = ({ isOpen, onClose }: NavigationPanelProps) => {
  const location = useLocation();

  const navigationItems = [
    {
      title: 'Dashboard',
      description: 'Overview and analytics',
      path: '/',
      icon: '📊',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Attendance',
      description: 'Manage Attendance',
      path: '/attendance',
      icon: '✅',
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Feedback',
      description: 'Manage Feedbacks',
      path: '/feedback',
      icon: '💬',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Mess Management',
      description: 'Menu, timings & bookings',
      path: '/mess',
      icon: '🍽️',
      color: 'bg-orange-100 text-orange-600',
      badge: 'New'
    },
    {
      title: 'Notices',
      description: 'Important announcements',
      path: '/notices',
      icon: '📢',
      color: 'bg-yellow-100 text-yellow-600',
      badge: '5'
    },
    {
      title: 'Settings',
      description: 'System configuration',
      path: '/settings',
      icon: '⚙️',
      color: 'bg-gray-100 text-gray-600'
    }
  ];

  const emergencyContacts = [
    { name: 'Security', number: '+91 98765 43210', status: 'Active', color: 'bg-red-500' },
    { name: 'Warden', number: '+91 98765 43211', status: 'Active', color: 'bg-blue-500' },
    { name: 'Medical', number: '+91 98765 43212', status: 'Active', color: 'bg-green-500' },
    { name: 'Maintenance', number: '+91 98765 43213', status: 'Active', color: 'bg-orange-500' }
  ];

  return (
    <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Navigation Hub</h2>
            <p className="text-sm text-gray-600">Quick access to all hostel management features</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Navigation</h3>
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center p-3 rounded-lg transition-colors ${
                location.pathname === item.path 
                  ? 'bg-blue-50 border-l-4 border-blue-600' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center mr-3`}>
                <span className="text-lg">{item.icon}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">{item.title}</p>
                  {item.badge && (
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.badge === 'New' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="p-4 border-t">
        <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
          <span className="text-red-500 mr-2">⚠️</span>
          Emergency Contacts
        </h3>
        <div className="space-y-2">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full ${contact.color} flex items-center justify-center mr-2`}>
                  <span className="text-white text-xs font-medium">{contact.name[0]}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                  <p className="text-xs text-gray-600">{contact.number}</p>
                </div>
              </div>
              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                {contact.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Account Section */}
      <div className="p-4 border-t mt-auto">
        <div className="flex items-center p-3 bg-red-50 rounded-lg border border-red-200">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
            <span className="text-white text-sm font-medium">W</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-red-800">Sign Out</p>
            <p className="text-xs text-red-600">Securely logout from your account</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 text-center mt-3">HMS v2.0 • Last updated: 6/3/2025</p>
      </div>
    </div>
  );
};

export default NavigationPanel;
