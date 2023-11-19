import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useRecoilState(userAtom);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this recipe?");
    if (!confirmed) {
      return;
    }
    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/api/recipe/delete/${recipeId}`);
      navigate('/my-recipes');
    } catch (error) {
      console.error('Error deleting recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = () => {
   
    navigate(`/update-recipe/${recipeId}`);
  };
  const handleShare = () => {
    const recipeLink = `${window.location.origin}/recipe/${recipeId}`;
    navigator.clipboard.writeText(recipeLink)
      .then(() => alert('Link copied to clipboard'))
      .catch((error) => console.error('Error copying to clipboard:', error));
  };

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const token = localStorage.getItem("token");
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        if (token) {
          headers.Authorization = token;
        }
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/recipe/detail/${recipeId}`, {
          headers
        });
        setRecipe(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  return (
<div className="container mx-auto p-4">
      {loading && <p>Loading...</p>}
      {!loading && !recipe.name && <p>No recipe found with the given ID.</p>}
      {!loading && recipe.name && (
        <div className="p-6 rounded-md shadow-md mt-10 relative text-gray-800">
          {user._id === recipe.createdBy && (
            <div className="flex justify-end mb-2">
                 <button
                className="p-3 bg-green-500 text-white rounded-md mr-2"
                onClick={handleShare}
              >
                <i className="fas fa-share"></i> Share
              </button>
              <button
                className="p-2 bg-green-500 text-white rounded-md mr-2"
                onClick={handleUpdate}
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="p-2 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          )}

          <h1 className="text-4xl font-bold mb-4 text-green-800 text-center">{recipe.name}</h1>
          <div className="flex justify-center mb-4">
            <img
              src={recipe.images[0]}
              alt={recipe.name}
              className="w-40 h-40 object-cover rounded-md"
            />
          </div>
          <p className="text-gray-700 mb-4 font-bold text-xl text-center">{recipe.description}</p>

          <div>
            <h2 className="text-xl font-bold mb-2 text-green-800 ml-20">Ingredients</h2>
            <ul className="list-disc ml-20">
              {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-700">{ingredient}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2 text-green-800 ml-20">Instructions</h2>
            <p className="text-gray-700 ml-20">{recipe.instructions}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2 text-green-800 ml-20">Preparation Time</h2>
            <p className="text-gray-700 ml-20">{recipe.preparationTime} min</p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2 text-green-800 ml-20">Cuisnine</h2>
            <p className="text-gray-700  ml-20">{recipe.cuisine} </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
