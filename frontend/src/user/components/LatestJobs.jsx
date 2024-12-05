import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import useGetAllJobs from "@/hooks/useGetAllJobs";
const LatestJobs = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  return (
    <div className="max-w-7xl mx-auto py-16 px-6">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">
          <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
        </h1>
        <p className="text-gray-600 mt-2">
          Explore the latest job opportunities tailored to your skills and
          aspirations.
        </p>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allJobs.length <= 0 ? (
          <Card className="col-span-full p-6 text-center">
            <CardHeader>
              <CardTitle className="text-gray-800 text-xl">
                No Jobs Available
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We currently have no job openings. Please check back later.
              </p>
            </CardContent>
          </Card>
        ) : (
          allJobs
            .slice(0, 6)
            .map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>

      {/* View More Button */}
      {allJobs.length > 6 && (
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="text-[#6A38C2] border-[#6A38C2] hover:bg-[#f3e8ff]"
            onClick={() => console.log("View More Clicked")}
          >
            View More Jobs
          </Button>
        </div>
      )}
    </div>
  );
};

export default LatestJobs;
