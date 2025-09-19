import React, { useEffect, useRef, useState } from "react";
import Navbarsynergtech from "../../Homepage/Navbarsynergtech/Navbarsynergtech";
import BringIdeas from "../../PortfolioPage/BringIdeas/BringIdeas";
import Banner1 from "../../Homepage/Banner1/Banner1";
import Appointment from "../../Homepage/Appointment/Appointment";
import FooterAll from "../../Homepage/FooterAll/FooterAll";
import Footer from "../../Homepage/Footer/Footer";
import BlogsDetailNavbar from "../BlogsDetailNavbar/BlogsDetailNavbar";
import BlogsDetailPage from "../BlogsDetailPage/BlogsDetailPage";

import synergy from "./../../../Assets/synergy-logo-3 1.png";
import clock from "./../../../Assets/clock_syn.png";
import phone from "./../../../Assets/phone_syn.png";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoReorderThreeOutline } from "react-icons/io5";
function BlogsDetailmerge() {
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
    scrollToTop();
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  return (
    <div>
      <>
        {isVisible && (
          <button onClick={scrollToTop} className="scroll-to-top-button">
            <span>↑</span>
          </button>
        )}
      </>
      <Navbarsynergtech scrollToAppointment={scrollToAppointment} />
      <BlogsDetailNavbar />
      <BlogsDetailPage />
      <BringIdeas />
      <Banner1 />
      <div ref={appointmentRef}>
        <Appointment />
      </div>
      <FooterAll />
      <Footer />
    </div>
  );
}

export default BlogsDetailmerge;