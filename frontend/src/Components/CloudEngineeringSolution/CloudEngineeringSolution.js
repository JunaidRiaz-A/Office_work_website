"use client"

import { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import "./CloudEngineeringSolution.css"

function CloudEngineeringSolution({ scrollToAppointment }) {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({ costReduction: 0, deployment: 0, uptime: 0 })
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
    const targets = { costReduction: 40, deployment: 3, uptime: 99 }
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)

      setCounters({
        costReduction: Math.round(targets.costReduction * easeOutQuart),
        deployment: Math.round(targets.deployment * easeOutQuart),
        uptime: Math.round(targets.uptime * easeOutQuart),
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
        <title>Cloud Engineering Solutions | 360synergytech</title>
        <meta name="description" content="Scale your business with 360synergytech's Cloud Engineering services. We provide scalable, secure, and cost-effective cloud-native solutions for your enterprise." />
        <meta name="keywords" content="cloud engineering, cloud-native solutions, cloud migration, 360synergytech, DevOps" />
        <link rel="canonical" href="https://360synergytech.com/cloud-engineering" />
      </Helmet>
      
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="row m-0 p-0">
            <div className="col-lg-10 col-md-9 col-sm-9 col-8">
              <h1 className="heading_work_speaks">Cloud Engineering solutions for scalable infrastructure</h1>
              <p className="heading_work_speaks_para">
                At 360synergytech, we deliver comprehensive Cloud Engineering services to build and manage scalable, secure, and cost-effective cloud-native solutions. Our expertise in cloud platforms ensures seamless migration, microservices development, and DevOps integration. Whether you need cloud architecture design or application modernization, we empower your business to thrive in the cloud.
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
            <p className="stats_title">Scaling businesses with advanced Cloud Engineering solutions</p>
            <div className="stats_cards_container">
              <div className="stat_card stat_card_blue">
                <p className="stat_number">{counters.costReduction}%</p>
                <p className="stat_description">Reduction in infrastructure costs</p>
              </div>
              <div className="stat_card stat_card_orange">
                <p className="stat_number">{counters.deployment}X</p>
                <p className="stat_description">Faster deployment cycles</p>
              </div>
              <div className="stat_card stat_card_blue">
                <p className="stat_number">{counters.uptime}%</p>
                <p className="stat_description">Uptime reliability</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "80px" }}></div>

          {/* Content Cards Section */}
          <div className="content_cards_section">
            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Cloud Migration Services</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Seamlessly transition your on-premises infrastructure to the cloud. We handle data migration, application re-platforming, and testing to ensure minimal downtime and maximum efficiency.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Microservices Architecture</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Design and deploy microservices-based applications for enhanced flexibility and scalability. Our solutions enable independent deployment and maintenance of individual services.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Serverless Computing</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Leverage serverless architectures to reduce operational overhead. We build event-driven applications that scale automatically, optimizing costs and performance.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Cloud Security and Compliance</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Ensure your cloud environment is secure and compliant with industry standards. We implement encryption, identity management, and regular audits to protect your data.
                </p>
              </div>
            </div>

            <div className="content_card">
              <div className="content_card_header">
                <h2 className="content_card_title">Multi-Cloud Strategies</h2>
              </div>
              <div className="content_card_body">
                <p className="content_card_text">
                  Optimize your cloud usage with multi-cloud strategies. We integrate multiple cloud providers to enhance resilience, reduce vendor lock-in, and improve service availability.
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

export default CloudEngineeringSolution
