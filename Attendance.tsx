
import React, { useState } from 'react';

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', room: '101', status: '', time: '' },
    { id: 2, name: 'Jane Smith', room: '102', status: '', time: '' },
    { id: 3, name: 'Mike Johnson', room: '103', status: '', time: '' },
    { id: 4, name: 'Sarah Wilson', room: '104', status: '', time: '' },
    { id: 5, name: 'Tom Brown', room: '105', status: '', time: '' },
    { id: 6, name: 'Alice Cooper', room: '106', status: '', time: '' },
    { id: 7, name: 'Bob Martin', room: '107', status: '', time: '' },
    { id: 8, name: 'Carol Davis', room: '108', status: '', time: '' },
  ]);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.room.includes(searchTerm)
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'late': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const markAttendance = (studentId, status) => {
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
    
    setStudents(students.map(student => 
      student.id === studentId 
        ? { ...student, status, time: status !== 'absent' ? currentTime : '--' }
        : student
    ));
  };

  const markAllPresent = () => {
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
    
    setStudents(students.map(student => ({
      ...student,
      status: 'present',
      time: currentTime
    })));
  };

  const clearAllAttendance = () => {
    setStudents(students.map(student => ({
      ...student,
      status: '',
      time: ''
    })));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Attendance Management</h1>
        <p className="text-gray-600">Track and manage student attendance records</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                placeholder="Search by name or room..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={markAllPresent}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Mark All Present
            </button>
            <button 
              onClick={clearAllAttendance}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Clear All
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-green-600">{students.filter(s => s.status === 'present').length}</div>
          <div className="text-gray-600">Present</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-red-600">{students.filter(s => s.status === 'absent').length}</div>
          <div className="text-gray-600">Absent</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-yellow-600">{students.filter(s => s.status === 'late').length}</div>
          <div className="text-gray-600">Late</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-blue-600">{students.length}</div>
          <div className="text-gray-600">Total</div>
        </div>
      </div>

      {/* Student List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Student Attendance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-medium">{student.name[0]}</span>
                      </div>
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.room}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.status ? (
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(student.status)}`}>
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-500">
                        Not Marked
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.time || '--'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <button 
                      onClick={() => markAttendance(student.id, 'present')}
                      className="text-green-600 hover:text-green-800 bg-green-100 px-2 py-1 rounded text-xs font-medium"
                    >
                      Present
                    </button>
                    <button 
                      onClick={() => markAttendance(student.id, 'absent')}
                      className="text-red-600 hover:text-red-800 bg-red-100 px-2 py-1 rounded text-xs font-medium"
                    >
                      Absent
                    </button>
                    <button 
                      onClick={() => markAttendance(student.id, 'late')}
                      className="text-yellow-600 hover:text-yellow-800 bg-yellow-100 px-2 py-1 rounded text-xs font-medium"
                    >
                      Late
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
