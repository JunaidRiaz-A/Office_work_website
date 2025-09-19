import React, { useEffect, useRef, useState } from "react";
import "./../SignInPage/SignInPage.css";
import Loader from "../Loader/Loader";
import { useNavigate, Link } from "react-router-dom"; // Ensure Link is imported
import email_icon from "./../../Assets/email_icon.png";
import non_seen_eye_icon from "./../../Assets/non_seen_eye_icon.png";
import eye_icon from "./../../Assets/eye_icon.png";
import password_icon from "./../../Assets/password_icon.png";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import synergy from "./../../Assets/synergy-logo-3 1.png";
import clock from "./../../Assets/clock_syn.png";
import phone from "./../../Assets/phone_syn.png";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { IoReorderThreeOutline } from "react-icons/io5";

function SignInPage() {
  const [isVisible, setIsVisible] = useState(false);
  const appointmentRef = useRef(null);

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
    scrollToTop();
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;
    const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;
    const adminToken = process.env.REACT_APP_ADMIN_TOKEN;

    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem("token", adminToken);
      navigate("/dashboard");
      setEmail("");
      setPassword("");
    } else {
      setErrorMessage("Invalid email or password");
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
      setLoading(false);
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleTogglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div>
      {isVisible && (
        <button onClick={scrollToTop} className="scroll-to-top-button">
          <span>↑</span>
        </button>
      )}
      <div className="main_div_aboutusnavbar">
        <p className="Heading_navbar">LOGIN</p>
        <div className="d-flex justify-content-center">
          <Link to="/" className="para_aboutus_navbar_white"> {/* Add Link component */}
            Home
          </Link>
          <p className="para_aboutus_navbar_white">
            <MdOutlineKeyboardArrowRight />
          </p>
          <p className="para_aboutus_navbar_orange">Login</p>
        </div>
      </div>
      <div className="service_back"></div>
      <div className="container">
        <div className="main_div_signin">
          <div className="row">
            <div className="col-lg-2 col-md-12 col-12"></div>
            <div className="col-lg-8 col-md-12 col-12">
              <div className="main_div_form_signin">
                <div className="form_main_div_sign_in">
                  <form onSubmit={handleLogin}>
                    <div className="padding_div_form_signin">
                      <p className="heading_in_form_sign_in">Login</p>

                      <div className="input_style_firstname_signin mt-5">
                        <div className="d-flex flex-row">
                          <img
                            src={email_icon}
                            className=""
                            alt="signininputlogo"
                          />
                          <input
                            className="input_firstname_style_signin"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            type="email"
                          />
                        </div>
                      </div>

                      <div className="input_style_firstname_signin mt-5">
                        <div className="d-flex flex-row">
                          <img
                            src={password_icon}
                            className=""
                            alt="signininputlogo"
                          />
                          <input
                            type={passwordVisible ? "text" : "password"}
                            className="input_firstname_style_signin"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <img
                            src={passwordVisible ? non_seen_eye_icon : eye_icon}
                            className="eye_style_signin"
                            onClick={handleTogglePassword}
                            alt="toggle password visibility"
                          />
                        </div>
                      </div>
                      {errorMessage && (
                        <p className="error-message">{errorMessage}</p>
                      )}
                    </div>

                    <div className="main_div_buttons_signin mt-5">
                      <button
                        className="orange_button_signin"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? <Loader /> : "Login"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-12 col-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;