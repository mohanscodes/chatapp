import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import {
  user_register,
  messageClear,
} from "../../store/Reducers/authReducer";
import toast from "react-hot-toast";

const Register = () => {
  const { loader, successMessage, errorMessage } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(user_register(state));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigate("/");
    }
    
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    
  }, [successMessage, errorMessage, dispatch, navigate]);

  return (
    <div className="
    min-w-screen 
    min-h-screen
    bg-[#cdcae9] 
    flex 
    justify-center 
    items-center
    "
    style={{
      backgroundImage: `url("/login.jpg")`,
      backgroundPosition: "center",
      backgroundSize: "cover",
    }}
    >
      <div className="w-[350px] text-[#ffffff] p-2">
        <div className="
        bg-[#6f68d1] 
        p-4 
        rounded-md
          bg-opacity-30 
          backdrop-filter 
          backdrop-blur-lg 
          bg-blur-lg
        ">
          <h2 className="text-xl mb-2 font-bold text-center">
            {" "}
            Freedom Chat{" "}
          </h2>
          <p className="text-sm mb-3 font-medium text-center">
          create your account here!
          </p>

          <form onSubmit={submit}>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
                placeholder="name"
                id="name"
                name="name"
                onChange={inputHandle}
                value={state.name}
                required
              />
            </div>

            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
                placeholder="email"
                id="email"
                name="email"
                onChange={inputHandle}
                value={state.email}
                required
              />
            </div>

            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
                placeholder="password"
                id="password"
                name="password"
                onChange={inputHandle}
                value={state.password}
                required
              />
            </div>

            <div className="flex items-center w-full gap-3 mb-3">
              <input
                className="w-4 h-4 text-blue-600 overflow-hidden
                            bg-gray-200 rounded border-gray-300 focus:ring-blue-500"
                name="checkbox"
                type="checkbox"
                id="checkbox"
              />

              <label htmlFor="checkbox" id="checkbox">
                I agree to privacy policy & treams
              </label>
            </div>

            <button
              disabled={loader ? true : false}
              className="bg-slate-800 w-full hover:shadow-blue-300/ hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
            >
              {loader ? (
                <PropagateLoader color="#fff" cssOverride={overrideStyle} />
              ) : (
                "sign up"
              )}
            </button>

            <div className="flex items-center mb-3 gap-3 justify-center">
              <p>
                Already Have an account ?{" "}
                <Link className="font-bold" to="/login">
                  Log in
                </Link>{" "}
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
