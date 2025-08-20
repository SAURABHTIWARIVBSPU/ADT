import React, { useEffect, useState } from 'react';
import { getAllPartners } from '../../Data/admin-data';
import PartnerCard from '../Partner/PartnerCard';
import { FaCheck, FaTimes, FaEye } from 'react-icons/fa';

export default function PartnersSection() {
  const [pendingAdventures, setPendingAdventures] = useState([]);
  const [approvedAdventures, setApprovedAdventures] = useState([]);
  const [selectedTab, setSelectedTab] = useState('pending');
  
  useEffect(() => {
    loadAdventures();
  }, []);

  const loadAdventures = () => {
    const pending = JSON.parse(localStorage.getItem('pendingAdventures') || '[]');
    const approved = JSON.parse(localStorage.getItem('approvedAdventures') || '[]');
    setPendingAdventures(pending);
    setApprovedAdventures(approved);
  };

  const handleApprove = (adventure) => {
    // Move from pending to approved
    const pending = JSON.parse(localStorage.getItem('pendingAdventures') || '[]');
    const approved = JSON.parse(localStorage.getItem('approvedAdventures') || '[]');
    
    const updatedPending = pending.filter(adv => adv.id !== adventure.id);
    const approvedAdventure = { ...adventure, status: 'approved', approvedAt: new Date().toISOString() };
    approved.push(approvedAdventure);
    
    localStorage.setItem('pendingAdventures', JSON.stringify(updatedPending));
    localStorage.setItem('approvedAdventures', JSON.stringify(approved));
    
    // Also add to globalAdventureData for booking page
    const bookingAdventures = JSON.parse(localStorage.getItem('globalAdventureData') || '[]');
    const bookingAdventure = {
      id: adventure.id,
      title: adventure.step2?.title || 'Adventure',
      description: adventure.step2?.description || '',
      location: adventure.step1?.location || 'Unknown',
      category: adventure.step3?.category || 'Adventure',
      price: adventure.step8?.price || adventure.step4?.pricing || '0',
      duration: adventure.step4?.duration || 'N/A',
      groupSize: adventure.step4?.groupSize || 'N/A',
      image: adventure.step5?.mainImage || '',
      images: adventure.step5?.supportingImages || [],
      tags: adventure.step6?.tags || '',
      partnerName: adventure.partnerName,
      partnerEmail: adventure.partnerEmail
    };
    bookingAdventures.push(bookingAdventure);
    localStorage.setItem('globalAdventureData', JSON.stringify(bookingAdventures));
    
    loadAdventures();
    alert(`Adventure "${adventure.step2?.title || 'Unknown'}" approved and published to booking page!`);
  };

  const handleReject = (adventure) => {
    const pending = JSON.parse(localStorage.getItem('pendingAdventures') || '[]');
    const updatedPending = pending.filter(adv => adv.id !== adventure.id);
    localStorage.setItem('pendingAdventures', JSON.stringify(updatedPending));
    
    loadAdventures();
    alert(`Adventure "${adventure.step2?.title || 'Unknown'}" rejected.`);
  };

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Partner Management</h1>
          <p className="text-gray-600 text-lg">Review and approve partner adventure submissions with ease</p>
        </div>
        <div className="text-6xl opacity-20">
          👥
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200/50">
          <nav className="flex space-x-2 px-8 py-2">
            {[
              { key: 'pending', label: `Pending Approval (${pendingAdventures.length})`, icon: '⏳', color: 'from-yellow-500 to-orange-500' },
              { key: 'approved', label: `Approved Partners (${approvedAdventures.length})`, icon: '✅', color: 'from-green-500 to-emerald-500' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key)}
                className={`py-4 px-6 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 flex items-center gap-3 ${
                  selectedTab === tab.key
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-8">
          {selectedTab === 'pending' && (
            <div>
              {pendingAdventures.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-8xl mb-6 opacity-30">📋</div>
                  <div className="text-gray-400 text-2xl mb-4 font-semibold">No pending approvals</div>
                  <div className="text-gray-500 text-lg">New partner submissions will appear here for review</div>
                </div>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {pendingAdventures.map((adventure) => (
                    <div key={adventure.id} className="relative group">
                      <div className="transform transition-all duration-300 group-hover:scale-[1.02]">
                        <PartnerCard 
                          partnerData={adventure}
                          status="pending"
                        />
                      </div>
                      <div className="mt-6 flex gap-4">
                        <button
                          onClick={() => handleApprove(adventure)}
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
                        >
                          <FaCheck className="text-lg" />
                          Approve & Publish
                        </button>
                        <button
                          onClick={() => handleReject(adventure)}
                          className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 text-white py-3 px-6 rounded-xl font-bold hover:from-red-600 hover:to-rose-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
                        >
                          <FaTimes className="text-lg" />
                          Reject
                        </button>
                      </div>
                      <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                        <div className="text-sm text-gray-700 text-center">
                          <span className="font-semibold">Submitted by:</span> {adventure.partnerName} ({adventure.partnerEmail})
                        </div>
                        <div className="text-xs text-gray-500 text-center mt-1">
                          {new Date(adventure.submittedAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {selectedTab === 'approved' && (
            <div>
              {approvedAdventures.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-8xl mb-6 opacity-30">🎉</div>
                  <div className="text-gray-400 text-2xl mb-4 font-semibold">No approved adventures yet</div>
                  <div className="text-gray-500 text-lg">Approved adventures will appear here</div>
                </div>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {approvedAdventures.map((adventure) => (
                    <div key={adventure.id} className="group">
                      <div className="transform transition-all duration-300 group-hover:scale-[1.02]">
                        <PartnerCard 
                          partnerData={adventure}
                          status="approved"
                        />
                      </div>
                      <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                        <div className="text-sm text-gray-700 text-center">
                          <span className="font-semibold">Partner:</span> {adventure.partnerName}
                        </div>
                        <div className="text-xs text-gray-500 text-center mt-1">
                          <span className="font-semibold">Approved:</span> {new Date(adventure.approvedAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
