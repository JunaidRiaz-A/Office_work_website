import React, { useEffect, useRef, useState } from "react";
import BringIdeas from "../../PortfolioPage/BringIdeas/BringIdeas";
import Banner1 from "../../Homepage/Banner1/Banner1";
import Appointment from "../../Homepage/Appointment/Appointment";
import FooterAll from "../../Homepage/FooterAll/FooterAll";
import Footer from "../../Homepage/Footer/Footer";
import CaseStudiesNavbar from "../CaseStudiesNavbar/CaseStudiesNavbar";
import Navbarsynergtech from "../../Homepage/Navbarsynergtech/Navbarsynergtech";
import CaseStudy from "../CaseStudy/CaseStudy";
import "./../CaseStudiesMerge/Casestudynavbar.css";
import { Helmet } from 'react-helmet';

function CaseStudiesMerge() {
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
    scrollToAppointment();

    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

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
      <Helmet>
        <title>Real Results with AI, Cloud & Software | 360synergytech Case Studies</title>
        <meta name="description" content="Discover how 360synergytech helped businesses grow with AI, cloud, and automation solutions in our detailed case studies." />
        <meta name="keywords" content="URL optimization, https://360synergytech.com/case-studies" />
        <link rel="canonical" href="https://360synergytech.com/case/studies" />
      </Helmet>
      <Navbarsynergtech scrollToAppointment={scrollToAppointment} />
      <CaseStudiesNavbar />
      <CaseStudy />
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

export default CaseStudiesMerge;