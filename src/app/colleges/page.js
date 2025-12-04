"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CollegeTable = () => {
  const [colleges, setColleges] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColleges, setSelectedColleges] = useState([]);

  // Fetch colleges from MongoDB
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch("/api/colleges");
        if (!response.ok) {
          throw new Error("Failed to fetch colleges");
        }
        const data = await response.json();
        setColleges(data);
        setFiltered(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  // Selection logic (max 3 colleges)
  const handleClick = (clickedCollege) => {
    const alreadySelected = selectedColleges.find(
      (c) => c.srNo === clickedCollege.srNo
    );

    if (alreadySelected) {
      // Remove it
      setSelectedColleges(
        selectedColleges.filter((c) => c.srNo !== clickedCollege.srNo)
      );
    } else if (selectedColleges.length < 3) {
      // Add only if less than 3
      setSelectedColleges([...selectedColleges, clickedCollege]);
    }
  };

  // Search filter
  const handleChange = (e) => {
    const search = e.target.value;
    const filteredColleges = colleges.filter((el) =>
      el.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredColleges);
  };

  const toggleCompare = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.div
      className="flex flex-col w-full min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-[#0F172A] text-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header Section */}
      <div className="w-full bg-gradient-to-r from-slate-800 to-slate-900 p-6">
        <h1 className="font-extrabold text-3xl md:text-4xl text-white mb-6 tracking-wide flex justify-center">
          Colleges in Jammu & Kashmir
        </h1>
        <div className="flex gap-3 justify-center">
          <input
            type="text"
            onChange={handleChange}
            placeholder="Search colleges..."
            className="text-white bg-slate-800/70 backdrop-blur-sm border border-slate-700 h-12 md:w-1/2 p-3 rounded-xl outline-none shadow-md max-w-3xl placeholder-slate-400 focus:border-[#F39C12]"
          />
          <button
            onClick={toggleCompare}
            className="px-4 py-2 rounded-xl bg-[#F39C12] text-white font-semibold hover:bg-[#d7890f] transition shadow-sm"
          >
            Compare
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="p-6 m-4">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F39C12]"></div>
            <span className="ml-3 text-slate-300">Loading colleges...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-400 text-lg font-semibold mb-2">
              Error loading colleges
            </div>
            <div className="text-slate-300">{error}</div>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-xl border border-slate-700">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 z-10">
                <tr className="bg-slate-800/90 backdrop-blur-sm text-white text-sm uppercase tracking-wide">
                  <th className="py-6 border border-slate-700 text-center">Sr. No.</th>
                  <th className="px-6 py-3 border border-slate-700">College Name</th>
                  <th className="px-6 py-3 border border-slate-700">Address</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((college) => (
                    <tr
                      key={college._id}
                      className="odd:bg-slate-800/50 even:bg-slate-800/30 hover:bg-slate-700/50 transition-colors duration-300"
                    >
                      <td className="py-3 border border-slate-700 text-slate-300 font-medium text-center">
                        {college.srNo}
                      </td>
                      <td className="px-6 py-3 border border-slate-700 text-white font-semibold items-center text-center">
                        {college.name}
                        <button
                          onClick={() => handleClick(college)}
                          className={`ml-4 px-3 py-1 rounded-lg text-white text-sm font-medium transition shadow-sm ${
                            selectedColleges.find(
                              (c) => c.srNo === college.srNo
                            )
                              ? "bg-red-500 hover:bg-red-600"
                              : "bg-[#F39C12] hover:bg-[#d7890f]"
                          }`}
                        >
                          {selectedColleges.find(
                            (c) => c.srNo === college.srNo
                          )
                            ? "Remove"
                            : "Select"}
                        </button>
                      </td>
                      <td className="px-6 py-3 border border-slate-700 text-slate-300 text-center">
                        {college.location}
                        <br />
                        {college.phoneNumber}
                        <br />
                        {college.emailAddress}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="text-center py-6 text-slate-400 italic border border-slate-700"
                    >
                      No colleges found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedColleges.length === 3 && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-xl shadow-lg">
          Max colleges have been selected for comparison.
        </div>
      )}

      {/* Compare Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-slate-800/90 backdrop-blur-lg p-6 rounded-2xl shadow-xl w-[80%] max-w-3xl border border-slate-700"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4 text-center">
                Compare Colleges
              </h2>
              {selectedColleges.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-700/50 text-white text-sm uppercase tracking-wide">
                        <th className="px-6 py-3 border border-slate-600 text-left">Field</th>
                        {selectedColleges.map((college) => (
                          <th
                            key={`header-${college.srNo}`}
                            className="px-6 py-3 border border-slate-600 text-left"
                          >
                            College {college.srNo}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-slate-700/30">
                        <td className="px-6 py-3 border border-slate-600 font-semibold text-white">
                          College Name
                        </td>
                        {selectedColleges.map((college) => (
                          <td
                            key={`name-${college.srNo}`}
                            className="px-6 py-3 border border-slate-600 text-slate-300"
                          >
                            {college.name}
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-slate-700/30">
                        <td className="px-6 py-3 border border-slate-600 font-semibold text-white">
                          Address
                        </td>
                        {selectedColleges.map((college) => (
                          <td
                            key={`address-${college.srNo}`}
                            className="px-6 py-3 border border-slate-600 text-slate-300"
                          >
                            {college.location}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-slate-300 text-center">
                  No colleges selected for comparison.
                </p>
              )}
              <div className="flex justify-center mt-6">
                <button
                  onClick={toggleCompare}
                  className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CollegeTable;
