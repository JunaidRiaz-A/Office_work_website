import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Footer from "../../Components/Homepage/Footer/Footer";
import FooterAll from "../../Components/Homepage/FooterAll/FooterAll";
import Appointment from "../Homepage/Appointment/Appointment";
import Banner1 from "../Homepage/Banner1/Banner1";
import BringIdeas from "../../Components/PortfolioPage/BringIdeas/BringIdeas";
import Navbarsynergtech from "../Homepage/Navbarsynergtech/Navbarsynergtech";
import PortfolioNavbar from "../PortfolioPage/PortfolioNavbar/PortfolioNavbar";
import SubPortFolio from "../PortfolioPage/SubPortFolioDetail/SubPortFolioDetail";
import { Link, useParams } from "react-router-dom";

function PortFolioDetail() {
  const appointmentRef = useRef(null);
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/portfolios/${id}`);
        setPortfolio(response.data);
      } catch (error) {
        setError("Failed to load portfolio details. Please try again later.");
        console.error("Error fetching portfolio:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPortfolio();
  }, [id, baseUrl]);

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

  if (isLoading) {
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

  if (error) return <div className="error_message">{error}</div>;

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return `${baseUrl}/images/default-image.jpg`;
    return `${baseUrl}/${imageUrl.startsWith("/") ? imageUrl : "/" + imageUrl}`;
  };

  const portfolioCategories = portfolio?.portfolio_category
    ? JSON.parse(portfolio.portfolio_category)
    : [];

  return (
    <div>
      {isVisible && (
        <button onClick={scrollToTop} className="scroll-to-top-button">
          <span>↑</span>
        </button>
      )}
      <Navbarsynergtech scrollToAppointment={scrollToAppointment} />
      <PortfolioNavbar />
      <SubPortFolio
        portfolio={portfolio}
        categories={portfolioCategories}
        getImageUrl={getImageUrl}
      />
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

export default PortFolioDetail;