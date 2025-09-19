import React from "react";
import "./ProductDesignExperience.css"; 
import scability from "./../../Assets/scability.png";
import cloudnative from "./../../Assets/cloud native.png";
import device from "./../../Assets/device comp.png";
import uiux from "./../../Assets/ui ux.png";
import webapp from "./../../Assets/web app.png";
import saaswebapp from "./../../Assets/saas web app.png";
import frontend from "./../../Assets/frontend.png";
import backend from "./../../Assets/backend.png";
import customapp from "./../../Assets/custom web app.png";
import moderntech from "./../../Assets/modern stak.png";
import usability from "./../../Assets/usability.png";

function ProductDesignExperience() {
  return (
    <div className="main_div_ProductDesignExperience">
      <div className="row p-0 m-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <p className="heading_productdesignexp">
            We Craft Innovative Product & Design Solutions
          </p>
          <div className="d-flex justify-content-center">
            <div className="hr_line_blue_productdesign" />
          </div>
          <div className="row m-0 p-0">
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="card_div_productdesign">
                <img src={uiux} alt="UI/UX Design" />
                <p className="ProductDesign_heading">UI/UX Design</p>
                <p className="ProductDesign_para">
                  Create intuitive and visually stunning interfaces that enhance user satisfaction and engagement with our expert UI/UX design services.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="card_div_productdesign">
                <img src={usability} alt="Usability Optimization" />
                <p className="ProductDesign_heading">Usability Optimization</p>
                <p className="ProductDesign_para">
                  Optimize product usability with designs that are user-friendly and efficient, improving overall customer experience and satisfaction.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="card_div_productdesign">
                <img src={device} alt="Cross-Device Design" />
                <p className="ProductDesign_heading">Cross-Device Design</p>
                <p className="ProductDesign_para">
                  Ensure consistent and appealing designs across all devices with our cross-device compatibility expertise for product development.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="card_div_productdesign">
                <img src={customapp} alt="Custom Design Solutions" />
                <p className="ProductDesign_heading">Custom Design Solutions</p>
                <p className="ProductDesign_para">
                  Deliver tailored design solutions that meet your specific product requirements, ensuring unique and effective outcomes.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="card_div_productdesign">
                <img src={moderntech} alt="Modern Design Tech" />
                <p className="ProductDesign_heading">Modern Design Tech</p>
                <p className="ProductDesign_para">
                  Utilize the latest design technologies to keep your products competitive and innovative in a dynamic market.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="card_div_productdesign">
                <img src={webapp} alt="Product Prototyping" />
                <p className="ProductDesign_heading">Product Prototyping</p>
                <p className="ProductDesign_para">
                  Develop rapid prototypes to test and refine product concepts, ensuring a smooth path from idea to market-ready design.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="card_div_productdesign">
                <img src={saaswebapp} alt="Scalable Design Systems" />
                <p className="ProductDesign_heading">Scalable Design Systems</p>
                <p className="ProductDesign_para">
                  Build scalable design systems that adapt to growing product lines and user demands with efficiency and flexibility.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="card_div_productdesign">
                <img src={frontend} alt="Visual Design" />
                <p className="ProductDesign_heading">Visual Design</p>
                <p className="ProductDesign_para">
                  Enhance your products with captivating visual designs that reflect your brand identity and attract users.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="card_div_productdesign">
                <img src={backend} alt="Design Workflow Management" />
                <p className="ProductDesign_heading">Design Workflow Management</p>
                <p className="ProductDesign_para">
                  Streamline your design processes with robust workflow management, ensuring timely and effective product development.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="card_div_productdesign">
                <img src={scability} alt="Design Scalability" />
                <p className="ProductDesign_heading">Design Scalability</p>
                <p className="ProductDesign_para">
                  Design products that scale seamlessly with your business growth, maintaining quality and performance over time.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="card_div_productdesign">
                <img src={cloudnative} alt="Cloud-Enabled Design" />
                <p className="ProductDesign_heading">Cloud-Enabled Design</p>
                <p className="ProductDesign_para">
                  Integrate cloud technologies into your design process for enhanced collaboration and accessibility across teams.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
      </div>
    </div>
  );
}

export default ProductDesignExperience;