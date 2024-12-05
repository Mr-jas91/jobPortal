import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "@/utils/interCepter";
const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axiosInstance.get("/user/user");
        console.log(response);
        if (response?.data?.user?.role === "recruiter") {
          dispatch(setUser(response.data.user));
          navigate("/admin/companies");
        } else if (response?.data?.user?.role === "student") {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
        // Handle error (e.g., user is not authenticated)
      }
    };

    if (!user || !user?.role === "recruiter") {
      checkAuthentication();
    }
  }, [dispatch, navigate, user]);

  return user?.role === "recruiter" ? <>{children}</> : navigate("/login");
};
export default ProtectedRoute;
