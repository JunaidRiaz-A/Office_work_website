import React, { useEffect, useState } from "react";
import "./../NewJobOpenings/NewJobOpenings.css";
import { CiLocationOn, CiDollar } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axiosInstance from "../../api/axiosInstance"; 

function NewJobOpenings() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 8;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axiosInstance.get("/api/jobs");
        setJobs(response.data || []);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const jobDescription = (jobId) => {
    navigate("/job/description", { state: { jobId } });
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0);
    }
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  // Display loader while fetching data
  if (loading) {
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

  return (
    <div className="main_div_newjobopenings">
       <Helmet>
        <title>Explore Tech Careers That Grow with You | Join 360synergytech Today</title>
        <meta name="description" content="Ready to level up your tech career? Explore growth-driven roles at 360synergytech and join a team shaping digital innovation." />
        <meta name="keywords" content="360synergytech, tech careers, AI jobs, web development, cloud development, job opportunities" />
        <link rel="canonical" href="https://360synergytech.com/applynow" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "CareerPage",
              "name": "Careers at 360synergytech",
              "url": "https://360synergytech.com/applynow",
              "description": "Join 360synergytech and grow your tech career in AI, web development, cloud computing, and automation."
            }
          `}
        </script>
      </Helmet>
      <div className="d-flex justify-content-center">
        <div className="new_opening_div_hr"></div>
      </div>
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
         
          <h1 className="new_opening_para"> Grow Your Tech Career with 360synergytech | New Openings</h1>
          <h2 className="new_opening_heading">Explore Exciting Opportunities in AI, Web, and Cloud Development</h2>
          <div className="row">
            {currentJobs.map((job) => (
              <div className="col-lg-6 col-md-6 col-sm-12 col-12" key={job.id}>
                <div className="main_div_job_open_card">
                  <div className="row p-0 m-0">
                    <div className="col-lg-8 col-md-9 col-sm-12 col-12">
                      {/* Job title as h4 */}
                      <h4 className="heading_position_name">{truncateText(job.title, 40)}</h4>
                      <div className="d-flex flex-row">
                        <span className="by_grey_job_desp">By </span>
                        {/* Category as h5 */}
                        <h5 className="black_para_job_desp" style={{ display: "inline", fontWeight: 600, margin: 0 }}>{job.category}</h5>
                        <span className="by_grey_job_desp">in</span>
                        <span className="by_orange_job_desp">{job.category}</span>
                      </div>
                      <div className="d-flex flex-wrap">
                        <button className="btn_in_house_job">{job.mode}</button>
                        <button className="btn_in_house_job">
                          <CiLocationOn />
                          {job.location}
                        </button>
                        <button className="btn_in_house_job">
                          <CiDollar />
                          {job.salary ? `${job.salary} Yearly` : "N/A"}
                        </button>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-3 col-sm-12 col-12">
                      <button className="apply_now_btn_job" onClick={() => jobDescription(job.id)}>Apply Now</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination_div" style={paginationStyles.container}>
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    style={
                      currentPage === pageNumber
                        ? { ...paginationStyles.dot, ...paginationStyles.activeDot }
                        : paginationStyles.dot
                    }
                  >
                    {/* h5 for page number, visually styled as span */}
                    <h5 style={{ margin: 0, fontSize: 16, fontWeight: 600, display: "inline" }}>{pageNumber}</h5>
                  </button>
                );
              })}
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
    marginTop: "20px",
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
    backgroundColor: "#ff6809",
    color: "#fff",
  },
};

export default NewJobOpenings;