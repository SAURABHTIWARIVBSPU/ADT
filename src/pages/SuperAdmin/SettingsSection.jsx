import React from 'react';
import { FaCloud, FaHammer, FaUserShield } from 'react-icons/fa';

export default function SettingsSection() {
  const logs = [
    "8/1/2023 - Admin enabled 'Auto-approval for bookings'",
    "7/31/2023 - New partner riding activity added",
    "7/30/2023 - Updated privacy policy document",
    "7/28/2023 - System maintenance completed",
    "7/25/2023 - Added new user role 'Moderator'"
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings and Logs</h1>
          <p className="text-gray-600">Manage platform configurations and keep track of changes</p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium flex items-center space-x-2">
          <FaHammer />
          <span>Add Feature</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <FaCloud className="text-blue-600" />
          <span>Cloud Configuration: Active</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaUserShield className="text-purple-600" />
          <span>Security Settings: Moderate Protection</span>
        </div>
      </div>
    
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-bold mb-3">Admin Activity Logs</h2>
        <ul className="list-disc pl-6">
          {logs.map((log, index) => (
            <li key={index} className="text-sm text-gray-600 mb-1">{log}</li>
          ))}
        </ul>
      </div>

      <div className="flex items-center mt-6">
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter new feature settings..."
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 ml-2 rounded-lg">
          Apply Changes
        </button>
      </div>
    </div>
  );
}