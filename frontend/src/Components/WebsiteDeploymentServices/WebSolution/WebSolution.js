"use client"

import { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import "./WebSolution.css"

function CustomSoftwareSolution({ scrollToAppointment }) {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({ timeToMarket: 0, growth: 0, success: 0 })
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
    const targets = { timeToMarket: 52, growth: 2, success: 98 }
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)

      setCounters({
        timeToMarket: Math.round(targets.timeToMarket * easeOutQuart),
        growth: Math.round(targets.growth * easeOutQuart),
        success: Math.round(targets.success * easeOutQuart),
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
        <title>Custom Software Development Solutions | 360synergytech</title>
        <meta name="description" content="Unlock your business potential with custom software development from 360synergytech. We deliver tailored, scalable, and high-performance software solutions." />
        <meta name="keywords" content="custom software development, tailored software solutions, scalable applications, 360synergytech, software engineering" />
        <link rel="canonical" href="https://360synergytech.com/custom-software-development" />
      </Helmet>
      
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="row m-0 p-0">
            <div className="col-lg-10 col-md-9 col-sm-9 col-8">
              <h1 className="heading_work_speaks">Custom software solutions for your unique business needs</h1>
              <p className="heading_work_speaks_para">
                At 360synergytech, we craft bespoke software solutions tailored to your specific business requirements. Our expertise in modern technologies ensures scalable, secure, and high-performance applications that drive efficiency and growth. Whether you need a custom enterprise application, SaaS product, or specialized software, we deliver solutions that align with your goals.
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
            <p className="stats_title">Solving real-world problems with custom software solutions</p>
            <div className="stats_cards_container">
              <div className="stat_card stat_card_blue">
                <p className="stat_number">{counters.timeToMarket}%</p>
                <p className="stat_description">Faster time-to-market</p>
              </div>
              <div className="stat_card stat_card_orange">
                <p className="stat_number">{counters.growth}X</p>
                <p className="stat_description">Year-on-year project growth</p>
              </div>
              <div className="stat_card stat_card_blue">
                <p className="stat_number">{counters.success}%</p>
                <p className="stat_description">Project completion success rate</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "80px" }}></div>

          {/* Content Cards Section */}
          <div className="content_cards_section">
            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Tailored Enterprise Applications</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Develop enterprise-grade software to streamline your operations. Our solutions include CRM systems, ERP integrations, and workflow automation tools designed to enhance productivity and decision-making across your organization.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Cloud-Based SaaS Development</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Leverage the power of cloud technology with our SaaS products. We build secure, scalable, and subscription-based applications that offer flexibility and cost-efficiency, enabling your business to reach a global audience.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Mobile and Cross-Platform Solutions</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Expand your reach with custom mobile apps and cross-platform solutions. We develop native and hybrid applications that provide seamless user experiences across iOS, Android, and web platforms, ensuring maximum accessibility.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Continuous Integration and Deployment</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Stay ahead with our CI/CD services. We implement automated testing, continuous integration, and deployment pipelines to accelerate development cycles and ensure your software remains up-to-date with minimal downtime.
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

export default CustomSoftwareSolution
