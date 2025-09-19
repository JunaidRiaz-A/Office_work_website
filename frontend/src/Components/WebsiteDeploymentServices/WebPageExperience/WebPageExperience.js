import React from "react";
import "./../WebPageExperience/WebPageExperience.css";
import scability from "./../../../Assets/scability.png";
import cloudnative from "./../../../Assets/cloud native.png";
import device from "./../../../Assets/device comp.png";
import uiux from "./../../../Assets/ui ux.png";
import webapp from "./../../../Assets/web app.png";
import saaswebapp from "./../../../Assets/saas web app.png";
import frontend from "./../../../Assets/frontend.png";
import backend from "./../../../Assets/backend.png";
import customapp from "./../../../Assets/custom web app.png";
import moderntech from "./../../../Assets/modern stak.png";
import usablity from "./../../../Assets/usability.png";

function WebPageExperience() {
  return (
    <div className="main_div_WebPageExperience">
      <div className="row p-0 m-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <p className="heading_webexp">
            We Craft exceptional solutions in software development and
            customization
          </p>
          <div className="d-flex justify-content-center">
            <div className="hr_line_blue_web" />
          </div>
          <div className="row m-0 p-0">
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="card_div_web">
                <img src={scability} />
                <p className="Scalability_heading">Scalability</p>
                <p className="Scalability_para">
                  Experience the power of scalable web applications that grow
                  seamlessly alongside your business. We're a web app
                  development company that ensures your web app can handle more
                  users without slowing down.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="card_div_web">
                <img src={cloudnative} />
                <p className="Scalability_heading">Cloud-Native</p>
                <p className="Scalability_para">
                  Leverage our cloud-native approach for efficient, future-proof
                  web app development. We build robust applications that
                  seamlessly integrate with cloud platforms, offering
                  flexibility and scalability.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="card_div_web">
                <img src={device} />
                <p className="Scalability_heading">Device Compatibility</p>
                <p className="Scalability_para">
                  We prioritize device compatibility in every stage of web app
                  development to ensure your web app performs well on all
                  devices for a great user experience.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="card_div_web">
                <img src={uiux} />
                <p className="Scalability_heading">Delightful UX/UI</p>
                <p className="Scalability_para">
                  Engage your users with stunning UX/UI designs that captivate
                  and convert. We understand the importance of user experience
                  and design intuitive interfaces that drive user engagement and
                  action.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="card_div_web">
                <img src={webapp} />
                <p className="Scalability_heading">Web App for All</p>
                <p className="Scalability_para">
                  From startups to enterprises, we customize web apps to fit any
                  need. Whether it's a simple internal tool or a complex
                  customer platform, our web app development services can meet
                  your requirements.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="card_div_web">
                <img src={saaswebapp} />
                <p className="Scalability_heading">SaaS Web App Development</p>
                <p className="Scalability_para">
                  Build highly scalable, secure, and performant SaaS web apps in
                  record time. We specialize in crafting robust SaaS solutions
                  that cater to diverse user bases and deliver exceptional
                  value.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="card_div_web">
                <img src={frontend} />
                <p className="Scalability_heading">
                  Frontend Web App Development
                </p>
                <p className="Scalability_para">
                  Craft highly responsive web applications using cutting-edge
                  frameworks like React.JS and NextJS. Our frontend web app
                  development expertise ensures smooth user interaction and
                  dynamic interfaces.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="card_div_web">
                <img src={backend} />
                <p className="Scalability_heading">
                  Backend Web App Development
                </p>
                <p className="Scalability_para">
                  Leverage our expertise in scalable backend development using
                  Node.JS, TypeScript, and AWS Lambda. We build robust backends
                  that power your web app efficiently and handle complex data
                  workflows.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="card_div_web">
                <img src={customapp} />
                <p className="Scalability_heading">
                  Custom Web App Development
                </p>
                <p className="Scalability_para">
                  Create tailored web apps that seamlessly integrate with your
                  existing software systems. We specialize in custom web app
                  development that bridges the gap between your existing
                  infrastructure and your digital vision.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="card_div_web">
                <img src={moderntech} />
                <p className="Scalability_heading">Modern Tech Stack</p>
                <p className="Scalability_para">
                  Stay ahead of the curve with our modern stack that adapts to
                  your evolving business needs. We utilize the latest
                  technologies and frameworks in web app development to ensure
                  your application remains competitive and performant.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="card_div_web">
                <img src={usablity} />
                <p className="Scalability_heading">Usability and Design</p>
                <p className="Scalability_para">
                  Experience web-based systems that combine usability, beautiful
                  designs, and complex workflows seamlessly. Our web app
                  development process prioritizes both functionality and
                  aesthetics, delivering solutions that are both effective and
                  visually appealing.
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

export default WebPageExperience;
