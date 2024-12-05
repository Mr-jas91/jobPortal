import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { setLoading, setUser } from "@/redux/authSlice";
import { axiosInstance } from "@/utils/interCepter";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "", role: "" });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      const res = await axiosInstance.post("user/login", input);
      if (res?.data.success) {
        dispatch(setUser(res?.data.user));
        toast.success(res.data.message);

        const role = res.data.user.role;
        navigate(role === "student" ? "/" : "/admin/companies");
      }
    } catch (error) {
      toast.error(error.response?.data.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user?.role) {
      navigate(user.role === "student" ? "/" : "/admin/companies");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md border border-gray-200 rounded-lg p-6 my-10 shadow-sm"
        >
          <h1 className="text-2xl font-bold mb-6">Login</h1>

          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              placeholder="address@mail.com"
              aria-label="Email"
              required
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={input.password}
              onChange={handleChange}
              placeholder="Password"
              aria-label="Password"
              required
            />
          </div>

          <div className="mb-6">
            <RadioGroup className="flex space-x-6">
              <div className="flex items-center space-x-2">
                <Input
                  id="student"
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={handleChange}
                  className="cursor-pointer"
                  required
                />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  id="recruiter"
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={handleChange}
                  className="cursor-pointer"
                  required
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full mb-4" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5 mr-2" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>

          <p className="text-sm text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
