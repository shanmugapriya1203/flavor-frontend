import React, { useEffect, useState } from 'react';
import Banner from '../components/Baner';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();
  const [likedRecipes, setLikedRecipes] = useState([]);

  const handleReadMore = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  const handleLikeAndUnlike = (recipeId) => {
    // Toggle the liked state for the recipe
    setLikedRecipes((prevLikedRecipes) => {
      if (prevLikedRecipes.includes(recipeId)) {
        return prevLikedRecipes.filter((id) => id !== recipeId);
      } else {
        return [...prevLikedRecipes, recipeId];
      }
    });
  };

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/recipe/allrecipes`);
        const usersResponse = await fetch(`${API_BASE_URL}/api/auth/allusers`);
        const data = await response.json();
        const usersData = await usersResponse.json();

        setAllRecipes(data);
        setAllUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching all recipes:', error);
        setLoading(false);
      }
    };

    fetchAllRecipes();
  }, []);

  const filteredRecipes = allRecipes.filter((recipe) => {
    const recipeName = (recipe.name || '').toLowerCase();
    const recipeCuisine = (recipe.cuisine || '').toLowerCase();
    const searchQueryLower = searchQuery.toLowerCase();

    return recipeName.includes(searchQueryLower) || recipeCuisine.includes(searchQueryLower);
  });

  return (
    <main className="w-full flex flex-col">
      <Banner title="Embark on a Global Flavor Journey with FlavorFusion" type="home" />

      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-6 text-green-500 mt-10">All Recipes</h1>
        <input
          type="text"
          placeholder="Search recipes by cuisine..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-200 p-2 mb-4 border border-gray-300 rounded-md mx-auto block"
        />

        {loading && <p>Loading...</p>}
        {!loading && allRecipes.length === 0 && <p>No recipes found.</p>}
        {!loading && allRecipes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRecipes.map((recipe) => {
              const createdByUser = allUsers.find((user) => user._id === recipe.createdBy);
              const isLiked = likedRecipes.includes(recipe._id);

              return (
                <RecipeCard
                  key={recipe._id}
                  recipe={recipe}
                  createdBy={createdByUser ? createdByUser.username : 'Unknown'}
                  isLiked={isLiked}
                  onReadMore={() => handleReadMore(recipe._id)}
                  handleLikeAndUnlike={() => handleLikeAndUnlike(recipe._id)}
                />
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export const RecipeCard = ({ recipe, onReadMore, createdBy, isLiked, handleLikeAndUnlike }) => {
  const imageUrl = (recipe.images && recipe.images.length > 0)
    ? recipe.images[0]
    : 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600';

  return (
    <div className="relative bg-white p-6 rounded-md shadow-md text-center mb-6">
      <div className="mb-4">
        <img src={imageUrl} alt={recipe.name} className="w-full h-40 object-cover rounded-md" />
      </div>
      <h2 className="text-2xl font-bold mb-2 text-gray-800">{recipe.name}</h2>
      <p className="text-gray-700 mb-4">{recipe.description}</p>
      <p className="text-gray-500 mb-4">Recipe by: {createdBy}</p>

      <button onClick={handleLikeAndUnlike} className="absolute bottom-4 right-4 focus:outline-none">
        <svg
          aria-label="Like"
          color={isLiked ? 'rgb(237, 73, 86)' : ''}
          fill={isLiked ? 'rgb(237, 73, 86)' : 'transparent'}
          height="19"
          role="img"
          viewBox="0 0 24 22"
          width="20"
        >
          <path d="M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z" stroke="currentColor" strokeWidth="2"></path>
        </svg>
      </button>

      <button className="text-green-500 hover:underline" onClick={onReadMore}>
        Read More
      </button>
    </div>
  );
};


export default Home;
