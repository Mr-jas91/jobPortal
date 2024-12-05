import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { axiosInstance } from "@/utils/interCepter";

const Logo = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-800">
      Job<span className="text-[#2873f5]">Portal</span>
    </h1>
  </div>
);

const NavigationLinks = ({ user }) => {
  return (
    <ul className="flex font-medium items-center gap-6 text-gray-700">
      {user && user.role === "recruiter" ? (
        <>
          <li className="hover:text-[#F83002] transition-colors">
            <Link to="/admin/companies">Companies</Link>
          </li>
          <li className="hover:text-[#F83002] transition-colors">
            <Link to="/admin/jobs">Jobs</Link>
          </li>
        </>
      ) : (
        <>
          <li className="hover:text-[#F83002] transition-colors">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-[#F83002] transition-colors">
            <Link to="/jobs">Jobs</Link>
          </li>
          <li className="hover:text-[#F83002] transition-colors">
            <Link to="/browse">Browse</Link>
          </li>
        </>
      )}
    </ul>
  );
};

const AuthButtons = () => (
  <div className="flex items-center gap-4">
    <Link to="/login">
      <Button
        variant="outline"
        className="text-gray-700 border-gray-300 hover:bg-gray-100"
      >
        Login
      </Button>
    </Link>
    <Link to="/signup">
      <Button className="bg-[#6A38C2] text-white hover:bg-[#5b30a6]">
        Signup
      </Button>
    </Link>
  </div>
);

const UserMenu = ({ user, logoutHandler }) => (
  <Popover>
    <PopoverTrigger asChild>
      <Avatar className="cursor-pointer">
        <AvatarImage
          src={user?.profile?.profilePhoto}
          alt="User Avatar"
          className="rounded-full border-2 border-gray-300"
        />
      </Avatar>
    </PopoverTrigger>
    <PopoverContent className="w-72 bg-white shadow-lg rounded-lg p-4">
      <div>
        <div className="flex gap-3 items-center mb-4">
          <Avatar>
            <AvatarImage
              src={user?.profile?.profilePhoto}
              alt="User Avatar"
              className="rounded-full border"
            />
          </Avatar>
          <div>
            <h4 className="text-lg font-semibold text-gray-800">
              {user?.fullname}
            </h4>
            <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
          </div>
        </div>
        <div className="border-t pt-3">
          {user?.role === "student" && (
            <div className="flex items-center gap-3 mb-2">
              <User2 className="text-gray-600" />
              <Link to="/profile" className="text-gray-700 hover:underline">
                View Profile
              </Link>
            </div>
          )}
          <div className="flex items-center gap-3 cursor-pointer">
            <LogOut className="text-gray-600" />
            <Button
              onClick={logoutHandler}
              variant="link"
              className="text-red-600 hover:underline"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
);

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axiosInstance.get("/user/logout");
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-7xl px-6 h-16">
        <Logo />
        <div className="flex items-center gap-8">
          <NavigationLinks user={user} />
          {user ? (
            <UserMenu user={user} logoutHandler={logoutHandler} />
          ) : (
            <AuthButtons />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
