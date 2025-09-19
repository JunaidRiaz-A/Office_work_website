"use client"

import "./SolutionServices.css"
import { useState, useEffect, useRef } from "react"
import solS1 from "./../../../Assets/Group 13.png"
import solS2 from "./../../../Assets/Group 14.png"
import solS3 from "./../../../Assets/Group 15.png"
import solS4 from "./../../../Assets/Group 16.png"
import solS5 from "./../../../Assets/Group 17.png"
import solS6 from "./../../../Assets/Group 18.png"
import solS7 from "./../../../Assets/Group 19.png"
import solS8 from "./../../../Assets/Group 20.png"
import solS9 from "./../../../Assets/Group 21.png"
import solS10 from "./../../../Assets/Group 22.png"
import solS11 from "./../../../Assets/Group 18.png"
import solS12 from "./../../../Assets/Group 19.png"
import { Link } from "react-router-dom"

function SolutionServices() {
  const [hoveredCard, setHoveredCard] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  const handleMouseEnter = (card) => {
    setHoveredCard(card)
  }

  const handleMouseLeave = () => {
    setHoveredCard(null)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === sectionRef.current) {
            setIsVisible(entry.isIntersecting)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const services = [
    {
      id: "custom-software",
      link: "/custom-software-development",
      defaultImg: solS1,
      hoverImg: solS9,
      title: "Custom Software Development",
      description:
        "Craft tailored software solutions to meet your unique business needs, ensuring scalability, efficiency, and seamless integration.",
    },
    {
      id: "digital-commerce",
      link: "/digital-commerce",
      defaultImg: solS2,
      hoverImg: solS10,
      title: "Digital Commerce",
      description:
        "Build robust e-commerce platforms with seamless user experiences, secure payment systems, and scalable infrastructure.",
    },
    {
      id: "crm-platform",
      link: "/crm-platform-implementation",
      defaultImg: solS3,
      hoverImg: solS11,
      title: "CRM Platform Implementation",
      description:
        "Streamline customer relationships with customized CRM solutions, enhancing engagement and driving business growth.",
    },
    {
      id: "generative-ai",
      link: "/generative-ai",
      defaultImg: solS4,
      hoverImg: solS12,
      title: "Generative AI",
      description:
        "Leverage cutting-edge generative AI to create innovative content, automate processes, and unlock new business opportunities.",
    },
    {
      id: "machine-learning",
      link: "/machine-learning",
      defaultImg: solS5,
      hoverImg: solS9,
      title: "Machine Learning",
      description:
        "Harness the power of machine learning to uncover insights, predict trends, and optimize operations with data-driven solutions.",
    },
    {
      id: "software-engineering",
      link: "/software-engineering",
      defaultImg: solS6,
      hoverImg: solS10,
      title: "Software Engineering",
      description:
        "Develop high-quality, reliable software with modern engineering practices, ensuring performance and maintainability.",
    },
    {
      id: "cloud-engineering",
      link: "/cloud-engineering",
      defaultImg: solS7,
      hoverImg: solS11,
      title: "Cloud Engineering",
      description:
        "Optimize your infrastructure with scalable, secure cloud solutions, enabling agility and cost-efficiency.",
    },
    {
      id: "data-engineering",
      link: "/data-engineering",
      defaultImg: solS8,
      hoverImg: solS12,
      title: "Data Engineering",
      description:
        "Build robust data pipelines and architectures to manage, process, and analyze large-scale data effectively.",
    },
    {
      id: "rpa-ipa",
      link: "/rpa-ipa-implementation",
      defaultImg: solS9,
      hoverImg: solS1,
      title: "RPA & IPA Implementation",
      description:
        "Automate repetitive tasks and enhance efficiency with robotic and intelligent process automation solutions.",
    },
    {
      id: "product-strategy",
      link: "/product-strategy-consulting",
      defaultImg: solS10,
      hoverImg: solS2,
      title: "Product Strategy & Consulting",
      description:
        "Shape your product vision with strategic consulting, ensuring market fit and sustainable growth.",
    },
    {
      id: "graphics-designing",
      link: "/graphics-designing",
      defaultImg: solS11,
      hoverImg: solS3,
      title: "Graphics Designing",
      description:
        "Create visually stunning designs that captivate audiences and elevate your brand’s identity.",
    },
    {
      id: "system-integration",
      link: "/system-integration",
      defaultImg: solS12,
      hoverImg: solS4,
      title: "System Integration",
      description:
        "Seamlessly connect disparate systems to enhance interoperability, streamline workflows, and boost productivity.",
    },
  ]

  return (
    <div className={`main_div_solution_services ${isVisible ? "animate-in" : ""}`} ref={sectionRef}>
      <div className="header_content">
        <h2 className={`services_heading ${isVisible ? "slide-up" : ""}`}>Services</h2>
        <p className={`para_services ${isVisible ? "slide-up delay-1" : ""}`}>
          We Are Offering All Kinds of IT Solutions Services
        </p>
        <div className={`hr_line_blue ${isVisible ? "expand-width delay-2" : ""}`}></div>
      </div>

      <div className="row p-0 m-0">
        <div className="col-lg-1 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-10 col-md-10 col-sm-12 col-12">
          <div className="row m-0 p-0 justify-content-center">
            {services.map((service, index) => (
              <div key={service.id} className="col-lg-3 col-md-4 col-sm-6 col-12">
                <Link to={service.link}>
                  <div
                    className={`card_div_main ${isVisible ? "card-animate-in" : ""}`}
                    onMouseEnter={() => handleMouseEnter(service.id)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      transitionDelay: `${index * 0.15}s`,
                    }}
                  >
                    <div className="card_background_gradient"></div>
                    <div className="card_content">
                      <div className="icon_container">
                        <img
                          src={hoveredCard === service.id ? service.hoverImg : service.defaultImg}
                          className="icon_card_services"
                          alt={service.title}
                        />
                        <div className="icon_glow"></div>
                      </div>
                      <div className="text_content">
                        <p className="heading_services_card">{service.title}</p>
                        <p className="para_card_services">{service.description}</p>
                      </div>
                      <div className="card_hover_overlay">
                        <div className="hover_arrow">→</div>
                      </div>
                    </div>
                    <div className="card_shine"></div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="col-lg-1 col-md-1 col-sm-12 col-12"></div>
      </div>
    </div>
  )
}

export default SolutionServices