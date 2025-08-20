import React, { useState } from 'react';
import { FaFileAlt, FaPlus, FaEdit, FaTrash, FaDownload, FaUpload, FaBook, FaShieldAlt, FaGraduationCap, FaTimes } from 'react-icons/fa';

export default function ContentCenterSection() {
  const [activeTab, setActiveTab] = useState('templates');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({ name: '', size: '', status: 'active' });

  // Convert to state arrays for CRUD operations
  const [templates, setTemplates] = useState([
    { id: 1, name: 'Basic Certification Template', type: 'Certification', size: '2.4 MB', lastModified: '2024-01-15', downloads: 234, status: 'active' },
    { id: 2, name: 'Advanced Water Sports Certificate', type: 'Certification', size: '3.1 MB', lastModified: '2024-01-10', downloads: 156, status: 'active' },
    { id: 3, name: 'Mountain Climbing Certificate', type: 'Certification', size: '2.8 MB', lastModified: '2024-01-08', downloads: 89, status: 'draft' }
  ]);

  const [policies, setPolicies] = useState([
    { id: 1, name: 'Partner Agreement Template', type: 'Policy', size: '1.2 MB', lastModified: '2024-01-12', downloads: 445, status: 'active' },
    { id: 2, name: 'Safety Guidelines Document', type: 'Policy', size: '3.5 MB', lastModified: '2024-01-09', downloads: 678, status: 'active' },
    { id: 3, name: 'Cancellation Policy', type: 'Policy', size: '0.8 MB', lastModified: '2024-01-05', downloads: 234, status: 'active' }
  ]);

  const [tutorials, setTutorials] = useState([
    { id: 1, name: 'Partner Onboarding Guide', type: 'Tutorial', size: '15.2 MB', lastModified: '2024-01-14', downloads: 123, status: 'active' },
    { id: 2, name: 'How to Create Adventures', type: 'Tutorial', size: '22.8 MB', lastModified: '2024-01-11', downloads: 89, status: 'active' },
    { id: 3, name: 'Safety Protocol Training', type: 'Tutorial', size: '45.6 MB', lastModified: '2024-01-07', downloads: 156, status: 'draft' }
  ]);

  const getCurrentData = () => {
    switch(activeTab) {
      case 'templates': return templates;
      case 'policies': return policies;
      case 'tutorials': return tutorials;
      default: return templates;
    }
  };

  const getCurrentDataSetter = () => {
    switch(activeTab) {
      case 'templates': return setTemplates;
      case 'policies': return setPolicies;
      case 'tutorials': return setTutorials;
      default: return setTemplates;
    }
  };

  const getTabIcon = (tab) => {
    switch(tab) {
      case 'templates': return <FaGraduationCap />;
      case 'policies': return <FaShieldAlt />;
      case 'tutorials': return <FaBook />;
      default: return <FaFileAlt />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddNew = () => {
    setCurrentItem(null);
    setFormData({ name: '', size: '', status: 'active' });
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setFormData({ 
      name: item.name, 
      size: item.size, 
      status: item.status 
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const setData = getCurrentDataSetter();
    setData(prev => prev.filter(item => item.id !== id));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const setData = getCurrentDataSetter();
    const type = activeTab === 'templates' ? 'Certification' : 
                 activeTab === 'policies' ? 'Policy' : 'Tutorial';
    
    if (currentItem) {
      // Edit existing item
      setData(prev => prev.map(item => 
        item.id === currentItem.id 
          ? { 
              ...item, 
              ...formData,
              lastModified: new Date().toISOString().split('T')[0] 
            } 
          : item
      ));
    } else {
      // Add new item
      const newItem = {
        id: Date.now(), // Simple unique ID
        name: formData.name,
        type,
        size: formData.size,
        lastModified: new Date().toISOString().split('T')[0],
        downloads: 0,
        status: formData.status
      };
      setData(prev => [...prev, newItem]);
    }
    
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-bold">
                {currentItem ? 'Edit Content' : 'Add New Content'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Size
                </label>
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 2.4 MB"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {currentItem ? 'Save Changes' : 'Add Content'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Center</h1>
          <p className="text-gray-600">Manage certification templates, policy documents, safety guides, and tutorials</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <FaPlus />
          <span>Add New Content</span>
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'templates', label: 'Certification Templates' },
              { key: 'policies', label: 'Policy Documents' },
              { key: 'tutorials', label: 'Safety Guides & Tutorials' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {getTabIcon(tab.key)}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 capitalize flex items-center space-x-2">
              {getTabIcon(activeTab)}
              <span>{activeTab}</span>
            </h3>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                <FaUpload />
                <span>Upload</span>
              </button>
              <button className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                <FaDownload />
                <span>Bulk Download</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Size</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Downloads</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Last Modified</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentData().map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                          <FaFileAlt />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{item.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{item.type}</td>
                    <td className="py-3 px-4 text-right text-gray-600">{item.size}</td>
                    <td className="py-3 px-4 text-right text-gray-600">{item.downloads}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-gray-600">
                      {new Date(item.lastModified).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button 
                          onClick={() => handleEdit(item)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" 
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors" title="Download">
                          <FaDownload />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors" 
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">{templates.length}</div>
              <div className="text-sm text-gray-600">Certification Templates</div>
            </div>
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <FaGraduationCap className="text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">{policies.length}</div>
              <div className="text-sm text-gray-600">Policy Documents</div>
            </div>
            <div className="p-3 bg-green-100 text-green-600 rounded-lg">
              <FaShieldAlt className="text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">{tutorials.length}</div>
              <div className="text-sm text-gray-600">Tutorials & Guides</div>
            </div>
            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
              <FaBook className="text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}