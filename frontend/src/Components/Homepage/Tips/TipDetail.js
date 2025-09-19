import "./TipDetail.css";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosCall } from "react-icons/io";
import axiosInstance from "../../api/axiosInstance";

function TipDetail() {
  const { id, title } = useParams(); // Extract both id and title from URL
  const navigate = useNavigate();
  const [tip, setTip] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchTip = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(`/api/tips/${id}`);
        const data = response.data;
        console.log("Detail API Response:", data); // Debug API response
        setTip(data);
      } catch (error) {
        if (error.response?.status === 404) {
          setError("Tip not found. Please check the URL or try again later.");
        } else {
          setError("Failed to load tip details. Please try again later.");
        }
        console.error("Error fetching tip details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTip();
  }, [id]);

  const handleBackClick = () => {
    navigate("/tips");
  };

  // Normalize image URL
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return `${baseUrl}/images/default-image.jpg`;
    return `${baseUrl}${imageUrl.startsWith("/") ? imageUrl : "/" + imageUrl}`;
  };

  // Display loader while fetching data
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

  if (error) {
    return (
      <div className="error_message">
        {error}
        {error.includes("Tip not found") && (
          <button className="btn_back_blog" onClick={handleBackClick}>
            <IoIosCall /> Go back to Tips
          </button>
        )}
      </div>
    );
  }

  if (!tip) return <div>Tip not found.</div>;

  return (
    <div className="main_div_TipDetail">
      <div className="row p-0 m-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="row m-0 p-0">
            <div className="col-lg-8 col-md-12 col-sm-12 col-12">
              {/* <button className="btn_back_blog" onClick={handleBackClick}>
                <IoIosCall />
              </button> */}
              <img
                src={getImageUrl(tip.image)}
                className="img_bg_tipdetail"
                alt={tip.title}
                onError={(e) => {
                  console.log(`Image failed to load for ${tip.title}:`, e.target.src);
                  e.target.src = `${baseUrl}/images/default-image.jpg`;
                }}
              />
              <div className="grey_detail_div">
                <p className="heading_orange_tipdetail">{tip.title}</p>
                <p className="para_black_tipdetail">{tip.text}</p>
                <p className="heading_orange_tipdetail">Service Info</p>
                <p className="para_black_tipdetail">{tip.service_name}</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-12">
              <div className="project_info_div">
                <p className="project_info_heading">Tip Info</p>
                <div className="row p-0 m-0">
                  <div className="col-6">
                    <p className="detail_heading_project_info">Posted By:</p>
                  </div>
                  <div className="col-6">
                    <p className="detail_heading_project_info1">{tip.posted_name}</p>
                  </div>
                </div>
                <div className="row p-0 m-0">
                  <div className="col-6">
                    <p className="detail_heading_project_info">Date:</p>
                  </div>
                  <div className="col-6">
                    <p className="detail_heading_project_info1">
                      {new Date(tip.posted_date).toLocaleDateString()}
                    </p>
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
    </div>
  );
}

export default TipDetail;