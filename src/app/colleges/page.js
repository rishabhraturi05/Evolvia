"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CollegeTable = () => {
  const colleges = [
    { sr: 1, name: "University of Jammu", address: "Baba Saheb Ambedkar Road, Jammu Tawi, Jammu, J&K – 180006" },
    { sr: 2, name: "University of Kashmir", address: "Hazratbal, Srinagar, J&K – 190006" },
    { sr: 3, name: "Shri Mata Vaishno Devi University", address: "Sub-Post Office, SMVDU Campus, Katra, Reasi, J&K – 182320" },
    { sr: 4, name: "Government College for Women, Parade", address: "Parade Ground, Jammu, J&K – 180001" },
    { sr: 5, name: "Government Degree College, Baramulla", address: "Kanth Bagh, Baramulla, J&K – 193101" },
  ];

  const [filtered, setFiltered] = useState(colleges);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColleges, setSelectedColleges] = useState([]);

  // LOGIC FIX: Accept the `college` object directly
  const handleClick = (clickedCollege) => {
    const selected = [...selectedColleges];
    const alreadySelected = selected.find((c) => c.sr === clickedCollege.sr);

    if (alreadySelected) {
      setSelectedColleges(selected.filter((c) => c.sr !== clickedCollege.sr));
    } else if (selected.length < 3) {
      setSelectedColleges([...selected, clickedCollege]);
    }
  };

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
      className="flex flex-col w-full text-black"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header Section */}
      <div className="w-full bg-gradient-to-r p-6">
        <h1 className="font-extrabold text-3xl text-gray-800 mb-6 tracking-wide flex justify-center">
          Colleges in Jammu & Kashmir
        </h1>
        <div className="flex gap-3 justify-center">
          <input
            type="text"
            onChange={handleChange}
            placeholder="Search colleges..."
            className="text-black h-12 md:w-1/2 p-3 rounded-xl outline-none border-[1px] shadow-md max-w-3xl"
          />
          <button
            onClick={toggleCompare}
            className="px-4 py-2 rounded-xl bg-[#F39C12] text-white font-semibold hover:bg-[#a26605] transition shadow-sm"
          >
            Compare
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="p-6 m-4">
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 z-10">
              <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
                <th className="px-6 py-3 border">Sr. No.</th>
                <th className="px-6 py-3 border">College Name</th>
                <th className="px-6 py-3 border">Address</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((college) => (
                  <tr
                    key={college.sr}
                    className="odd:bg-white even:bg-gray-50 hover:bg-amber-50 transition-colors duration-300"
                  >
                    <td className="px-6 py-3 border text-gray-700 font-medium">{college.sr}</td>
                    <td className="px-6 py-3 border text-gray-800 font-semibold flex items-center gap-2">
                      {college.name}
                      <button
                        // LOGIC FIX: Pass the entire `college` object
                        onClick={() => handleClick(college)}
                        className={`px-3 py-1 rounded-lg text-white text-sm font-medium transition shadow-sm ${
                          selectedColleges.find((c) => c.sr === college.sr)
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-[#F39C12] hover:bg-[#a26605]"
                        }`}
                      >
                        {selectedColleges.find((c) => c.sr === college.sr) ? "Remove" : "Select"}
                      </button>
                    </td>
                    <td className="px-6 py-3 border text-gray-600">{college.address}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-500 italic">No colleges found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
              className="bg-white p-6 rounded-2xl shadow-xl w-[80%] max-w-3xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Compare Colleges</h2>
              {selectedColleges.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
                        <th className="px-6 py-3 border text-left">Field</th>
                        {selectedColleges.map((college) => (
                          // SYNTAX FIX: Use backticks for the key prop
                          <th key={`header-${college.sr}`} className="px-6 py-3 border text-left">
                            College {college.sr}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-3 border font-semibold text-gray-800">College Name</td>
                        {selectedColleges.map((college) => (
                          // SYNTAX FIX: Use backticks for the key prop
                          <td key={`name-${college.sr}`} className="px-6 py-3 border text-gray-700">
                            {college.name}
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-3 border font-semibold text-gray-800">Address</td>
                        {selectedColleges.map((college) => (
                           // SYNTAX FIX: Use backticks for the key prop
                          <td key={`address-${college.sr}`} className="px-6 py-3 border text-gray-600">
                            {college.address}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600 text-center">No colleges selected for comparison.</p>
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