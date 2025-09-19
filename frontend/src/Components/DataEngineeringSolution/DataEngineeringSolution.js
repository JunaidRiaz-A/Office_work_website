"use client"

import { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import "./DataEngineeringSolution.css"

function DataEngineeringSolution({ scrollToAppointment }) {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({ efficiency: 0, insights: 0, reliability: 0 })
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
    const targets = { efficiency: 55, insights: 2.5, reliability: 97 }
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
        insights: Math.round(targets.insights * easeOutQuart * 10) / 10,
        reliability: Math.round(targets.reliability * easeOutQuart),
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
        <title>Data Engineering Solutions | 360synergytech</title>
        <meta name="description" content="Transform your data into actionable insights with 360synergytech's Data Engineering services. We build robust data pipelines and infrastructure for your business." />
        <meta name="keywords" content="data engineering, data pipelines, data warehousing, 360synergytech, real-time data processing" />
        <link rel="canonical" href="https://360synergytech.com/data-engineering" />
      </Helmet>
      
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="row m-0 p-0">
            <div className="col-lg-10 col-md-9 col-sm-9 col-8">
              <h1 className="heading_work_speaks">Data Engineering solutions for actionable insights</h1>
              <p className="heading_work_speaks_para">
                At 360synergytech, our Data Engineering services help you manage, process, and analyze large datasets to uncover actionable insights. We build robust data pipelines and infrastructure to ensure scalability and reliability. Whether you need ETL processes, data warehousing, or real-time data processing, we deliver solutions that empower data-driven decision-making.
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
            <p className="stats_title">Unlocking insights with advanced Data Engineering solutions</p>
            <div className="stats_cards_container">
              <div className="stat_card stat_card_blue">
                <p className="stat_number">{counters.efficiency}%</p>
                <p className="stat_description">Increase in data processing efficiency</p>
              </div>
              <div className="stat_card stat_card_orange">
                <p className="stat_number">{counters.insights}X</p>
                <p className="stat_description">Faster data insights delivery</p>
              </div>
              <div className="stat_card stat_card_blue">
                <p className="stat_number">{counters.reliability}%</p>
                <p className="stat_description">Data pipeline reliability</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "80px" }}></div>

          {/* Content Cards Section */}
          <div className="content_cards_section">
            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">ETL Process Optimization</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Streamline your Extract, Transform, Load (ETL) processes with our optimized pipelines. We ensure efficient data extraction, transformation, and loading into your target systems.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Data Warehousing Solutions</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Build centralized data warehouses for integrated analytics. Our solutions support structured and unstructured data storage, enabling comprehensive business intelligence.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Real-Time Data Processing</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Enable real-time decision-making with our data streaming solutions. We implement technologies like Apache Kafka and Spark for instant data processing and analysis.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Data Governance and Quality</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Ensure data integrity with our governance frameworks. We provide data quality checks, metadata management, and compliance with regulatory standards.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Big Data Infrastructure</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Scale your data operations with big data infrastructure. We deploy Hadoop, Hive, and other tools to handle massive datasets and support advanced analytics.
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

export default DataEngineeringSolution
