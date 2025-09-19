import React, { useEffect, useRef, useState } from "react";
import Navbarsynergtech from "../../Homepage/Navbarsynergtech/Navbarsynergtech";
import BlogsNavbar from "../BlogsNavbar/BlogsNavbar";
import BringIdeas from "../../PortfolioPage/BringIdeas/BringIdeas";
import BlogsPage from "../BlogsPage/BlogsPage";
import Banner1 from "../../Homepage/Banner1/Banner1";
import Appointment from "../../Homepage/Appointment/Appointment";
import FooterAll from "../../Homepage/FooterAll/FooterAll";
import Footer from "../../Homepage/Footer/Footer";

function BlogsMerge() {
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
      <BlogsNavbar />
      <BlogsPage />
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

export default BlogsMerge;