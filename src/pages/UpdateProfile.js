import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";

const UpdateProfile = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [formDetail, setFormDetail] = useState({
    username: user.username,
    email: user.email,
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (updating) return;
    setUpdating(true);

    const token = localStorage.getItem("token");

    try {
      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers.Authorization = token;
      }

      const res = await axios.post(
        `${API_BASE_URL}/api/auth/update/${user._id}`,
        formDetail,
        { headers }
      );

      const data = res.data;

      if (data.error) {
        setError(data.error);
        return;
      }

      setUser(data);
      localStorage.setItem("user-flavor", JSON.stringify(data));
    } catch (error) {
      console.error(error);
      setError("An error occurred while updating the profile.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Update a Profile
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
                  className="block w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                  onChange={(e) =>
                    setFormDetail({
                      ...formDetail,
                      username: e.target.value,
                    })
                  }
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
                  className="block w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                  onChange={(e) =>
                    setFormDetail({
                      ...formDetail,
                      email: e.target.value,
                    })
                  }
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
                  className="block w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                  onChange={(e) =>
                    setFormDetail({
                      ...formDetail,
                      password: e.target.value,
                    })
                  }
                  value={formDetail.password}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
