import React from "react";
import { Helmet } from "react-helmet";

function BusinessMobilegoal({ scrollToAppointment }) {
  return (
    <div className="main_div_work_speaks">
      <Helmet>
        <title>Searching for Custom Mobile App Development? | Build with 360synergytech</title>
        <meta name="description" content="Launch innovative mobile apps with 360synergytech. We craft apps that are fast, intuitive, and ready to scale" />
        <meta name="keywords" content="mobile app development, custom mobile apps, 360synergytech, innovative apps, scalable apps" />
        <link rel="canonical" href="https://360synergytech.com/mobile/app/developement" />
      </Helmet>
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"> </div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="row m-0 p-0">
            <div className="col-lg-10 col-md-9 col-sm-9 col-8">
              <p className="heading_work_speaks">
                Mobile development solutions for reaching your business goals
              </p>
              <p className="heading_work_speaks_para">
                360synergytech is a mobile Development Company that provides
                precisely tailored and coherent mobile app development solutions
                for your needs at an affordable rate. Our experienced developers
                create mobile products that set industry standards.
              </p>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-3 col-4">
              <div className="d-flex justify-content-end">
                <button
                  className="btn_lets_talk"
                  onClick={scrollToAppointment}
                >
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

export default BusinessMobilegoal;