import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import "./../JobPostDetailPage/JobPostDetailPage.css";
import Navbarsynergtech from "../Homepage/Navbarsynergtech/Navbarsynergtech";
import FooterAll from "../Homepage/FooterAll/FooterAll";
import Footer from "../Homepage/Footer/Footer";
import { CiLocationOn } from "react-icons/ci";
import { CiDollar } from "react-icons/ci";
import arrow from "./../../Assets/arrow_blue.png";
import { FaFacebookF, FaFacebook, FaTwitter, FaPinterest, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaInstagram as FaInstagram6 } from "react-icons/fa6";
import category from "./../../Assets/category_over.png";
import date from "./../../Assets/date_over.png";
import location from "./../../Assets/location_over.png";
import salary from "./../../Assets/salary_over.png";
import Experience from "./../../Assets/exp_over.png";
import gender from "./../../Assets/gender_over.png";
import qualification from "./../../Assets/qualitfication_over.png";
import arrow_send_mesg from "./../../Assets/send_mesg_over.png";
import axiosInstance from "./../api/axiosInstance";
import synergy from "./../../Assets/synergy-logo-3 1.png";
import clock from "./../../Assets/clock_syn.png";
import { useLocation, useNavigate, Link } from "react-router-dom";
import phone from "./../../Assets/phone_syn.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoReorderThreeOutline } from "react-icons/io5";
import Appointment from "../Homepage/Appointment/Appointment";

