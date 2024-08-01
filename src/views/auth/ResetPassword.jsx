/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect,useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { reset_password, messageClear } from '../../store/Reducers/authReducer';
import {toast} from 'react-hot-toast';

import { useParams, useNavigate } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import { Link } from "react-router-dom";

const overrideStyle = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const { errorMessage, successMessage } = useSelector((state) => state.auth);
  const [loading,setLoading] = useState(false);

  const formik = useFormik({
  initialValues: {
    newPassword: '',
    confirmPassword: '',
  },
  validationSchema: Yup.object({
    newPassword: Yup.string().required('Required').min(6, 'Too Short!'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Required'),
  }),
  onSubmit: async (values) => {
    const { newPassword } = values;
    setLoading(true); // Assuming setLoading is defined and sets loading state

    try {
      const response = await dispatch(reset_password({ new_password: newPassword, token })).unwrap();
      toast.success(response.message);

      // Assuming your response structure has a status field, adjust the condition accordingly
      if (response.status === 'success') {
         
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      }

    } catch (error) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  },
});


  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setTimeout(() => {
        navigate('/');
      }, 2000); // 2 seconds delay before navigating
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch, navigate]);

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
        backgroundPosition: 'center',
        backgroundSize: 'cover',
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
          <p className="text-sm text-center mb-3 font-medium">
            Reset your password here!
          </p>

          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="newPassword">New Password</label>
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
                type="password"
                name="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="New Password"
                id="newPassword"
                required
                style={{
                  '::placeholder': {
                    color: 'white',
                  },
                }}
                onFocus={(e) =>
                  e.target.style.setProperty('::placeholder', 'color:white;')
                }
                // eslint-disable-next-line react/jsx-no-duplicate-props
                onBlur={(e) =>
                  e.target.style.setProperty('::placeholder', 'color:white;')
                }
              />
              {formik.touched.newPassword && formik.errors.newPassword ? (
                <div className="error">{formik.errors.newPassword}</div>
              ) : null}
            </div>

            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="confirmPassword">Confirm Password</label>
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
                type="password"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Confirm Password"
                id="confirmPassword"
                required
                style={{
                  '::placeholder': {
                    color: 'white',
                  },
                }}
                onFocus={(e) =>
                  e.target.style.setProperty('::placeholder', 'color:white;')
                }
                onBlur={(e) =>
                  e.target.style.setProperty('::placeholder', 'color:white;')
                }
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className="error">{formik.errors.confirmPassword}</div>
              ) : null}
            </div>

            <button
              disabled={loading ? true : false}
              className="bg-slate-800 w-full hover:shadow-blue-300/ hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
            >
              {loading ? (
                <PropagateLoader color="#fff" cssOverride={overrideStyle} />
              ) : (
                'Reset Password'
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
  );
};

export default ResetPassword;
