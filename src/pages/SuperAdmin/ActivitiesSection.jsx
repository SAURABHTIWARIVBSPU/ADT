import React, { useState } from 'react';
import { FaPlane, FaWater, FaMountain, FaEye, FaEdit, FaCheck, FaTimes, FaSearch, FaPlus, FaFilter } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Zod schema for form validation
const activitySchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  category: z.enum(['air', 'water', 'land']),
  partner: z.string().min(1, { message: "Partner is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  price: z.number().min(0, { message: "Price must be positive" }),
  status: z.enum(['pending', 'approved', 'rejected']),
  rating: z.number().min(0).max(5).optional(),
});

export default function ActivitiesSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize react-hook-form
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      status: 'pending',
      rating: 4.5,
      price: 0
    }
  });

  // Mock activities data - now state so we can update it
  const [activities, setActivities] = useState([
    {
      id: 1,
      title: 'Skydiving Experience',
      category: 'air',
      partner: 'Sky Adventures Co.',
      location: 'Colorado Springs',
      status: 'pending',
      price: 299,
      rating: 4.8,
      bookings: 156,
      dateSubmitted: '2024-01-15',
      lastModified: '2024-01-20'
    },
    {
      id: 2,
      title: 'White Water Rafting',
      category: 'water',
      partner: 'Rapids Adventure',
      location: 'Colorado River',
      status: 'approved',
      price: 89,
      rating: 4.6,
      bookings: 203,
      dateSubmitted: '2024-01-10',
      lastModified: '2024-01-12'
    },
    {
      id: 3,
      title: 'Mountain Hiking Tour',
      category: 'land',
      partner: 'Peak Explorers',
      location: 'Rocky Mountains',
      status: 'approved',
      price: 45,
      rating: 4.9,
      bookings: 89,
      dateSubmitted: '2024-01-08',
      lastModified: '2024-01-08'
    },
    {
      id: 4,
      title: 'Scuba Diving Adventure',
      category: 'water',
      partner: 'Deep Blue Diving',
      location: 'Key Largo',
      status: 'pending',
      price: 125,
      rating: 4.7,
      bookings: 67,
      dateSubmitted: '2024-01-18',
      lastModified: '2024-01-19'
    },
    {
      id: 5,
      title: 'Hot Air Balloon Ride',
      category: 'air',
      partner: 'Balloon Adventures',
      location: 'Napa Valley',
      status: 'rejected',
      price: 199,
      rating: 4.5,
      bookings: 34,
      dateSubmitted: '2024-01-12',
      lastModified: '2024-01-16'
    }
  ]);

  const categories = [
    { id: 'all', name: 'All Categories', icon: <FaFilter />, count: activities.length },
    { id: 'air', name: 'Air Adventures', icon: <FaPlane />, count: activities.filter(a => a.category === 'air').length },
    { id: 'water', name: 'Water Sports', icon: <FaWater />, count: activities.filter(a => a.category === 'water').length },
    { id: 'land', name: 'Land Adventures', icon: <FaMountain />, count: activities.filter(a => a.category === 'land').length }
  ];

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };

  const filteredActivities = activities.filter(activity => {
    const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory;
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.partner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || activity.status === statusFilter;
    
    return matchesCategory && matchesSearch && matchesStatus;
  });

  const handleApprove = (id) => {
    console.log('Approving activity:', id);
    // Handle approval logic
  };

  const handleReject = (id) => {
    console.log('Rejecting activity:', id);
    // Handle rejection logic
  };

  const handleEdit = (id) => {
    console.log('Editing activity:', id);
    // Handle edit logic
  };

  const handleView = (id) => {
    console.log('Viewing activity:', id);
    // Handle view logic
  };

  // Add new activity handler
  const handleAddActivity = (data) => {
    const newActivity = {
      id: Math.max(...activities.map(a => a.id), 0) + 1,
      ...data,
      bookings: 0,
      dateSubmitted: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };
    
    setActivities([...activities, newActivity]);
    setIsModalOpen(false);
    reset();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Adventure Activities</h1>
          <p className="text-gray-600">Manage all adventure listings across air, water, and land categories</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors"
        >
          <FaPlus />
          <span>Add Activity</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-4 mb-6">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <span className="text-lg">{category.icon}</span>
            <span>{category.name}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
              selectedCategory === category.id ? 'bg-white bg-opacity-20' : 'bg-gray-100'
            }`}>
              {category.count}
            </span>
          </button>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search activities, partners, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Activities List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Activity</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Category</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Partner</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                <th className="text-right py-4 px-6 font-semibold text-gray-900">Price</th>
                <th className="text-right py-4 px-6 font-semibold text-gray-900">Bookings</th>
                <th className="text-right py-4 px-6 font-semibold text-gray-900">Rating</th>
                <th className="text-center py-4 px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map((activity, index) => (
                <tr key={activity.id} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-semibold text-gray-900">{activity.title}</div>
                      <div className="text-sm text-gray-500">{activity.location}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        Submitted: {new Date(activity.dateSubmitted).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">
                        {activity.category === 'air' && <FaPlane className="text-blue-600" />}
                        {activity.category === 'water' && <FaWater className="text-cyan-600" />}
                        {activity.category === 'land' && <FaMountain className="text-green-600" />}
                      </span>
                      <span className="capitalize font-medium text-gray-700">{activity.category}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">{activity.partner}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${statusColors[activity.status]}`}>
                      {activity.status}
                    </span>
                  </td>
                  <td className="text-right py-4 px-6 font-semibold text-gray-900">
                    ${activity.price}
                  </td>
                  <td className="text-right py-4 px-6 text-gray-900">
                    {activity.bookings}
                  </td>
                  <td className="text-right py-4 px-6">
                    <div className="flex items-center justify-end space-x-1">
                      <span className="text-yellow-400">★</span>
                      <span className="font-medium text-gray-900">{activity.rating}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleView(activity.id)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleEdit(activity.id)}
                        className="p-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                        title="Edit Activity"
                      >
                        <FaEdit />
                      </button>
                      {activity.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(activity.id)}
                            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Approve"
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={() => handleReject(activity.id)}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Reject"
                          >
                            <FaTimes />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No activities found</div>
            <div className="text-gray-500">Try adjusting your search or filter criteria</div>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="text-2xl font-bold text-gray-900">{activities.filter(a => a.status === 'pending').length}</div>
          <div className="text-gray-600">Pending Review</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="text-2xl font-bold text-gray-900">{activities.filter(a => a.status === 'approved').length}</div>
          <div className="text-gray-600">Approved</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="text-2xl font-bold text-gray-900">{activities.filter(a => a.status === 'rejected').length}</div>
          <div className="text-gray-600">Rejected</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="text-2xl font-bold text-gray-900">{activities.reduce((sum, a) => sum + a.bookings, 0)}</div>
          <div className="text-gray-600">Total Bookings</div>
        </div>
      </div>

      {/* Add Activity Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Add New Activity</h2>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit(handleAddActivity)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Activity Title *
                      </label>
                      <input
                        type="text"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.title ? 'border-red-500' : 'border-gray-300'
                        }`}
                        {...register('title')}
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                      )}
                    </div>
                    
                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category *
                      </label>
                      <select
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.category ? 'border-red-500' : 'border-gray-300'
                        }`}
                        {...register('category')}
                      >
                        <option value="air">Air Adventures</option>
                        <option value="water">Water Sports</option>
                        <option value="land">Land Adventures</option>
                      </select>
                      {errors.category && (
                        <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                      )}
                    </div>
                    
                    {/* Partner */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Partner *
                      </label>
                      <input
                        type="text"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.partner ? 'border-red-500' : 'border-gray-300'
                        }`}
                        {...register('partner')}
                      />
                      {errors.partner && (
                        <p className="mt-1 text-sm text-red-600">{errors.partner.message}</p>
                      )}
                    </div>
                    
                    {/* Location */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location *
                      </label>
                      <input
                        type="text"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.location ? 'border-red-500' : 'border-gray-300'
                        }`}
                        {...register('location')}
                      />
                      {errors.location && (
                        <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                      )}
                    </div>
                    
                    {/* Price */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price ($) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.price ? 'border-red-500' : 'border-gray-300'
                        }`}
                        {...register('price', { valueAsNumber: true })}
                      />
                      {errors.price && (
                        <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                      )}
                    </div>
                    
                    {/* Status */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status *
                      </label>
                      <select
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.status ? 'border-red-500' : 'border-gray-300'
                        }`}
                        {...register('status')}
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      {errors.status && (
                        <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
                      )}
                    </div>
                    
                    {/* Rating */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rating (optional)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.rating ? 'border-red-500' : 'border-gray-300'
                        }`}
                        {...register('rating', { valueAsNumber: true })}
                      />
                      {errors.rating && (
                        <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-5 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-white"
                    >
                      Add Activity
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}