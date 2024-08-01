import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { user_login, messageClear } from "../../store/Reducers/authReducer";

import { useNavigate } from "react-router-dom";

import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import toast from "react-hot-toast";

const Login = () => {
  const { token, userInfo, loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({
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
    dispatch(user_login(state));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigate(`/`);
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  useEffect(() => {
    if (token) {
      navigate(`/`);
    }
  }, [token, dispatch]);

  return (
    <div>
      <div
        className="
      min-w-screen
      min-h-screen 
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
          <div
            className=" p-4 rounded-md 
          bg-[#6f68d1]
          bg-opacity-30 
          backdrop-filter 
          backdrop-blur-lg 
          bg-blur-lg"
          >
            <h2 className="text-xl text-center mb-2 font-bold">Freedom Chat</h2>
            <p className="text-sm text-center mb-3 font-medium">
              Login your account here!
            </p>

            <form onSubmit={submit}>
              <div className="flex flex-col w-full gap-1 mb-3">
                <label htmlFor="email">Email</label>
                <input
                  className="
                  my-email-input
                  px-3 
                  py-2 
                  outline-none 
                  border 
                  border-white-900 
                  bg-transparent 
                  text-bold
                  rounded-md"
                  type="text"
                  name="email"
                  value={state.email}
                  onChange={inputHandle}
                  placeholder="email"
                  id="email"
                  required
                  style={{
                    "::placeholder": {
                      color: "white",
                    },
                  }}
                  onFocus={(e) =>
                    e.target.style.setProperty("::placeholder", "color:white;")
                  }
                  onBlur={(e) =>
                    e.target.style.setProperty("::placeholder", "color:white;")
                  }
                />
              </div>

              <div className="flex flex-col w-full gap-1 mb-3">
                <label htmlFor="password">Password</label>
                <input
                  className="
                  px-3 
                  py-2 
                  outline-none 
                  border
                  border-white 
                  bg-transparent 
                  rounded-md"
                  type="password"
                  name="password"
                  value={state.password}
                  onChange={inputHandle}
                  placeholder="password"
                  id="password"
                  required
                  style={{
                    "::placeholder": {
                      color: "white",
                    },
                  }}
                  onFocus={(e) =>
                    e.target.style.setProperty("::placeholder", "color:white;")
                  }
                  onBlur={(e) =>
                    e.target.style.setProperty("::placeholder", "color:white;")
                  }
                />
              </div>

              <button
                disabled={loader ? true : false}
                className="bg-slate-800 w-full hover:shadow-blue-300/ hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
              >
                {loader ? (
                  <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                ) : (
                  "Login"
                )}
              </button>

              <div className="flex items-center mb-3 gap-3 justify-center">
                <p>
                  Don't Have an account ?{" "}
                  <Link className="font-bold" to="/register">
                    Sign up
                  </Link>{" "}
                </p>
              </div>
              <div className="flex items-center mb-3 gap-3 justify-center">
                <p>
                  ForgotPassword ?{" "}
                  <Link className="font-bold" to="/forgotPassword">
                    reset
                  </Link>{" "}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
