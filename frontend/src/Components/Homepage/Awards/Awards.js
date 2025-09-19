import "./Awards.css";

import React from 'react'
import award from "./../../../Assets/award.png";
import guarantee from "./../../../Assets/guarantee.png";
import quality from "./../../../Assets/quality.png";

function Awards() {
  return (
    <div className="row">
      <div className="col-lg-4 col-md-6 col-sm-12 col-12">
        <div className="layout-main5">
          <div className="blackB-line">
            <p className="line-text">we Envision & Transofrm Your Business.</p>
          </div>
          <div className="layout-award1">
            <div className="layout-orangeB">
              <p className="content-num">01</p>
              <img src={award} alt="background" className="layout-all" />
            </div>
            <div className="words-layout">
              <p className="content-words">AWARD WINNING AGENCY</p>
            </div>

            <div className="words-layout2">
              <p className="content-words2">
                Lorem ipsum is simply free dolo sit amet, ctetur.
              </p>
            </div>
          </div>
          <div className="layout-quality">
            <div className="layout-orangeB">
              <p className="content-num">02</p>
              <img src={quality} alt="background" className="layout-all" />
            </div>
            <div className="words-layout">
              <p className="content-words">BEST QUALITY WORK</p>
            </div>
            <div className="words-layout2">
              <p className="content-words2">
                Lorem ipsum is simply free dolo sit amet, ctetur.
              </p>
            </div>
          </div>
          <div className="layout-guarantee">
            <div className="layout-orangeB">
              <p className="content-num">03</p>
              <img src={guarantee} alt="background" className="layout-all" />
            </div>
            <div className="words-layout">
              <p className="content-words">SATISFACTION GUARANTEE</p>
            </div>
            <div className="words-layout2">
              <p className="content-words2">
                Lorem ipsum is simply free dolo sit amet, ctetur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Awards
