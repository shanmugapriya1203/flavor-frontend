import axios from "axios";
import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { API_BASE_URL } from "../config";

const Signup = () => {
  const [formDetail, setFormDetail] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate= useNavigate()


  const handleChange = (e) => {
    setFormDetail({
      ...formDetail,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
   try {
    const response= await axios.post(`${API_BASE_URL}/api/auth/register`,formDetail,{
        headers:{
            'Content-Type':'application/json'
        }
    });
    const data= response.data;
    if(data.success=== false){
        setLoading(false)
        setError(data.message)
        return;
      }
      setLoading(false)
      setError(null)
      navigate('/login')
      
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
          Register
        </h2>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                UserName
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className=" block w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                  onChange={handleChange}
                  value={formDetail.username}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
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
                  value={formDetail.email}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className=" block w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                  onChange={handleChange}
                  value={formDetail.password}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
