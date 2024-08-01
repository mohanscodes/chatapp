import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ route, children }) => {
  const { role, userInfo } = useSelector((state) => state.auth);

  if (role) {
    // if find role

    if (route.role) {
      // if find routes role

      if (userInfo) {

        //if login user role and route role compare
        if (userInfo.role === route.role) {
          
          //1- if frontend user routes control have = status
          if (route.status) {
            
            if (route.status === userInfo.status) {
              return <Suspense fallback={null}>{children}</Suspense>;
            } else {
              if (userInfo.status === "pending") {
                return <Navigate to="/user/account-pending" replace />;
              } else {
                return <Navigate to="/user/account-deactive" replace />;
              }
            }
          } else {

            //2- if frontend user routes control have = visibility
            if (route.visibility) {

              if (route.visibility.some( (r) => r === userInfo.status)) {

                return <Suspense fallback={null}>{children}</Suspense>;
              } else {
                return <Navigate to="/user/account-pending" replace />;
              }

            } else {
            //3- if frontend user routes control dont have = status and visibility show allow that router
              return <Suspense fallback={null}>{children}</Suspense>;
            }
          }

        } else {
          return <Navigate to="/unauthorized" replace />;
        }
      } else {
        // empty
      }
      // if find userInfo end

      
    } else {
      // if not find routes role
      if (route.ability === "user") {
        return <Suspense fallback={null}>{children}</Suspense>;
      }
    }

   } else {
    // if not find role
    return <Navigate to="/login" replace />;
  }
};
export default ProtectRoute;
