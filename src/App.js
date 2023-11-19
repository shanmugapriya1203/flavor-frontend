
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Footer from './components/Footer'
import UpdateProfile from './pages/UpdateProfile'
import Signup from './pages/SignUp';
import AddRecipe from './pages/AddRecipe'
import ListRecipes from './pages/ListRecipes'
import RecipeDetail from './pages/DetailRecipe'
import UpdateRecipe from './pages/UpdateRecipe'
import About from './pages/AboutPage'
import ListLikedRecipes from './pages/Liked Recipes'
import { useRecoilState } from 'recoil'
import userAtom from './atoms/userAtom'


function App() {

  const [user, setUser] = useRecoilState(userAtom);
  const userId = user ? user._id : null;
  return (
<BrowserRouter>
<Navbar/>
<Routes>

    <Route path='/'element={<Home/>}/>
    <Route path='/about'element={<About/>}/>
    <Route path='/signup'element={<Signup/>}/>
    <Route path='/login'element={<Login/>}/>
    <Route path='/profile'element={<UpdateProfile/>}/>
    <Route path='/add-recipe'element={<AddRecipe/>}/>
    <Route path='/my-recipes'element={<ListRecipes/>}/>
    <Route path='/liked' element={<ListLikedRecipes userId={userId} />} />
    <Route path="/recipe/:recipeId"  element={<RecipeDetail/>}/>
    <Route path="/update-recipe/:recipeId"  element={<UpdateRecipe/>}/>
  
</Routes>
<Footer/>
</BrowserRouter>
  )
}

export default App
