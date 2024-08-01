import React, { useEffect, useState } from "react";
import { FaImages } from "react-icons/fa6";
import { FadeLoader } from "react-spinners";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  profile_image_upload,
  messageClear,
  profile_info_add,
  password_update,
} from "../../store/Reducers/authReducer";
import toast from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";

const Profile = () => {
  const dispatch = useDispatch();

  const { userInfo, loader, successMessage, errorMessage } = useSelector(
    (state) => state.auth
  );

  const add_image = (e) => {
    if (e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      dispatch(profile_image_upload(formData));
    }
  };

  // info form data state handle start
  const [state, setState] = useState({
    name: userInfo.name,
    email: userInfo.email,
    phone: userInfo.phone,
    address: userInfo.address,
  });

  const [edit, setEdit] = useState(false);

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const add = (e) => {
    e.preventDefault();
    dispatch(profile_info_add(state));
  };
  // info form data state handle end

  // password form data state handle start
  const [passwords, setPasswords] = useState({
    old_password: "",
    new_password: "",
    conform_password: "",
  });

  const inputPasswordsHandle = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };
  const update_new_password = (e) => {
    e.preventDefault();
    dispatch(password_update(passwords));
  };
  // password form data state handle  end

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
    if (errorMessage) {
      toast.error(errorMessage);
    }
    dispatch(messageClear());
  }, [successMessage, errorMessage, dispatch]);

  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-6/12">
          <div className="w-full p-4 bg-[#6a5fdf] bg-opacity-30 backdrop-filter backdrop-blur-lg bg-blur-lg rounded-md text-[#d0d2d6]">
            <div className="flex justify-center items-center py-3">
              {userInfo?.image ? (
                <label
                  htmlFor="img"
                  className="h-[150px] w-[200px] relative p-3 cursor-pointer overflow-hidden"
                >
                  <img src={userInfo.image} alt="" />
                  {loader && (
                    <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              ) : (
                <label
                  className="flex justify-center items-center flex-col h-[150px] w-[200px] cursor-pointer border border-dashed hover:border-red-500 border-[#d0d2d6] relative"
                  htmlFor="img"
                >
                  <span>
                    <FaImages />{" "}
                  </span>
                  <span>Select Image</span>
                  {loader && (
                    <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              )}
              <input
                type="file"
                className="hidden"
                id="img"
                onChange={add_image}
              />
            </div>

            {edit ? (
              <div className="px-0 md:px-5 py-2">
                <form onSubmit={add}>
                  <div className="flex flex-col w-full gap-1 mb-2">
                    <label htmlFor="name">Name</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#ffffff]"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="name"
                      value={state.name}
                      onChange={inputHandle}
                    />
                  </div>

                  <div className="flex flex-col w-full gap-1 mb-2">
                    <label htmlFor="Phone">Phone</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#ffffff]"
                      type="number"
                      name="phone"
                      id="phone"
                      placeholder="phone"
                      value={state.phone}
                      onChange={inputHandle}
                    />
                  </div>

                  <div className="flex flex-col w-full gap-1 mb-2">
                    <label htmlFor="address">Address</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#ffffff]"
                      type="text"
                      name="address"
                      id="address"
                      placeholder="address"
                      value={state.address}
                      onChange={inputHandle}
                    />
                  </div>

                  <div className="flex flex-col w-full gap-1 mb-2">
                    <label htmlFor="email">Email</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#ffffff]"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="email"
                      value={state.email}
                      onChange={inputHandle}
                    />
                  </div>

                  <button className="bg-red-500  hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 my-2">
                    Save Changes
                  </button>
                </form>
              </div>
            ) : (
              <div className="px-0 md:px-5 py-2">
                <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative">
                  <span
                    onClick={() => setEdit(!edit)}
                    className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer"
                  >
                    <FaRegEdit />{" "}
                  </span>
                  <div className="flex gap-2">
                    <span>Name : </span>
                    <span>{userInfo.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Email : </span>
                    <span>{userInfo.email}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Phone : </span>
                    <span>{userInfo.phone}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Address : </span>
                    <span>{userInfo.address}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Role : </span>
                    <span>{userInfo.role}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Status : </span>
                    <span className="px-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50 cursor-pointer">
                      {userInfo.status}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-6/12">
          <div className="w-full pl-0 md:pl-7 mt-6 md:mt-0">
            <div className="bg-[#6a5fdf] bg-opacity-30 backdrop-filter backdrop-blur-lg bg-blur-lg rounded-md text-[#d0d2d6] p-4">
              <h1 className="text-[#d0d2d6] text-lg mb-3 font-semibold">
                Change Password {successMessage} {successMessage}
              </h1>
              <form onSubmit={update_new_password}>
                <div className="flex flex-col w-full gap-1 mb-2">
                  <label htmlFor="o_password">Old Password</label>
                  <input
                    className="px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                    type="password"
                    name="old_password"
                    id="old_password"
                    placeholder="Old Password"
                    value={passwords.old_password}
                    onChange={inputPasswordsHandle}
                  />
                </div>

                <div className="flex flex-col w-full gap-1 mb-2">
                  <label htmlFor="n_password">New Password</label>
                  <input
                    className="px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                    type="password"
                    name="new_password"
                    id="new_password"
                    placeholder="New Password"
                    value={passwords.new_password}
                    onChange={inputPasswordsHandle}
                  />
                </div>

                <div className="flex flex-col w-full gap-1 mb-2">
                  <label htmlFor="n_password">Conform Passwords</label>
                  <input
                    className="px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                    type="password"
                    name="conform_password"
                    id="conform_password"
                    placeholder="conform_password"
                    value={passwords.conform_password}
                    onChange={inputPasswordsHandle}
                  />
                </div>

                <button
                  disabled={loader ? true : false}
                  className="bg-red-500 w-[200px] hover:shadow-red-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
                >
                  {loader ? (
                    <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
