import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { useNavigate, useParams } from "react-router-dom";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { axiosInstance } from "@/utils/interCepter";
import Navbar from "@/components/shared/Navbar";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const applyJobHandler = async () => {
    try {
      if (!user) {
        navigate("/login");
      }
      const res = await axiosInstance.get(`application/apply/${jobId}`);
      if (res.data.success) {
        setIsApplied(true); // Update the local state
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }]
        };
        dispatch(setSingleJob(updatedSingleJob)); // Real-time UI update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axiosInstance.get(`job/get/${jobId}`);
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          ); // Sync state with fetched data
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto py-10 px-4">
        <Card>
          {/* Header Section */}
          <CardHeader className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">
                {singleJob?.title}
              </CardTitle>
              <CardDescription className="text-gray-500 mt-1">
                Posted by{" "}
                <span className="font-medium">{singleJob?.company?.name}</span>
              </CardDescription>
            </div>
            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`${
                isApplied
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-[#6A38C2] hover:bg-[#5f32ad]"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </CardHeader>

          {/* Badge Section */}
          <CardContent className="mt-4">
            <div className="flex flex-wrap gap-3">
              <Badge
                variant="outline"
                className="text-blue-600 border-blue-600"
              >
                {singleJob?.position} Positions
              </Badge>
              <Badge
                variant="outline"
                className="text-[#F83002] border-[#F83002]"
              >
                {singleJob?.jobType}
              </Badge>
              <Badge
                variant="outline"
                className="text-[#7209b7] border-[#7209b7]"
              >
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </CardContent>

          {/* Job Details */}
          <CardContent className="mt-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Role</h4>
                <p className="text-gray-700">{singleJob?.title}</p>
              </div>
              <div>
                <h4 className="font-semibold">Location</h4>
                <p className="text-gray-700">{singleJob?.location}</p>
              </div>
              <div>
                <h4 className="font-semibold">Description</h4>
                <p className="text-gray-700">{singleJob?.description}</p>
              </div>
              <div>
                <h4 className="font-semibold">Experience</h4>
                <p className="text-gray-700">{singleJob?.experience} years</p>
              </div>
              <div>
                <h4 className="font-semibold">Total Applicants</h4>
                <p className="text-gray-700">
                  {singleJob?.applications?.length}
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Posted Date</h4>
                <p className="text-gray-700">
                  {singleJob?.createdAt?.split("T")[0]}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default JobDescription;
