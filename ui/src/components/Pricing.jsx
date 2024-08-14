import React from "react";

const Pricing = () => {
  return (
    <div className="bg-pink-100 flex flex-col items-center p-6 h-full">
      <h1 className="text-pink-600 text-4xl font-bold mb-6">Pricing Plans</h1>
      <p className="text-gray-700 text-lg mb-10">
        Choose the plan that suits your needs. Get started with our powerful
        translation tools today!
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full">
          <h2 className="text-xl font-bold text-pink-600 mb-4">Basic Plan</h2>
          <p className="text-gray-700 mb-4">
            Perfect for individuals and small teams who need occasional
            translations.
          </p>
          <div className="text-center text-2xl font-semibold mb-4">
            $19.99 / month
          </div>
          <ul className="list-disc list-inside mb-6 text-gray-600">
            <li>Up to 100 pages per month</li>
            <li>Basic translation features</li>
            <li>Standard support</li>
          </ul>
          <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
            Choose Plan
          </button>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full">
          <h2 className="text-xl font-bold text-pink-600 mb-4">
            Professional Plan
          </h2>
          <p className="text-gray-700 mb-4">
            Ideal for businesses and teams with higher translation needs.
          </p>
          <div className="text-center text-2xl font-semibold mb-4">
            $49.99 / month
          </div>
          <ul className="list-disc list-inside mb-6 text-gray-600">
            <li>Up to 500 pages per month</li>
            <li>Advanced translation features</li>
            <li>Priority support</li>
          </ul>
          <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
            Choose Plan
          </button>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full">
          <h2 className="text-xl font-bold text-pink-600 mb-4">
            Enterprise Plan
          </h2>
          <p className="text-gray-700 mb-4">
            For large organizations with extensive translation needs.
          </p>
          <div className="text-center text-2xl font-semibold mb-4">
            Contact Us
          </div>
          <ul className="list-disc list-inside mb-6 text-gray-600">
            <li>Unlimited pages</li>
            <li>All features included</li>
            <li>Dedicated support team</li>
          </ul>
          <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
