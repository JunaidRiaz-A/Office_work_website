"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { IoReorderThreeOutline } from "react-icons/io5"
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa"
import synergy from "./../../../Assets/synergy-logo-3 1.png"
import clock from "./../../../Assets/clock_syn.png"
import phone from "./../../../Assets/phone_syn.png"
import "./Navbarsynergtech.css"

const Navbarsynergtech = ({ scrollToAppointment }) => {
  const location = useLocation()
  const [isNavOpen, setIsNavOpen] = useState(false)

  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setIsNavOpen(false)
  }

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen)
  }

  const closeNavbar = () => {
    setIsNavOpen(false)
  }

  return (
    <div className="main_div_sticky">
      <div className="uppernavbar">
        <div className="inside_div_navbar">
          <div className="d-flex justify-content-between content-wrapper">
            <div className="d-flex flex-row contact-info-wrapper">
              <div className="d-flex flex-row">
                <img src={clock || "/placeholder.svg"} className="clock_style_syn" alt="clock" loading="lazy" />
                <p className="clock_para_syn">Mon - Fri: 09.00am - 10.00 pm</p>
              </div>
              {/* <div className="d-flex flex-row main_div_clock">
                <img src={clock || "/placeholder.svg"} className="clock_style_syn" alt="clock" loading="lazy" />
                <p className="clock_para_syn">11A Commercial, D Block Valencia, Lahore, 54000</p>
              </div> */}
              <div className="d-flex flex-row main_div_clock">
                <img src={clock || "/placeholder.svg"} className="clock_style_syn" alt="clock" loading="lazy" />
                <a
  href="mailto:info@360synergytech.com"
  className="clock_para_syn email-link"
>
  info@360synergytech.com
</a>
              </div>
            </div>
            <div className="transform_second_div">
              <div className="d-flex flex-row">
                <div className="d-flex flex-row">
                  <img src={phone || "/placeholder.svg"} className="phone_style_syn" alt="phone" loading="lazy" />
                  <p className="clock_para_syn">Make a Call</p>
                  <a
                    href="https://wa.me/+1(203) 948 3308"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="phone_para_syn_bold whatsapp-link"
                  >
                    +1(203) 948 3308
                  </a>
                  <div className="social-media-row">
                    <a
                      href="https://www.facebook.com/360SynergyTech/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      <FaFacebook className="social-icon" />
                      <span className="visually-hidden">Facebook</span>
                    </a>
                    <a
                      href="https://x.com/360SynergyTech"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      <FaTwitter className="social-icon" />
                      <span className="visually-hidden">Twitter</span>
                    </a>
                    <a
                      href="https://www.instagram.com/360synergytech/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      <FaInstagram className="social-icon" />
                      <span className="visually-hidden">Instagram</span>
                    </a>
                    <a
                      href="https://pk.linkedin.com/company/360synergytech"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      <FaLinkedin className="social-icon" />
                      <span className="visually-hidden">LinkedIn</span>
                    </a>
                    <a
                      href="https://www.youtube.com/@360synergytech"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      <FaYoutube className="social-icon" />
                      <span className="visually-hidden">YouTube</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg p-0 m-0">
        <div className="navbar-brand">
          <Link
            to="/"
            className="logo-link"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick()
            }}
          >
            <img src={synergy || "/placeholder.svg"} className="synergytech_logo" alt="Synergy Logo" loading="lazy" />
          </Link>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarSupportedContent"
          aria-expanded={isNavOpen}
          aria-label="Toggle navigation"
        >
          <IoReorderThreeOutline />
        </button>

        {isNavOpen && <div className="navbar-overlay" onClick={closeNavbar} />}

        <div className={`navbar-collapse ${isNavOpen ? "show" : "collapse"}`} id="navbarSupportedContent" style={{ maxHeight: isNavOpen ? '100vh' : '0' }}>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link
                to="/"
                className={`navitems_synergytechnavbar1 ${location.pathname === "/" ? "active" : ""}`}
                onClick={handleNavClick}
              >
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/aboutus"
                className={`navitems_synergytechnavbar ${location.pathname === "/aboutus" ? "active" : ""}`}
                onClick={handleNavClick}
              >
                ABOUT US
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/blogs"
                className={`navitems_synergytechnavbar ${location.pathname === "/blogs" ? "active" : " "}`}
                onClick={handleNavClick}
              >
                BLOGS
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/applynow"
                className={`navitems_synergytechnavbar ${location.pathname === "/applynow" ? "active" : ""}`}
                onClick={handleNavClick}
              >
                APPLY NOW
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/team"
                className={`navitems_synergytechnavbar ${location.pathname === "/team" ? "active" : ""}`}
                onClick={handleNavClick}
              >
                TEAM
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/services"
                className={`navitems_synergytechnavbar ${location.pathname === "/services" ? "active" : ""}`}
                onClick={handleNavClick}
              >
                OUR SERVICES
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/portfolio"
                className={`navitems_synergytechnavbar ${location.pathname === "/portfolio" ? "active" : ""}`}
                onClick={handleNavClick}
              >
                PORTFOLIO
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/case/studies"
                className={`navitems_synergytechnavbar ${location.pathname === "/case/studies" ? "active" : ""}`}
                onClick={handleNavClick}
              >
                CASE STUDY
              </Link>
            </li>
          </ul>
          <form className="form-inline">
            <button
              className="btn_request_quote"
              type="button"
              onClick={() => {
                scrollToAppointment()
                closeNavbar()
              }}
            >
              REQUEST A QUOTE
            </button>
          </form>
        </div>
      </nav>
    </div>
  )
}

export default Navbarsynergtech