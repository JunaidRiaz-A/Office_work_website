import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Navbarsynergtech from "../../Homepage/Navbarsynergtech/Navbarsynergtech";
import PortfolioNavbar from "../PortfolioNavbar/PortfolioNavbar";
import WorkSpeaks from "../WorkSpeaks/WorkSpeaks";
import BringIdeas from "../BringIdeas/BringIdeas";
import Banner1 from "../../Homepage/Banner1/Banner1";
import Appointment from "../../Homepage/Appointment/Appointment";
import FooterAll from "../../Homepage/FooterAll/FooterAll";
import Footer from "../../Homepage/Footer/Footer";

function PortfolioPageMerge() {
  const appointmentRef = useRef(null);
  const [portfolios, setPortfolios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/portfolios`);
        setPortfolios(response.data);
      } catch (error) {
        setError("Failed to load portfolios. Please try again later.");
        console.error("Error fetching portfolios:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPortfolios();
  }, [baseUrl]);

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

  const [isVisible, setIsVisible] = useState(false);

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

  if (isLoading) return <div className="loading"></div>;
  if (error) return <div className="error_message">{error}</div>;

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return `${baseUrl}/images/default-image.jpg`;
    return `${baseUrl}/${imageUrl.startsWith('/') ? imageUrl : '/' + imageUrl}`;
  };

  return (
    <div>
      {isVisible && (
        <button onClick={scrollToTop} className="scroll-to-top-button">
          <span>↑</span>
        </button>
      )}
      <Navbarsynergtech scrollToAppointment={scrollToAppointment} />
      <PortfolioNavbar />
      <WorkSpeaks scrollToAppointment={scrollToAppointment} />
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

export default PortfolioPageMerge;