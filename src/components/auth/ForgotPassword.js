import React, { useRef } from "react";

import { useHistory, Link } from "react-router-dom";

const ForgotPassword = () => {
  const inputRef = useRef();
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDH9plc7T7h6CQDIKTBp6HCF-nBjgzPDHg`,
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: inputRef.current.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error.message);
      }
      history.push("/login");
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
          <h2 className="text-center font-semibold font-robotog text-3xl lg:text-4xl text-gray-800">
            Forgot Password
          </h2>

          <form className="mt-5" onSubmit={submitHandler}>
            <label
              htmlFor="email"
              className="block text-xs font-semibold font-roboto text-gray-600 uppercase"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              name="email"
              ref={inputRef}
              placeholder="e-mail address"
              autoComplete="email"
              className="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 rounded-lg focus:outline-none focus:border-gray-200"
              required
            />

            <button
              type="submit"
              className="w-full py-3 mt-10 bg-gray-800 rounded-lg
                    font-medium text-white uppercase font-roboto
                    focus:outline-none hover:bg-gray-700 hover:shadow-none"
            >
              Reset Password
            </button>

            <div className=" my-2 text-sm text-center">
              <Link to="/login" className="flex-2 underline">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
