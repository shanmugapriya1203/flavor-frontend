import axios from 'axios';
import React, { useState ,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { useSetRecoilState } from "recoil";
import authScreeAtom from './../atoms/authAtom';
import userAtom from './../atoms/userAtom';
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
 const setAuthScreen= useSetRecoilState(authScreeAtom)
 const setUser= useSetRecoilState(userAtom)
 const [error, setError] = useState(null);
 const [loading, setLoading] = useState(false);
 const navigate= useNavigate()
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
      };
      const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true)
           try {
            const res= await axios.post(`${API_BASE_URL}/api/auth/login`,formData,{
                headers:{
                    'Content-Type':'application/json'
                }
            
            })
            const data= res.data
            if(data.success=== false){
                setLoading(false)
                setError(data.message)
                return;
              }
              setUser(data.user);
              const token=data.token;
              localStorage.setItem('token',token)
              localStorage.setItem("user-flavor",JSON.stringify(data))
              setLoading(false)
            
              navigate('/')
              window.location.reload();
              
           } catch (error) {
            setLoading(false);
            setError(error.message);
            window.alert(error.message)
           }
          };
       
   
           
      
  return (
  <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className=" block w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                
                  required
                  className=" block w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login
