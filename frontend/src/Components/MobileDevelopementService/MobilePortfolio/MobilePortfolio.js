import React, { useEffect, useState } from "react";
import axios from "axios";
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

function MobilePortfolio() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/case-studies`);
        console.log("API Response:", response.data); // Debug API response
        setCaseStudies(response.data);
      } catch (error) {
        setError("Failed to load case studies. Please try again later.");
        console.error("Error fetching case studies:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCaseStudies();
  }, [baseUrl]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="error_message">{error}</div>;

  const totalPages = Math.ceil(caseStudies.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedCaseStudies = caseStudies.slice(indexOfFirstItem, indexOfLastItem);

  // Normalize image URL
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return `${baseUrl}/images/default-image.jpg`;
    return `${baseUrl}${imageUrl.startsWith('/') ? imageUrl : '/' + imageUrl}`;
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="main_div_CaseStudy">
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="row">
            {caseStudies.length === 0 ? (
              <p>No case studies available.</p>
            ) : (
              paginatedCaseStudies.map((caseStudy) => {
                const imageUrl = getImageUrl(caseStudy.image_url);
                return (
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12" key={caseStudy.id}>
                    <Link to={`/case/study/detail/${caseStudy.id}/${createSlug(caseStudy.title)}`}>
                      <div className="card_case_study">
                        <img
                          className="card_case_study"
                          src={imageUrl}
                          alt={caseStudy.title}
                          style={{ width: "600px", height: "330px", objectFit: "cover" }}
                          onError={(e) => {
                            console.log(`Image failed to load for ${caseStudy.title}:`, e.target.src);
                            if (e.target.src !== `${baseUrl}/images/default-image.jpg`) {
                              e.target.src = `${baseUrl}/images/default-image.jpg`;
                            }
                          }}
                        />
                        <div className="card_hover_content">
                          <div className="row m-0 p-0">
                            <div className="col-lg-8 col-md-8 col-sm-8 col-8">
                              <h3 className="heading_card_usecase">{caseStudy.title}</h3>
                              <p className="para_card_usecase">
                                {caseStudy.case_explanation || caseStudy.case_paragraph || "No description available."}
                              </p>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                              <Link
                                to={`/case/study/detail/${caseStudy.id}/${createSlug(caseStudy.title)}`}
                                className="read_more_btn"
                              >
                                Read more
                              </Link>
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

      <style jsx>{`
        .main_div_CaseStudy {
          padding: 20px;
        }
        .card_case_study {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .card_case_study img {
          width: 600px;
          height: 330px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .card_hover_content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 15px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .card_case_study:hover .card_hover_content {
          opacity: 1;
        }
        .heading_card_usecase {
          font-size: 1.2em;
          font-weight: bold;
          margin: 0 0 10px;
          color: #fff;
        }
        .para_card_usecase {
          font-size: 0.9em;
          margin: 0;
          color: #ccc;
        }
        .read_more_btn {
          background: #ff6200;
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 5px;
          cursor: pointer;
          width: 100%;
          text-decoration: none;
          display: inline-block;
          text-align: center;
        }
        .pagination_div {
          display: flex;
          justify-content: center;
          margin-top: 40px;
          margin-bottom: 20px;
        }
        .pagination-ellipsis {
          display: flex;
          align-items: center;
          font-size: 16px;
          color: #333;
          margin: 0 5px;
        }
        @media (max-width: 768px) {
          .col-sm-6 {
            flex: 0 0 100%;
            max-width: 100%;
          }
          .card_case_study img {
            width: 100%;
            height: 250px;
          }
        }
      `}</style>
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

export default MobilePortfolio;