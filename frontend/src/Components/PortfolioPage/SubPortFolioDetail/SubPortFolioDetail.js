import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { IoIosCall, IoMdArrowDropright } from "react-icons/io";

function SubPortFolio() {
  const { id, title } = useParams(); // Extract both id and title from URL
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [failedImages, setFailedImages] = useState(new Set());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`api/portfolios/${id}`);
        console.log("Portfolio API Response:", response.data);
        setPortfolio(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
        setError("Failed to load portfolio details. Please try again later.");
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [id]);

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return `${baseUrl}/images/default-image.jpg`;
    return `${baseUrl}${imageUrl.startsWith("/") ? imageUrl : "/" + imageUrl}`;
  };

  const handleImageError = (e, imageId) => {
    const defaultImage = `${baseUrl}/images/default-image.jpg`;
    if (!failedImages.has(imageId)) {
      console.log(`Image failed to load for ${imageId}:`, e.target.src);
      setFailedImages((prev) => new Set(prev).add(imageId));
      e.target.src = defaultImage;
    }
  };

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

  if (error) {
    return (
      <div className="error_message">
        {error}
        <button className="btn_back_blog" onClick={() => navigate("/portfolio")}>
          <IoMdArrowDropright /> Go back to Portfolio
        </button>
      </div>
    );
  }

  if (!portfolio) {
    return <div>Portfolio not found.</div>;
  }

  const category = Array.isArray(portfolio.portfolio_category)
    ? (portfolio.portfolio_category[0] || "Not specified").replace(/[\[\]']+/g, "").trim()
    : (portfolio.portfolio_category || "Not specified").replace(/[\[\]']+/g, "").trim();

  return (
    <div className="main_div_CaseStudyDetail">
      <div className="row p-0 m-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="row m-0 p-0">
            <div className="col-lg-8 col-md-12 col-sm-12 col-12">
              <div className="image-container">
                <img
                  src={getImageUrl(portfolio.image)}
                  alt={portfolio.title || "Portfolio Image"}
                  className="img_bg_casestudydetail blink"
                  onError={(e) => handleImageError(e, `main-${portfolio.title}`)}
                />
                <div className="text-container">
                  <p className="heading_orange_casestudydetail" style={{ textAlign: "justify", margin: "0" }}>{portfolio.title}</p>
                  <p className="para_black_casestudydetail" style={{ textAlign: "justify", wordWrap: "break-word", overflowWrap: "break-word" }}>{portfolio.description}</p>
                </div>
              </div>
              <div className="row p-0 m-0">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                  <img
                    src={getImageUrl(portfolio.image)}
                    className="img_bg_casestudydetail1"
                    alt="Additional Image 1"
                    onError={(e) => handleImageError(e, `additional1-${portfolio.title}`)}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                  <img
                    src={getImageUrl(portfolio.image)}
                    className="img_bg_casestudydetail2"
                    alt="Additional Image 2"
                    onError={(e) => handleImageError(e, `additional2-${portfolio.title}`)}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-12">
              <div className="project_info_div">
                <p className="project_info_heading">Project Info</p>
                <div className="row p-0 m-0">
                  <div className="col-6">
                    <p className="detail_heading_project_info">Category:</p>
                  </div>
                  <div className="col-6">
                    <p className="detail_heading_project_info1">{category}</p>
                  </div>
                </div>
              </div>
              <div className="blue_div_questions">
                <div className="d-flex justify-content-center">
                  <button className="btn_call_questions">
                    <IoIosCall />
                  </button>
                </div>
                <p className="cll_us_question_heading">Have any Questions? Call us Today!</p>
                <p className="cll_us_phone">(123) 222-8888</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
      </div>

      <style jsx>{`
        .main_div_CaseStudyDetail {
          padding: 20px;
        }

        .image-container {
          position: relative;
          width: 100%;
        }

        .text-container {
          position: relative;
          width: 100%;
          padding: 10px 0;
          box-sizing: border-box;
        }

        .img_bg_casestudydetail {
          width: 100%;
          height: auto;
          display: block;
        }

        .heading_orange_casestudydetail {
          margin: 0;
          padding: 0;
          word-wrap: break-word;
          color: orange;
          font-size: 1.5em;
          font-weight: bold;
        }

        .para_black_casestudydetail {
          margin: 5px 0 0;
          color: black;
          font-size: 1em;
          text-align: justify;
          word-wrap: break-word;
          overflow-wrap: break-word;
          max-width: 100%;
        }

        .img_bg_casestudydetail1,
        .img_bg_casestudydetail2 {
          width: 100%;
          height: auto;
          margin-top: 10px;
        }

        .project_info_div {
          background: #007bff;
          padding: 15px;
          margin-bottom: 10px;
        }

        .project_info_heading {
          font-size: 1.2em;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .detail_heading_project_info,
        .detail_heading_project_info1 {
          font-size: 1em;
          margin: 5px 0;
        }

        .blue_div_questions {
          background: #007bff;
          color: white;
          padding: 15px;
          text-align: center;
        }

        .btn_call_questions {
          background: none;
          border: none;
          color: white;
          font-size: 1.5em;
          margin-bottom: 10px;
        }

        .cll_us_question_heading {
          font-size: 1.1em;
          margin: 5px 0;
        }

        .cll_us_phone {
          font-size: 1.2em;
          font-weight: bold;
          margin: 0;
        }

        .loader-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .loader {
          display: inline-block;
          position: relative;
          width: 80px;
          height: 80px;
        }

        .loader span {
          position: absolute;
          top: 33px;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          background: #000;
          animation: loader 1.5s infinite ease-in-out both;
        }

        .loader span:nth-child(1) {
          left: 8px;
          animation-delay: -0.32s;
        }

        .loader span:nth-child(2) {
          left: 32px;
          animation-delay: -0.16s;
        }

        .loader span:nth-child(3) {
          left: 56px;
          animation-delay: 0s;
        }

        @keyframes loader {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }

        .error_message {
          text-align: center;
          color: red;
          padding: 20px;
        }
      `}</style>
    </div>
  );
}

export default SubPortFolio;