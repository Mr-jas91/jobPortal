import { axiosInstance } from "@/utils/interCepter";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";

const PublicRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
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
        // Handle error (e.g., user is not authenticated)
      }
    };

    if (!user) {
      checkAuthentication();
    }
  }, [dispatch, navigate, user]);
  return <>{children}</>;
};

export default PublicRoute;
