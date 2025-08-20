import React, { useState } from 'react';
import { FaMapMarkerAlt, FaUsers, FaClock, FaTag, FaStar, FaCalendarCheck, FaMoneyBillWave, FaCheckCircle, FaHourglass } from 'react-icons/fa';

// Helper to check if value is a File or Blob
function isFileOrBlob(obj) {
  return obj && (obj instanceof File || obj instanceof Blob);
}

export default function PartnerCard({ partnerData, onPublish, isPublished = false, status = 'draft' }) {
  const [isPublishing, setIsPublishing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      await onPublish(partnerData);
    } catch (error) {
      console.error('Error publishing:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 border-green-200 shadow-green-100';
      case 'pending': return 'bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-800 border-yellow-200 shadow-yellow-100';
      case 'rejected': return 'bg-gradient-to-r from-red-50 to-rose-50 text-red-800 border-red-200 shadow-red-100';
      default: return 'bg-gradient-to-r from-gray-50 to-slate-50 text-gray-800 border-gray-200 shadow-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <FaCheckCircle className="text-green-600 drop-shadow-sm" />;
      case 'pending': return <FaHourglass className="text-yellow-600 drop-shadow-sm animate-pulse" />;
      case 'rejected': return <FaCheckCircle className="text-red-600 drop-shadow-sm" />;
      default: return <FaHourglass className="text-gray-600 drop-shadow-sm" />;
    }
  };

  if (!partnerData || Object.keys(partnerData).length === 0) {
    return (
      <div className="group relative bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl shadow-xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-purple-400/5 to-pink-400/5 rounded-2xl"></div>
        <div className="relative text-center text-gray-600">
          <div className="text-6xl mb-6 animate-bounce">📝</div>
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Complete Your Adventure Profile</h3>
          <p className="text-base opacity-80 leading-relaxed">Fill out all onboarding steps to create your stunning adventure card</p>
          <div className="mt-6 flex justify-center">
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Status Badge */}
      <div className="relative px-6 pt-6">
        <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full text-sm font-semibold border-2 backdrop-blur-sm shadow-lg ${getStatusColor(status)}`}>
          {getStatusIcon(status)}
          <span className="capitalize tracking-wide">{status}</span>
        </div>
      </div>

      {/* Main Image */}
      <div className="relative h-56 sm:h-64 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 mt-4 mx-6 rounded-xl overflow-hidden">
        {partnerData.step5?.mainImage ? (
          <>
            <img
              src={
                isFileOrBlob(partnerData.step5.mainImage)
                  ? URL.createObjectURL(partnerData.step5.mainImage)
                  : partnerData.step5.mainImage
              }
              alt={partnerData.step2?.title || "Adventure"}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 via-purple-600/80 to-pink-500/80"></div>
            <div className="relative text-center z-10">
              <div className="text-5xl mb-4 animate-pulse">🏔️</div>
              <div className="font-bold text-lg tracking-wide">Adventure Image</div>
              <div className="text-sm opacity-80 mt-2">Upload your stunning photo</div>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        <div className="absolute bottom-6 left-6 text-white">
          <h2 className="text-3xl font-bold mb-2 drop-shadow-lg">{partnerData.step2?.title || 'Adventure Title'}</h2>
          <div className="flex items-center gap-2 text-base opacity-90 backdrop-blur-sm bg-white/10 px-3 py-1 rounded-full">
            <FaMapMarkerAlt className="text-yellow-300" />
            <span className="font-medium">{partnerData.step1?.location || 'Location'}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {partnerData.step2?.description || 'Adventure description will appear here once completed.'}
        </p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <FaTag className="text-blue-500" />
            <span className="font-medium">Category:</span>
            <span>{partnerData.step3?.category || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <FaClock className="text-green-500" />
            <span className="font-medium">Duration:</span>
            <span>{partnerData.step4?.duration || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <FaUsers className="text-purple-500" />
            <span className="font-medium">Group Size:</span>
            <span>{partnerData.step4?.groupSize || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <FaMoneyBillWave className="text-yellow-500" />
            <span className="font-medium">Price:</span>
            <span>{partnerData.step8?.price || partnerData.step4?.pricing || 'N/A'}</span>
          </div>
        </div>

        {/* Tags */}
        {partnerData.step6?.tags && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {partnerData.step6.tags.split(',').slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Supporting Images */}
        {partnerData.step5?.supportingImages && partnerData.step5.supportingImages.length > 0 && (
          <div className="mb-4">
            <div className="text-sm font-medium text-gray-700 mb-2">Gallery</div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {partnerData.step5.supportingImages.slice(0, 4).map((img, idx) => (
                <img
                  key={idx}
                  src={
                    isFileOrBlob(img)
                      ? URL.createObjectURL(img)
                      : img
                  }
                  alt={`Gallery ${idx + 1}`}
                  className="w-16 h-16 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                />
              ))}
              {partnerData.step5.supportingImages.length > 4 && (
                <div className="w-16 h-16 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-gray-600">+{partnerData.step5.supportingImages.length - 4}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Additional Info */}
        <div className="space-y-2 mb-4">
          {partnerData.step4?.unique && (
            <div className="text-sm">
              <span className="font-medium text-gray-700">What makes it unique:</span>
              <span className="text-gray-600 ml-2">{partnerData.step4.unique}</span>
            </div>
          )}
          {partnerData.step6?.language && (
            <div className="text-sm">
              <span className="font-medium text-gray-700">Language:</span>
              <span className="text-gray-600 ml-2">{partnerData.step6.language}</span>
            </div>
          )}
          {partnerData.step8?.bookingType && (
            <div className="text-sm">
              <span className="font-medium text-gray-700">Booking:</span>
              <span className="text-gray-600 ml-2">{partnerData.step8.bookingType}</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-gray-200">
          {status === 'draft' && (
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPublishing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Publishing...
                </>
              ) : (
                <>
                  <FaCalendarCheck />
                  Publish for Review
                </>
              )}
            </button>
          )}
          
          {status === 'pending' && (
            <div className="w-full bg-yellow-100 text-yellow-800 py-3 px-6 rounded-lg font-semibold text-center border border-yellow-200">
              <FaHourglass className="inline mr-2" />
              Awaiting SuperAdmin Approval
            </div>
          )}
          
          {status === 'approved' && (
            <div className="w-full bg-green-100 text-green-800 py-3 px-6 rounded-lg font-semibold text-center border border-green-200">
              <FaCheckCircle className="inline mr-2" />
              Published on Booking Page
            </div>
          )}
          
          {status === 'rejected' && (
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="w-full bg-red-100 text-red-800 py-3 px-6 rounded-lg font-semibold hover:bg-red-200 transition-colors border border-red-200"
            >
              Resubmit for Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
