import React, { useState } from 'react';
import { FireIcon, BookOpenIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const LandingPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleDemoLogin = (e) => {
    e.preventDefault();
    onLogin('chef@example.com', 'password123');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="absolute top-0 left-0 right-0 z-10 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
           <h1 className="text-2xl font-bold text-gray-800 flex items-center"><FireIcon className="h-7 w-7 text-orange-500 mr-2"/> FlavorForge</h1>
        </div>
      </header>
      <main>
        <div className="relative">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1/2 bg-gray-100"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="pt-32 pb-20">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Discover & Share</span>
                  <span className="block text-orange-600">Amazing Recipes</span>
                </h1>
                <p className="mt-6 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-8 md:max-w-3xl">
                  Join a community of food lovers. Find your next favorite meal, create your own recipes, and build your weekly meal plan with ease.
                </p>
                <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                  <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-1 sm:gap-5">
                    <button
                      onClick={handleDemoLogin}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 md:py-4 md:text-lg md:px-10"
                    >
                      Explore as Demo Chef
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900">Everything You Need to Cook Better</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <BookOpenIcon className="h-10 w-10 text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900">Vast Recipe Library</h3>
                <p className="mt-2 text-gray-600">Access thousands of recipes from chefs and home cooks around the world.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <UserGroupIcon className="h-10 w-10 text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900">Active Community</h3>
                <p className="mt-2 text-gray-600">Share your creations, get feedback, and connect with fellow food enthusiasts.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <FireIcon className="h-10 w-10 text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900">Become a Chef</h3>
                <p className="mt-2 text-gray-600">Publish your own recipes, build a following, and share your passion for cooking.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
