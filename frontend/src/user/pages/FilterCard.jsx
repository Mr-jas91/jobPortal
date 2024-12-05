import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { ChevronDown, ChevronUp } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [openSections, setOpenSections] = useState({});
  const dispatch = useDispatch();

  const toggleSection = (type) => {
    setOpenSections((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md">
      <h1 className="font-bold text-xl mb-4">Filter Jobs</h1>
      <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-4">
        {filterData.map((data, index) => (
          <div key={index} className="border-b pb-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection(data.filterType)}
            >
              <h2 className="font-semibold text-lg">{data.filterType}</h2>
              {openSections[data.filterType] ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </div>
            {openSections[data.filterType] && (
              <div className="mt-3 space-y-2">
                {data.array.map((item, idx) => {
                  const itemId = `id-${index}-${idx}`;
                  return (
                    <div key={itemId} className="flex items-center space-x-2">
                      <RadioGroupItem value={item} id={itemId} />
                      <Label htmlFor={itemId} className="text-gray-700">
                        {item}
                      </Label>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
