import React, { useState, useEffect } from "react";
import axios from "./../../api/axiosInstance";
import CustomerP from "../../../Assets/customerP.png";
import Customer1 from "../../../Assets/c1.png";
import Slider from "react-slick";
import "./Customers.css";
import axiosInstance from "./../../api/axiosInstance";

const BASE_URL = process.env.REACT_APP_BASE_URL;

function Customers() {
  const [testimonials, setTestimonials] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    axiosInstance
      .get("api/testimonials")
      .then((response) => {
        console.log("Fetched testimonials:", response.data);
        const sortedTestimonials = (response.data || []).sort(
          (a, b) => b.id - a.id
        );
        setTestimonials(sortedTestimonials);
      })
      .catch((error) => {
        console.error("There was an error fetching the testimonials!", error);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    lazyLoad: "ondemand",
    customPaging: function (i) {
      return (
        <div
          className={`blue_line_slick${
            i === currentSlide ? "blue_line_slick_active" : ""
          }`}
        />
      );
    },
    afterChange: function (current) {
      setCurrentSlide(current);
    },
    responsive: [
      { breakpoint: 1400, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 1200, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 780, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const handleImageError = (e, authorName) => {
    console.error(`Failed to load image for ${authorName}: ${e.target.src}`);
    e.target.src = Customer1;
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return Customer1;
    return `${BASE_URL}/${imageUrl}`;
  };

  const getTruncatedText = (text) => {
    if (!text) return "";
    const words = text.trim().split(/\s+/).filter((word) => word.length > 0);
    const wordCount = words.length;
    if (wordCount >= 15 && wordCount <= 20) {
      return text;
    }
    const targetWords = Math.min(20, Math.max(15, wordCount));
    return words.slice(0, targetWords).join(" ") + (wordCount > 20 ? "..." : "");
  };

  return (
    <div className="main_div_customer">
      <div className="row p-0 m-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <p className="testimonial_heading">Testimonial</p>
          <p className="saying_customer_para">What Our Customers Are Saying</p>
          <div className="hr_black_customers"></div>
          <Slider {...settings}>
            {testimonials.length > 0 ? (
              testimonials.map((testimonial, index) => (
                <div key={index} className="col">
                  <div className="main_div_card_customer">
                    <div className="d-flex justify-content-center">
                      <img
                        src={CustomerP}
                        alt="Quotation Mark"
                        className="comma_customer_card"
                        loading="lazy"
                      />
                    </div>
                    <p className="para_comment_card">
                      {getTruncatedText(testimonial.text)}
                    </p>
                    <div className="profile_pic_container">
                      <img
                        src={getImageUrl(testimonial.image)}
                        className="profile_pic_customer_card"
                        alt={`Customer ${testimonial.author_name}`}
                        onError={(e) => handleImageError(e, testimonial.author_name)}
                        onLoad={() =>
                          console.log(
                            `Successfully loaded image for ${testimonial.author_name}: ${testimonial.image}`
                          )
                        }
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="customer_info">
                    <p className="customer_name">{testimonial.author_name}</p>
                    <p className="customer_role">{testimonial.author_role}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No testimonials available</p>
            )}
          </Slider>
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
      </div>
    </div>
  );
}

export default Customers;