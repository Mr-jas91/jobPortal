import React, { useState } from "react";
import Navbar from "../../components/shared/Navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <Navbar />

      <div className="bg-white shadow-lg rounded-lg p-8 grid md:grid-cols-3 gap-6">
        {/* Left Section - Avatar & Basic Info */}
        <div className="col-span-1 flex flex-col items-center text-center">
          <Avatar className="w-32 h-32">
            <AvatarImage
              src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
              alt="profile"
            />
          </Avatar>
          <h1 className="text-2xl font-semibold mt-4">{user?.fullname}</h1>
          <p className="text-gray-500">{user?.profile?.bio}</p>
          <Button variant="outline" className="mt-4" onClick={() => setOpen(true)}>
            <Pen className="mr-2" /> Edit Profile
          </Button>
        </div>

        {/* Right Section - Contact Details & Skills */}
        <div className="col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Contact Information</h2>
            <div className="flex items-center gap-3 text-gray-700">
              <Mail size={20} />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Contact size={20} />
              <span>{user?.phoneNumber || "Not provided"}</span>
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <h2 className="text-xl font-semibold">Skills</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {user?.profile?.skills.length ? (
                user.profile.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-500">No skills listed</span>
              )}
            </div>
          </div>

          {/* Resume */}
          <div>
            <Label className="text-lg font-semibold">Resume</Label>
            {user?.profile?.resume ? (
              <a
                href={user?.profile?.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline block mt-1"
              >
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span className="text-gray-500 block mt-1">No resume uploaded</span>
            )}
          </div>
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-xl font-semibold mb-4">Applied Jobs</h2>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
