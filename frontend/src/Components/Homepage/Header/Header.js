import "./Header.css";

import React from 'react'
import arrow from "./../../../Assets/arrow.png";
import button from "./../../../Assets/Button.png";
import dis from "./../../../Assets/discussion.png";

function Header() {
  return (
    <div className="row">
      <div className="col-lg-12 col-md-112 col-sm-12 col-12">
        <img src={dis} alt="Background" className="dis-layout" />

        <div className="col-lg-2 col-md-1 col-sm-12 col-12"> </div>
        <div className="main-layoutHe">
          <div className="col-lg-4 col-md-6 col-sm-12 col-12">
            <div className="IT-layout">
              <div className="layout-white"></div>
              <div className="IT-layoutS">
                <p className="IT-content">
                  <span>IT Solutions </span>
                  <span>
                    <span className="ITtext">&</span> Technology
                  </span>
                </p>
              </div>
            </div>
            <div className="IT-layout1">
              <p className="IT-content1">
                There are many of passages of lorem Ipsum, but the majori have
                suffered alteration in some form.
              </p>
            </div>

            <div className="IT-layout2">
              <div className="orange-line"></div>
              <p className="IT-content2">Solutions for your businesses</p>
            </div>
          </div>

          <button className="discover-button">Discover more</button>
          <img src={arrow} alt="Background" className="arrow-layout" />

          <img src={button} alt="Background" className="button-layout" />
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"> </div>
      </div>
    </div>
  );
}

export default Header