function JobPostDetail() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null,
    job_id: null,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const phoneNumber = phone.replace(/\D/g, "");
    return phoneNumber.length >= 10 && phoneNumber.length <= 15;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Please select a PDF file");
        setErrors({ ...errors, resume: "Please select a PDF file" });
        setFormData({ ...formData, resume: null });
        e.target.value = "";
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        setErrors({ ...errors, resume: "File size should be less than 5MB" });
        setFormData({ ...formData, resume: null });
        e.target.value = "";
        return;
      }
      setFormData({ ...formData, resume: file });
      setErrors({ ...errors, resume: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Phone number must be between 10 and 15 digits";
      isValid = false;
    }

    if (!formData.resume) {
      newErrors.resume = "Please upload a PDF resume";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      toast.error("Please fix the errors in the form");
      return;
    }

    const formToSubmit = new FormData();
    formToSubmit.append("name", formData.name);
    formToSubmit.append("email", formData.email);
    formToSubmit.append("phone", formData.phone);
    formToSubmit.append("resume", formData.resume);
    formToSubmit.append("job_id", job.id);

    try {
      const response = await axiosInstance.post("api/apply-job", formToSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          resume: null,
          job_id: null,
        });
        toast.success("Submitted successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error submitting the form", error);
      toast.error("Failed to submit the form. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const appointmentRef = useRef(null);

  const scrollToAppointment = () => {
    if (appointmentRef.current) {
      appointmentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const location = useLocation();
  const { jobId } = location.state || {};
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 4;

  useEffect(() => {
    if (!jobId) {
      console.error("No jobId provided in route state");
      setLoading(false);
      return;
    }

    const fetchJobDetails = async () => {
      try {
        const response = await axiosInstance.get(`api/jobs/${jobId}`);
        setJob(response.data);

        const similarResponse = await axiosInstance.get(
          `api/jobs?category=${response.data.category}&exclude=${jobId}`
        );
        setSimilarJobs(similarResponse.data || []);
      } catch (error) {
        console.error("Failed to fetch job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

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
  if (!job) return <p>Job not found.</p>;

  const isExpired = new Date(job.expiry_date) < new Date();
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = similarJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(similarJobs.length / jobsPerPage);

  const jobDescription = (jobId) => {
    navigate("/job/description", { state: { jobId } });
    setTimeout(() => {
      scrollToTop();
    }, 100);
  };

  const handleSocialMediaClick = (platform) => {
    const urls = {
      facebook: "https://www.facebook.com/360SynergyTech/",
      twitter: "https://x.com/360SynergyTech",
      instagram: "https://www.instagram.com/360synergytech/",
      pinterest: "https://www.pinterest.com",
    };
    window.open(urls[platform], "_blank", "noopener,noreferrer");
  };

  const handleSendMessage = () => {
    window.location.href =
      "mailto:info@360synergytech.com?subject=Job Inquiry&body=Hello, I am interested in the job posting.";
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      {isVisible && (
        <button onClick={scrollToTop} className="scroll-to-top-button">
          <span>↑</span>
        </button>
      )}
      <Helmet>
        <title>Open Positions at 360synergytech | Join Our Innovative Tech Team</title>
        <meta name="description" content="Explore exciting job openings at 360synergytech. Join us to work on cutting-edge technologies and make a real impact" />
        <meta name="keywords" content="job openings, 360synergytech careers, tech jobs, innovative team, career opportunities" />
        <link rel="canonical" href="https://360synergytech.com/job/description" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "JobPosting",
              "title": "Full Stack Developer",
              "description": "We are hiring a Full Stack Developer proficient in MERN stack technologies.",
              "datePosted": "2025-07-14",
              "hiringOrganization": {
                "@type": "Organization",
                "name": "360synergytech",
                "sameAs": "https://360synergytech.com"
              },
              "jobLocation": {
                "@type": "Place",
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "US"
                }
              }
            }
          `}
        </script>
      </Helmet>
      <Navbarsynergtech scrollToAppointment={scrollToAppointment} />
      <div className="main_div_designation">
        <div className="row m-0 p-0">
          <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
          <div className="col-lg-8 col-md-9 col-sm-12 col-12">
            <div className="row p-0 m-0">
              <div className="col-lg-8 col-md-12 col-sm-12 col-12">
                <div className="main_description_designation">
                  <p className="header_designation">{job.title}</p>
                  <div className="d-flex flex-row">
                    <p className="by_description">By</p>
                    <p className="Spotify_description">Spotify</p>
                    <p className="by_description">in</p>
                    <p className="Design_Creative_description">{job.category}</p>
                  </div>
                  <div className="d-flex flex-row">
                    <button className="btn_in_house">{job.mode}</button>
                    <button className="btn_in_house">
                      <CiLocationOn /> {job.location}
                    </button>
                    <button className="btn_in_house">
                      <CiDollar /> {job.salary ? `${job.salary} Yearly` : "N/A"}
                    </button>
                  </div>
                  <hr className="hr_line_below_header" />
                  <p className="description_heading">Description</p>
                  <p className="description_para_designation">{job.description}</p>

                  <p className="description_heading">Requirements</p>
                  <p className="description_para_designation">{job.requirements}</p>
                  {job.requirements &&
                    job.requirements.split("\n").map((req, index) => (
                      <div key={index} className="d-flex flex-row">
                        <img className="blue_arrow" src={arrow} alt="arrow" />
                        <p className="blue_Arrow_para">{req.trim()}</p>
                      </div>
                    ))}

                  <p className="description_heading">Skill & Experience</p>
                  <p className="description_para_designation">
                    {job.skills} | {job.experience}
                  </p>
                  {job.skills &&
                    job.skills.split(",").map((skill, index) => (
                      <div key={index} className="d-flex flex-row">
                        <img className="blue_arrow" src={arrow} alt="arrow" />
                        <p className="blue_Arrow_para">{skill.trim()}</p>
                      </div>
                    ))}

                  <div className="d-flex flex-row">
                    <p className="share_job_post_para">Share job Post:</p>
                    <button
                      className="btn_facebook_post"
                      onClick={() => handleSocialMediaClick("facebook")}
                    >
                      <FaFacebookF /> Facebook
                    </button>
                    <button
                      className="btn_Twitter_post"
                      onClick={() => handleSocialMediaClick("twitter")}
                    >
                      <FaTwitter /> Twitter
                    </button>
                    <button
                      className="btn_Pinterest_post"
                      onClick={() => handleSocialMediaClick("pinterest")}
                    >
                      <FaPinterest /> Pinterest
                    </button>
                  </div>

                  <hr className="hr_below_social_media" />

                  <p className="description_heading">Similar Jobs</p>
                  {currentJobs.map((similarJob) => (
                    <div className="card_div_jobs" key={similarJob.id}>
                      <div className="row m-0 p-0">
                        <div className="col-lg-8 col-md-9 col-sm-9 col-12">
                          <p className="title_card_jobs">{similarJob.title}</p>
                          <div className="d-flex flex-row">
                            <p className="by_description">By</p>
                            <p className="Spotify_description">Spotify</p>
                            <p className="by_description">in</p>
                            <p className="Design_Creative_description_orange">
                              {similarJob.category}
                            </p>
                          </div>
                          <div className="d-flex flex-row">
                            <button className="btn_in_house_orange">{similarJob.mode}</button>
                            <button className="btn_in_house_orange">
                              <CiLocationOn /> {similarJob.location}
                            </button>
                            <button className="btn_in_house_orange">
                              <CiDollar />{" "}
                              {similarJob.salary ? `${similarJob.salary} Yearly` : "N/A"}
                            </button>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-3 col-sm-3 col-12">
                          <button
                            className="btn_aply_now"
                            onClick={() => jobDescription(similarJob.id)}
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {totalPages > 1 && (
                    <div
                      className="pagination_div"
                      style={paginationStyles.container}
                    >
                      {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            style={
                              currentPage === pageNumber
                                ? {
                                    ...paginationStyles.dot,
                                    ...paginationStyles.activeDot,
                                  }
                                : paginationStyles.dot
                            }
                          >
                            {pageNumber}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12 col-12 px-2">
                <div className="hr_blue_second_div" />
                <p className="heading_interested_injob">Interested in this job?</p>
                <p className="para_interested">
                  {isExpired ? "Application deadline has expired" : "Apply before the deadline!"}
                </p>
                <div className="d-flex justify-content-between">
                  <button
                    className="apply_now_interested"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    disabled={isExpired}
                  >
                    Apply Now
                  </button>
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-body">
                          <p className="apply_job_heading_modal">Apply for Job</p>
                          <p className="apply_job_para_modal">Kindly fill the information</p>
                          <div className="form-group">
                            <input
                              name="name"
                              className={`input_model_job_apply ${errors.name ? "is-invalid" : ""}`}
                              placeholder="Name"
                              value={formData.name}
                              onChange={handleInputChange}
                            />
                            {errors.name && (
                              <div className="invalid-feedback">{errors.name}</div>
                            )}
                          </div>
                          <div className="form-group">
                            <input
                              name="email"
                              className={`input_model_job_apply ${errors.email ? "is-invalid" : ""}`}
                              placeholder="E-Mail"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                            {errors.email && (
                              <div className="invalid-feedback">{errors.email}</div>
                            )}
                          </div>
                          <div className="form-group">
                            <input
                              name="phone"
                              className={`input_model_job_apply ${errors.phone ? "is-invalid" : ""}`}
                              placeholder="Phone Number"
                              value={formData.phone}
                              onChange={handleInputChange}
                            />
                            {errors.phone && (
                              <div className="invalid-feedback">{errors.phone}</div>
                            )}
                          </div>
                          <div className="form-group">
                            <input
                              type="file"
                              className={`input_model_job_applyupload ${errors.resume ? "is-invalid" : ""}`}
                              onChange={handleFileChange}
                              accept="application/pdf"
                            />
                            {errors.resume && (
                              <div className="invalid-feedback">{errors.resume}</div>
                            )}
                          </div>
                          <button
                            type="button"
                            className="submit_apply_job_model"
                            onClick={handleSubmit}
                            disabled={
                              !formData.name ||
                              !formData.email ||
                              !formData.phone ||
                              !formData.resume
                            }
                          >
                            Submit
                          </button>
                          <ToastContainer />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hr_line_below_aply_now" />
                <div className="over_view_main">
                  <p className="over_view_heading">Overview</p>
                  <div className="row m-0 p-0">
                    <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                      <img className="icon_overview" src={category} alt="category" />
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                      <p className="heading_overview_para">Categories</p>
                      <p className="para_overview_para">{job.category}</p>
                    </div>
                  </div>
                  <div className="row m-0 p-0">
                    <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                      <img className="icon_overview" src={date} alt="date" />
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                      <p className="heading_overview_para">Date Posted</p>
                      <p className="para_overview_para">
                        {new Date(job.date_posted).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="row m-0 p-0">
                    <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                      <CiLocationOn className="icon_overview" />
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                      <p className="heading_overview_para">Location</p>
                      <p className="para_overview_para">{job.location}</p>
                    </div>
                  </div>
                  <div className="row m-0 p-0">
                    <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                      <img className="icon_overview" src={salary} alt="salary" />
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                      <p className="heading_overview_para">Offered Salary</p>
                      <p className="para_overview_para">
                        {job.salary ? `${job.salary} Yearly` : "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="row m-0 p-0">
                    <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                      <img className="icon_overview" src={date} alt="expiration" />
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                      <p className="heading_overview_para">Expiration Date</p>
                      <p className="para_overview_para">
                        {new Date(job.expiry_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="row m-0 p-0">
                    <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                      <img className="icon_overview" src={Experience} alt="experience" />
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                      <p className="heading_overview_para">Experience</p>
                      <p className="para_overview_para">{job.experience}</p>
                    </div>
                  </div>
                  <div className="row m-0 p-0">
                    <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                      <img className="icon_overview" src={gender} alt="gender" />
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                      <p className="heading_overview_para">Gender</p>
                      <p className="para_overview_para">{job.gender}</p>
                    </div>
                  </div>
                  <div className="row m-0 p-0">
                    <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                      <img
                        className="icon_overview"
                        src={qualification}
                        alt="qualification"
                      />
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                      <p className="heading_overview_para">Qualification</p>
                      <p className="para_overview_para">{job.qualification}</p>
                    </div>
                  </div>
                  <button className="send_us_btn" onClick={handleSendMessage}>
                    Send us message <img src={arrow_send_mesg} alt="send" />
                  </button>
                  <div className="d-flex justify-content-center">
                    <div className="d-flex flex-row">
                      <button
                        className="btn_social_media_links"
                        onClick={() => handleSocialMediaClick("twitter")}
                      >
                        <FaTwitter />
                      </button>
                      <button
                        className="btn_social_media_links"
                        onClick={() => handleSocialMediaClick("facebook")}
                      >
                        <FaFacebook />
                      </button>
                      <button
                        className="btn_social_media_links"
                        onClick={() => handleSocialMediaClick("instagram")}
                      >
                        <FaInstagram />
                      </button>
                      <button
                        className="btn_social_media_links"
                        onClick={() => handleSocialMediaClick("pinterest")}
                      >
                        <FaPinterest />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        </div>
      </div>
      <div ref={appointmentRef}>
        <Appointment />
      </div>
      <FooterAll />
      <Footer />
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
    backgroundColor: "#0162ca",
    color: "#fff",
  },
};

export default JobPostDetail;