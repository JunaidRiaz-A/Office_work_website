import React from "react";
import { IoMdCheckmark } from "react-icons/io";

function PlanningandStrategy() {
  return (
    <div className="main_div_BusinesssGoal">
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="row m-0 p-0">
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <p className="orange_heading_b">Planning & Strategy</p>
              <p className="orange_heading_c">Design & Prototyping</p>
              <p className="orange_heading_c">Development & Testing</p>
              <p className="orange_heading_c">Deployment & Launch</p>
              <p className="orange_heading_c">Maintenance & Updates</p>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <p className="para_second_b">
                Dive deep into your users, define success metrics, and chart
                your app's path for a focused mobile app development journey.
              </p>
              <p className="para_secondbb">
                <IoMdCheckmark className="mr-3" style={{ color: "#2866DC" }} />
                Know your ideal users for targeted mobile app development.
              </p>

              <p className="para_secondbb">
                <IoMdCheckmark className="mr-3" style={{ color: "#2866DC" }} />
                Set clear goals to measure your mobile application's impact.
              </p>

              <p className="para_secondbb">
                <IoMdCheckmark className="mr-3" style={{ color: "#2866DC" }} />
                Assess challenges and optimize your app development approach.
              </p>

              <p className="para_secondbb">
                Craft intuitive user journeys for a seamless app experience.
              </p>
              <p className="para_secondbb">
                <IoMdCheckmark className="mr-3" style={{ color: "#2866DC" }} />
                Chart your course to launch with a clear mobile app development
                plan.
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
      </div>
    </div>
  );
}

export default PlanningandStrategy;
