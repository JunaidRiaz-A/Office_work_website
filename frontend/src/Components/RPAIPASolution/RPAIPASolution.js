"use client"

import { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import "./RPAIPASolution.css"

function RPAIPASolution({ scrollToAppointment }) {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({ efficiency: 0, costReduction: 0, accuracy: 0 })
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
    const targets = { efficiency: 60, costReduction: 2, accuracy: 95 }
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
        costReduction: Math.round(targets.costReduction * easeOutQuart),
        accuracy: Math.round(targets.accuracy * easeOutQuart),
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
        <title>RPA & IPA Implementation Solutions | 360synergytech</title>
        <meta name="description" content="Automate your business processes with 360synergytech's RPA & IPA Implementation services. We deliver intelligent automation solutions to enhance efficiency and productivity." />
        <meta name="keywords" content="RPA implementation, IPA solutions, robotic process automation, intelligent process automation, 360synergytech" />
        <link rel="canonical" href="https://360synergytech.com/rpa-ipa-implementation" />
      </Helmet>
      
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="row m-0 p-0">
            <div className="col-lg-10 col-md-9 col-sm-9 col-8">
              <h1 className="heading_work_speaks">RPA & IPA solutions for intelligent automation</h1>
              <p className="heading_work_speaks_para">
                At 360synergytech, we provide cutting-edge RPA (Robotic Process Automation) and IPA (Intelligent Process Automation) solutions to streamline repetitive tasks and enhance operational efficiency. Our expertise in automation technologies ensures scalable, secure, and intelligent workflows tailored to your business needs. Whether you need process automation or AI-driven workflows, we deliver transformative solutions.
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
            <p className="stats_title">Transforming businesses with intelligent automation solutions</p>
            <div className="stats_cards_container">
              <div className="stat_card stat_card_blue">
                <p className="stat_number">{counters.efficiency}%</p>
                <p className="stat_description">Increase in process efficiency</p>
              </div>
              <div className="stat_card stat_card_orange">
                <p className="stat_number">{counters.costReduction}X</p>
                <p className="stat_description">Reduction in operational costs</p>
              </div>
              <div className="stat_card stat_card_blue">
                <p className="stat_number">{counters.accuracy}%</p>
                <p className="stat_description">Automation accuracy rate</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "80px" }}></div>

          {/* Content Cards Section */}
          <div className="content_cards_section">
            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Robotic Process Automation (RPA)</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Automate repetitive manual tasks with RPA bots. We implement solutions for data entry, invoice processing, and other routine operations to save time and reduce errors.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Intelligent Process Automation (IPA)</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Combine RPA with AI for intelligent automation. Our IPA solutions include cognitive capabilities like natural language processing and decision-making for complex workflows.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Workflow Orchestration</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Optimize end-to-end business processes with workflow orchestration. We design automated workflows that integrate multiple systems and ensure smooth operations.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">AI-Powered Decision Support</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Enhance decision-making with AI-powered insights within IPA. We develop tools that analyze data and provide recommendations to improve operational strategies.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Scalable Automation Frameworks</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Build scalable automation systems that grow with your business. Our frameworks support expansion and integration with emerging technologies for long-term success.
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

export default RPAIPASolution
