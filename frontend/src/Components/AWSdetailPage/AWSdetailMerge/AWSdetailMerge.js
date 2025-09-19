import React, { useEffect, useRef, useState } from "react";
import Footer from "../../Homepage/Footer/Footer";
import FooterAll from "../../Homepage/FooterAll/FooterAll";
import Appointment from "../../Homepage/Appointment/Appointment";
import Banner1 from "../../Homepage/Banner1/Banner1";
import BringIdeas from "../../PortfolioPage/BringIdeas/BringIdeas";
import Navbarsynergtech from "../../Homepage/Navbarsynergtech/Navbarsynergtech";
import AWSdetailNavbar from "../AWSdetailNavbar/AWSdetailNavbar";
import SetupAWS from "../SetupAWS/SetupAWS";
import AWSDeploymentService from "../AWSDeploymentService/AWSDeploymentService";
import AWSexpert from "../AWSexpert/AWSexpert";

function AWSdetailMerge() {
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
      <AWSdetailNavbar />
      <AWSexpert scrollToAppointment={scrollToAppointment} />
      <SetupAWS />
      <AWSDeploymentService />
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

export default AWSdetailMerge;