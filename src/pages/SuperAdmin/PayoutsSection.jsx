import React from 'react';
import { FaMoneyCheckAlt, FaFileAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function PayoutsSection() {
  // Mock payout data
  const payouts = [
    {
      id: 1,
      partner: 'Sky Adventures Co.',
      amount: 4560,
      status: 'pending',
      lastPayout: '2023-12-20',
      nextPayout: '2024-01-20',
    },
    {
      id: 2,
      partner: 'Rapids Adventure',
      amount: 3890,
      status: 'approved',
      lastPayout: '2023-12-15',
      nextPayout: '2024-01-15',
    },
    {
      id: 3,
      partner: 'Peak Explorers',
      amount: 2940,
      status: 'rejected',
      lastPayout: '2023-12-10',
      nextPayout: '2024-01-10',
    },
  ];

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="p-6 rounded-xl shadow-2xl border border-gray-100 bg-gradient-to-br from-white to-indigo-50">
      <div className="flex items-center justify-between mb-8">
        <div>
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 mb-2"
          >
            Partner Payouts
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-600"
          >
            Track partner earnings and payout status
          </motion.p>
        </div>
        
        <motion.button 
          whileHover={{ 
            scale: 1.05,
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)'
          }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2.5 rounded-lg font-medium flex items-center space-x-2 transition-all
                    text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-indigo-200"
        >
          <FaFileAlt className="text-white" />
          <span>Generate Report</span>
        </motion.button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100">
            <tr>
              <th className="text-left py-5 px-6 font-semibold text-indigo-900">
                Partner
              </th>
              <th className="text-right py-5 px-6 font-semibold text-indigo-900">
                Amount
              </th>
              <th className="text-left py-5 px-6 font-semibold text-indigo-900">
                Status
              </th>
              <th className="text-right py-5 px-6 font-semibold text-indigo-900">
                Last Payout
              </th>
              <th className="text-right py-5 px-6 font-semibold text-indigo-900">
                Next Payout
              </th>
              <th className="text-center py-5 px-6 font-semibold text-indigo-900">
                Actions
              </th>
            </tr>
          </thead>
          
          <AnimatePresence>
            <motion.tbody
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {payouts.map((payout) => (
                <motion.tr 
                  key={payout.id}
                  variants={rowVariants}
                  className="border-b border-indigo-50 hover:bg-indigo-50/50 transition-colors"
                >
                  <td className="py-5 px-6 font-medium text-gray-900">
                    {payout.partner}
                  </td>
                  <td className="py-5 px-6 text-right font-medium text-gray-900">
                    ${payout.amount.toLocaleString()}
                  </td>
                  <td className="py-5 px-6">
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize ${statusColors[payout.status]}`}
                    >
                      {payout.status}
                    </motion.span>
                  </td>
                  <td className="py-5 px-6 text-right font-medium text-gray-900">
                    {new Date(payout.lastPayout).toLocaleDateString()}
                  </td>
                  <td className="py-5 px-6 text-right font-medium text-gray-900">
                    {new Date(payout.nextPayout).toLocaleDateString()}
                  </td>
                  <td className="py-5 px-6 text-center">
                    <motion.button 
                      whileHover={{ scale: 1.1, color: '#4f46e5' }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 text-gray-600"
                    >
                      View
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </AnimatePresence>
        </table>
      </div>
    </div>
  );
}