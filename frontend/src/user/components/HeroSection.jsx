import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="relative bg-gradient-to-br from-[#6A38C2] via-[#503195] to-[#321D6E] text-white py-16">
      <div className="container mx-auto px-6 flex flex-col items-center text-center space-y-8">
        <div className="bg-[#F83002] text-white font-medium text-sm px-4 py-2 rounded-full shadow-md">
          No. 1 Job Hunt Website
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">
          Find Your Next Opportunity <br />
          with <span className="text-[#FFD700]">Dream Jobs</span>
        </h1>
        <p className="max-w-lg text-lg text-gray-200">
          Discover thousands of job openings tailored just for you. Kickstart
          your career with ease and confidence.
        </p>
        <div className="w-full sm:w-[60%] flex items-center bg-white text-gray-700 rounded-full overflow-hidden shadow-lg">
          <input
            type="text"
            placeholder="Search for your dream job..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow px-4 py-3 outline-none border-none"
          />
          <Button
            onClick={searchJobHandler}
            className="bg-[#F83002] text-white px-6 py-3 hover:bg-[#d42a02] rounded-none"
          >
            <Search className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex space-x-4">
          <Button
            onClick={searchJobHandler}
            className="bg-[#FFD700] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#e6c200]"
          >
            Browse Jobs
          </Button>
          <Button
            onClick={() => navigate("/signup")}
            className="bg-[#6A38C2] px-6 py-3 rounded-lg font-medium hover:bg-[#503195]"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
