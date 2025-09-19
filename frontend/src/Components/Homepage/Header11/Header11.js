"use client"

import { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import header012 from "./../../../Assets/header12.Webp"
import mainVideo from "./../../../Assets/mainvideo.mp4"
import "./Header11.css"

function Header11({ appointmentRef }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const backgroundVideoRef = useRef(null)
  const headerRef = useRef(null)
  const contentRef = useRef(null)

  const scrollToAppointment = () => {
    if (appointmentRef.current) {
      appointmentRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    const video = backgroundVideoRef.current
    if (video) {
      video.onloadeddata = () => {
        video.classList.add("loaded")
        setIsLoaded(true)
        // Trigger entrance animations after video loads
        setTimeout(() => setIsVisible(true), 300)
      }
    }

    // Intersection Observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (headerRef.current) {
      observer.observe(headerRef.current)
    }

    // Parallax effect on scroll
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const parallax = headerRef.current
      if (parallax) {
        const speed = scrolled * 0.5
        parallax.style.transform = `translateY(${speed}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      <Helmet>
        <link rel="preload" href={mainVideo} as="video" />
      </Helmet>
      <div className="hd-layout1" ref={headerRef}>
        <div className="hd-image-container">
          <video
            ref={backgroundVideoRef}
            src={mainVideo}
            className="hd-background-video"
            autoPlay
            loop
            muted
            playsInline
          >
            Your browser does not support the video tag.
          </video>
          <div className="video-overlay"></div>
        </div>
        <div className={`hd-layout3 ${isVisible ? "content-visible" : ""}`} ref={contentRef}>
          <div className="hd-layout4 animate-slide-right">
            <div className="hd-layout8 animate-expand"></div>
            <div className="hd-layout9">
              <p className="hd-content1 animate-fade-in">Solutions for your businesses</p>
            </div>
          </div>
          <div className="hd-layout5 animate-slide-up">
            <div className="hd-layout10 animate-grow"></div>
            <div className="hd-layout11">
              <h1>
                <p className="hd-content3">
                  <span className="typing-effect animate-type-in">IT Solutions</span>
                  <br />
                  <span className="ampersand animate-bounce-in">&</span>
                  <span className="typing-effect1 animate-type-in-delayed">Technology</span>
                </p>
              </h1>
            </div>
          </div>
          <div className="hd-layout6 animate-fade-up">
            <p className="hd-content2">
              We provide end-to-end technology solutions that drive innovation, boost efficiency, and help you stay
              ahead in the digital world.
            </p>
          </div>
          <div className="hd-layout7 animate-slide-up-delayed">
            <div className="hd-layout12">
              <button
                type="button"
                className="Estimate animate-button"
                onClick={scrollToAppointment}
                aria-label="Estimate your project"
              >
                <span className="button-text">Estimate your Project</span>
                <div className="button-ripple"></div>
              </button>
            </div>
            <div className="hd-layout13 animate-float">
              <img src={header012 || "/placeholder.svg"} alt="Background" className="hd-layout14" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header11
