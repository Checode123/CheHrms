import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiRefreshCw, FiDownload, FiEye, FiTrash2 } from 'react-icons/fi';
import { Pagination, DatePicker, Select } from 'antd';
import './LogsView.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

const LogsView = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLog, setSelectedLog] = useState(null);
  const [filters, setFilters] = useState({
    dateRange: null,
    logType: 'all',
    userType: 'all'
  });

  // Mock data - replace with API call
  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      // Simulate API call
     const actions = ['login', 'update', 'deletion'];
const entities = ['student', 'room', 'payment'];

setTimeout(() => {
  const mockLogs = Array.from({ length: 50 }, (_, i) => ({
    id: `log-${i + 1}`,
    timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    action: ['Login', 'Logout', 'Update', 'Delete', 'Create'][Math.floor(Math.random() * 5)],
    user: `user${Math.floor(Math.random() * 10) + 1}@domain.com`,
    userType: ['admin', 'warden', 'student'][Math.floor(Math.random() * 3)],
    ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    details: `Performed ${actions[Math.floor(Math.random() * actions.length)]} action on ${entities[Math.floor(Math.random() * entities.length)]} data`,
  }));
        setLogs(mockLogs);
        setFilteredLogs(mockLogs);
        setLoading(false);
      }, 1000);
    };

    fetchLogs();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...logs];
    
    // Search filter
    if (searchTerm) {
      result = result.filter(log => 
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Date range filter
    if (filters.dateRange) {
      const [start, end] = filters.dateRange;
      result = result.filter(log => {
        const logDate = new Date(log.timestamp);
        return logDate >= start && logDate <= end;
      });
    }
    
    // Log type filter
    if (filters.logType !== 'all') {
      result = result.filter(log => log.action.toLowerCase() === filters.logType);
    }
    
    // User type filter
    if (filters.userType !== 'all') {
      result = result.filter(log => log.userType === filters.userType);
    }
    
    setFilteredLogs(result);
    setCurrentPage(1);
  }, [searchTerm, filters, logs]);

  const handleRefresh = () => {
    // Implement refresh logic
    console.log('Refreshing logs...');
  };

  const handleExport = () => {
    // Implement export logic
    console.log('Exporting logs...');
  };

  const itemsPerPage = 10;
//   const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const logTypeColors = {
    Login: 'var(--success)',
    Logout: 'var(--warning)',
    Update: 'var(--info)',
    Delete: 'var(--danger)',
    Create: 'var(--primary)'
  };

  return (
    <div className="logs-view-container">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="logs-header"
      >
        <h1>System Logs</h1>
        <div className="header-actions">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="refresh-btn"
            onClick={handleRefresh}
          >
            <FiRefreshCw className={loading ? 'spin' : ''} />
            Refresh
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="export-btn"
            onClick={handleExport}
          >
            <FiDownload />
            Export
          </motion.button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="filters-section"
      >
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-controls">
          <div className="filter-group">
            <label>Date Range:</label>
            <RangePicker 
              onChange={(dates) => setFilters({...filters, dateRange: dates})}
              style={{ width: '100%' }}
            />
          </div>
          
          <div className="filter-group">
            <label>Action Type:</label>
            <Select
              defaultValue="all"
              style={{ width: '100%' }}
              onChange={(value) => setFilters({...filters, logType: value})}
            >
              <Option value="all">All Actions</Option>
              <Option value="login">Logins</Option>
              <Option value="logout">Logouts</Option>
              <Option value="update">Updates</Option>
              <Option value="delete">Deletions</Option>
              <Option value="create">Creations</Option>
            </Select>
          </div>
          
          <div className="filter-group">
            <label>User Type:</label>
            <Select
              defaultValue="all"
              style={{ width: '100%' }}
              onChange={(value) => setFilters({...filters, userType: value})}
            >
              <Option value="all">All Users</Option>
              <Option value="admin">Admins</Option>
              <Option value="warden">Wardens</Option>
              <Option value="student">Students</Option>
            </Select>
          </div>
        </div>
      </motion.div>

      <div className="logs-table-container">
        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="loading-indicator"
          >
            <div className="spinner"></div>
            <p>Loading logs...</p>
          </motion.div>
        ) : (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="logs-table"
            >
              <div className="table-header">
                <div className="header-cell">Timestamp</div>
                <div className="header-cell">Action</div>
                <div className="header-cell">User</div>
                <div className="header-cell">IP Address</div>
                <div className="header-cell">Details</div>
                <div className="header-cell">Actions</div>
              </div>
              
              <AnimatePresence>
                {paginatedLogs.length > 0 ? (
                  paginatedLogs.map((log) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="table-row"
                    >
                      <div className="table-cell">
                        {log.timestamp.toLocaleString()}
                      </div>
                      <div className="table-cell">
                        <span 
                          className="action-badge"
                          style={{ backgroundColor: logTypeColors[log.action] }}
                        >
                          {log.action}
                        </span>
                      </div>
                      <div className="table-cell">
                        <span className={`user-tag ${log.userType}`}>
                          {log.user}
                        </span>
                      </div>
                      <div className="table-cell">
                        {log.ipAddress}
                      </div>
                      <div className="table-cell details-cell">
                        {log.details}
                      </div>
                      <div className="table-cell action-cell">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="view-btn"
                          onClick={() => setSelectedLog(log)}
                        >
                          <FiEye />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="delete-btn"
                        >
                          <FiTrash2 />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="no-results"
                  >
                    <p>No logs found matching your criteria</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {filteredLogs.length > itemsPerPage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="pagination-container"
              >
                <Pagination
                  current={currentPage}
                  total={filteredLogs.length}
                  pageSize={itemsPerPage}
                  onChange={(page) => setCurrentPage(page)}
                  showSizeChanger={false}
                />
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Log Detail Modal */}
      <AnimatePresence>
        {selectedLog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setSelectedLog(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="log-detail-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Log Details</h2>
                <button 
                  className="close-btn"
                  onClick={() => setSelectedLog(null)}
                >
                  &times;
                </button>
              </div>
              
              <div className="modal-content">
                <div className="detail-row">
                  <span className="detail-label">Timestamp:</span>
                  <span>{selectedLog.timestamp.toLocaleString()}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Action:</span>
                  <span 
                    className="action-badge"
                    style={{ backgroundColor: logTypeColors[selectedLog.action] }}
                  >
                    {selectedLog.action}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">User:</span>
                  <span className={`user-tag ${selectedLog.userType}`}>
                    {selectedLog.user}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">IP Address:</span>
                  <span>{selectedLog.ipAddress}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Details:</span>
                  <p>{selectedLog.details}</p>
                </div>
              </div>
              
              <div className="modal-footer">
                <button 
                  className="close-modal-btn"
                  onClick={() => setSelectedLog(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LogsView;