import React from "react";
import "./../BusinesssGoalAnalysis/BusinesssGoal.css";
import { IoMdCheckmark } from "react-icons/io";
function BusinesssGoal() {
  return (
    <div className="main_div_BusinesssGoal">
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="row m-0 p-0">
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <p className="orange_heading_b">Business Goals Analysis</p>
              <p className="orange_heading_c">Features Set Documentation</p>
              <p className="orange_heading_c">Wireframing & Prototyping</p>
              <p className="orange_heading_c">Features Set Documentation</p>
              <p className="orange_heading_c">MVP Plan & Estimates</p>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <p className="para_second_b">
                Aligning business objectives with web app development features
                to define user base and product goals.
              </p>
              <p className="para_secondbb">
                <IoMdCheckmark className="mr-3" style={{ color: "#2866DC" }} />
                Aligning objectives with app features
              </p>

              <p className="para_secondbb">
                <IoMdCheckmark className="mr-3" style={{ color: "#2866DC" }} />
                Defining user base and product goals for your web app
              </p>

              <p className="para_secondbb">
                <IoMdCheckmark className="mr-3" style={{ color: "#2866DC" }} />
                Understanding business objectives thoroughly
              </p>

              <p className="para_secondbb">
                <IoMdCheckmark className="mr-3" style={{ color: "#2866DC" }} />
                Ensuring app features match business goals
              </p>
              <p className="para_secondbb">
                <IoMdCheckmark className="mr-3" style={{ color: "#2866DC" }} />
                Identifying key objectives for web application development
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
      </div>
    </div>
  );
}

export default BusinesssGoal;
