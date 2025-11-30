"use client"
import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faVideo, faFilePdf, faChevronDown, faChevronUp, faDownload, faPlay } from "@fortawesome/free-solid-svg-icons";

const ResourcesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (categoryKey) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
    }));
  };

  const resourcesData = {
    "class11": {
      title: "Class 11th",
      icon: "📚",
      subCategories: {
        "physics": {
          name: "Physics",
          resources: [
            { type: "video", title: "Mechanics Fundamentals", url: "#", description: "Complete video series on mechanics" },
            { type: "pdf", title: "Physics Formula Sheet", url: "#", description: "Comprehensive formula reference" },
            { type: "video", title: "Thermodynamics Explained", url: "#", description: "In-depth thermodynamics concepts" },
            { type: "pdf", title: "Physics Sample Papers", url: "#", description: "Previous year question papers" },
          ]
        },
        "chemistry": {
          name: "Chemistry",
          resources: [
            { type: "video", title: "Organic Chemistry Basics", url: "#", description: "Introduction to organic compounds" },
            { type: "pdf", title: "Periodic Table Guide", url: "#", description: "Complete periodic table reference" },
            { type: "video", title: "Chemical Bonding", url: "#", description: "Understanding chemical bonds" },
            { type: "pdf", title: "Chemistry Lab Manual", url: "#", description: "Practical experiments guide" },
          ]
        },
        "mathematics": {
          name: "Mathematics",
          resources: [
            { type: "video", title: "Calculus Fundamentals", url: "#", description: "Introduction to calculus" },
            { type: "pdf", title: "Math Formula Book", url: "#", description: "All important formulas" },
            { type: "video", title: "Algebra Masterclass", url: "#", description: "Complete algebra course" },
            { type: "pdf", title: "Math Practice Problems", url: "#", description: "Solved examples and exercises" },
          ]
        },
        "biology": {
          name: "Biology",
          resources: [
            { type: "video", title: "Cell Biology", url: "#", description: "Understanding cell structure" },
            { type: "pdf", title: "Biology Diagrams", url: "#", description: "Important diagrams collection" },
            { type: "video", title: "Genetics Explained", url: "#", description: "Complete genetics course" },
            { type: "pdf", title: "Biology Notes", url: "#", description: "Comprehensive study notes" },
          ]
        }
      }
    },
    "class12": {
      title: "Class 12th",
      icon: "🎓",
      subCategories: {
        "physics": {
          name: "Physics",
          resources: [
            { type: "video", title: "Electromagnetism", url: "#", description: "Complete electromagnetism course" },
            { type: "pdf", title: "Physics Revision Notes", url: "#", description: "Quick revision material" },
            { type: "video", title: "Optics and Waves", url: "#", description: "Wave optics explained" },
            { type: "pdf", title: "JEE Physics Preparation", url: "#", description: "JEE level physics problems" },
          ]
        },
        "chemistry": {
          name: "Chemistry",
          resources: [
            { type: "video", title: "Organic Reactions", url: "#", description: "Complete reaction mechanisms" },
            { type: "pdf", title: "Chemistry Revision Guide", url: "#", description: "Quick revision notes" },
            { type: "video", title: "Inorganic Chemistry", url: "#", description: "Inorganic compounds and reactions" },
            { type: "pdf", title: "NEET Chemistry Notes", url: "#", description: "NEET preparation material" },
          ]
        },
        "mathematics": {
          name: "Mathematics",
          resources: [
            { type: "video", title: "Advanced Calculus", url: "#", description: "Differential and integral calculus" },
            { type: "pdf", title: "Math JEE Preparation", url: "#", description: "JEE level mathematics" },
            { type: "video", title: "Probability & Statistics", url: "#", description: "Complete statistics course" },
            { type: "pdf", title: "Math Previous Papers", url: "#", description: "Board exam papers" },
          ]
        },
        "biology": {
          name: "Biology",
          resources: [
            { type: "video", title: "Human Physiology", url: "#", description: "Complete human body systems" },
            { type: "pdf", title: "Biology NEET Notes", url: "#", description: "NEET preparation material" },
            { type: "video", title: "Ecology and Environment", url: "#", description: "Environmental biology" },
            { type: "pdf", title: "Biology Diagrams PDF", url: "#", description: "Important diagrams for exams" },
          ]
        }
      }
    },
    "engineering": {
      title: "Engineering",
      icon: "⚙️",
      subCategories: {
        "computer-science": {
          name: "Computer Science",
          resources: [
            { type: "video", title: "Data Structures & Algorithms", url: "#", description: "Complete DSA course" },
            { type: "pdf", title: "Programming Fundamentals", url: "#", description: "C/C++ programming guide" },
            { type: "video", title: "Database Management", url: "#", description: "SQL and database design" },
            { type: "pdf", title: "Software Engineering Notes", url: "#", description: "SE principles and practices" },
          ]
        },
        "mechanical": {
          name: "Mechanical Engineering",
          resources: [
            { type: "video", title: "Thermodynamics", url: "#", description: "Engineering thermodynamics" },
            { type: "pdf", title: "Machine Design", url: "#", description: "Design principles and calculations" },
            { type: "video", title: "Fluid Mechanics", url: "#", description: "Complete fluid mechanics course" },
            { type: "pdf", title: "CAD/CAM Notes", url: "#", description: "Computer-aided design guide" },
          ]
        },
        "electrical": {
          name: "Electrical Engineering",
          resources: [
            { type: "video", title: "Circuit Analysis", url: "#", description: "AC/DC circuit fundamentals" },
            { type: "pdf", title: "Power Systems", url: "#", description: "Power generation and distribution" },
            { type: "video", title: "Digital Electronics", url: "#", description: "Logic gates and circuits" },
            { type: "pdf", title: "Control Systems", url: "#", description: "Control theory and applications" },
          ]
        },
        "civil": {
          name: "Civil Engineering",
          resources: [
            { type: "video", title: "Structural Analysis", url: "#", description: "Building structure design" },
            { type: "pdf", title: "Concrete Technology", url: "#", description: "Concrete mix design" },
            { type: "video", title: "Surveying", url: "#", description: "Land surveying techniques" },
            { type: "pdf", title: "Construction Management", url: "#", description: "Project management guide" },
          ]
        }
      }
    }
  };

  const handleResourceClick = (resource) => {
    // Handle resource click - can be extended to open modal, download, etc.
    console.log("Opening resource:", resource);
    if (resource.type === "video") {
      // Open video player or redirect
      window.open(resource.url, '_blank');
    } else {
      // Download PDF or open in new tab
      window.open(resource.url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#1e293b] to-[#0F172A] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#F39C12]">
            Study Resources Databank
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Access comprehensive study materials including videos and PDFs for Class 11th, Class 12th, and Engineering courses
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {Object.entries(resourcesData).map(([key, category]) => (
            <div
              key={key}
              className={`bg-[#1e293b] rounded-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 ${
                selectedCategory === key
                  ? 'border-[#F39C12] shadow-lg'
                  : 'border-transparent hover:border-[#F39C12]'
              }`}
              onClick={() => {
                setSelectedCategory(selectedCategory === key ? null : key);
                setSelectedSubCategory(null);
              }}
            >
              <div className="text-5xl mb-4 text-center">{category.icon}</div>
              <h2 className="text-2xl font-bold text-center text-[#F39C12] mb-2">
                {category.title}
              </h2>
              <p className="text-gray-400 text-center text-sm">
                {Object.keys(category.subCategories).length} subjects available
              </p>
            </div>
          ))}
        </div>

        {/* Resources Display */}
        {selectedCategory && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-[#F39C12]">
                {resourcesData[selectedCategory].title} - Subjects
              </h2>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSubCategory(null);
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Close
              </button>
            </div>

            {/* Sub-Categories */}
            <div className="space-y-4">
              {Object.entries(resourcesData[selectedCategory].subCategories).map(([subKey, subCategory]) => (
                <div
                  key={subKey}
                  className="bg-[#1e293b] rounded-lg overflow-hidden border border-gray-700"
                >
                  <button
                    onClick={() => toggleCategory(subKey)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#334155] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <FontAwesomeIcon icon={faBook} className="text-[#F39C12] text-xl" />
                      <h3 className="text-xl font-semibold">{subCategory.name}</h3>
                      <span className="text-sm text-gray-400">
                        ({subCategory.resources.length} resources)
                      </span>
                    </div>
                    <FontAwesomeIcon
                      icon={expandedCategories[subKey] ? faChevronUp : faChevronDown}
                      className="text-gray-400"
                    />
                  </button>

                  {expandedCategories[subKey] && (
                    <div className="px-6 py-4 bg-[#0F172A]">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {subCategory.resources.map((resource, index) => (
                          <div
                            key={index}
                            className="bg-[#1e293b] rounded-lg p-4 hover:bg-[#334155] transition-all duration-300 cursor-pointer border border-gray-700 hover:border-[#F39C12]"
                            onClick={() => handleResourceClick(resource)}
                          >
                            <div className="flex items-start gap-4">
                              <div className={`p-3 rounded-lg ${
                                resource.type === 'video' 
                                  ? 'bg-red-500/20 text-red-400' 
                                  : 'bg-blue-500/20 text-blue-400'
                              }`}>
                                <FontAwesomeIcon
                                  icon={resource.type === 'video' ? faVideo : faFilePdf}
                                  className="text-xl"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-white mb-1">
                                  {resource.title}
                                </h4>
                                <p className="text-sm text-gray-400 mb-3">
                                  {resource.description}
                                </p>
                                <div className="flex items-center gap-2 text-sm">
                                  {resource.type === 'video' ? (
                                    <>
                                      <FontAwesomeIcon icon={faPlay} className="text-[#F39C12]" />
                                      <span className="text-[#F39C12]">Watch Video</span>
                                    </>
                                  ) : (
                                    <>
                                      <FontAwesomeIcon icon={faDownload} className="text-[#F39C12]" />
                                      <span className="text-[#F39C12]">Download PDF</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!selectedCategory && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-semibold text-gray-400 mb-2">
              Select a category to view resources
            </h3>
            <p className="text-gray-500">
              Choose from Class 11th, Class 12th, or Engineering to explore study materials
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResourcesPage
