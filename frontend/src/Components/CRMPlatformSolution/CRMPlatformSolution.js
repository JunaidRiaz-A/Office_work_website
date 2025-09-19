"use client"

import { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import "./CRMPlatformSolution.css"

function CRMPlatformSolution({ scrollToAppointment }) {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({ efficiency: 0, conversion: 0, retention: 0 })
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
    const targets = { efficiency: 60, conversion: 3, retention: 95 }
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
        conversion: Math.round(targets.conversion * easeOutQuart),
        retention: Math.round(targets.retention * easeOutQuart),
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
        <title>CRM Platform Implementation Solutions | 360synergytech</title>
        <meta name="description" content="Streamline your customer relationships with 360synergytech's CRM Platform Implementation services. We deliver customized, scalable CRM solutions to boost efficiency and growth." />
        <meta name="keywords" content="CRM platform implementation, customer relationship management, CRM solutions, 360synergytech, sales automation" />
        <link rel="canonical" href="https://360synergytech.com/crm-platform-implementation" />
      </Helmet>
      
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="row m-0 p-0">
            <div className="col-lg-10 col-md-9 col-sm-9 col-8">
              <h1 className="heading_work_speaks">CRM platform solutions to enhance customer relationships</h1>
              <p className="heading_work_speaks_para">
                At 360synergytech, we implement tailored CRM platforms to streamline your sales, marketing, and customer service processes. Our expertise ensures scalable, secure, and integrated CRM solutions that drive efficiency and boost customer engagement. Whether you need a custom CRM or integration with platforms like Salesforce or HubSpot, we deliver solutions that align with your business goals.
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
            <p className="stats_title">Empowering businesses with seamless CRM platform solutions</p>
            <div className="stats_cards_container">
              <div className="stat_card stat_card_blue">
                <p className="stat_number">{counters.efficiency}%</p>
                <p className="stat_description">Increase in sales efficiency</p>
              </div>
              <div className="stat_card stat_card_orange">
                <p className="stat_number">{counters.conversion}X</p>
                <p className="stat_description">Faster lead conversion</p>
              </div>
              <div className="stat_card stat_card_blue">
                <p className="stat_number">{counters.retention}%</p>
                <p className="stat_description">Customer retention rate</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "80px" }}></div>

          {/* Content Cards Section */}
          <div className="content_cards_section">
            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Sales and Marketing Automation</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Optimize your sales and marketing efforts with automated workflows. Our CRM solutions include lead tracking, email campaigns, and analytics to help you convert prospects into loyal customers efficiently.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Customer Support Integration</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Enhance customer support with integrated ticketing systems and knowledge bases. Our CRM platforms enable faster response times and personalized support, improving customer satisfaction and loyalty.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Data Analytics and Insights</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Leverage powerful data analytics within your CRM to gain actionable insights. We provide dashboards and reporting tools to monitor performance, identify trends, and make data-driven decisions.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Scalable Cloud-Based CRM</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Deploy a cloud-based CRM that grows with your business. Our solutions offer flexibility, remote access, and robust security features to ensure your data is safe and accessible anytime, anywhere.
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

export default CRMPlatformSolution
