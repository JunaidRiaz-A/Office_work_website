"use client"

import { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import "./MachineLearningSolution.css"

function MachineLearningSolution({ scrollToAppointment }) {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({ accuracy: 0, decisionSpeed: 0, deployment: 0 })
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
    const targets = { accuracy: 65, decisionSpeed: 2, deployment: 96 }
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)

      setCounters({
        accuracy: Math.round(targets.accuracy * easeOutQuart),
        decisionSpeed: Math.round(targets.decisionSpeed * easeOutQuart),
        deployment: Math.round(targets.deployment * easeOutQuart),
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
        <title>Machine Learning Solutions | 360synergytech</title>
        <meta name="description" content="Unlock data-driven insights with 360synergytech's Machine Learning solutions. We build custom models to optimize processes and drive intelligent decision-making." />
        <meta name="keywords" content="machine learning, AI solutions, predictive analytics, 360synergytech, data-driven insights" />
        <link rel="canonical" href="https://360synergytech.com/machine-learning" />
      </Helmet>
      
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="row m-0 p-0">
            <div className="col-lg-10 col-md-9 col-sm-9 col-8">
              <h1 className="heading_work_speaks">Machine Learning solutions for smarter business decisions</h1>
              <p className="heading_work_speaks_para">
                At 360synergytech, we develop custom Machine Learning solutions to unlock the potential of your data. Our expertise in advanced algorithms delivers scalable, secure, and intelligent systems that optimize processes and provide predictive insights. Whether you need predictive analytics, recommendation systems, or process automation, we deliver solutions that drive smarter decision-making.
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
            <p className="stats_title">Driving intelligence with advanced Machine Learning solutions</p>
            <div className="stats_cards_container">
              <div className="stat_card stat_card_blue">
                <p className="stat_number">{counters.accuracy}%</p>
                <p className="stat_description">Improvement in predictive accuracy</p>
              </div>
              <div className="stat_card stat_card_orange">
                <p className="stat_number">{counters.decisionSpeed}X</p>
                <p className="stat_description">Faster decision-making processes</p>
              </div>
              <div className="stat_card stat_card_blue">
                <p className="stat_number">{counters.deployment}%</p>
                <p className="stat_description">Model deployment success rate</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "80px" }}></div>

          {/* Content Cards Section */}
          <div className="content_cards_section">
            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Predictive Analytics and Forecasting</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Anticipate market trends and customer behavior with our predictive analytics models. We build systems to forecast demand, optimize inventory, and improve strategic planning.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Recommendation Systems</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Enhance user experiences with personalized recommendations. Our Machine Learning solutions analyze data to suggest products, services, or content, increasing customer satisfaction and sales.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Automated Process Optimization</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Streamline operations with automated process optimization. We develop Machine Learning models to identify inefficiencies and suggest improvements in manufacturing, logistics, and more.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Natural Language Processing (NLP)</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Unlock insights from text data with our NLP solutions. We create models for sentiment analysis, language translation, and chatbots to enhance communication and customer support.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Real-Time Anomaly Detection</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Protect your business with real-time anomaly detection. Our Machine Learning systems monitor data streams to identify and alert on unusual patterns, ensuring security and operational integrity.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Custom Model Training</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Develop bespoke Machine Learning models tailored to your industry. We train models on your specific datasets to address unique challenges and deliver precise outcomes.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Scalable ML Infrastructure</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Build a robust infrastructure for Machine Learning deployment. Our solutions include cloud-based platforms and edge computing to support large-scale ML applications efficiently.
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

export default MachineLearningSolution
