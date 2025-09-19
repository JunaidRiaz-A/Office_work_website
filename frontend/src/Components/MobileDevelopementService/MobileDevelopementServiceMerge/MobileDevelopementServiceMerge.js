import Footer from "../../Homepage/Footer/Footer";
import FooterAll from "../../Homepage/FooterAll/FooterAll";
import Appointment from "../../Homepage/Appointment/Appointment";
import Banner1 from "../../Homepage/Banner1/Banner1";
import BringIdeas from "../../PortfolioPage/BringIdeas/BringIdeas";
import Technology from "../../Homepage/TechnologyIndex/Technology";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import "./../MobileDevelopementServiceMerge/MobileDevelopementServiceMerge.css";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbarsynergtech from "../../Homepage/Navbarsynergtech/Navbarsynergtech";
import BusinessMobilegoal from "../BusinessMobilegoal/BusinessMobilegoal";
import PlanningandStrategy from "../PlanningandStrategy/PlanningandStrategy";
import MobilePortfolio from "../MobilePortfolio/MobilePortfolio";
import KeyMatrixMobile from "../KeyMatrixMobile/KeyMatrixMobile";
import MobileLandscape from "../MobileLandscape/MobileLandscape";
import SecretSuccess from "../SecretSuccess/SecretSuccess";

function MobileDevelopementServiceMerge() {
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
      <div className="main_div_mobilenavbar">
        <p className="Heading_mobile_navbar">Mobile App Development Services</p>
        <div className="d-flex justify-content-center">
          <p className="para_mobile_navbar_white">Home</p>
          <p className="para_mobile_navbar_white">
            <MdOutlineKeyboardArrowRight />
          </p>
          <p className="para_mobile_navbar_orange">
            Mobile App Development Services
          </p>
        </div>
      </div>
      <BusinessMobilegoal scrollToAppointment={scrollToAppointment} />
      <MobileLandscape />
      <KeyMatrixMobile />
      <PlanningandStrategy />
      <SecretSuccess />
      <Technology />
      <MobilePortfolio />
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

export default MobileDevelopementServiceMerge;