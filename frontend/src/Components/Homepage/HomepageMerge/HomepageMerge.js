import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { Helmet } from "react-helmet";
import Navbarsynergtech from '../Navbarsynergtech/Navbarsynergtech';
import Header11 from '../Header11/Header11';
import Banner1 from '../Banner1/Banner1';
import SolutionServices from '../SolutionServices/SolutionServices';
import ServicesPartner from '../ServicesPartner/ServicesPartner';
import ProjectCounts from '../ProjectCounts/ProjectCounts';
import Technology from '../TechnologyIndex/Technology';
import EstimateProject from '../EstimateProject/EstimateProject';
import Appointment from '../Appointment/Appointment';
import FooterAll from '../FooterAll/FooterAll';
import Footer from '../Footer/Footer';
import HomepageMergeStyles from './HomepageMerge.css'; // Assuming you have a CSS file for styles

// Lazy-loaded components
const Tips = lazy(() => import('../Tips/Tips'));
const Customers = lazy(() => import('../Customers/Customers'));
const Faqs = lazy(() => import('../Faqs/Faqs'));

function HomepageMerge() {
  const [isVisible, setIsVisible] = useState(false);
  const appointmentRef = useRef(null);

  const scrollToAppointment = () => {
    if (appointmentRef.current) {
      appointmentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    const toggleVisibility = () => {
      const currentScrollY = window.pageYOffset;
      if (Math.abs(currentScrollY - lastScrollY) > 50) { 
        setIsVisible(currentScrollY > 300);
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    scrollToTop();
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div>
      <Helmet>
        <title>Looking for Custom Software & AI Solutions? | 360synergytech - Your Tech Partner</title>
        <meta name="description" content="Discover custom software, AI solutions, and cloud services tailored for your business growth. Partner with 360synergytech and innovate smarter today!" />
        <meta name="keywords" content="360synergytech, technology, AI solutions, cloud expertise, tech partners, business innovation" />
        <link rel="canonical" href="https://360synergytech.com/" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "360synergytech",
              "url": "https://360synergytech.com",
              "logo": "https://360synergytech.com/only-logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-123-456-7890",
                "contactType": "Customer Service",
                "areaServed": "US"
              },
              "sameAs": [
                "https://pk.linkedin.com/company/360synergytech",
                "https://x.com/360SynergyTech"
              ]
            }
          `}
        </script>
      </Helmet>
      <>
        {isVisible && (
          <button onClick={scrollToTop} className="scroll-to-top-button" aria-label="Scroll to top">
            <span>↑</span>
          </button>
        )}
      </>
      <Navbarsynergtech scrollToAppointment={scrollToAppointment} />
      <Header11 appointmentRef={appointmentRef} />
      <Banner1 />
      <SolutionServices />
      <ServicesPartner />
      <ProjectCounts />
      <Technology />
      <Suspense fallback={<div>Loading...</div>}>
        <Tips />
      </Suspense>
      <EstimateProject scrollToAppointment={scrollToAppointment} />
      <Suspense fallback={<div>Loading...</div>}>
        <Customers />
      </Suspense>
      <div className="section-gap"></div> {/* Added to create a gap */}
      <Suspense fallback={<div>Loading...</div>}>
        <Faqs scrollToAppointment={scrollToAppointment} />
      </Suspense>
      <div ref={appointmentRef}>
        <Appointment />
      </div>
      <FooterAll />
      <Footer />
    </div>
  );
}

export default HomepageMerge;