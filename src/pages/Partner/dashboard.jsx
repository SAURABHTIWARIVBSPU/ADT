import { UserButton } from '@clerk/clerk-react';
import {
  FaHome, FaTasks, FaCalendarAlt, FaUsers, FaMoneyCheckAlt, FaStar, FaShieldAlt, FaChartBar, FaBullhorn, FaCog, FaLifeRing, FaRocket, FaChevronLeft, FaChevronRight, FaPlus, FaChevronDown, FaChevronUp, FaEnvelope, FaEdit, FaImage, FaTag, FaSync, FaUserCheck, FaFilePdf, FaFileCsv, FaComment, FaReply, FaAward, FaBell, FaWallet, FaHistory, FaCreditCard, FaCheckCircle, FaExclamationTriangle, FaUserFriends, FaGlobe, FaChartLine, FaGift, FaPercent, FaUserCog, FaUniversity, FaBellSlash, FaUsersCog, FaQuestionCircle, FaHeadset, FaDownload, FaWhatsapp, FaSlack, FaRobot, FaSmile, FaLeaf, FaTrophy, FaUpload, FaTimes, FaBars
} from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from "../../context/OnboardingContext";
import PayoutSetup from './PayoutSetup';
import EarningsDashboard from './EarningsDashboard';
import { useUser } from '@clerk/clerk-react';
import AdminDashboard from './AdminDashboard';
import PartnerCard from './PartnerCard';

const sidebarItems = [
  {
    label: 'Overview',
    icon: <FaHome />,
    subMenu: [
      { label: 'Quick Stats', icon: <FaChartLine /> },
      { label: 'Notifications', icon: <FaBell /> },
      { label: 'Ratings/Reviews Summary', icon: <FaStar /> },
    ],
  },
  {
    label: 'Activity Management',
    icon: <FaTasks />,
    subMenu: [
      { label: 'Add/Edit/Delete Activities', icon: <FaEdit /> },
      { label: 'Upload Media', icon: <FaImage /> },
      { label: 'Set Pricing', icon: <FaTag /> },
      { label: 'Availability Calendar', icon: <FaCalendarAlt /> },
      { label: 'Tags & Types', icon: <FaTag /> },
    ],
  },
  {
    label: 'Bookings & Schedule',
    icon: <FaCalendarAlt />,
    subMenu: [
      { label: 'Upcoming Bookings', icon: <FaCalendarAlt /> },
      { label: 'Booking Details', icon: <FaUserCheck /> },
      { label: 'Status', icon: <FaSync /> },
      { label: 'Rebooking/Rescheduling', icon: <FaEdit /> },
      { label: 'Export PDF/CSV', icon: <FaFilePdf /> },
    ],
  },
  {
    label: 'Customer Interaction',
    icon: <FaUsers />,
    subMenu: [
      { label: 'Messaging Inbox', icon: <FaEnvelope /> },
      { label: 'Pre/Post Booking Questions', icon: <FaQuestionCircle /> },
      { label: 'Auto-response Templates', icon: <FaReply /> },
    ],
  },
  {
    label: 'Payouts & Earnings',
    icon: <FaMoneyCheckAlt />,
    subMenu: [
      { label: 'Total Earnings', icon: <FaWallet /> },
      { label: 'Transaction History', icon: <FaHistory /> },
      { label: 'Payout Schedule', icon: <FaCreditCard /> },
      { label: 'Payment Gateway', icon: <FaCreditCard /> },
    ],
  },
  {
    label: 'Reviews & Feedback',
    icon: <FaStar />,
    subMenu: [
      { label: 'View Reviews', icon: <FaComment /> },
      { label: 'Respond to Feedback', icon: <FaReply /> },
      { label: 'Request a Review', icon: <FaEnvelope /> },
      { label: 'Analytics', icon: <FaChartBar /> },
    ],
  },
  {
    label: 'Safety & Certification Uploads',
    icon: <FaShieldAlt />,
    subMenu: [
      { label: 'Upload Licenses', icon: <FaUpload /> },
      { label: 'Set Expiry Dates', icon: <FaCalendarAlt /> },
      { label: 'Badge System', icon: <FaAward /> },
    ],
  },
  {
    label: 'Analytics & Insights',
    icon: <FaChartBar />,
    subMenu: [
      { label: 'Most Booked Activities', icon: <FaChartLine /> },
      { label: 'User Demographics', icon: <FaUserFriends /> },
      { label: 'Performance Over Time', icon: <FaChartLine /> },
      { label: 'Competitor Benchmarks', icon: <FaTrophy /> },
    ],
  },
  {
    label: 'Promotions & Featured Listings',
    icon: <FaBullhorn />,
    subMenu: [
      { label: 'Apply for Feature', icon: <FaGift /> },
      { label: 'Create Discount Codes', icon: <FaPercent /> },
      { label: 'Join Campaigns', icon: <FaBullhorn /> },
    ],
  },
  {
    label: 'Account Settings',
    icon: <FaCog />,
    subMenu: [
      { label: 'Business Profile', icon: <FaUserCog /> },
      { label: 'Banking Info', icon: <FaUniversity /> },
      { label: 'Notification Preferences', icon: <FaBellSlash /> },
      { label: 'Add Team Members', icon: <FaUsersCog /> },
    ],
  },
  {
    label: 'Support & Help Center',
    icon: <FaLifeRing />,
    subMenu: [
      { label: 'FAQ', icon: <FaQuestionCircle /> },
      { label: 'Contact Support', icon: <FaHeadset /> },
      { label: 'Download Docs', icon: <FaDownload /> },
      { label: 'VIP WhatsApp/Slack', icon: <FaWhatsapp /> },
    ],
  },
  {
    label: 'Advanced Features',
    icon: <FaRocket />,
    subMenu: [
      { label: 'AI Activity Optimizer', icon: <FaRobot /> },
      { label: 'Emotion Tracking Tags', icon: <FaSmile /> },
      { label: 'Environmental Impact Tracker', icon: <FaLeaf /> },
      { label: 'Partner Leaderboard', icon: <FaTrophy /> },
    ],
  },
];

