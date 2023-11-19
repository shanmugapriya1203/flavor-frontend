import React, { useState } from 'react';
 import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import axios from 'axios';

const AddRecipe = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    images: [],
    name: '',
    description: '',
    ingredients: [],
    instructions: '',
    preparationTime: '', 
  });
  const navigate = useNavigate();
  const [user,setUser]=useRecoilState(userAtom)
  const [error, setError] = useState(null);

  const handleImageSubmit = async () => {
    if (files.length > 0 && files.length + formData.images.length < 3) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      try {
        const urls = await Promise.all(promises);

        setFormData({ ...formData, images: [...formData.images, ...urls] });
        setFiles([]); 
      } catch (error) {
        console.error('Error uploading images:', error);
      }
    } else {
      console.log('You can only upload 3 images');
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL);
            })
            .catch((downloadUrlError) => {
              reject(downloadUrlError);
            });
        }
      );
    });
  };


  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };
  const handleChange = (e) => {
    if (e.target.id === 'ingredients') {
  
      const ingredientsArray = e.target.value.split('\n');
      setFormData({
        ...formData,
        ingredients: ingredientsArray,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers.Authorization = token;
      }
      const res= await axios.post(`${API_BASE_URL}/api/recipe/create/${user._id}`,
      formData,
      {
        headers
      }
      );
      const data = res.data;

      if (data.error) {
        setError(data.error);
        return;
      }
      setFormData({
        images: [],
        name: '',
        description: '',
        ingredients: [],
        instructions: '',
        preparationTime:'',
      });
      navigate('/my-recipes')
    } catch (error) {
      console.error('Error adding recipe:', error);
    setError('An error occurred while adding the recipe.');
    }
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl text-center mb-6 text-black-500 mt-8">Add a New Recipe</h1>
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleSubmit}>
      {error && (
          <div className="bg-red-500 text-white p-3 mb-4 rounded-md">
            {error}
          </div>
        )}
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Recipe Name"
            id="name"
            className="border p-3 rounded-md"
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            placeholder="Description"
            id="description"
            className="border p-3 rounded-md"
            onChange={handleChange}
            value={formData.description}
          />
         <textarea
          placeholder="Ingredients (one per line)"
          id="ingredients"
          className="border p-3 rounded-md"
          onChange={handleChange}
          value={formData.ingredients.join('\n')}
        />
          <textarea
            placeholder="Instructions"
            id="instructions"
            className="border p-3 rounded-md"
            onChange={handleChange}
            value={formData.instructions}
          />
             <input
            type="number"
            placeholder="Preparation Time"
            id="preparationTime"
            className="border p-3 rounded-md"
            onChange={handleChange}
            value={formData.preparationTime}
          />
        </div>
        {/* Image Upload */}
        <div className="flex flex-col gap-4">
          <p className="font-semibold">
            Images: <span className="font-normal text-gray-600 ml-2">The first image will be the cover (max 6)</span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              onChange={(e) => setFiles(e.target.files)}
              multiple
            />
            <button
              onClick={handleImageSubmit}
              type="button"
              className="p-3 text-white border bg-green-500 rounded uppercase hover:bg-green-600"
            >
              Upload
            </button>
          </div>
          {formData.images.length > 0 &&
            formData.images.map((url, index) => (
              <div key={url} className="flex justify-between p-3 border items-center">
                <img src={url} alt="recipe image" className="w-20 h-20 object-contain rounded-md" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
        {/* Submit Button */}
        <div className="col-span-2">
          <button className="p-3 bg-green-500 text-white rounded-md uppercase hover:bg-green-600" type="submit">
            Submit Recipe
          </button>
        </div>
      </form>
    </main>
  );
};

export default AddRecipe;
