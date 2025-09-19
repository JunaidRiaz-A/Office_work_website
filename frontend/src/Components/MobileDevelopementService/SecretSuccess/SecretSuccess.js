import React from "react";
import uiux from "./../../../Assets/pro1.png";
import webapp from "./../../../Assets/pro2.png";
import saaswebapp from "./../../../Assets/pro3.png";
import frontend from "./../../../Assets/pro4.png";
import backend from "./../../../Assets/pro5.png";
import customapp from "./../../../Assets/pro6.png";

function SecretSuccess() {
  return (
    <div className="main_div_WebPageExperience">
      <div className="row p-0 m-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <p className="heading_webexp">Our 'secret' behind your success</p>
          <div className="row m-0 p-0">
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="card_div_web">
                <img src={uiux} />
                <p className="Scalability_heading">Consistent process</p>
                <p className="Scalability_para">
                  We follow a proven, consistent process for every project. This
                  ensures a smooth workflow and successful outcome – when the
                  process works, the results do too.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="card_div_web">
                <img src={webapp} />
                <p className="Scalability_heading">Transparent pricing</p>
                <p className="Scalability_para">
                  We offer clear and predictable pricing for all projects,
                  regardless of your business size or revenue. Our consistent
                  pricing model ensures you know exactly what to expect.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="card_div_web">
                <img src={saaswebapp} />
                <p className="Scalability_heading">1-on-1 communication</p>
                <p className="Scalability_para">
                  We prioritize open and consistent communication throughout
                  your project. We'll be readily available to answer your
                  questions and keep you informed on every step.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="card_div_web">
                <img src={frontend} />
                <p className="Scalability_heading">Flexible approach</p>
                <p className="Scalability_para">
                  Our approach is flexible to accommodate your needs. Whether
                  you require assistance with a single project or seek a
                  long-term partnership, we're happy to work on projects of any
                  size.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="card_div_web">
                <img src={backend} />
                <p className="Scalability_heading">Design strategy</p>
                <p className="Scalability_para">
                  We'll collaborate closely with you to understand your goals.
                  This collaborative approach allows us to design a solution
                  that perfectly meets both your and your audience's needs.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="card_div_web">
                <img src={customapp} />
                <p className="Scalability_heading">All needs covered</p>
                <p className="Scalability_para">
                  We offer comprehensive product support and maintenance,
                  handling everything from infrastructure management and bug
                  fixes to ongoing development. We've got you covered – all your
                  product needs are in good hands.
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

export default SecretSuccess;
