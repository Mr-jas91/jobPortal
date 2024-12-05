import React from 'react';
import { Button } from '../../components/ui/button';
import { Bookmark, Calendar, MapPin } from 'lucide-react';
import { Avatar, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-6 rounded-lg shadow-md bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="flex items-center text-sm text-gray-500 gap-1">
          <Calendar size={16} />
          {daysAgoFunction(job?.createdAt) === 0 ? 'Today' : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="ghost" size="icon" className="hover:bg-gray-100">
          <Bookmark size={18} />
        </Button>
      </div>

      {/* Company Information */}
      <div className="flex items-center gap-4 mb-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={job?.company?.logo || '/placeholder-logo.png'} alt={job?.company?.name} />
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{job?.company?.name}</h2>
          <p className="flex items-center text-sm text-gray-500 gap-1">
            <MapPin size={16} /> {job?.location || 'India'}
          </p>
        </div>
      </div>

      {/* Job Title and Description */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900">{job?.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="outline" className="text-blue-600 border-blue-600">
          {job?.position} Positions
        </Badge>
        <Badge variant="outline" className="text-red-600 border-red-600">
          {job?.jobType}
        </Badge>
        <Badge variant="outline" className="text-purple-600 border-purple-600">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate(`/description/${job?._id}`)}>
          View Details
        </Button>
        <Button className="bg-purple-700 text-white hover:bg-purple-800">
          Save for Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
