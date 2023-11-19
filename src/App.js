
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Footer from './components/Footer'
import UpdateProfile from './pages/UpdateProfile'
import Signup from './pages/SignUp';


function App() {


  return (
<BrowserRouter>
<Navbar/>
<Routes>

    <Route path='/'element={<Home/>}/>
    <Route path='/signup'element={<Signup/>}/>
    <Route path='/login'element={<Login/>}/>
    <Route path='/profile'element={<UpdateProfile/>}/>
  
</Routes>
<Footer/>
</BrowserRouter>
  )
}

export default App
