"use client"

import { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import "./GenerativeAISolution.css"

function GenerativeAISolution({ scrollToAppointment }) {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({ contentTime: 0, engagement: 0, adoption: 0 })
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
    const targets = { contentTime: 70, engagement: 2.5, adoption: 97 }
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)

      setCounters({
        contentTime: Math.round(targets.contentTime * easeOutQuart),
        engagement: Math.round(targets.engagement * easeOutQuart * 10) / 10,
        adoption: Math.round(targets.adoption * easeOutQuart),
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
        <title>Generative AI Solutions | 360synergytech</title>
        <meta name="description" content="Transform your business with 360synergytech's Generative AI solutions. We deliver innovative AI-powered tools to automate content creation and enhance user experiences." />
        <meta name="keywords" content="generative AI, AI solutions, content automation, 360synergytech, AI-driven innovation" />
        <link rel="canonical" href="https://360synergytech.com/generative-ai" />
      </Helmet>
      
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="row m-0 p-0">
            <div className="col-lg-10 col-md-9 col-sm-9 col-8">
              <h1 className="heading_work_speaks">Generative AI solutions to empower your business</h1>
              <p className="heading_work_speaks_para">
                At 360synergytech, we harness the power of Generative AI to create innovative solutions that automate content creation, enhance user experiences, and drive business growth. Our expertise in AI technologies delivers scalable and secure solutions tailored to your needs. Whether you need AI-driven content generation, chatbots, or creative automation, we provide cutting-edge solutions to transform your operations.
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
            <p className="stats_title">Empowering businesses with innovative Generative AI solutions</p>
            <div className="stats_cards_container">
              <div className="stat_card stat_card_blue">
                <p className="stat_number">{counters.contentTime}%</p>
                <p className="stat_description">Reduction in content creation time</p>
              </div>
              <div className="stat_card stat_card_orange">
                <p className="stat_number">{counters.engagement}X</p>
                <p className="stat_description">Increase in engagement rates</p>
              </div>
              <div className="stat_card stat_card_blue">
                <p className="stat_number">{counters.adoption}%</p>
                <p className="stat_description">Solution adoption success rate</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "80px" }}></div>

          {/* Content Cards Section */}
          <div className="content_cards_section">
            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">AI-Powered Content Generation</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Create high-quality content at scale with our AI-powered tools. From blog posts and marketing copy to personalized product descriptions, our generative AI solutions save time and enhance creativity.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Intelligent Chatbots and Virtual Assistants</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Improve customer interaction with intelligent chatbots and virtual assistants. Our solutions provide 24/7 support, handle inquiries, and integrate with existing systems for a seamless experience.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Creative Design Automation</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Automate your design processes with Generative AI. We develop tools for generating logos, layouts, and visual content, enabling your team to focus on strategic tasks while maintaining brand consistency.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Personalized User Experiences</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Enhance user engagement with personalized recommendations and interfaces. Our AI solutions analyze user behavior to deliver tailored experiences, boosting retention and satisfaction.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Ethical AI Implementation</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Ensure responsible AI use with our ethical implementation practices. We prioritize transparency, fairness, and compliance with regulations to build trustworthy Generative AI systems.
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

export default GenerativeAISolution
