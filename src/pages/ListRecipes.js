import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom'; 
import userAtom from '../atoms/userAtom';

const ListRecipes = ({ userId }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useRecoilState(userAtom);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUserRecipes = async () => {
      const token = localStorage.getItem("token");
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        if (token) {
          headers.Authorization = token;
        }
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/recipe/${user._id}`, {
          headers,
        });
        setRecipes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user recipes:', error);
        setLoading(false);
      }
    };

    fetchUserRecipes();
  }, [userId]);

  const handleReadMore = (index) => {
  
    navigate(`/recipe/${recipes[index]._id}`);
  };

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-4xl font-bold text-center mb-6 text-green-500 mt-10">My Recipes</h1>
      {loading && <p>Loading...</p>}
      {!loading && recipes.length === 0 && <p>No recipes found for this user.</p>}
      {!loading && recipes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((recipe, index) => (
            <RecipeCard key={recipe._id} recipe={recipe} onReadMore={() => handleReadMore(index)} />
          ))}
        </div>
      )}
    </div>
  );
};

const RecipeCard = ({ recipe, onReadMore }) => {
  const imageUrl = (recipe.images && recipe.images.length > 0) ? recipe.images[0] : "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600";

  return (
    <div className="bg-white p-6 rounded-md shadow-md text-center mb-6"> {/* Add margin-bottom here */}
      <div className="mb-4 ">
        <img
          src={imageUrl}
          alt={recipe.name}
          className="w-full h-40 object-cover rounded-md"
        />
      </div>
      <h2 className="text-2xl font-bold mb-2 text-gray-800">{recipe.name}</h2>
      <p className="text-gray-700 mb-4">{recipe.description}</p>
      <button className="text-green-500 hover:underline" onClick={onReadMore}>Read More</button>
    </div>
  );
};


export default ListRecipes;
