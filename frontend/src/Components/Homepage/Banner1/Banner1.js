import "./Banner1.css";

import React from "react";
import Slider from "react-slick";

function Banner1() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="slide">
          <h3 className="slide-text">
            <div className="dot-layout"> </div>
            Digital
          </h3>
        </div>
        <div className="slide">
          <h3 className="slide-text">
            <div className="dot-layout"> </div>
            Marketing
          </h3>
        </div>
        <div className="slide">
          <h3 className="slide-text">
            <div className="dot-layout"> </div>
            Development
          </h3>
        </div>
        <div className="slide">
          <h3 className="slide-text">
            <div className="dot-layout"> </div>
            Designing
          </h3>
        </div>
        <div className="slide">
          <h3 className="slide-text">
            <div className="dot-layout"> </div>
            Solutions
          </h3>
        </div>
      </Slider>
    </div>
  );
}

export default Banner1;
