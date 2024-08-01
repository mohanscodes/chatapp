import React, { useEffect, useState } from "react";
import { getNav } from "../navigation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/Reducers/authReducer";
import logo from "../assets/logo.png";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);
  const [allNav, setAllNav] = useState([]);
  const { pathname } = useLocation();

  useEffect(() => {
    // const navs = getNav("admin");
    const navs = getNav(role);
    setAllNav(navs);
  }, [role]);
  // console.log(allNav);

  return (
    <div>
      <div
        onClick={() => setShowSidebar(false)}
        className={`fixed duration-200 
      ${
        showSidebar === false ? "invisible" : "visible"
      } w-screen h-screen bg-[#8cbce780] top-0 left-0 z-10`}
      ></div>

      <div
        className={`w-[260px] fixed bg-[#3f1caa] bg-opacity-40 backdrop-filter backdrop-blur-lg bg-blur-lg   z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all 
        ${showSidebar ? "left-0" : "-left-[260px] lg:left-0"}`}
      >
        <div className="h-[70px] flex justify-center items-center">
          <Link to="/" className="w-[180px] h-[50px]">
            <img className="w-full h-full" src={logo} alt="" />
          </Link>
        </div>

        <div className="px-[16px]">
          <ul>
            {allNav.map((n, i) => (
              <li key={i}>
                <Link
                  to={n.path}
                  className={`${
                    pathname === n.path
                      ? "bg-[#5e23bd] shadow-indigo-500/50 text-white duration-500"
                      : "text-[#ffffff] font-bold duration-200 "
                  }

                          px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] 
                          hover:pl-4 transition-all w-full mb-1'}`}
                >
                  <span>{n.icon}</span>
                  <span>{n.title}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => dispatch(logout({ navigate, role,dispatch }))}
                className="text-[#ffffff] font-bold duration-200 px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1"
              >
                <span>
                  <BiLogOutCircle />
                </span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
