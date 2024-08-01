import React, { useEffect } from "react";
import { useDispatch ,useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { get_user_info } from "../../store/Reducers/authReducer";

const Home = () => {
  // const dispatch = useDispatch();

  // const { token } = useSelector((state) => state.auth);
  // useEffect(() => {
  //   dispatch(get_user_info());
  // }, [token]);

  const { role } = useSelector((state) => state.auth);
  if (role === "user") return <Navigate to="user/dashboard" replace />;
  else if (role === "admin") return <Navigate to="admin/dashboard" replace />;
  else return <Navigate to="/login" replace />;
};

export default Home;
