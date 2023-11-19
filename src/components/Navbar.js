import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMenuAlt3 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import Logo from '../images/logoNav.png'
import { useRecoilValue, useResetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import avatar from '../images/avatar.png';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const currentUser = useRecoilValue(userAtom);
  const setUser = useResetRecoilState(userAtom);
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/auth/logout`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      localStorage.removeItem('user-flavor');
      localStorage.removeItem('token');
      setUser(null);
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && !event.target.closest('.dropdown')) {
        setOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [open]);

  return (
    <div>
      <header className={`w-full fixed z-10 bg-white transition-all duration-300 ease-in-out`}>
        <nav className="flex w-full py-2 md:py-3 px-4 md:px-20 items-center justify-between">
          <Link to="/" className="flex items-center justify-center text-black text-lg cursor-pointer">
          <img src={Logo} alt="Logo" className={`w-5 h-5 lg:w-10 lg:h-10 ${open ? 'block' : 'hidden'} md:block`} />
            Flavor<span className='text-green-700'>Fusion </span>
          </Link>

          <ul className={`md:flex text-black gap-6 md:space-x-6 ${open ? 'hidden' : 'flex'}`}>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/about">About Us</Link>
            </li>

            {currentUser ? (
              <>
                <li>
                  <Link to="/add-recipe">Add Recipe</Link>
                </li>
                <li className="dropdown">
                  <div className="relative inline-block text-left">
                    <button
                      className="rounded-full h-7 w-7 object-cover focus:outline-none"
                      onClick={() => setOpen(!open)}
                    >
                      <img src={avatar} alt="profile" className="rounded-full h-7 w-7 object-cover" />
                    </button>
                    {open && (
                      <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            My Profile
                          </Link>
                          <Link to="/my-recipes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            My Recipes
                          </Link>
                          <Link to="/liked" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Liked Recipes
                          </Link>
                          <button


                            onClick={handleLogout}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>

          <button
            className="block md:hidden text-black text-xl"
            onClick={() => setOpen(prev => !prev)}
          >
            {open ? <AiOutlineClose /> : <HiMenuAlt3 />}
          </button>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
