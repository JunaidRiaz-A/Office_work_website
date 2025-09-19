import React from "react";
import "./../SetupAWS/SetupAWS.css";
function SetupAWS() {
  return (
    <div className="main__div_SetupAWS">
      <div className="row  m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <p className="para_setup_aws">
            AWS has revolutionized the way companies develop and deploy
            applications by significantly reducing infrastructurecosts, enabling
            on-demand scalability, ease of use, cost-efficiency and flexibility.
            With an extensive array of on-demandglobal storage, database,
            analytics, and deployment products and services AWS allows to build
            high-performancesolutions tailored to unique business objectives,
            budgets and needs.
          </p>
          <p className="para_setup_aws">
            {" "}
            With AWS you only pay for what you consume with no long-term
            contracts or commitments. With a its global backboneinfrastructure
            at the fingertips AWS enables businesses to bring innovative
            solutions to the market fast and stay ahead ofthe competition.
          </p>
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
      </div>
    </div>
  );
}

export default SetupAWS;
