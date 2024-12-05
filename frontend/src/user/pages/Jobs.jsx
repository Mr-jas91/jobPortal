import React, { useEffect, useState } from "react";
import Navbar from "../../components/shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "../components/Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Briefcase, Frown } from "lucide-react";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6 px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Sidebar */}
          <aside className="w-full md:w-1/4">
            <FilterCard />
          </aside>

          {/* Jobs Section */}
          <main className="flex-1 h-[85vh] overflow-y-auto pb-5">
            {filterJobs.length <= 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Frown size={48} className="text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold text-gray-700">
                  No jobs found
                </h2>
                <p className="text-gray-500">
                  Try adjusting your filters or search criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterJobs.map((job, index) => (
                  <motion.div
                    key={job?._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
