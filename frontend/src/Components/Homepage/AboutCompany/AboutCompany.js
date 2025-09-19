import "./AboutCompany.css";
import React from 'react'
import aboutS from "./../../../Assets/aboutSymbol.png";
import brownP from "./../../../Assets/brown.png";
import groupSA from "./../../../Assets/Mask Group.png";
import jessicaP from "./../../../Assets/jessica.png";
import saraP from "./../../../Assets/sara.png";

function AboutCompany() {
  return (
    <div className="row">
      <div className="about-layout1">
        <div className="about-layout2">
          <p className="about-content1">
            <span>:::OUR TESTIMONIALS</span>
          </p>
          <p className="about-content2">
            <span>What They're Talking About</span>

            <span className="about-orange">Company</span>
          </p>
          <div className="col-lg-8 col-md-10 col-sm-12 col-12">
            <div className="about-layout3">
              <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                <div className="jessica-layout1">
                  <img src={jessicaP} alt="logo" className="layout-aboutP" />
                  <div className="about-layout4">
                    <p className="about-content4">
                      Build and implement innovative, profitable and sustainable
                      products and services
                    </p>
                  </div>
                  <p className="about-name1">Jessica Brown</p>
                  <p className="ceo-name">CEO, Buzicon</p>
                  <img src={groupSA} alt="logo" className="orange-SA" />
                  <img src={aboutS} alt="logo" className="about-SA1" />
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                <div className="sara-layout1">
                  <img src={saraP} alt="logo" className="layout-aboutP" />
                  <div className="about-layout4">
                    <p className="about-content4">
                      Build and implement innovative, profitable and sustainable
                      products and services
                    </p>
                  </div>
                  <p className="about-name2"> Sara Albert</p>
                  <p className="ceo-name">CEO, Buzicon</p>
                  <img src={groupSA} alt="logo" className="orange-SA" />
                  <img src={aboutS} alt="logo" className="about-SA1" />
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                <div className="brown-layout1">
                  <img src={brownP} alt="logo" className="layout-aboutP" />
                  <div className="about-layout4">
                    <p className="about-content4">
                      Build and implement innovative, profitable and sustainable
                      products and services
                    </p>
                  </div>
                  <p className="about-name3">Aleesha brown</p>
                  <p className="ceo-name">CEO, Buzicon</p>
                  <img src={groupSA} alt="logo" className="orange-SA" />
                  <img src={aboutS} alt="logo" className="about-SA1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutCompany
