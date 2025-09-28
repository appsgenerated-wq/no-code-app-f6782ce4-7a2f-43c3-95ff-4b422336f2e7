import React, { useEffect, useState, useCallback } from 'react';
import Manifest from '@mnfst/sdk';
import config from '../constants.js';
import { PlusIcon, UserCircleIcon, ArrowLeftOnRectangleIcon, MagnifyingGlassIcon, StarIcon } from '@heroicons/react/24/solid';

const manifest = new Manifest();

const DashboardPage = ({ user, onLogout }) => {
  const [recipes, setRecipes] = useState([]);
  const [myRecipes, setMyRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('allRecipes');

  const loadAllRecipes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await manifest.from('Recipe').find({
        filter: { status: 'published' },
        include: ['author', 'categories'],
        sort: { publishedAt: 'desc' },
        perPage: 20,
      });
      setRecipes(response.data);
    } catch (err) {
      console.error('Failed to load recipes:', err);
      setError('Could not load recipes. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMyRecipes = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const response = await manifest.from('Recipe').find({
        filter: { authorId: user.id },
        include: ['categories'],
        sort: { createdAt: 'desc' },
      });
      setMyRecipes(response.data);
    } catch (err) {
      console.error('Failed to load your recipes:', err);
      setError('Could not load your recipes. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (activeTab === 'allRecipes') {
      loadAllRecipes();
    } else if (activeTab === 'myRecipes') {
      loadMyRecipes();
    }
  }, [activeTab, loadAllRecipes, loadMyRecipes]);

  const renderContent = () => {
    if (loading) {
      return <div className="text-center p-10">Loading recipes...</div>;
    }
    if (error) {
      return <div className="text-center p-10 text-red-500">{error}</div>;
    }
    
    const recipeList = activeTab === 'allRecipes' ? recipes : myRecipes;

    if (recipeList.length === 0) {
        return <div className="text-center p-10 text-gray-500">No recipes found.</div>
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {recipeList.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
            <div className="relative">
              <img src={recipe.mainImage.thumbnail} alt={recipe.title} className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300"></div>
            </div>
            <div className="p-4">
              <p className="text-sm text-orange-600 font-semibold mb-1">{recipe.categories?.map(c => c.name).join(', ') || 'Uncategorized'}</p>
              <h3 className="text-lg font-bold text-gray-900 truncate">{recipe.title}</h3>
              <p className="text-sm text-gray-600 mt-1">By {recipe.author?.name || 'Unknown Chef'}</p>
              <div className="flex items-center mt-3 text-sm text-gray-500">
                <StarIcon className="h-5 w-5 text-yellow-400 mr-1"/>
                <span>{/* Dummy rating */} 4.5 (20 reviews)</span>
              </div>
              {activeTab === 'myRecipes' && (
                <span className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded-full ${recipe.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {recipe.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <a href="#" className="text-xl font-bold text-gray-800 flex items-center">
                <PlusIcon className="h-6 w-6 text-orange-500 mr-2 rotate-45"/> FlavorForge
              </a>
              <nav className="hidden md:flex space-x-8">
                <button onClick={() => setActiveTab('allRecipes')} className={`text-sm font-medium ${activeTab === 'allRecipes' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500 hover:text-gray-700'}`}>All Recipes</button>
                <button onClick={() => setActiveTab('myRecipes')} className={`text-sm font-medium ${activeTab === 'myRecipes' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500 hover:text-gray-700'}`}>My Recipes</button>
                <a href={`${config.BACKEND_URL}/admin/collections/recipes/create`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center">
                    <PlusIcon className="h-5 w-5 mr-1"/> Add Recipe
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden lg:block">
                <input type="text" placeholder="Search recipes..." className="w-64 pl-10 pr-4 py-2 border rounded-full text-sm" />
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <div className="flex items-center space-x-2">
                <img src={user.avatar?.thumbnail || `https://ui-avatars.com/api/?name=${user.name}&background=random`} alt={user.name} className="h-9 w-9 rounded-full object-cover" />
                <span className="hidden sm:inline text-sm font-medium text-gray-700">{user.name}</span>
              </div>
              <button onClick={onLogout} title="Logout" className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                <ArrowLeftOnRectangleIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
