import "./../FooterAll/FooterAll.css";
import logowhite from "./../../../Assets/synergy-logo--white 1.png"; 
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight, MdOutlineEmail } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { TiLocationOutline } from "react-icons/ti";
import { Link } from "react-router-dom";

function FooterAll() {
  return (
    <div className="main_div_footer">
      <div className="row p-0 m-0">
        <div className="col-lg-2 col-md-12 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-12 col-sm-12 col-12">
          <div className="row p-0 m-0">
            <div className="col-lg-4 col-md-6 col-sm-12 col-12 mb-4">
              <img src={logowhite || "/placeholder.svg"} className="logo_white_footer" alt="Synergy Tech Logo" loading="lazy" />
              <p className="para_below_logo">
                Discover custom software, AI solutions, and cloud services tailored for your business growth. Partner with 360synergytech and innovate smarter today!
              </p>
              <div className="d-flex flex-row social-media-container">
                <a href="https://x.com/360SynergyTech" className="btn_social_media_links" aria-label="Visit our Twitter page">
                  <FaTwitter />
                </a>
                <a href="https://www.facebook.com/360SynergyTech/" className="btn_social_media_links" aria-label="Visit our Facebook page">
                  <FaFacebookF />
                </a>
                <a href="https://www.instagram.com/360synergytech/" className="btn_social_media_links" aria-label="Visit our Instagram page">
                  <FaInstagram />
                </a>
                <a href="https://pk.linkedin.com/company/360synergytech" className="btn_social_media_links" aria-label="Visit our LinkedIn page">
                  <FaLinkedin />
                </a>
                <a href="https://www.youtube.com/@360synergytech" className="btn_social_media_links" aria-label="Visit our YouTube channel">
                  <FaYoutube />
                </a>
              </div>
            </div>

            <div className="col-lg-2 col-md-3 col-sm-6 col-12 mb-4">
              <p className="services_heading_footer">Useful Links</p>
              <div className="hr_line_blue_footer" />
              <div className="links-container">
                <Link to="/blogs" aria-label="Navigate to Blogs page">
                  <p className="para_below_services_footer">
                    <MdOutlineKeyboardArrowRight /> Blogs
                  </p>
                </Link>
                <Link to="/aboutus" aria-label="Navigate to About Us page">
                  <p className="para_below_services_footer">
                    <MdOutlineKeyboardArrowRight /> About us
                  </p>
                </Link>
                <Link to="/applynow" aria-label="Navigate to Apply Now page">
                  <p className="para_below_services_footer">
                    <MdOutlineKeyboardArrowRight /> Apply now
                  </p>
                </Link>
                <Link to="/case/studies" aria-label="Navigate to Case Studies page">
                  <p className="para_below_services_footer">
                    <MdOutlineKeyboardArrowRight /> Case studies
                  </p>
                </Link>
              </div>
            </div>

            <div className="col-lg-6 col-md-3 col-sm-6 col-12 mb-4">
              <p className="services_heading_footer">Newsletter</p>
              <div className="hr_line_blue_footer" />
              <p className="para_below_logo newsletter-description">
                 
               Subscribe to our newsletter for the latest in web development, AI solutions, cloud innovations, and tech trends. Get expert tips, updates, and offers — straight to your inbox.

              </p>
              <div className="newsletter-form">
                <input className="input_white_newsletter" placeholder="Enter Your Email" />
                <button className="submit_newsletter_btn" aria-label="Submit newsletter subscription">
                  Submit Now
                </button>
              </div>
            </div>
          </div>

          <div className="grey_line" />

          <div className="row m-0 p-0 contact-info-row">
            <div className="col-lg-4 col-md-4 col-sm-12 col-12 mb-3">
              <div className="d-flex flex-row align-items-center contact-item">
                <button className="blue_btn_email" aria-label="Contact us via email">
                  <MdOutlineEmail />
                </button>
                <div className="contact-text">
                  <p className="email_heading_footer">Email</p>
                  <p className="email_para_footer">info@360synergytech.com</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-12 col-12 mb-3">
              <div className="d-flex flex-row align-items-center contact-item">
                <button className="blue_btn_email" aria-label="Contact us via phone">
                  <LuPhone />
                </button>
                <div className="contact-text">
                  <p className="email_heading_footer">Phone</p>
                  <p className="email_para_footer">+1(203) 948 3308</p>
                </div>
              </div>
            </div>

            {/* <div className="col-lg-4 col-md-4 col-sm-12 col-12 mb-3">
              <div className="d-flex flex-row align-items-start contact-item">
                <button className="blue_btn_email" aria-label="View our address">
                  <TiLocationOutline />
                </button>
                <div className="contact-text">
                  <p className="email_heading_footer">Address</p>
                  <p className="email_para_footer">11A Commercial, D Block Valencia, Lahore, 54000</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="col-lg-2 col-md-12 col-sm-12 col-12"></div>
      </div>
    </div>
  );
}

export default FooterAll;