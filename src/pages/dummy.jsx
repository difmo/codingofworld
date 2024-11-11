import React from 'react';

const PricingPlans = () => {
  return (
    <div className="flex flex-col items-center p-10 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
      <h2 className="mb-6 text-3xl font-semibold">Choose the right plan for you</h2>
      <p className="max-w-md mb-10 text-center text-gray-700">
        Choose an affordable plan that’s packed with the best features for engaging your audience, creating customer loyalty, and driving sales.
      </p>

      <div className="grid max-w-4xl grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Personal Plan */}
        <div className="flex flex-col p-8 shadow-md bg-white/60 backdrop-blur-lg rounded-3xl ring-1 ring-gray-900/10">
          <h3 className="mb-4 text-lg font-semibold text-indigo-600">Personal</h3>
          <p className="text-5xl font-semibold text-gray-900">$29 <span className="text-base font-normal">/month</span></p>
          <p className="mt-2 mb-6 text-gray-600">The perfect plan if you’re just getting started with our product.</p>
          <ul className="mb-8 space-y-4">
            <li className="flex items-center text-gray-600">
              <svg className="w-6 h-6 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" /></svg>
              25 products
            </li>
            <li className="flex items-center text-gray-600">
              <svg className="w-6 h-6 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" /></svg>
              Up to 10,000 subscribers
            </li>
            <li className="flex items-center text-gray-600">
              <svg className="w-6 h-6 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" /></svg>
              Audience segmentation
            </li>
            <li className="flex items-center text-gray-600">
              <svg className="w-6 h-6 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" /></svg>
              Advanced analytics
            </li>
          </ul>
          <button className="py-2 font-semibold text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50">
            Get started today
          </button>
        </div>

        {/* Team Plan */}
        <div className="flex flex-col p-8 text-white bg-gray-900 shadow-2xl rounded-3xl">
          <h3 className="mb-4 text-lg font-semibold text-indigo-400">Team</h3>
          <p className="text-5xl font-semibold text-white">$99 <span className="text-base font-normal">/month</span></p>
          <p className="mt-2 mb-6 text-gray-300">A plan that scales with your rapidly growing business.</p>
          <ul className="mb-8 space-y-4">
            <li className="flex items-center text-gray-300">
              <svg className="w-6 h-6 mr-2 text-indigo-400" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" /></svg>
              Priority support
            </li>
            <li className="flex items-center text-gray-300">
              <svg className="w-6 h-6 mr-2 text-indigo-400" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" /></svg>
              Single sign-on
            </li>
            <li className="flex items-center text-gray-300">
              <svg className="w-6 h-6 mr-2 text-indigo-400" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" /></svg>
              Enterprise integrations
            </li>
            <li className="flex items-center text-gray-300">
              <svg className="w-6 h-6 mr-2 text-indigo-400" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" /></svg>
              Custom reporting tools
            </li>
          </ul>
          <button className="py-2 font-semibold text-white bg-indigo-500 rounded-lg hover:bg-indigo-400">
            Get started today
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
