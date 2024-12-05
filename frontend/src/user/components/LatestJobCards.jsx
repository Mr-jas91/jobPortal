import React from "react";
import { Badge } from "../../components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/description/${job._id}`)}
      className="cursor-pointer hover:shadow-md transition-shadow border border-gray-200"
    >
      {/* Card Header */}
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{job?.company?.name}</CardTitle>
        <CardDescription className="text-gray-500">India</CardDescription>
      </CardHeader>

      {/* Card Content */}
      <CardContent>
        <h2 className="text-xl font-bold text-gray-800">{job?.title}</h2>
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">{job?.description}</p>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="flex flex-wrap gap-2">
        <Badge variant="outline" className="text-blue-600 border-blue-600 font-medium">
          {job?.position} Positions
        </Badge>
        <Badge variant="outline" className="text-[#F83002] border-[#F83002] font-medium">
          {job?.jobType}
        </Badge>
        <Badge variant="outline" className="text-[#7209b7] border-[#7209b7] font-medium">
          {job?.salary} LPA
        </Badge>
        <Button
          variant="ghost"
          className="text-[#6A38C2] hover:bg-[#f5f3ff] ml-auto"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/description/${job._id}`);
          }}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LatestJobCards;
