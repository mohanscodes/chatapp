import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifynewuser, messageClear } from "../../store/Reducers/authReducer";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const VerifyNewuser = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const response = await dispatch(verifynewuser({ token })).unwrap();
        toast.success(response.message);

        if (response.status === "success") {
          navigate("/login");
          setTimeout(() => {}, 2000);
        }
      } catch (error) {
        toast.error(error.message || "An error occurred");
        console.log(error)
      }
    };

    if (token) {
      verifyAccount();
    }
  }, [token, navigate, dispatch]);

  return (
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
          className="p-4 rounded-md 
          bg-[#6f68d1]
          bg-opacity-30 
          backdrop-filter 
          backdrop-blur-lg 
          bg-blur-lg"
        >
          <h2 className="text-xl text-center mb-2 font-bold">Freedom Chat</h2>

          <div className="flex items-center mb-3 gap-3 justify-center">
            <p>
              Don't have an account?{" "}
              <Link className="font-bold" to="/register">
                Sign up
              </Link>
            </p>
          </div>
          <div className="flex text-center items-center mb-3 gap-3 justify-center">
            <p>
              Successfully verified your account?{" "}
              <Link className="font-bold" to="/login">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

};

export default VerifyNewuser;
