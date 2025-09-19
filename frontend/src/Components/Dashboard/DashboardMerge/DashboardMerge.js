import React, { useEffect, useState } from "react";
import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";
function DashboardMerge() {

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
          <span>&uarr;</span>
        </button>
      )}
    </>

    <DashboardNavbar />
    
  </div>
  )
}

export default DashboardMerge
