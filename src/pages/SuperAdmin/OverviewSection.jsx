import React from 'react';
import { Users, MapPin, DollarSign, Calendar, TrendingUp, Activity, Clock, Shield, Bell } from 'lucide-react';

// Mock data functions (keeping your existing data structure)
const getAllBookings = () => [
  { bookingDate: new Date().toISOString() },
  { bookingDate: new Date(Date.now() - 86400000).toISOString() },
  { bookingDate: new Date(Date.now() - 172800000).toISOString() },
  { bookingDate: new Date(Date.now() - 259200000).toISOString() },
  { bookingDate: new Date(Date.now() - 345600000).toISOString() },
];

const getAllUsers = () => [
  { status: 'active' },
  { status: 'active' },
  { status: 'inactive' },
  { status: 'active' },
  { status: 'active' },
];

const getAllPartners = () => [
  { name: 'Partner 1' },
  { name: 'Partner 2' },
  { name: 'Partner 3' },
];

const getTotalAmount = () => 245800;
const getAllCertifications = () => [];

export default function OverviewSection() {
  const bookings = getAllBookings();
  const users = getAllUsers();
  const partners = getAllPartners();
  const certifications = getAllCertifications();
  const totalRevenue = getTotalAmount();

  const activeUsers = users.filter(user => user.status === 'active').length;
  const todayBookings = bookings.filter(booking => {
    const today = new Date().toDateString();
    return new Date(booking.bookingDate).toDateString() === today;
  }).length;

  const topZones = [
    { name: 'Mountain Adventures', bookings: 156, revenue: 45600 },
    { name: 'Water Sports', bookings: 142, revenue: 38900 },
    { name: 'Sky Adventures', bookings: 98, revenue: 29400 },
  ];

  const stats = [
    {
      title: 'Total Bookings',
      value: bookings.length,
      icon: Calendar,
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'from-emerald-600 to-emerald-700',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      change: '+8.5%',
      changeType: 'increase'
    },
    {
      title: 'Active Users',
      value: activeUsers,
      icon: Users,
      color: 'from-purple-600 to-purple-700',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      change: '+15%',
      changeType: 'increase'
    },
    {
      title: 'Partners',
      value: partners.length,
      icon: MapPin,
      color: 'from-amber-600 to-amber-700',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
      change: '+5%',
      changeType: 'increase'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-700 bg-clip-text text-transparent mb-2">
              Platform Overview
            </h1>
            <p className="text-slate-600 text-lg font-medium">Real-time snapshot of platform health and performance</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-200/60 backdrop-blur-sm">
            <div className="text-sm text-slate-500 mb-1 font-medium">Last updated</div>
            <div className="text-lg font-bold text-slate-900 flex items-center">
              <Clock className="w-4 h-4 mr-2 text-blue-600" />
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="group bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  <div className={`text-sm font-bold px-3 py-1.5 rounded-full ${
                    stat.changeType === 'increase' 
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                      : 'bg-red-100 text-red-700 border border-red-200'
                  }`}>
                    {stat.change}
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2 group-hover:text-blue-900 transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-slate-600 font-semibold">{stat.title}</div>
              </div>
            );
          })}
        </div>

        {/* Activity Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Today's Activity */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl mr-4 border border-blue-200/50">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Today's Activity</h3>
            </div>
            <div className="space-y-5">
              <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-blue-50 to-transparent border border-blue-100/50">
                <span className="text-slate-700 font-semibold">New Bookings</span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{todayBookings}</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-transparent border border-emerald-100/50">
                <span className="text-slate-700 font-semibold">New Users</span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-600">8</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-purple-50 to-transparent border border-purple-100/50">
                <span className="text-slate-700 font-semibold">New Partners</span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">2</div>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Health */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-emerald-100 to-emerald-50 rounded-xl mr-4 border border-emerald-200/50">
                <Shield className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Platform Health</h3>
            </div>
            <div className="space-y-5">
              <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-transparent border border-emerald-100/50">
                <span className="text-slate-700 font-semibold">System Status</span>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="px-4 py-2 bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-800 rounded-full text-sm font-bold border border-emerald-200">
                    Healthy
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-slate-50 to-transparent border border-slate-100/50">
                <span className="text-slate-700 font-semibold">Active Sessions</span>
                <span className="text-xl font-bold text-slate-900">1,234</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-slate-50 to-transparent border border-slate-100/50">
                <span className="text-slate-700 font-semibold">Response Time</span>
                <span className="text-xl font-bold text-slate-900">120ms</span>
              </div>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-amber-100 to-amber-50 rounded-xl mr-4 border border-amber-200/50">
                <Bell className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Recent Alerts</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-3 rounded-xl bg-gradient-to-r from-amber-50 to-transparent border border-amber-100/50 hover:shadow-md transition-shadow duration-200">
                <div className="w-3 h-3 bg-amber-400 rounded-full mt-3 flex-shrink-0 animate-pulse"></div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-slate-900 mb-1">Pending Partner Review</div>
                  <div className="text-xs text-slate-600 font-medium">3 new applications</div>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-transparent border border-blue-100/50 hover:shadow-md transition-shadow duration-200">
                <div className="w-3 h-3 bg-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-slate-900 mb-1">System Update</div>
                  <div className="text-xs text-slate-600 font-medium">Scheduled for tonight</div>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-transparent border border-emerald-100/50 hover:shadow-md transition-shadow duration-200">
                <div className="w-3 h-3 bg-emerald-400 rounded-full mt-3 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-slate-900 mb-1">Backup Complete</div>
                  <div className="text-xs text-slate-600 font-medium">2 hours ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performing Zones Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-8 hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
          <div className="flex items-center mb-8">
            <div className="p-3 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl mr-4 border border-blue-200/50">
              <TrendingUp className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Top Performing Zones</h3>
          </div>
          
          <div className="overflow-hidden rounded-xl border border-slate-200/60 shadow-sm">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-50 to-blue-50/30">
                <tr>
                  <th className="text-left py-5 px-6 font-bold text-slate-900 text-sm uppercase tracking-wider border-b border-slate-200/60">
                    Zone
                  </th>
                  <th className="text-right py-5 px-6 font-bold text-slate-900 text-sm uppercase tracking-wider border-b border-slate-200/60">
                    Bookings
                  </th>
                  <th className="text-right py-5 px-6 font-bold text-slate-900 text-sm uppercase tracking-wider border-b border-slate-200/60">
                    Revenue
                  </th>
                  <th className="text-right py-5 px-6 font-bold text-slate-900 text-sm uppercase tracking-wider border-b border-slate-200/60">
                    Growth
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/60">
                {topZones.map((zone, index) => (
                  <tr key={index} className="hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-transparent transition-all duration-200 group">
                    <td className="py-5 px-6">
                      <div className="flex items-center">
                        <div className={`w-12 h-12 rounded-full mr-4 flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300 ${
                          index === 0 
                            ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 border-2 border-yellow-300' 
                            : index === 1 
                            ? 'bg-gradient-to-r from-slate-400 to-slate-500 border-2 border-slate-300' 
                            : 'bg-gradient-to-r from-amber-400 to-amber-500 border-2 border-amber-300'
                        }`}>
                          {index + 1}
                        </div>
                        <span className="font-bold text-slate-900 text-lg group-hover:text-blue-900 transition-colors duration-200">{zone.name}</span>
                      </div>
                    </td>
                    <td className="text-right py-5 px-6 text-slate-900 font-bold text-lg group-hover:text-blue-900 transition-colors duration-200">
                      {zone.bookings}
                    </td>
                    <td className="text-right py-5 px-6 text-slate-900 font-bold text-lg group-hover:text-blue-900 transition-colors duration-200">
                      ${zone.revenue.toLocaleString()}
                    </td>
                    <td className="text-right py-5 px-6">
                      <span className="bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-800 px-4 py-2 rounded-full text-sm font-bold border border-emerald-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                        +{Math.floor(Math.random() * 20 + 5)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}