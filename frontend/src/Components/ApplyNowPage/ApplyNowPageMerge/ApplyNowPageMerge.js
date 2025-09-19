import React, { useEffect, useRef, useState } from "react";
import Footer from "../../Homepage/Footer/Footer";
import FooterAll from "../../Homepage/FooterAll/FooterAll";
import Navbarsynergtech from "../../Homepage/Navbarsynergtech/Navbarsynergtech";
import EventGallery from "../../AboutusPage/EventGallery/EventGallery";
import ApplynowNavbar from "../ApplynowNavbar/ApplynowNavbar";
import Banner1 from "../../Homepage/Banner1/Banner1";
import SolutionServices from "../../Homepage/SolutionServices/SolutionServices";
import Customers from "../../Homepage/Customers/Customers";
import NewJobOpenings from "../NewJobOpenings/NewJobOpenings";
import Appointment from "../../Homepage/Appointment/Appointment";

function ApplyNowPageMerge() {
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
      <ApplynowNavbar />
      <NewJobOpenings />
      <Banner1 />
      <SolutionServices />
      <EventGallery />
      <div ref={appointmentRef}>
        <Appointment />
      </div>
      <Customers />
      <FooterAll />
      <Footer />
    </div>
  );
}

export default ApplyNowPageMerge;