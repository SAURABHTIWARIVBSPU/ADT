import React from 'react';
import { FaChartPie, FaArrowUp, FaArrowDown, FaUsers, FaCalendarAlt, FaStar, FaChartBar, FaChartLine } from 'react-icons/fa';

export default function AnalyticsSection() {
  // Mock data for charts
  const platformGrowthData = [
    { month: 'Jan', value: 120 },
    { month: 'Feb', value: 200 },
    { month: 'Mar', value: 150 },
    { month: 'Apr', value: 300 },
    { month: 'May', value: 280 },
    { month: 'Jun', value: 400 },
  ];
  
  const bookingTrendsData = [
    { category: 'Air', value: 65 },
    { category: 'Water', value: 40 },
    { category: 'Land', value: 45 },
  ];
  
  const partnerPerformance = [
    { name: 'Sky Adventures', value: 85 },
    { name: 'Rapids Adventure', value: 70 },
    { name: 'Peak Explorers', value: 95 },
    { name: 'Deep Blue Diving', value: 60 },
  ];
  
  const userBehavior = [
    { label: 'New Users', value: 65, color: 'bg-blue-500' },
    { label: 'Returning Users', value: 35, color: 'bg-green-500' },
  ];

  // Helper to find max value for chart scaling
  const maxValue = (data) => Math.max(...data.map(item => item.value));

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Insights</h1>
          <p className="text-gray-600">Visual insights into platform growth, booking trends, partner performance, and user behavior</p>
        </div>
        
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 flex items-center">
            <FaCalendarAlt className="mr-2" />
            Last 30 days
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center">
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">$24,568</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-lg">
              <FaChartBar className="text-blue-600 text-xl" />
            </div>
          </div>
          <div className="flex items-center mt-3">
            <FaArrowUp className="text-green-500 mr-1" />
            <span className="text-green-500 text-sm font-medium">12.5%</span>
            <span className="text-gray-500 text-sm ml-2">vs last month</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Total Bookings</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">1,856</p>
            </div>
            <div className="bg-green-100 p-2 rounded-lg">
              <FaCalendarAlt className="text-green-600 text-xl" />
            </div>
          </div>
          <div className="flex items-center mt-3">
            <FaArrowUp className="text-green-500 mr-1" />
            <span className="text-green-500 text-sm font-medium">8.2%</span>
            <span className="text-gray-500 text-sm ml-2">vs last month</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">New Users</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">452</p>
            </div>
            <div className="bg-yellow-100 p-2 rounded-lg">
              <FaUsers className="text-yellow-600 text-xl" />
            </div>
          </div>
          <div className="flex items-center mt-3">
            <FaArrowDown className="text-red-500 mr-1" />
            <span className="text-red-500 text-sm font-medium">3.1%</span>
            <span className="text-gray-500 text-sm ml-2">vs last month</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Avg. Rating</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">4.7</p>
            </div>
            <div className="bg-purple-100 p-2 rounded-lg">
              <FaStar className="text-purple-600 text-xl" />
            </div>
          </div>
          <div className="flex items-center mt-3">
            <FaArrowUp className="text-green-500 mr-1" />
            <span className="text-green-500 text-sm font-medium">0.3%</span>
            <span className="text-gray-500 text-sm ml-2">vs last month</span>
          </div>
        </div>
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Growth */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">Platform Growth</h2>
            <div className="flex space-x-2">
              <button className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">Users</button>
              <button className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">Revenue</button>
            </div>
          </div>
          
          <div className="flex items-end justify-between h-48 mt-6 border-b border-l border-gray-200 px-2">
            {platformGrowthData.map((item, index) => (
              <div key={index} className="flex flex-col items-center w-1/6">
                <div 
                  className="w-4 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-md"
                  style={{ height: `${(item.value / maxValue(platformGrowthData)) * 100}%` }}
                ></div>
                <span className="text-xs text-gray-500 mt-1">{item.month}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex items-center">
            <div className="flex items-center mr-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Total Users</span>
            </div>
            <div className="flex items-center">
              <FaArrowUp className="text-green-500 mr-1" />
              <span className="text-green-500 text-sm font-medium">24% growth this quarter</span>
            </div>
          </div>
        </div>

        {/* Booking Trends */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">Booking Trends</h2>
            <div className="text-sm text-gray-500">By Category</div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 h-48 items-end">
            {bookingTrendsData.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-center mb-2">
                  <span className="text-lg font-bold">{item.value}%</span>
                  <p className="text-xs text-gray-500">{item.category}</p>
                </div>
                <div 
                  className={`w-full rounded-t-lg ${
                    item.category === 'Air' ? 'bg-blue-500' : 
                    item.category === 'Water' ? 'bg-cyan-500' : 'bg-green-500'
                  }`}
                  style={{ height: `${(item.value / maxValue(bookingTrendsData)) * 100}%` }}
                ></div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Air Adventures</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-cyan-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Water Sports</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Land Adventures</span>
            </div>
          </div>
        </div>

        {/* Partner Performance */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">Partner Performance</h2>
            <div className="text-sm text-blue-600 font-medium">View all</div>
          </div>
          
          <div className="space-y-4 mt-6">
            {partnerPerformance.map((partner, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{partner.name}</span>
                  <span className="text-sm font-medium text-gray-900">{partner.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      partner.value > 80 ? 'bg-green-500' : 
                      partner.value > 65 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${partner.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex items-center justify-center">
            <div className="flex items-center mr-4">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Excellent</span>
            </div>
            <div className="flex items-center mr-4">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Good</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Needs Improvement</span>
            </div>
          </div>
        </div>

        {/* User Behavior */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">User Behavior</h2>
            <div className="text-sm text-gray-500">User Types</div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center">
            <div className="relative w-48 h-48 flex items-center justify-center">
              {/* Pie chart using conic gradient */}
              <div className="absolute w-40 h-40 rounded-full" 
                style={{
                  background: `conic-gradient(
                    ${userBehavior[0].color} 0% ${userBehavior[0].value}%, 
                    ${userBehavior[1].color} ${userBehavior[0].value}% 100%
                  )`
                }}>
              </div>
              <div className="absolute w-32 h-32 bg-white rounded-full"></div>
              <div className="absolute text-center">
                <p className="text-2xl font-bold">{userBehavior[0].value}%</p>
                <p className="text-sm text-gray-500">New Users</p>
              </div>
            </div>
            
            <div className="md:ml-8 mt-6 md:mt-0">
              {userBehavior.map((item, index) => (
                <div key={index} className="flex items-center mb-4">
                  <div className={`w-5 h-5 ${item.color} rounded mr-3`}></div>
                  <div>
                    <p className="font-medium text-gray-900">{item.label}</p>
                    <p className="text-2xl font-bold">{item.value}%</p>
                  </div>
                </div>
              ))}
              
              <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <FaChartLine className="text-blue-500 mr-2" />
                  <span className="text-sm font-medium">Conversion Rate</span>
                </div>
                <p className="text-2xl font-bold mt-1">5.8%</p>
                <p className="text-xs text-gray-500 mt-1">+2.4% from last month</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Key Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <FaArrowUp className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Air Adventures Surge</h3>
                <p className="text-sm text-gray-600 mt-1">Bookings increased by 32% compared to last month</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <FaStar className="text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">High Satisfaction</h3>
                <p className="text-sm text-gray-600 mt-1">94% of users rated their experience 4 stars or higher</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-start">
              <div className="bg-yellow-100 p-2 rounded-lg mr-3">
                <FaUsers className="text-yellow-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">New User Acquisition</h3>
                <p className="text-sm text-gray-600 mt-1">Referral program brought in 28% of new users this month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}