import React, { useContext, useState } from "react";

import { useHistory, Link } from 'react-router-dom';
import AuthContext from "../../store/auth-context";

const key ='AIzaSyDH9plc7T7h6CQDIKTBp6HCF-nBjgzPDHg';
const LogIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const authCtx = useContext(AuthContext);

  const history = useHistory();

  const formInputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      const inputData = { ...formData, returnSecureToken: true };

      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`,
        {
          method: "POST",
          body: JSON.stringify(inputData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        authCtx.login({ token: data.idToken, email: data.email })
        history.push("/");
        setFormData({
          email: "",
          password: "",
        });
      } else {
        const data = await res.json();
        let errorMessage = "Something went wrong! Try again.";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex flex-col mt-10">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div
          className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-[#14daff] rounded-2xl shadow-md lg:shadow-lg"
        >
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
            Login
          </h2>

          <form className="mt-5" onSubmit={submitHandler}>
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-gray-600 uppercase"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={formInputHandler}
              placeholder="e-mail address"
              autoComplete="email"
              className="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required
            />

            <label
              htmlFor="password"
              className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={formInputHandler}
              placeholder="password"
              autoComplete="current-password"
              className="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required
            />

            <button
              type="submit"
              className="w-full py-3 mt-10 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none"
            >
              Login
            </button>

            <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
              <Link to='/forgotpassword' className="flex-2 underline">
                Forgot password?
              </Link>

              <p className="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">
                or
              </p>

              <Link to="/signup" className="flex-2 underline">
                Create an Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
