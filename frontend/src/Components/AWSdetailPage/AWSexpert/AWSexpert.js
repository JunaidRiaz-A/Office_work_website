import React from "react";
import { Helmet } from "react-helmet";
// import "./../AWSexpert/AWSexpert.css";

function AWSexpert({ scrollToAppointment }) {
  return (
    <div className="main_div_work_speaks">
      <Helmet>
        <title>Need AWS Cloud Development Services? | 360synergytech Cloud Experts Can Help</title>
        <meta name="description" content="Need AWS cloud experts? 360synergytech offers scalable cloud application development to power your business transformation." />
        <meta name="keywords" content="AWS cloud development, 360synergytech, cloud experts, scalable cloud solutions, business transformation" />
        <link rel="canonical" href="https://360synergytech.com/aws" />
      </Helmet>
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"> </div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="row m-0 p-0">
            <div className="col-lg-10 col-md-9 col-sm-9 col-8">
              <p className="heading_work_speaks">
                Fuel Your Business Growth with Secure, Robust and Scalable
                Solutions on AWS
              </p>
              <p className="heading_work_speaks_para">
                Kanda is a reliable partner and an expert in AWS development,
                management, optimization, automation, and deployment. We help
                clients develop custom applications on AWS tailored to
                their unique business objectives and budget. From innovative
                startups to large enterprises we deliver, manage and deploy
                solutions aimed to take full advantage of AWS cost-savings
                options, scalability and performance to create experiences
                customers love.
              </p>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-3 col-4">
              <div className="d-flex justify-content-end">
                <button className="btn_lets_talk" onClick={scrollToAppointment}>
                  Talk to an Expert
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"> </div>
      </div>
    </div>
  );
}

export default AWSexpert;