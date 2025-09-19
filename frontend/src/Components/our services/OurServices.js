import React, { useEffect, useRef, useState } from 'react';
import './OurServices.css';
import { Helmet } from 'react-helmet';
import WebDevImage from '../../Assets/webdevelopment.jpg';
import robotsImage from '../../Assets/robots.jpg';
import digitalImage from '../../Assets/digital.jpg';
import crmImage from '../../Assets/crm.jpg';
import webScrap from '../../Assets/webscrap.jpg';
import aiImage from '../../Assets/ai.jpg';
import clodImage from '../../Assets/cloud.jpg';
import cloud2Image from '../../Assets/clod2.jpg';
import robotengImage from '../../Assets/roboteng.jpg';
import productImage from '../../Assets/product.jpg';
import graphicsImage from '../../Assets/graphics.jpg';
import systemImage from '../../Assets/system.jpg';

function OurServices({ scrollToAppointment }) {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef([]);

  const services = [
    {
      id: 1,
      title: "Custom Software Development",
      subtitle: "Tailored Solutions for Your Business",
      description: "We create bespoke software solutions designed to meet your unique business requirements. Our expert team delivers scalable, secure, and high-performance applications to drive your success.",
      features: [
        "Custom application development",
        "Scalable architecture design",
        "Cross-platform compatibility",
        "Ongoing support and maintenance"
      ],
      image: WebDevImage,
      link: "/custom-software-development"
    },
    {
      id: 2,
      title: "Digital Commerce",
      subtitle: "Empowering Your Online Business",
      description: "Build robust e-commerce platforms that enhance customer experiences and drive sales. We provide end-to-end digital commerce solutions, from storefront design to payment integration.",
      features: [
        "E-commerce platform development",
        "Payment gateway integration",
        "User experience optimization",
        "Inventory management systems"
      ],
      image: digitalImage,
      link: "/digital-commerce"
    },
    {
      id: 3,
      title: "CRM Platform Implementation",
      subtitle: "Streamlined Customer Relationship Management",
      description: "Implement powerful CRM platforms to automate sales, manage customer interactions, and boost lead generation. We customize and integrate CRM systems to align with your business goals.",
      features: [
        "Custom CRM implementation",
        "Sales automation workflows",
        "Customer data analytics",
        "Seamless third-party integrations"
      ],
      image: crmImage,
      link: "/crm-platform-implementation"
    },
    {
      id: 4,
      title: "Generative AI",
      subtitle: "Innovative AI-Powered Solutions",
      description: "Leverage generative AI to create innovative content, automate creative processes, and enhance user experiences. Our solutions empower businesses with cutting-edge AI capabilities.",
      features: [
        "Content generation models",
        "AI-driven automation",
        "Custom AI integrations",
        "Scalable AI solutions"
      ],
      image: robotsImage,
      link: "/generative-ai"
    },
    {
      id: 5,
      title: "Machine Learning",
      subtitle: "Intelligent Data-Driven Solutions",
      description: "Unlock the potential of your data with machine learning solutions. We develop custom models to provide predictive insights, optimize processes, and drive smarter decision-making.",
      features: [
        "Predictive analytics",
        "Machine learning model development",
        "Data processing pipelines",
        "Real-time insights"
      ],
      image: aiImage,
      link: "/machine-learning"
    },
    {
      id: 6,
      title: "Software Engineering",
      subtitle: "Robust and Scalable Applications",
      description: "Our software engineering services deliver high-quality, maintainable, and scalable applications. We use industry best practices to ensure your software meets the highest standards.",
      features: [
        "Agile development processes",
        "Code quality assurance",
        "Performance optimization",
        "Continuous integration and deployment"
      ],
      image: clodImage,
      link: "/software-engineering"
    },
    {
      id: 7,
      title: "Cloud Engineering",
      subtitle: "Scalable Cloud-Native Solutions",
      description: "Build and deploy applications in the cloud with our comprehensive cloud engineering services. We help businesses leverage cloud technologies for better scalability, security, and cost-effectiveness.",
      features: [
        "Cloud architecture design",
        "Microservices development",
        "DevOps and CI/CD implementation",
        "Cloud migration services"
      ],
      image: cloud2Image,
      link: "/cloud-engineering"
    },
    {
      id: 8,
      title: "Data Engineering",
      subtitle: "Transform Data into Insights",
      description: "Our data engineering services help you manage, process, and analyze large datasets to uncover actionable insights. We build robust data pipelines and infrastructure for your business.",
      features: [
        "Data pipeline development",
        "ETL process implementation",
        "Data warehousing solutions",
        "Real-time data processing"
      ],
      image: webScrap,
      link: "/data-engineering"
    },
    {
      id: 9,
      title: "RPA & IPA Implementation",
      subtitle: "Automate Your Business Processes",
      description: "Streamline operations with robotic process automation (RPA) and intelligent process automation (IPA). We design and deploy automation solutions to reduce costs and improve efficiency.",
      features: [
        "Process automation design",
        "Bot development and integration",
        "Intelligent automation workflows",
        "Performance monitoring"
      ],
      image: robotengImage,
      link: "/rpa-ipa-implementation"
    },
    {
      id: 10,
      title: "Product Strategy & Consulting",
      subtitle: "Shape Your Product Vision",
      description: "Our product strategy and consulting services help you define, plan, and execute your product vision. We provide expert guidance to align your products with market needs and business goals.",
      features: [
        "Product roadmap planning",
        "Market analysis and research",
        "Product lifecycle management",
        "Strategic consulting"
      ],
      image: productImage,
      link: "/product-strategy-consulting"
    },
    {
      id: 11,
      title: "Graphics Designing",
      subtitle: "Visually Stunning Designs",
      description: "Create visually compelling designs that elevate your brand. Our graphic design services include branding, UI/UX design, and marketing collateral to engage your audience.",
      features: [
        "Brand identity design",
        "UI/UX design for applications",
        "Marketing collateral creation",
        "Visual content optimization"
      ],
      image: graphicsImage,
      link: "/graphics-designing"
    },
    {
      id: 12,
      title: "System Integration",
      subtitle: "Seamless Connectivity for Your Systems",
      description: "Integrate disparate systems to work seamlessly together. Our system integration services ensure smooth data flow, improved efficiency, and enhanced interoperability across your technology stack.",
      features: [
        "API and middleware integration",
        "Legacy system modernization",
        "Cross-platform connectivity",
        "Data synchronization solutions"
      ],
      image: systemImage,
      link: "/system-integration"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleSections(prev => new Set([...prev, index]));
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="main_div_our_services">
      <Helmet>
        <title>Our Services | Professional Software Development Solutions at 360synergytech</title>
        <meta name="description" content="Explore our comprehensive software development services including custom software, digital commerce, AI/ML, cloud solutions, CRM, and more at 360synergytech" />
        <meta name="keywords" content="custom software, digital commerce, AI ML, cloud engineering, CRM solutions, automation, 360synergytech services" />
        <link rel="canonical" href="https://360synergytech.com/services" />
      </Helmet>

      {/* Header Section */}
      <div className="services_header_section">
        <div className="row m-0 p-0">
          <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
          <div className="col-lg-8 col-md-10 col-sm-12 col-12">
            <div className="text-center">
              <h1 className="services_main_heading animate-fade-in">
                Strategic <span className="highlight_text">Solutions</span> for Complex Needs
              </h1>
              <p className="services_main_description animate-fade-in-delay">
                We deliver innovative technology solutions that drive business growth and digital transformation. 
                Our expert team combines cutting-edge technologies with industry best practices to create solutions that scale.
              </p>
            </div>
          </div>
          <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        </div>
      </div>

      {/* Services Sections */}
      <div className="services_content_wrapper">
        <div className="row m-0 p-0">
          <div className="col-lg-1 col-md-1 col-sm-12 col-12"></div>
          <div className="col-lg-10 col-md-10 col-sm-12 col-12">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className={`service_section ${index % 2 === 0 ? 'image_left' : 'image_right'} ${
                  visibleSections.has(index) ? 'animate-in' : 'animate-out'
                }`}
                ref={el => sectionRefs.current[index] = el}
                data-index={index}
              >
                <div className="row m-0 p-0 align-items-center">
                  {index % 2 === 0 ? (
                    <>
                      <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="service_image_container">
                          <div className="image_wrapper">
                            <img 
                              src={service.image || "/placeholder.svg"} 
                              alt={service.title}
                              className="service_image"
                            />
                            <div className="image_overlay">
                              <div className="overlay_content">
                                <div className="floating_icon">
                                  <span className="icon_pulse"></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="service_content">
                          <h2 className="service_title">{service.title}</h2>
                          <h3 className="service_subtitle">{service.subtitle}</h3>
                          <p className="service_description">{service.description}</p>
                          <ul className="service_features">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="service_feature_item" style={{animationDelay: `${idx * 0.1}s`}}>
                                <span className="feature_bullet">•</span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <div className="service_actions">
                            <button 
                              className="btn_learn_more"
                              onClick={() => window.location.href = service.link}
                            >
                              Learn More
                            </button>
                            <button 
                              className="btn_get_quote"
                              onClick={scrollToAppointment}
                            >
                              Get Quote
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="service_content">
                          <h2 className="service_title">{service.title}</h2>
                          <h3 className="service_subtitle">{service.subtitle}</h3>
                          <p className="service_description">{service.description}</p>
                          <ul className="service_features">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="service_feature_item" style={{animationDelay: `${idx * 0.1}s`}}>
                                <span className="feature_bullet">•</span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <div className="service_actions">
                            <button 
                              className="btn_learn_more"
                              onClick={() => window.location.href = service.link}
                            >
                              Learn More
                            </button>
                            <button 
                              className="btn_get_quote"
                              onClick={scrollToAppointment}
                            >
                              Get Quote
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="service_image_container">
                          <div className="image_wrapper">
                            <img 
                              src={service.image || "/placeholder.svg"} 
                              alt={service.title}
                              className="service_image"
                            />
                            <div className="image_overlay">
                              <div className="overlay_content">
                                <div className="floating_icon">
                                  <span className="icon_pulse"></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="col-lg-1 col-md-1 col-sm-12 col-12"></div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="services_cta_section">
        <div className="row m-0 p-0">
          <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
          <div className="col-lg-8 col-md-10 col-sm-12 col-12">
            <div className="text-center">
              <h2 className="cta_heading">Ready to Transform Your Business?</h2>
              <p className="cta_description">
                Let's discuss how our solutions can help you achieve your goals and drive growth.
              </p>
              <button className="btn_start_project" onClick={scrollToAppointment}>
                Start Your Project
              </button>
            </div>
          </div>
          <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        </div>
      </div>
    </div>
  );
}

export default OurServices;