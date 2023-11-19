import React, { useEffect ,useState} from 'react';
import Banner from '../components/Baner';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';



const Home = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()
 
  
    const handleReadMore = (recipeId) => {
      navigate(`/recipe/${recipeId}`);
    };
    

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
      
        const response = await fetch(`${API_BASE_URL}/api/recipe/allrecipes`);
        const data = await response.json();

   
        setAllRecipes(data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching all recipes:', error);
        setLoading(false);
      }
    };

    fetchAllRecipes();
  }, []);
 
  return (
    <main className='w-full flex flex-col'>
    <Banner
      title="Embark on a Global Flavor Journey with FlavorFusion"
      type="home"
    />

    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-green-500 mt-10">All Recipes</h1>
      {loading && <p>Loading...</p>}
      {!loading && allRecipes.length === 0 && <p>No recipes found.</p>}
      {!loading && allRecipes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allRecipes.map((recipe) => (
  <RecipeCard
  key={recipe._id}
  recipe={recipe}
  onReadMore={() => handleReadMore(recipe._id)}
/>

))}

        </div>
      )}
    </div>
  </main>
  );
};


export const RecipeCard = ({ recipe, onReadMore }) => {
  const imageUrl = (recipe.images && recipe.images.length > 0) ? recipe.images[0] : "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600";

  return (
    <div className="bg-white p-6 rounded-md shadow-md text-center mb-6">
      <div className="mb-4">
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



export default Home;
