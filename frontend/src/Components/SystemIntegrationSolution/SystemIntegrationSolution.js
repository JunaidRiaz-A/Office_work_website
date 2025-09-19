"use client"

import { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import "./SystemIntegrationSolution.css"

function SystemIntegrationSolution({ scrollToAppointment }) {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({ efficiency: 0, interoperability: 0, success: 0 })
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
    const targets = { efficiency: 55, interoperability: 2.5, success: 98 }
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)

      setCounters({
        efficiency: Math.round(targets.efficiency * easeOutQuart),
        interoperability: Math.round(targets.interoperability * easeOutQuart * 10) / 10,
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
        <title>System Integration Solutions | 360synergytech</title>
        <meta name="description" content="Unify your systems with 360synergytech's System Integration services. We deliver seamless integrations to optimize workflows and enhance operational efficiency." />
        <meta name="keywords" content="system integration, API integration, enterprise connectivity, 360synergytech, workflow optimization" />
        <link rel="canonical" href="https://360synergytech.com/system-integration" />
      </Helmet>
      
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="row m-0 p-0">
            <div className="col-lg-10 col-md-9 col-sm-9 col-8">
              <h1 className="heading_work_speaks">System Integration solutions for seamless operations</h1>
              <p className="heading_work_speaks_para">
                At 360synergytech, our System Integration services connect disparate systems to streamline workflows and enhance operational efficiency. We specialize in API integrations, enterprise connectivity, and custom solutions to ensure your systems work in harmony. Whether you need to integrate legacy systems or modern platforms, we deliver reliable and scalable solutions.
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
            <p className="stats_title">Streamlining operations with seamless system integrations</p>
            <div className="stats_cards_container">
              <div className="stat_card stat_card_blue">
                <p className="stat_number">{counters.efficiency}%</p>
                <p className="stat_description">Improvement in workflow efficiency</p>
              </div>
              <div className="stat_card stat_card_orange">
                <p className="stat_number">{counters.interoperability}X</p>
                <p className="stat_description">Faster system interoperability</p>
              </div>
              <div className="stat_card stat_card_blue">
                <p className="stat_number">{counters.success}%</p>
                <p className="stat_description">Integration success rate</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "80px" }}></div>

          {/* Content Cards Section */}
          <div className="content_cards_section">
            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">API Integration Services</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Connect your applications with robust API integrations. We design and implement APIs to enable smooth data exchange between systems.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Enterprise Application Integration (EAI)</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Integrate enterprise applications for unified operations. Our EAI solutions bridge CRM, ERP, and other systems to enhance business processes.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Legacy System Integration</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Modernize legacy systems with our integration expertise. We ensure compatibility between old and new technologies for continuous operation.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Data Synchronization Solutions</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Maintain data consistency across platforms with synchronization tools. We implement real-time data updates to support accurate reporting.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Custom Integration Frameworks</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Develop tailored integration frameworks for unique business needs. Our custom solutions adapt to your specific workflows and requirements.
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

export default SystemIntegrationSolution
