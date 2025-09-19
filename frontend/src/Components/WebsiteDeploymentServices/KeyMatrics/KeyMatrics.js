import React from "react";
import "./../KeyMatrics/KeyMatrics.css";
function KeyMatrics() {
  return (
    <div className="main_div_KeyMatrics">
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="blue_div_KeyMatrics">
            <p className="heading_key_matrix">
              Key Metrics That Prove Our Web App Development Expertise
            </p>
            <div className="row m-0 p-2">
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <p className="valueink">100K+</p>
                <p className="paravalueink">Engaged Users</p>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <p className="valueink1">98%</p>
                <p className="paravalueink1">Satisfied Clients</p>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <p className="valueink2">2X</p>
                <p className="paravalueink2">Faster Market Entry</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
      </div>
    </div>
  );
}

export default KeyMatrics;
