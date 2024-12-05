import { axiosInstance } from "@/utils/interCepter";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Ensure we get the isAuthenticated state
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axiosInstance.get("/user/user");
        console.log(response);
         if (response?.data?.user) {
          dispatch(setUser(response.data.user));
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };
    if (!user) {
      checkAuthentication();
    }
  }, [dispatch, navigate]);

  return user ? <>{children}</> : navigate("/login");
};

export default PrivateRoute;
