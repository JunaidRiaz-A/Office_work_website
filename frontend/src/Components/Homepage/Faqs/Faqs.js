"use client"

import { useEffect, useState, useCallback, memo } from "react"
import { Helmet } from "react-helmet"
import axios from "axios"
import "./../Faqs/Faqs.css"
import faqicon from "../../../Assets/__after.png"
import plusIcon from "../../../Assets/plus.png"
import minusIcon from "../../../Assets/minus.png"
import { IoSettingsOutline } from "react-icons/io5"

const Faqs = memo(({ scrollToAppointment }) => {
  const [faqs, setFaqs] = useState([])
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleFaq = useCallback(
    (index) => {
      setActiveIndex(activeIndex === index ? null : index)
    },
    [activeIndex],
  )

  useEffect(() => {
    axios
      .get("/api/faqs")
      .then((response) => {
        setFaqs(response.data)
      })
      .catch((error) => {
        console.error("There was an error fetching the FAQs!", error)
      })
  }, [])

  return (
    <div className="main_div_faqs" role="region" aria-label="Frequently Asked Questions Section">
      <Helmet>
        <meta
          name="description"
          content="Find answers to common questions about 360synergytechs services in AI, web development, cloud solutions, and more."
        />
        <meta
          name="keywords"
          content="360synergytech, FAQ, AI solutions, web development, cloud services, robotic process automation, custom CRM"
        />
        <link rel="canonical" href="https://360synergytech.com/faqs" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What services does 360synergytech provide?",
                  "acceptedAnswer": {
                    "@type": "Answer"
                  }
                },
                {
                  "@type": "Question",
                  "name": "How can AI integration improve my business operations?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "AI integration helps automate workflows, improve customer support with AI Chatbots to learn how we can help you innovate."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What technologies do you use for web development?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We specialize in the MERN Stack, Laravel, and Flask for building scalable and SEO-optimized websites. Visit our Web Development Services page to discover the right solution for your business."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you offer custom CRM development for startups and real estate companies?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! We design Custom CRM Solutions tailored to startups, SMEs, and real estate firms. Our solutions help streamline Sales Pipelines, lead generation, and customer management processes."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How does robotic process automation (RPA) help businesses?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "RPA Solutions automate repetitive tasks, increase operational efficiency, and reduce costs. Learn more about our expertise in RPA Developmentservices/rpa-development) for industries like real estate, healthcare, and eCommerce."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is your approach to cloud application development?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We develop scalable, secure applications using AWS Cloud Services ensure your applications are reliable and ready for growth."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do I start a project with 360synergytech?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "To start a project, Contact Us Today or Schedule a Consultation. Our experts will guide you through choosing the right Custom Software Solutionsservices/web-development) tailored to your business goals."
                  }
                }
              ]
            }
          `}
        </script>
      </Helmet>

      <div className="row p-0 m-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="row m-0 p-0">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <p className="process_heading" role="heading" aria-level="2">
                -FAQ
              </p>
              <div className="d-flex flex-row">
                <p className="faq_heading_white" role="heading" aria-level="2">
                  Frequently Asked
                </p>
                <p className="faq_heading_blue" role="heading" aria-level="2">
                  Questions
                </p>
              </div>
              <p className="process_heading_para" role="doc-subtitle">
                Appropriately enhance principle-centered innovation rather than high standards in platforms. Credibly
                orchestrate functional.
              </p>
              <button
                className="more_about_btn mb-4"
                onClick={scrollToAppointment}
                aria-label="Learn more about our services"
              >
                <IoSettingsOutline /> More About
              </button>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div
                className="accordion"
                id="accordionExample"
                role="region"
                aria-label="FAQ Accordion"
                style={{
                  maxHeight: "500px",
                  overflowY: "scroll",
                  "-ms-overflow-style": "none",
                  "scrollbar-width": "none",
                }}
              >
                {faqs.length > 0 ? (
                  faqs.map((faq, index) => (
                    <div
                      className={`accordion-item ${activeIndex === index ? "active" : ""}`}
                      key={index}
                      role="region"
                      aria-labelledby={`heading${index}`}
                    >
                      <h2 className="accordion-header" id={`heading${index}`}>
                        <button
                          className={`accordion-button ${activeIndex === index ? "" : "collapsed"}`}
                          type="button"
                          onClick={() => toggleFaq(index)}
                          aria-expanded={activeIndex === index ? "true" : "false"}
                          aria-controls={`collapse${index}`}
                        >
                          <img src={faqicon || "/placeholder.svg"} alt="FAQ Icon" className="faq-icon" loading="lazy" />
                          {faq.question}
                          <img
                            src={activeIndex === index ? minusIcon : plusIcon}
                            alt={activeIndex === index ? "minus icon" : "plus icon"}
                            className="toggle-icon"
                            loading="lazy"
                          />
                        </button>
                      </h2>
                      <div
                        id={`collapse${index}`}
                        className={`accordion-collapse collapse ${activeIndex === index ? "show" : ""}`}
                        aria-labelledby={`heading${index}`}
                        data-bs-parent="#accordionExample"
                        role="region"
                      >
                        <div className="accordion-body">{faq.answer}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="loading-text" role="alert">
                    Loading FAQs...
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
      </div>
    </div>
  )
})

export default Faqs
