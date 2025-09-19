"use client"

import { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import "./ProductStrategyConsultingSolution.css"

function ProductStrategyConsultingSolution({ scrollToAppointment }) {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({ adoption: 0, timeToMarket: 0, satisfaction: 0 })
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
    const targets = { adoption: 45, timeToMarket: 2, satisfaction: 94 }
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)

      setCounters({
        adoption: Math.round(targets.adoption * easeOutQuart),
        timeToMarket: Math.round(targets.timeToMarket * easeOutQuart),
        satisfaction: Math.round(targets.satisfaction * easeOutQuart),
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
        <title>Product Strategy & Consulting Solutions | 360synergytech</title>
        <meta name="description" content="Drive innovation with 360synergytech's Product Strategy & Consulting services. We provide expert guidance to align your product vision with market success." />
        <meta name="keywords" content="product strategy, product consulting, innovation strategy, 360synergytech, market analysis" />
        <link rel="canonical" href="https://360synergytech.com/product-strategy-consulting" />
      </Helmet>
      
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="row m-0 p-0">
            <div className="col-lg-10 col-md-9 col-sm-9 col-8">
              <h1 className="heading_work_speaks">Product Strategy & Consulting for market success</h1>
              <p className="heading_work_speaks_para">
                At 360synergytech, our Product Strategy & Consulting services help you define and execute a winning product roadmap. We provide expert guidance on market analysis, product positioning, and development strategies to ensure your product aligns with business goals and customer needs. From ideation to launch, we drive innovation and success.
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
            <p className="stats_title">Driving innovation with strategic product consulting</p>
            <div className="stats_cards_container">
              <div className="stat_card stat_card_blue">
                <p className="stat_number">{counters.adoption}%</p>
                <p className="stat_description">Increase in product adoption</p>
              </div>
              <div className="stat_card stat_card_orange">
                <p className="stat_number">{counters.timeToMarket}X</p>
                <p className="stat_description">Faster time-to-market</p>
              </div>
              <div className="stat_card stat_card_blue">
                <p className="stat_number">{counters.satisfaction}%</p>
                <p className="stat_description">Client satisfaction rate</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "80px" }}></div>

          {/* Content Cards Section */}
          <div className="content_cards_section">
            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Market Research and Analysis</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Gain deep insights into market trends with our research services. We analyze competitors, customer preferences, and industry dynamics to inform your product strategy.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Product Roadmap Development</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Create a clear and actionable product roadmap. We align your short-term goals with long-term vision, ensuring a structured approach to product development.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Go-to-Market Strategy</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Launch your product effectively with our go-to-market strategies. We design marketing plans, pricing models, and distribution channels to maximize market penetration.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">User-Centric Design Consulting</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Focus on user needs with our design consulting services. We conduct usability testing and incorporate feedback to create products that resonate with your audience.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Product Lifecycle Management</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Manage your product lifecycle from inception to retirement. We provide strategies for updates, enhancements, and phase-out to maintain competitiveness.
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

export default ProductStrategyConsultingSolution
