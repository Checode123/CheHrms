
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const dashboardCards = [
    {
      title: 'Attendance Taker',
      description: 'Track and manage student attendance records',
      icon: '✅',
      path: '/attendance',
      color: 'border-green-200 hover:border-green-300',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      learnMore: 'Learn More →'
    },
    {
      title: 'Feedback Viewer',
      description: 'View and manage student feedback and reports',
      icon: '💬',
      path: '/feedback',
      color: 'border-blue-200 hover:border-blue-300',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      learnMore: 'Learn More →',
      highlighted: true
    },
    {
      title: 'Notice Manager',
      description: 'Create and manage important announcements',
      icon: '📢',
      path: '/notices',
      color: 'border-purple-200 hover:border-purple-300',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      learnMore: 'Learn More →'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div 
        className="relative bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl overflow-hidden"
        style={{
          backgroundImage: 'url("/lovable-uploads/fd510c20-68f7-4809-a1a6-5eaf5fe04200.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="relative z-10 px-8 py-16 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Modern Amenities</h1>
          <p className="text-xl mb-8 opacity-90">Experience Comfort and Convenience</p>
          
          {/* Dots indicator */}
          <div className="flex justify-center space-x-2 mb-8">
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <div className="w-3 h-3 bg-white/50 rounded-full"></div>
            <div className="w-3 h-3 bg-white/50 rounded-full"></div>
          </div>
          
          <Link 
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-block"
          >
            Home
          </Link>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardCards.map((card, index) => (
          <div 
            key={index}
            className={`bg-white rounded-xl border-2 ${card.color} p-6 transition-all duration-200 hover:shadow-lg ${
              card.highlighted ? 'ring-2 ring-blue-200' : ''
            }`}
          >
            <div className="text-center space-y-4">
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 ${card.iconBg} ${card.iconColor} rounded-xl text-2xl`}>
                {card.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900">{card.title}</h3>
              
              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
              
              {/* Learn More Button */}
              <Link 
                to={card.path}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors group"
              >
                {card.learnMore}
                <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-600 rounded-lg text-xl">
              🍽️
            </div>
            <h3 className="font-semibold text-gray-900">Mess</h3>
            <p className="text-gray-600 text-sm">Menu, timings & bookings</p>
            <Link 
              to="/mess"
              className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors group"
            >
              Learn More
              <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 text-red-600 rounded-lg text-xl">
              🔔
            </div>
            <h3 className="font-semibold text-gray-900">Notices</h3>
            <p className="text-gray-600 text-sm">Read important notices or updates from hostel authorities</p>
            <Link 
              to="/notices"
              className="inline-flex items-center text-red-600 hover:text-red-700 font-medium text-sm transition-colors group"
            >
              Learn More
              <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 text-yellow-600 rounded-lg text-xl">
              💳
            </div>
            <h3 className="font-semibold text-gray-900">Fees Payment</h3>
            <p className="text-gray-600 text-sm">View fee details and make payment easily via this portal</p>
            <Link 
              to="/fees"
              className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium text-sm transition-colors group"
            >
              Learn More
              <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
