import React from 'react'
import { motion } from "framer-motion";

const SubscriptionPopUp = () => {
  return (
    <div><div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <motion.div
            className="max-w-md p-8 mx-auto space-y-6 text-center bg-white rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
              <svg
                className="w-6 h-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <motion.h3
              className="text-2xl font-bold text-green-600"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Subscription Successful!
            </motion.h3>

            <motion.p
              className="text-gray-600"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Thank you for subscribing! You’ll now receive the latest updates
              and exclusive content from us.
            </motion.p>

            <motion.button
              onClick={() => setShowPopup(false)}
              className="px-5 py-2 mt-4 text-white transition bg-red-500 rounded-full shadow-md hover:bg-red-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Close
            </motion.button>
          </motion.div>
        </div></div>
  )
}

export default SubscriptionPopUp