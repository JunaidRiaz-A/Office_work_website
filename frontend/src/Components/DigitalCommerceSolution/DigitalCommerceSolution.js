"use client"

import { useEffect, useRef, useState } from "react"
import "./DigitalCommerceSolution.css"

function DigitalCommerceSolution({ scrollToAppointment }) {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({ conversion: 0, growth: 0, satisfaction: 0 })
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
    const targets = { conversion: 52, growth: 2, satisfaction: 98 }
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)

      setCounters({
        conversion: Math.round(targets.conversion * easeOutQuart),
        growth: Math.round(targets.growth * easeOutQuart),
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
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="row m-0 p-0">
            <div className="col-lg-10 col-md-9 col-sm-9 col-8">
              <h1 className="heading_work_speaks">Digital commerce solutions to grow your online business</h1>
              <p className="heading_work_speaks_para">
                At 360synergytech, we create powerful e-commerce platforms tailored to your business needs. Our
                expertise in modern technologies ensures scalable, secure, and user-friendly online stores that enhance
                customer experiences and drive conversions. Whether you need a B2C storefront, B2B marketplace, or
                payment integration, we deliver solutions that scale with your growth.
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
            <p className="stats_title">Empowering businesses with robust digital commerce solutions</p>
            <div className="stats_cards_container">
              <div className="stat_card stat_card_blue">
                <p className="stat_number">{counters.conversion}%</p>
                <p className="stat_description">Increase in conversion rates</p>
              </div>
              <div className="stat_card stat_card_orange">
                <p className="stat_number">{counters.growth}X</p>
                <p className="stat_description">Growth in online sales</p>
              </div>
              <div className="stat_card stat_card_blue">
                <p className="stat_number">{counters.satisfaction}%</p>
                <p className="stat_description">Customer satisfaction rate</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "80px" }}></div>

          {/* Content Cards Section */}
          <div className="content_cards_section">
            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Advanced E-Commerce Features</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Unlock the potential of your online store with our advanced features. From AI-driven product recommendations
                  to seamless multi-channel integration, we provide tools that enhance customer engagement and streamline
                  operations. Our solutions include inventory management, personalized marketing campaigns, and real-time
                  analytics to keep you ahead of the competition.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Custom Payment Solutions</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Simplify transactions with our custom payment gateways tailored to your business model. We support a wide
                  range of payment methods, including credit cards, digital wallets, and local payment options, ensuring a
                  smooth checkout experience. Our secure and compliant payment systems are designed to boost customer trust
                  and increase sales.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Ongoing Support and Optimization</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Our commitment doesn't end with deployment. We offer ongoing support, regular updates, and performance
                  optimization to ensure your digital commerce platform remains efficient and competitive. Our team provides
                  24/7 assistance and strategic insights to help you adapt to market changes and customer demands.
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

export default DigitalCommerceSolution
