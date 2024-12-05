import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Loader2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { axiosInstance } from "@/utils/interCepter";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "", // Display as comma-separated
    file: user?.profile?.resume || ""
  });
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append(
      "skills",
      input.skills.split(",").map((s) => s.trim())
    ); // Process skills into an array
    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);
      const res = await axiosInstance.post(`user/profile/update`, formData);
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg bg-white rounded-lg shadow-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Update Profile
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler} className="space-y-6">
          <div className="grid gap-4">
            {/* Full Name */}
            <div className="flex flex-col">
              <Label htmlFor="name" className="mb-2 font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                name="fullname"
                type="text"
                value={input.fullname}
                onChange={changeEventHandler}
                readOnly
                className="border-gray-300"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <Label htmlFor="email" className="mb-2 font-medium">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={input.email}
                onChange={changeEventHandler}
                readOnly
                className="border-gray-300"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <Label htmlFor="phoneNumber" className="mb-2 font-medium">
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                className="border-gray-300"
              />
            </div>

            {/* Bio */}
            <div className="flex flex-col">
              <Label htmlFor="bio" className="mb-2 font-medium">
                Bio
              </Label>
              <Textarea
                id="bio"
                name="bio"
                value={input.bio}
                onChange={changeEventHandler}
                className="border-gray-300"
                rows={4}
              />
            </div>

            {/* Skills */}
            <div className="flex flex-col">
              <Label htmlFor="skills" className="mb-2 font-medium">
                Skills (comma separated)
              </Label>
              <Input
                id="skills"
                name="skills"
                value={input.skills}
                onChange={changeEventHandler}
                placeholder="e.g. React, Node.js, TypeScript"
                className="border-gray-300"
              />
            </div>

            {/* File Upload */}
            <div className="flex flex-col">
              <Label htmlFor="file" className="mb-2 font-medium">
                Resume
              </Label>
              <Input
                id="file"
                name="file"
                type="file"
                accept="application/pdf"
                onChange={fileChangeHandler}
                className="border-gray-300"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Updating...
                </>
              ) : (
                "Update"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
