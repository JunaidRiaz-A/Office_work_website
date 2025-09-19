import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import "./CaseStudy.css";
import { Link } from "react-router-dom";

// Helper function to create a URL-friendly slug from the title
const createSlug = (title) => {
  if (!title) return "";
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen
};

function CaseStudy() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const baseUrl = process.env.REACT_APP_BASE_URL;

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const response = await axiosInstance.get("/api/case-studies");
        // Sort case studies by created_at in descending order (newest first)
        const sortedCaseStudies = response.data.sort((a, b) =>
          new Date(b.created_at) - new Date(a.created_at)
        );
        setCaseStudies(sortedCaseStudies);
      } catch (error) {
        setError("Failed to load case studies. Please try again later.");
        console.error("Error fetching case studies:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCaseStudies();
  }, [baseUrl]);

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  if (error) return <div className="error_message">{error}</div>;

  const totalPages = Math.ceil(caseStudies.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedCaseStudies = caseStudies.slice(indexOfFirstItem, indexOfLastItem);

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return `${baseUrl}/images/default-image.jpg`;
    return `${baseUrl}${imageUrl.startsWith("/") ? imageUrl : "/" + imageUrl}`;
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0);
    } else {
      console.warn(`Invalid page number: ${pageNumber}. Must be between 1 and ${totalPages}`);
    }
  };

  const truncateDescription = (text) => {
    const words = text.split(" ");
    if (words.length <= 10) return text;
    return words.slice(0, 15).join(" ") + " ...";
  };

  return (
    <div className="main_div_CaseStudy">
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <h2 className="case_study_sub_heading">Explore Our Latest Case Studies</h2>
          <div className="d-flex justify-content-center">
            <div className="case_study_hr_line" />
          </div>
          <div className="row">
            {caseStudies.length === 0 ? (
              <p>No case studies available.</p>
            ) : (
              paginatedCaseStudies.map((caseStudy) => {
                const imageUrl = getImageUrl(caseStudy.image_url);
                return (
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12" key={caseStudy.id}>
                    <Link to={`/case/study/detail/${caseStudy.id}/${createSlug(caseStudy.title)}`}>
                      <div className="card_case_study">
                        <img
                          className="card_image"
                          src={imageUrl}
                          alt={caseStudy.title}
                          onError={(e) => {
                            if (e.target.src !== `${baseUrl}/images/default-image.jpg`) {
                              e.target.src = `${baseUrl}/images/default-image.jpg`;
                            }
                          }}
                        />
                        <div className="card_hover_content">
                          <div className="row m-0 p-0 align-items-center">
                            <div className="col-lg-8 col-md-8 col-sm-8 col-8">
                              <h3 className="heading_card_usecase">{caseStudy.title}</h3>
                              <p className="para_card_usecase">
                                {truncateDescription(caseStudy.case_explanation || caseStudy.case_paragraph || "No description available.")}
                              </p>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-4 text-center">
                              <button className="read_more_btn">Read more</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })
            )}
          </div>
          {caseStudies.length > 0 && totalPages > 1 && (
            <div className="pagination_div" style={paginationStyles.container}>
              {totalPages <= 4 ? (
                Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    style={
                      currentPage === page
                        ? { ...paginationStyles.dot, ...paginationStyles.activeDot }
                        : paginationStyles.dot
                    }
                  >
                    {page}
                  </button>
                ))
              ) : (
                <>
                  {currentPage > 3 && (
                    <>
                      <button
                        onClick={() => handlePageChange(1)}
                        style={
                          currentPage === 1
                            ? { ...paginationStyles.dot, ...paginationStyles.activeDot }
                            : paginationStyles.dot
                        }
                      >
                        1
                      </button>
                      {currentPage > 4 && <span className="pagination-ellipsis">...</span>}
                    </>
                  )}
                  {Array.from(
                    { length: Math.min(3, totalPages - (currentPage > totalPages - 2 ? 2 : 1)) },
                    (_, i) => (currentPage <= 3 ? i + 2 : currentPage + i - 1)
                  ).map((page) =>
                    page <= totalPages && (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        style={
                          currentPage === page
                            ? { ...paginationStyles.dot, ...paginationStyles.activeDot }
                            : paginationStyles.dot
                        }
                      >
                        {page}
                      </button>
                    )
                  )}
                  {currentPage < totalPages - 2 && (
                    <>
                      {currentPage < totalPages - 3 && <span className="pagination-ellipsis">...</span>}
                      <button
                        onClick={() => handlePageChange(totalPages)}
                        style={
                          currentPage === totalPages
                            ? { ...paginationStyles.dot, ...paginationStyles.activeDot }
                            : paginationStyles.dot
                        }
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
      </div>
    </div>
  );
}

const paginationStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "40px",
    marginBottom: "20px",
  },
  dot: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#e0e0e0",
    margin: "0 5px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    color: "#333",
    transition: "background-color 0.3s",
  },
  activeDot: {
    backgroundColor: "#ff6200",
    color: "#fff",
  },
};

export default CaseStudy;