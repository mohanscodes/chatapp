import React, { useEffect } from "react";
import { MdCurrencyExchange, MdProductionQuantityLimits } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { get_user_dashboard_data } from "../../store/Reducers/dashboardReducer";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const {
    totalSale,
    totalOrder,
    totalProduct,
    totalPendingOrder,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(get_user_dashboard_data());
  }, []);

 

  return (
    <div>
      <div className="px-2 md:px-7 py-5">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">

          <div className="relative flex justify-between items-center p-5 rounded-md  bg-[#fa0305]  bg-opacity-20 backdrop-filter backdrop-blur-lg bg-blur-lg gap-3">
            <div className="flex flex-col justify-start items-start text-[#ffffff]">
              <h2 className="text-3xl font-bold">{totalSale}</h2>
              <span className="text-md font-medium">Total User</span>
            </div>

            <div className="absolute right-5 top-5 w-[40px] h-[40px] rounded-full bg-[#fa0305] flex justify-center items-center text-xl">
              <MdCurrencyExchange className="text-[#fae8e8] shadow-lg" />
            </div>
          </div>

          <div className="flex justify-between items-center p-5 bg-[#ef14ff] bg-opacity-20 backdrop-filter backdrop-blur-lg bg-blur-lg rounded-md gap-3">
            <div className="flex flex-col justify-start items-start text-[#ffffff]">
              <h2 className="text-3xl font-bold">{totalProduct}</h2>
              <span className="text-md font-medium">Online user</span>
            </div>

            <div className="w-[40px] h-[47px] rounded-full bg-[#760077] flex justify-center items-center text-xl">
              <MdProductionQuantityLimits className="text-[#fae8e8] shadow-lg" />
            </div>
          </div>

          <div className="flex justify-between items-center p-5 bg-[#2aff34] bg-opacity-20 backdrop-filter backdrop-blur-lg bg-blur-lg rounded-md gap-3">
            <div className="flex flex-col justify-start items-start text-[#ffffff]">
              <h2 className="text-3xl font-bold">{totalOrder}</h2>
              <span className="text-md font-medium">My Friends</span>
            </div>

            <div className="w-[40px] h-[47px] rounded-full bg-[#038000] flex justify-center items-center text-xl">
              <FaCartShopping className="text-[#fae8e8] shadow-lg" />
            </div>
          </div>

          <div className="flex justify-between items-center p-5 bg-[#261aff] bg-opacity-20 backdrop-filter backdrop-blur-lg bg-blur-lg rounded-md gap-3">
            <div className="flex flex-col justify-start items-start text-[#ffffff]">
              <h2 className="text-3xl font-bold">{totalPendingOrder ? totalPendingOrder : '10'}</h2>
              <span className="text-md font-medium">Online My Friends</span>
            </div>

            <div className="w-[40px] h-[47px] rounded-full bg-[#0200f8] flex justify-center items-center text-xl">
              <FaCartShopping className="text-[#fae8e8] shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
