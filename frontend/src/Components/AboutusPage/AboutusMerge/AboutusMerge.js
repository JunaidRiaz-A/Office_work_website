import React, { useEffect, useRef, useState } from "react";
import Navbarsynergtech from "../../Homepage/Navbarsynergtech/Navbarsynergtech";
import AboutusNavbar from "../AboutusNavbar/AboutusNavbar";
import EstimateProject from "../../Homepage/EstimateProject/EstimateProject";
import Customers from "../../Homepage/Customers/Customers";
import Faqs from "../../Homepage/Faqs/Faqs";
import Appointment from "../../Homepage/Appointment/Appointment";
import FooterAll from "../../Homepage/FooterAll/FooterAll";
import Footer from "../../Homepage/Footer/Footer";
import GlobalStakeholder from "../GlobalStakeholder/GlobalStakeholder";
import WorkingProcess from "../WorkingProcess/WorkingProcess";
import OurTeam from "../OurTeam/OurTeam";
import EventGallery from "../EventGallery/EventGallery";

function AboutusMerge() {
  const appointmentRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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
      <AboutusNavbar />
      <GlobalStakeholder />
      <WorkingProcess scrollToAppointment={scrollToAppointment} />
      <OurTeam />
      <EstimateProject scrollToAppointment={scrollToAppointment} />
      <EventGallery />
      <Customers />
      <Faqs scrollToAppointment={scrollToAppointment} />
      <div ref={appointmentRef}>
        <Appointment />
      </div>
      <FooterAll />
      <Footer />
    </div>
  );
}

export default AboutusMerge;