// Reusable Card component
const Card = ({ children, className = "", gradient = false, hover = true }) => (
  <div className={`
    ${gradient 
      ? 'bg-gradient-to-br from-white/80 via-white/70 to-white/60' 
      : 'bg-white/90'
    } 
    backdrop-blur-sm rounded-2xl shadow-xl border border-white/50
    ${hover ? 'hover:shadow-2xl hover:scale-[1.02] hover:border-rose-200/80 transition-all duration-300' : ''}
    ${className}
  `}>
    {children}
  </div>
);

// Sidebar component
const Sidebar = ({ collapsed, setCollapsed, selected, setSelected, isMobile, isOpen, setIsOpen }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        ${isMobile 
          ? `fixed left-0 top-0 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`
          : 'relative'
        }
        ${collapsed && !isMobile ? 'w-20' : 'w-80'} 
        min-h-screen bg-gradient-to-b from-white/95 via-white/90 to-white/95
        backdrop-blur-xl shadow-2xl border-r border-rose-100/50
        flex flex-col transition-all duration-500
      `}>
        {/* Header */}
        <div className="p-6 border-b border-rose-100/50">
          <div className="flex items-center justify-between">
            {!collapsed || isMobile ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                  AT
                </div>
                <div>
                  <h2 className="font-bold text-gray-800">Adventure Triangle</h2>
                  <p className="text-xs text-gray-500">Partner Dashboard</p>
                </div>
              </div>
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold mx-auto">
                AT
              </div>
            )}
            
            {isMobile ? (
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-rose-100 text-gray-600"
                aria-label="Close sidebar"
              >
                <FaTimes />
              </button>
            ) : (
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="p-2 rounded-lg hover:bg-rose-100 text-rose-500 transition-colors"
                aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelected(idx);
                if (isMobile) setIsOpen(false);
              }}
              className={`
                w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left
                transition-all duration-300 font-medium group relative
                ${selected === idx 
                  ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg shadow-rose-500/30' 
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-rose-50 hover:to-purple-50 hover:text-rose-600'
                }
                ${collapsed && !isMobile ? 'justify-center px-2' : ''}
              `}
              title={collapsed && !isMobile ? item.label : ''}
              aria-label={item.label}
            >
              <span className={`
                text-xl transition-transform group-hover:scale-110
                ${selected === idx ? 'drop-shadow-sm' : ''}
              `}>
                {item.icon}
              </span>
              {(!collapsed || isMobile) && (
                <span className="font-semibold">{item.label}</span>
              )}
              
              {/* Active indicator */}
              {selected === idx && (
                <div className="absolute right-2 w-2 h-2 bg-white rounded-full opacity-80" />
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-rose-100/50">
          <div className={`text-xs text-gray-500 ${collapsed && !isMobile ? 'text-center' : ''}`}>
            {!collapsed || isMobile ? 'Adventure Triangle v2.0' : 'AT'}
          </div>
        </div>
      </aside>
    </>
  );
};

// Page Header component  
const PageHeader = ({ title, icon, children }) => (
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
    <div>
      <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-rose-600 via-purple-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-4">
        <span className="text-rose-500 drop-shadow-lg">{icon}</span>
        <span className="drop-shadow-sm">{title}</span>
      </h1>
      <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full mt-2"></div>
    </div>
    {children && (
      <div className="flex items-center gap-4">
        {children}
      </div>
    )}
  </div>
);

// Toast utility component
const Toast = ({ message, type = 'success', show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className={`
      fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg backdrop-blur-sm
      transform transition-all duration-300
      ${type === 'success' 
        ? 'bg-green-100/90 text-green-800 border border-green-200' 
        : 'bg-red-100/90 text-red-800 border border-red-200'
      }
    `} role="alert" aria-live="polite">
      <div className="flex items-center gap-2">
        {type === 'success' ? <FaCheckCircle /> : <FaExclamationTriangle />}
        <span className="font-medium">{message}</span>
        <button onClick={onClose} className="ml-2 hover:opacity-70">
          <FaTimes size={14} />
        </button>
      </div>
    </div>
  );
};

function AdventurePublishingSection() {
  const [form, setForm] = useState({ title: '', description: '', location: '', type: '', price: '' });
  const [published, setPublished] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePublish = (e) => {
    e.preventDefault();
    // Save to localStorage (simulate backend)
    const adventures = JSON.parse(localStorage.getItem('publishedAdventures') || '[]');
    adventures.push({ ...form, id: Date.now() });
    localStorage.setItem('publishedAdventures', JSON.stringify(adventures));
    setPublished(true);
    setForm({ title: '', description: '', location: '', type: '', price: '' });
  };

  return (
    <Card className="max-w-2xl mx-auto p-8" gradient>
      <h2 className="text-3xl font-bold mb-6 text-rose-600 flex items-center gap-3">
        <div className="p-2 bg-rose-100 rounded-xl">
          <FaPlus className="text-rose-500" />
        </div>
        Publish New Adventure
      </h2>
      {published && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-medium">
          Adventure published! It will appear on the Booking page.
        </div>
      )}
      <form onSubmit={handlePublish} className="space-y-6">
        {[
          { name: 'title', label: 'Title', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'location', label: 'Location', type: 'text' },
          { name: 'type', label: 'Type', type: 'text' },
          { name: 'price', label: 'Price', type: 'text' }
        ].map(({ name, label, type }) => (
          <div key={name}>
            <label className="block font-semibold mb-2 text-gray-700">{label}</label>
            {type === 'textarea' ? (
              <textarea
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="w-full border-2 border-rose-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition duration-200 resize-none"
                rows="4"
                required
              />
            ) : (
              <input
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="w-full border-2 border-rose-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition duration-200"
                required
              />
            )}
          </div>
        ))}
        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-rose-500 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-rose-600 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Publish Adventure
        </button>
      </form>
    </Card>
  );
}

// Helper to check if value is a File or Blob
function isFileOrBlob(obj) {
  return obj && (obj instanceof File || obj instanceof Blob);
}

export default function PartnerDashboard() {
  const { user } = useUser();
  const [selected, setSelected] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const { onboardingData } = useOnboarding();
  const navigate = useNavigate();
  const [partnerStatus, setPartnerStatus] = useState('draft');

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(false);
        setSidebarOpen(false);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get partner status from localStorage
  useEffect(() => {
    const pending = JSON.parse(localStorage.getItem('pendingAdventures') || '[]');
    const approved = JSON.parse(localStorage.getItem('approvedAdventures') || '[]');
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    
    if (approved.some(adv => adv.partnerEmail === userEmail)) {
      setPartnerStatus('approved');
    } else if (pending.some(adv => adv.partnerEmail === userEmail)) {
      setPartnerStatus('pending');
    } else {
      setPartnerStatus('draft');
    }
  }, [user]);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  // Handle publish to SuperAdmin
  const handlePublishToSuperAdmin = async (partnerData) => {
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    const userName = user?.fullName || 'Partner';
    
    const publishData = {
      ...partnerData,
      id: Date.now(),
      partnerEmail: userEmail,
      partnerName: userName,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      // Convert File objects to base64 for storage
      step5: partnerData.step5 ? {
        ...partnerData.step5,
        mainImage: partnerData.step5.mainImage && isFileOrBlob(partnerData.step5.mainImage) 
          ? await fileToBase64(partnerData.step5.mainImage)
          : partnerData.step5.mainImage,
        supportingImages: partnerData.step5.supportingImages 
          ? await Promise.all(partnerData.step5.supportingImages.map(async (img) => 
              isFileOrBlob(img) ? await fileToBase64(img) : img
            ))
          : []
      } : partnerData.step5
    };

    // Add to pending adventures for SuperAdmin review
    const pending = JSON.parse(localStorage.getItem('pendingAdventures') || '[]');
    pending.push(publishData);
    localStorage.setItem('pendingAdventures', JSON.stringify(pending));
    
    setPartnerStatus('pending');
    showToast('Adventure submitted for SuperAdmin review! You will be notified once approved.');
  };

  // Helper function to convert File to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  };

  const stepNames = [
    'Step 1: Basic Info',
    'Step 2: Details',
    'Step 3: Experience',
    'Step 4: Gallery', 
    'Step 5: Pricing',
    'Step 6: Schedule',
    'Step 7: Safety',
    'Step 8: Policies',
    'Step 9: Requirements',
    'Step 10: Preview',
    'Step 11: Review',
    'Step 12: Final Horizon',
  ];

  // Helper: Get published adventures from localStorage
  let publishedAdventures = [];
  if (typeof window !== 'undefined') {
    try {
      publishedAdventures = JSON.parse(localStorage.getItem('publishedAdventures')) || [];
    } catch (e) {
      publishedAdventures = [];
    }
  }

  // Status badge component
  const StatusBadge = ({ status }) => {
    const styles = {
      draft: 'bg-gray-100 text-gray-700 border-gray-200',
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      approved: 'bg-green-100 text-green-700 border-green-200'
    };

    return (
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${styles[status]}`}>
        {status === 'draft' && <FaEdit />}
        {status === 'pending' && <FaSync className="animate-spin" />}
        {status === 'approved' && <FaCheckCircle />}
        {status === 'draft' && 'Draft'}
        {status === 'pending' && 'Pending Review'}
        {status === 'approved' && 'Approved'}
      </div>
    );
  };

  if (user?.primaryEmailAddress?.emailAddress === 'Adarshbalmukundshukla@gmail.co') {
    return <AdminDashboard />;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-rose-50 via-blue-50 to-purple-50">
      {/* Toast */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />

      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        selected={selected}
        setSelected={setSelected}
        isMobile={isMobile}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-purple-100/20 to-pink-100/20 animate-pulse"></div>
        
        {/* Background Watermark */}
        <div className="pointer-events-none select-none absolute inset-0 flex items-center justify-center z-0">
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-gray-200/30 tracking-widest transform rotate-12">
            Adventure Triangle
          </span>
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 p-4 sm:p-6 lg:p-10">
          {/* Mobile Header */}
          {isMobile && (
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-colors"
                aria-label="Open sidebar"
              >
                <FaBars className="text-rose-500" />
              </button>
              <UserButton afterSignOutUrl="/onboarding2" />
            </div>
          )}

          {/* Desktop Header */}
          {!isMobile && (
            <div className="absolute top-6 right-10 z-10">
              <UserButton afterSignOutUrl="/onboarding2" />
            </div>
          )}

          {/* Page Header */}
          <PageHeader
            title={sidebarItems[selected].label}
            icon={sidebarItems[selected].icon}
          >
            {selected === 0 && (
              <StatusBadge status={partnerStatus} />
            )}
          </PageHeader>

          {/* Section Content */}
          {selected === 0 && (
            <div className="space-y-8">
              <p className="text-gray-600 text-lg mb-6">
                Finish your details and submit for Super Admin review.
              </p>

              {/* Partner Card */}
              <div className="max-w-4xl mx-auto">
                <PartnerCard 
                  partnerData={onboardingData}
                  onPublish={handlePublishToSuperAdmin}
                  status={partnerStatus}
                />
              </div>

              {/* Steps Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stepNames.map((step, idx) => {
                  const stepData = onboardingData[`step${idx + 1}`] || {};
                  const hasDetails = stepData.title || stepData.description || stepData.location || stepData.type || stepData.price;
                  
                  return (
                    <Card key={idx} className="p-6 relative group min-h-[200px] flex flex-col">
                      {/* Step Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-rose-100 rounded-lg group-hover:bg-rose-200 transition-colors">
                            <FaHome className="text-rose-500" />
                          </div>
                          <span className="font-bold text-gray-800">{step}</span>
                        </div>
                        <button
                          className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                          onClick={() => navigate(`/step-${idx + 1}`)}
                          aria-label={`Edit ${step}`}
                        >
                          Edit
                        </button>
                      </div>

                      {/* Step Content */}
                      <div className="flex-1 flex flex-col justify-center">
                        {hasDetails ? (
                          <div className="space-y-3">
                            {stepData.title && (
                              <h3 className="font-bold text-lg text-rose-600">{stepData.title}</h3>
                            )}
                            
                            <div className="flex flex-wrap gap-2">
                              {stepData.location && (
                                <span className="px-2 py-1 bg-rose-50 text-rose-600 rounded-md text-xs font-medium">
                                  {stepData.location}
                                </span>
                              )}
                              {stepData.type && (
                                <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-medium">
                                  {stepData.type}
                                </span>
                              )}
                              {stepData.price && (
                                <span className="px-2 py-1 bg-green-50 text-green-600 rounded-md text-xs font-medium">
                                  {stepData.price}
                                </span>
                              )}
                            </div>
                            
                            {stepData.description && (
                              <p className="text-gray-600 text-sm line-clamp-3">{stepData.description}</p>
                            )}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <FaQuestionCircle className="mx-auto text-3xl text-gray-300 mb-3" />
                            <p className="text-gray-400 italic">No data yet</p>
                          </div>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* Published Adventures */}
              <Card className="p-6">
                <h3 className="text-2xl font-bold text-rose-600 mb-6 flex items-center gap-3">
                  <div className="p-2 bg-rose-100 rounded-xl">
                    <FaRocket className="text-rose-500" />
                  </div>
                  Your Published Adventures
                </h3>
                
                {publishedAdventures.length === 0 ? (
                  <div className="text-center py-12">
                    <FaGlobe className="mx-auto text-6xl text-gray-300 mb-4" />
                    <h4 className="text-xl font-semibold text-gray-600 mb-2">No adventures yet</h4>
                    <p className="text-gray-500 mb-6">Add your first adventure to get started!</p>
                    <button
                      onClick={() => navigate('/step-1')}
                      className="px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-xl font-semibold hover:from-rose-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                      <FaPlus className="inline mr-2" />
                      Create Adventure
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {publishedAdventures.map((adv) => (
                      <div key={adv.id} className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-200 hover:border-rose-200 hover:shadow-md transition-all duration-300">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-bold text-xl text-rose-600 mb-2">{adv.title}</h4>
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                              <span className="flex items-center gap-1 text-gray-600">
                                <FaGlobe className="text-blue-500" />
                                {adv.location}
                              </span>
                              <span className="flex items-center gap-1 text-gray-600">
                                <FaTag className="text-green-500" />
                                {adv.type}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm">{adv.description}</p>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-3">
                            <button
                              onClick={() => navigate('/booking')}
                              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                            >
                              <FaGlobe className="inline mr-2" />
                              View Live
                            </button>
                            <button
                              onClick={() => {
                                // Move to pendingAdventures and remove from publishedAdventures
                                let published = JSON.parse(localStorage.getItem('publishedAdventures') || '[]');
                                let pending = JSON.parse(localStorage.getItem('pendingAdventures') || '[]');
                                const advIdx = published.findIndex(a => a.id === adv.id);
                                if (advIdx !== -1) {
                                  const toPending = { ...published[advIdx], status: 'pending' };
                                  pending.push(toPending);
                                  published.splice(advIdx, 1);
                                  localStorage.setItem('pendingAdventures', JSON.stringify(pending));
                                  localStorage.setItem('publishedAdventures', JSON.stringify(published));
                                  showToast('Adventure submitted for review!');
                                  window.location.reload();
                                }
                              }}
                              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-xl font-semibold hover:from-yellow-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                            >
                              <FaRocket className="inline mr-2" />
                              Publish
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          )}

          {selected === 1 && (
            <Card className="p-8">
              <div className="mb-8">
                <button
                  onClick={() => navigate('/step-1')}
                  className="px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-xl font-bold hover:from-rose-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <FaPlus className="inline mr-2" />
                  Add New Activity
                </button>
              </div>
              
              {publishedAdventures.length === 0 ? (
                <div className="text-center py-16">
                  <FaTasks className="mx-auto text-6xl text-gray-300 mb-6" />
                  <h3 className="text-2xl font-semibold text-gray-600 mb-4">No activities found</h3>
                  <p className="text-gray-500 mb-8 text-lg">Create your first adventure to start managing activities!</p>
                  <button
                    onClick={() => navigate('/step-1')}
                    className="px-8 py-4 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-rose-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    <FaPlus className="inline mr-3" />
                    Create First Adventure
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {publishedAdventures.map((adv) => (
                    <Card key={adv.id} className="p-6 relative" hover={false}>
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this activity? This action cannot be undone.')) {
                            const updated = publishedAdventures.filter(a => a.id !== adv.id);
                            localStorage.setItem('publishedAdventures', JSON.stringify(updated));
                            showToast('Activity deleted successfully', 'success');
                            window.location.reload();
                          }
                        }}
                        className="absolute top-4 right-4 p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors group"
                        aria-label="Delete activity"
                      >
                        <FaTimes className="group-hover:scale-110 transition-transform" />
                      </button>

                      <div className="space-y-6">
                        {/* Basic Info Section */}
                        <div className="border-l-4 border-rose-500 pl-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-lg font-bold text-rose-600 flex items-center gap-2">
                              <FaHome />
                              Basic Information
                            </h4>
                            <button
                              onClick={() => navigate('/step-2')}
                              className="text-blue-600 text-sm font-semibold hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1 transition-colors"
                            >
                              Edit
                            </button>
                          </div>
                          <h5 className="font-bold text-xl text-gray-800 mb-2">{adv.title}</h5>
                          <p className="text-gray-600">{adv.description}</p>
                        </div>

                        {/* Category Section */}
                        <div className="border-l-4 border-blue-500 pl-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-lg font-bold text-blue-600 flex items-center gap-2">
                              <FaTag />
                              Category & Type
                            </h4>
                            <button
                              onClick={() => navigate('/step-3')}
                              className="text-blue-600 text-sm font-semibold hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1 transition-colors"
                            >
                              Edit
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                              {adv.type}
                            </span>
                          </div>
                        </div>

                        {/* Pricing Section */}
                        <div className="border-l-4 border-green-500 pl-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-lg font-bold text-green-600 flex items-center gap-2">
                              <FaMoneyCheckAlt />
                              Pricing Details
                            </h4>
                            <button
                              onClick={() => navigate('/step-4')}
                              className="text-blue-600 text-sm font-semibold hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1 transition-colors"
                            >
                              Edit
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-green-700">{adv.price}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </Card>
          )}

          {selected === 2 && (
            <Card className="p-8 text-center">
              <FaCalendarAlt className="mx-auto text-6xl text-gray-300 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-600 mb-4">Bookings & Schedule</h3>
              <p className="text-gray-500 text-lg">Coming soon - Manage your bookings and schedule</p>
            </Card>
          )}

          {selected === 3 && (
            <Card className="p-8 text-center">
              <FaUsers className="mx-auto text-6xl text-gray-300 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-600 mb-4">Customer Interaction</h3>
              <p className="text-gray-500 text-lg">Coming soon - Interact with your customers</p>
            </Card>
          )}

          {selected === 4 && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6">
                  <PayoutSetup />
                </Card>
                <Card className="p-6">
                  <EarningsDashboard />
                </Card>
              </div>
            </div>
          )}

          {selected === 5 && <AdventurePublishingSection />}

          {[6, 7, 8, 9, 10, 11].includes(selected) && (
            <Card className="p-8 text-center">
              <div className="text-6xl text-gray-300 mb-6">
                {sidebarItems[selected].icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-4">{sidebarItems[selected].label}</h3>
              <p className="text-gray-500 text-lg">Coming soon - Stay tuned for updates!</p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}