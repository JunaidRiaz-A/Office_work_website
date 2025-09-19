import React from "react";
import "./../WorkingProcess/WorkingProcess.css";

function WorkingProcess({ scrollToAppointment }) {
  return (
    <div className="main_div_working_process">
      <div className="row p-0 m-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="row p-0 m-0">
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="blue_bg_div">
                <p className="working_process_para">Working Process</p>
                <h2 className="working_process_heading">
                  Our Working Process - How We Work For Our Customers
                </h2>
                <button
                  className="btn_contact_us_working"
                  type="button"
                  onClick={scrollToAppointment}
                >
                  Contact Us
                </button>
              </div>
            </div>
            <div className="col-lg-8 col-md-8 col-sm-12 col-12">
              <div className="row m-0 p-0">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                  <h3 className="number_heading_blue">1.</h3>
                  <h4 className="discovery_heading_black">Discover & Consult</h4>
                  <p className="discovery_para_black">
                    We start by understanding your business needs through a free consultation to align with your goals.

                  </p>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                  <h3 className="number_heading_blue">2.</h3>
                  <h4 className="discovery_heading_black">Strategize & Plan </h4>
                  <p className="discovery_para_black">
                  Our experts craft a tailored strategy, whether for web development, AI integration, or cloud solutions.
                  </p>
                </div>
              </div>
              <div className="row m-0 p-0">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                  <h3 className="number_heading_blue">3.</h3>
                  <h4 className="discovery_heading_black">Develop & Innovate</h4>
                  <p className="discovery_para_black">
                    We build your solution with agile development, ensuring flexibility and real-time collaboration.

                  </p>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                  <h3 className="number_heading_blue">4.</h3>
                  <h4 className="discovery_heading_black">Launch & Support</h4>
                  <p className="discovery_para_black">
                   We deliver on time, provide post-launch support, and help you scale confidently.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
      </div>
    </div>
  );
}

export default WorkingProcess;