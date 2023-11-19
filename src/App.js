
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Footer from './components/Footer'
import UpdateProfile from './pages/UpdateProfile'
import Signup from './pages/SignUp';
import AddRecipe from './pages/AddRecipe'


function App() {


  return (
<BrowserRouter>
<Navbar/>
<Routes>

    <Route path='/'element={<Home/>}/>
    <Route path='/signup'element={<Signup/>}/>
    <Route path='/login'element={<Login/>}/>
    <Route path='/profile'element={<UpdateProfile/>}/>
    <Route path='/add-recipe'element={<AddRecipe/>}/>
  
</Routes>
<Footer/>
</BrowserRouter>
  )
}

export default App
