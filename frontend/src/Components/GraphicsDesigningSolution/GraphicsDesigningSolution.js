"use client"

import { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import "./GraphicsDesigningSolution.css"

function GraphicsDesigningSolution({ scrollToAppointment }) {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({ engagement: 0, visualAppeal: 0, satisfaction: 0 })
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
    const targets = { engagement: 50, visualAppeal: 1.5, satisfaction: 96 }
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)

      setCounters({
        engagement: Math.round(targets.engagement * easeOutQuart),
        visualAppeal: Math.round(targets.visualAppeal * easeOutQuart * 10) / 10,
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
        <title>Graphics Designing Solutions | 360synergytech</title>
        <meta name="description" content="Elevate your brand with 360synergytech's Graphics Designing services. We create stunning visuals to captivate your audience and strengthen your brand identity." />
        <meta name="keywords" content="graphics designing, visual design, brand identity, 360synergytech, UI/UX design" />
        <link rel="canonical" href="https://360synergytech.com/graphics-designing" />
      </Helmet>
      
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="row m-0 p-0">
            <div className="col-lg-10 col-md-9 col-sm-9 col-8">
              <h1 className="heading_work_speaks">Graphics Designing solutions to enhance your brand</h1>
              <p className="heading_work_speaks_para">
                At 360synergytech, our Graphics Designing services create visually compelling designs to elevate your brand identity and engage your audience. From logos to UI/UX designs, we deliver creative solutions that align with your business goals. Our expertise ensures stunning visuals that leave a lasting impression across digital and print media.
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
            <p className="stats_title">Captivating audiences with stunning graphic designs</p>
            <div className="stats_cards_container">
              <div className="stat_card stat_card_blue">
                <p className="stat_number">{counters.engagement}%</p>
                <p className="stat_description">Increase in brand engagement</p>
              </div>
              <div className="stat_card stat_card_orange">
                <p className="stat_number">{counters.visualAppeal}X</p>
                <p className="stat_description">Growth in visual appeal metrics</p>
              </div>
              <div className="stat_card stat_card_blue">
                <p className="stat_number">{counters.satisfaction}%</p>
                <p className="stat_description">Design satisfaction rate</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "80px" }}></div>

          {/* Content Cards Section */}
          <div className="content_cards_section">
            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Logo and Branding Design</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Craft unique logos and branding materials that define your identity. We create designs that reflect your values and resonate with your target audience.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">UI/UX Design Services</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Enhance user interfaces with our UI/UX design expertise. We focus on intuitive layouts and interactive elements to improve user satisfaction and engagement.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Print Media Design</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Develop professional print materials like brochures, posters, and business cards. Our designs ensure consistency across all offline marketing channels.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Motion Graphics and Animation</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Add dynamic visuals with motion graphics and animations. We create engaging videos and effects to boost your digital marketing campaigns.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Brand Guideline Development</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Establish a consistent brand presence with our guideline development. We provide detailed manuals for colors, typography, and usage to maintain brand integrity.
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

export default GraphicsDesigningSolution
