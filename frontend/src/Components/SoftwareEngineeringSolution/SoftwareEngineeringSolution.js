"use client"

import { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import "./SoftwareEngineeringSolution.css"

function SoftwareEngineeringSolution({ scrollToAppointment }) {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({ devTime: 0, performance: 0, delivery: 0 })
  const statsRef = useRef(null)

  // Intersection Observer for triggering animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          startCounterAnimation()
        }
      },
      { threshold: 0.3 },
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Counter animation function
  const startCounterAnimation = () => {
    const targets = { devTime: 50, performance: 2, delivery: 98 }
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)

      setCounters({
        devTime: Math.round(targets.devTime * easeOutQuart),
        performance: Math.round(targets.performance * easeOutQuart),
        delivery: Math.round(targets.delivery * easeOutQuart),
      })

      if (currentStep >= steps) {
        clearInterval(timer)
        setCounters(targets)
      }
    }, stepDuration)
  }

  return (
    <div className="main_div_work_speaks">
      <Helmet>
        <title>Software Engineering Solutions | 360synergytech</title>
        <meta name="description" content="Build robust and scalable applications with 360synergytech's Software Engineering services. We deliver high-quality software solutions to drive your business forward." />
        <meta name="keywords" content="software engineering, custom software development, scalable applications, 360synergytech, agile development" />
        <link rel="canonical" href="https://360synergytech.com/software-engineering" />
      </Helmet>
      
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="row m-0 p-0">
            <div className="col-lg-10 col-md-9 col-sm-9 col-8">
              <h1 className="heading_work_speaks">Software Engineering solutions for robust applications</h1>
              <p className="heading_work_speaks_para">
                At 360synergytech, we provide expert Software Engineering services to deliver high-quality, maintainable, and scalable applications. Our team leverages industry best practices and modern technologies to create solutions that meet your business needs. Whether you need enterprise software, web applications, or system optimizations, we ensure performance and reliability.
              </p>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-3 col-4">
              <div className="button-container">
                <button
                  className="btn_lets_talk"
                  onClick={scrollToAppointment}
                  aria-label="Schedule a consultation with our experts"
                >
                  Talk to an Expert
                </button>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "100px" }}></div>

          <div ref={statsRef} className="stats_section">
            <p className="stats_title">Building the future with robust Software Engineering solutions</p>
            <div className="stats_cards_container">
              <div className="stat_card stat_card_blue">
                <p className="stat_number">{counters.devTime}%</p>
                <p className="stat_description">Reduction in development time</p>
              </div>
              <div className="stat_card stat_card_orange">
                <p className="stat_number">{counters.performance}X</p>
                <p className="stat_description">Increase in application performance</p>
              </div>
              <div className="stat_card stat_card_blue">
                <p className="stat_number">{counters.delivery}%</p>
                <p className="stat_description">Project delivery success rate</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "80px" }}></div>

          {/* Content Cards Section */}
          <div className="content_cards_section">
            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Enterprise Software Development</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Build complex enterprise applications with our expert team. We focus on creating secure, scalable, and integrated systems to support large-scale business operations.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Web Application Development</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Develop responsive and feature-rich web applications. Our solutions include e-commerce platforms, dashboards, and collaborative tools tailored to your business requirements.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Mobile Application Development</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Create cross-platform mobile apps with our engineering expertise. We deliver native and hybrid applications for iOS and Android, ensuring a seamless user experience.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">DevOps and System Optimization</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Optimize your software lifecycle with DevOps practices. We implement continuous integration, deployment pipelines, and monitoring to enhance system performance and reliability.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Legacy System Modernization</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Upgrade your legacy systems with modern architectures. We re-engineer outdated software to improve efficiency, security, and compatibility with current technologies.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
      </div>
    </div>
  )
}

export default SoftwareEngineeringSolution
