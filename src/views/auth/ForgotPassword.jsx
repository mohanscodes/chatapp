import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  forgot_password,
  messageClear,
} from "../../store/Reducers/authReducer";

import { useNavigate } from "react-router-dom";

import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(forgot_password(state));
  };

  useEffect(() => {
    if (successMessage) {
      state.email = "";
      toast.success(successMessage);
      dispatch(messageClear());

      setTimeout(() => {
        navigate("/login");
      }, 1000); // 2 seconds delay before navigating
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch, navigate]);

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
              Enter your email here!
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

              <button
                disabled={loader ? true : false}
                className="bg-slate-800 w-full hover:shadow-blue-300/ hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
              >
                {loader ? (
                  <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                ) : (
                  "Sing In"
                )}
              </button>

              <div className="flex items-center mb-3 gap-3 justify-center">
                <p>
                  Don't Have an account ?{" "}
                  <Link className="font-bold" to="/register">
                    sing up
                  </Link>{" "}
                </p>
              </div>
              <div className="flex items-center mb-3 gap-3 justify-center">
                <p>
                  Log In ?{" "}
                  <Link className="font-bold" to="/login">
                    login
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

export default ForgotPassword;
