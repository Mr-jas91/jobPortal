import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { setLoading, setUser } from "@/redux/authSlice";
import { axiosInstance } from "@/utils/interCepter";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  });

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      const response = await axiosInstance.post("user/register", data);
      if (response.data?.success) {
        dispatch(setUser(response.data.user));
        navigate(response.data.user.role === "student" ? "/" : "/admin/companies");
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>

          {/* Full Name */}
          <FormInput
            label="Full Name"
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Your name"
          />

          {/* Email */}
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="address@mail.com"
          />

          {/* Phone Number */}
          <FormInput
            label="Phone Number"
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="8080808080"
          />

          {/* Password */}
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />

          {/* Role Selection */}
          <div className="my-5">
            <Label>Role</Label>
            <RadioGroup className="flex gap-4 mt-2">
              {["student", "recruiter"].map((role) => (
                <div key={role} className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value={role}
                    checked={formData.role === role}
                    onChange={handleChange}
                    required
                  />
                  <Label>{role.charAt(0).toUpperCase() + role.slice(1)}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Profile Upload */}
          <div className="my-4">
            <Label>Profile</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1"
              required
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full my-4">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </>
            ) : (
              "Signup"
            )}
          </Button>

          {/* Redirect to Login */}
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

// Reusable FormInput Component
const FormInput = ({ label, ...props }) => (
  <div className="my-2">
    <Label>{label}</Label>
    <Input {...props} className="mt-1" required />
  </div>
);

export default Signup;
