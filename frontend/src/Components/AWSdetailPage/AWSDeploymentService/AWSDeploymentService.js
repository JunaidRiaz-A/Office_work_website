import React from "react";
import "./../AWSDeploymentService/AWSDeploymentService.css";
import aws1 from "./../../../Assets/aws logo.png";
function AWSDeploymentService() {
  return (
    <div className="main_div_AWSDeploymentService">
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <p className="heading_main_div_AWSDeploymentService">
            AWS Development Services
          </p>
          <div className="d-flex justify-content-center">
            <div className="div_hr_line" />
          </div>

          <div className="row m-0 p-0">
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="main_card_blue_deployment">
                <div className="main_div_heading">
                  <div className="row m-0 p-0">
                    <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                      <p className="para_card_heading_aws">
                        AWS Application Development Services
                      </p>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                      <img src={aws1} className="awslogo" />
                    </div>
                  </div>
                </div>
                <ul>
                  <li className="para_card_aws">
                    AWS Web and Mobile Application Development
                  </li>

                  <li className="para_card_aws">
                    Legacy Application Modernization
                  </li>

                  <li className="para_card_aws">AWS Integration Services</li>

                  <li className="para_card_aws">AWS Optimization</li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="main_card_blue_deployment">
                <div className="main_div_heading">
                  <div className="row m-0 p-0">
                    <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                      <p className="para_card_heading_aws">Cloud Migration</p>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                      <img src={aws1} className="awslogo" />
                    </div>
                  </div>
                </div>
                <ul>
                  <li className="para_card_aws">
                    On-Premises, GCP, Azure migration to AWS Platform
                  </li>
                  <li className="para_card_aws">A Hybrid Cloud</li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="main_card_blue_deployment">
                <div className="main_div_heading">
                  <div className="row m-0 p-0">
                    <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                      <p className="para_card_heading_aws">
                        Cloud DevOps as a Service
                      </p>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                      <img src={aws1} className="awslogo" />
                    </div>
                  </div>
                </div>
                <ul>
                  <li className="para_card_aws">AWS Native CI/CD</li>

                  <li className="para_card_aws">Infrastructure as a Code</li>

                  <li className="para_card_aws">
                    AWS Automation, Orchestration and Testing
                  </li>

                  <li className="para_card_aws">
                    Software Release Automation on AWS
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="main_card_blue_deployment">
                <div className="main_div_heading">
                  <div className="row m-0 p-0">
                    <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                      <p className="para_card_heading_aws">
                        Cloud Managed Services
                      </p>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                      <img src={aws1} className="awslogo" />
                    </div>
                  </div>
                </div>
                <ul>
                  <li className="para_card_aws">
                    Infrastructure Modernization
                  </li>
                  <li className="para_card_aws">24x7 AWS Managed Services</li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="main_card_blue_deployment">
                <div className="main_div_heading">
                  <div className="row m-0 p-0">
                    <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                      <p className="para_card_heading_aws">
                        Business Intelligence andAnalytics on AWS
                      </p>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                      <img src={aws1} className="awslogo" />
                    </div>
                  </div>
                </div>
                <ul>
                  <li className="para_card_aws">Data Warehousing on AWS</li>
                  <li className="para_card_aws">
                    Cloud Business Intelligence Solutions
                  </li>
                  <li className="para_card_aws">Predictive Analytics</li>
                  <li className="para_card_aws">ML and AI Services</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
      </div>
    </div>
  );
}

export default AWSDeploymentService;
