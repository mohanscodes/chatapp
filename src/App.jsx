import { useEffect, useState } from "react";

//1) private route with layouts
import { getRoutes } from "./router/routes/index";

import publicRoutes from "./router/routes/publicRoutes";
//2) public route

import Router from "./router/Router";
// import { useRoutes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_user_info } from "./store/Reducers/authReducer";



function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  //1 set default route is public

  useEffect(() => {
    const routes = getRoutes();
    //call a private route
    setAllRoutes([...allRoutes, routes]);
    // combine public route + private route
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(get_user_info());
    }
  }, [token]);


  // const routes = useRoutes([...allRoutes]);
  // set final routes to react router dom package - useRouter default methords
  // return routes;
  return <Router allRoutes={allRoutes} />;
}

export default App;