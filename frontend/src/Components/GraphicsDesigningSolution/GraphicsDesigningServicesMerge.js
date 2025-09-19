import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbarsynergtech from "../Homepage/Navbarsynergtech/Navbarsynergtech";
import Footer from "../Homepage/Footer/Footer";
import FooterAll from "../Homepage/FooterAll/FooterAll";
import Appointment from "../Homepage/Appointment/Appointment";
import GraphicsDesigningSolution from "../GraphicsDesigningSolution/GraphicsDesigningSolution";
import WebPageExperience from "../WebsiteDeploymentServices/WebPageExperience/WebPageExperience";
import Banner1 from "../Homepage/Banner1/Banner1";
import BringIdeas from "../PortfolioPage/BringIdeas/BringIdeas";

function GraphicsDesigningServicesMerge() {
  const [isVisible, setIsVisible] = useState(false);
  const appointmentRef = useRef(null);

  const scrollToAppointment = () => {
    if (appointmentRef.current) {
      appointmentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

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
      {isVisible && (
        <button onClick={scrollToTop} className="scroll-to-top-button">
          <span>↑</span>
        </button>
      )}
      <Navbarsynergtech scrollToAppointment={scrollToAppointment} />
      <div className="main_div_webnavbar">
        <p className="Heading_web_navbar">Graphics Designing</p>
        <div className="d-flex justify-content-center">
          <p className="para_web_navbar_white">Home</p>
          <p className="para_web_navbar_white">
            <MdOutlineKeyboardArrowRight />
          </p>
          <p className="para_web_navbar_orange">Graphics Designing</p>
        </div>
      </div>
      <GraphicsDesigningSolution scrollToAppointment={scrollToAppointment} />
      <WebPageExperience />
      <BringIdeas scrollToAppointment={scrollToAppointment} />
      <Banner1 />
      <div ref={appointmentRef}>
        <Appointment />
      </div>
      <FooterAll />
      <Footer />
    </div>
  );
}

export default GraphicsDesigningServicesMerge;
