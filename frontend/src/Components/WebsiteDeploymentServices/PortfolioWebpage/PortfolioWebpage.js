import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function PortfolioWebpage() {
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

  return (
    <div className="main_div_work_speaks">
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
                    <Link to={`/case/study/detail/${caseStudy.id}`}>
                      <div className="card_case_study">
                        <img
                          className="card_case_study"
                          src={imageUrl}
                          alt={caseStudy.title}
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
                              <p className="heading_card_usecase">{caseStudy.title}</p>
                              <p className="para_card_usecase">
                                {caseStudy.case_explanation || caseStudy.case_paragraph || "No description available."}
                              </p>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-4">
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
          {/* Pagination with wrapper for better positioning */}
          {caseStudies.length > 0 && totalPages > 1 && (
            <div className="pagination-wrapper">
              <div className="pagination">
                {totalPages <= 4 ? (
                  Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`pagination-btn ${currentPage === page ? "active" : ""}`}
                    >
                      {page}
                    </button>
                  ))
                ) : (
                  <>
                    {currentPage > 3 && (
                      <>
                        <button
                          onClick={() => setCurrentPage(1)}
                          className={`pagination-btn ${currentPage === 1 ? "active" : ""}`}
                        >
                          1
                        </button>
                        {currentPage > 4 && <span className="pagination-ellipsis">...</span>}
                      </>
                    )}
                    {Array.from({ length: Math.min(3, totalPages - (currentPage > totalPages - 2 ? 2 : 1)) }, (_, i) => 
                      currentPage + i - 1
                    ).map((page) => (
                      page <= totalPages && (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`pagination-btn ${currentPage === page ? "active" : ""}`}
                        >
                          {page}
                        </button>
                      )
                    ))}
                    {currentPage < totalPages - 2 && (
                      <>
                        {currentPage < totalPages - 3 && <span className="pagination-ellipsis">...</span>}
                        <button
                          onClick={() => setCurrentPage(totalPages)}
                          className={`pagination-btn ${currentPage === totalPages ? "active" : ""}`}
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
      </div>
    </div>
  );
}

export default PortfolioWebpage;