import React from "react";
import { Helmet } from "react-helmet";

function BusinessAIGoal({ scrollToAppointment }) {
  return (
    <div className="main_div_work_speaks">
      <Helmet>
        <title>How Can AI & Machine Learning Boost Your Business? | 360synergytech Solutions</title>
        <meta name="description" content="Want to integrate AI into your business? 360synergytech delivers custom AI and machine learning solutions that drive results" />
        <meta name="keywords" content="AI solutions, machine learning, 360synergytech, custom AI, business growth" />
        <link rel="canonical" href="https://360synergytech.com/ai/solutions" />
      </Helmet>
      <style>
        {`
          .main_div_work_speaks {
            width: 100%;
            height: auto;
            padding: 5% 0;
            background-color: #fff;
          }
          .heading_work_speaks {
            color: #101010;
            font-family: "Poppins", sans-serif;
            font-size: 36px;
            font-weight: 700;
            line-height: 53.64px;
            text-align: left;
            margin-bottom: 15px;
          }
          .heading_work_speaks_para {
            color: #002e65;
            font-family: "Poppins", sans-serif;
            font-size: 16px;
            font-weight: 500;
            line-height: 19.82px;
            text-align: left;
            margin-bottom: 20px;
          }
          .btn_lets_talk {
            width: 160px;
            height: 50px;
            background-color: #051d71;
            color: white;
            border: none;
            border-radius: 5px;
            font-family: "Poppins", sans-serif;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          .btn_lets_talk:hover {
            background-color: #003087;
          }
          .main_div_WebPageExperience {
            width: 100%;
            height: auto;
            padding: 100px 0 5%;
            background-color: #fff;
          }
          .heading_webexp {
            color: #101010;
            font-family: "Poppins", sans-serif;
            font-size: 36px;
            font-weight: 700;
            line-height: 53.64px;
            text-align: center;
            margin-bottom: 20px;
          }
          .hr_line_blue_web {
            width: 100px;
            height: 5px;
            background-color: #051d71;
            border-radius: 2.5px;
            margin: 0 auto 40px;
          }
          .card_div_web {
            width: 100%;
            height: 300px;
            border-radius: 10px;
            background: #f9f9ff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 20px;
            margin-bottom: 20px;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .card_div_web:hover {
            transform: scale(1.02);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          }
          .Scalability_heading {
            color: #101010;
            font-family: "Poppins", sans-serif;
            font-size: 24px;
            font-weight: 600;
            line-height: 32px;
            text-align: center;
            margin: 15px 0 10px;
          }
          .Scalability_para {
            color: #39393f;
            font-family: "Poppins", sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            text-align: center;
            padding: 0 10px;
          }
          .card_icon {
            width: 50px;
            height: 50px;
            background-color: #e0e0ff;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 15px;
          }
          .blue_div_KeyMatrics {
            background-color: #051d71;
            border-radius: 10px;
            padding: 30px 20px;
            color: white;
            margin-top: 40px;
            position: relative;
            overflow: hidden;
          }
          .blue_div_KeyMatrics::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
            background-size: 20px 20px;
            opacity: 0.3;
            z-index: 0;
          }
          .heading_key_matrix {
            font-family: "Poppins", sans-serif;
            font-size: 24px;
            font-weight: 700;
            line-height: 32px;
            text-align: center;
            margin-bottom: 20px;
            position: relative;
            z-index: 1;
          }
          .valueink, .valueink1, .valueink2 {
            font-family: "Poppins", sans-serif;
            font-size: 73px;
            font-weight: 700;
            text-align: center;
            margin-bottom: 5px;
            position: relative;
            z-index: 1;
          }
          .valueink { color: #e0e0ff; }
          .valueink1 { color: #e0e0ff; }
          .valueink2 { color: #e0e0ff; }
          .paravalueink, .paravalueink1, .paravalueink2 {
            font-family: "Poppins", sans-serif;
            font-size: 14px;
            font-weight: 500;
            text-align: center;
            line-height: 18px;
            position: relative;
            z-index: 1;
          }
          .main_div_BusinesssGoal {
            width: 100%;
            height: auto;
            padding-top: 5%;
            padding-bottom: 5%;
            background-color: white;
          }
          .orange_heading_b {
            font-family: "Inter";
            font-size: 32px;
            font-weight: 700;
            line-height: 35.2px;
            text-align: left;
            color: #ff6809;
          }
          .orange_heading_c {
            font-family: "Inter";
            font-size: 32px;
            font-weight: 700;
            line-height: 35.2px;
            text-align: left;
            color: #0a0a0a;
          }
          .para_second_b {
            font-family: "Inter";
            font-size: 18px;
            font-weight: 400;
            line-height: 28.8px;
            text-align: left;
            color: #39393f;
          }
          .para_secondbb {
            color: #39393f;
            font-family: "Inter";
            font-size: 18px;
            font-weight: 400;
            line-height: 28.8px;
            text-align: left;
          }
          .checkmark_icon {
            width: 16px;
            height: 16px;
            margin-right: 8px;
            fill: #2866DC;
          }
          @media only screen and (max-width: 991px) {
            .btn_lets_talk {
              width: 140px;
              height: 45px;
              font-size: 14px;
            }
          }
          @media only screen and (max-width: 440px) {
            .btn_lets_talk {
              width: 120px;
              height: 40px;
              font-size: 12px;
            }
            .col-lg-10, .col-md-9, .col-sm-9, .col-8 {
              text-align: left;
            }
          }
          @media only screen and (max-width: 1715px) {
            .main_div_BusinesssGoal {
              width: 100%;
              height: auto;
              padding-top: 5%;
              padding-bottom: 5%;
              background-color: white;
            }
            .orange_heading_b {
              font-family: "Inter";
              font-size: 28px;
              font-weight: 700;
              line-height: 32.2px;
              text-align: left;
              color: #ff6809;
            }
            .orange_heading_c {
              font-family: "Inter";
              font-size: 28px;
              font-weight: 700;
              line-height: 32.2px;
              text-align: left;
              color: #0a0a0a;
            }
            .para_second_b {
              font-family: "Inter";
              font-size: 16px;
              font-weight: 400;
              line-height: 24.8px;
              text-align: left;
              color: #39393f;
            }
            .para_secondbb {
              color: #39393f;
              font-family: "Inter";
              font-size: 16px;
              font-weight: 400;
              line-height: 24.8px;
              text-align: left;
            }
            .heading_work_speaks, .heading_webexp, .heading_key_matrix {
              font-size: 37px;
              line-height: 43.64px;
            }
            .heading_work_speaks_para, .Scalability_para, .paravalueink, .paravalueink1, .paravalueink2 {
              font-size: 21px;
              line-height: 18px;
            }
            .Scalability_heading { font-size: 22px; line-height: 28px; }
            .valueink, .valueink1, .valueink2 { font-size: 32px; }
            .card_div_web { height: 280px; }
          }
          @media only screen and (max-width: 1545px) {
            .main_div_BusinesssGoal {
              width: 100%;
              height: auto;
              padding-top: 5%;
              padding-bottom: 5%;
              background-color: white;
            }
            .orange_heading_b {
              font-family: "Inter";
              font-size: 24px;
              font-weight: 700;
              line-height: 28.2px;
              text-align: left;
              color: #ff6809;
            }
            .orange_heading_c {
              font-family: "Inter";
              font-size: 24px;
              font-weight: 700;
              line-height: 28.2px;
              text-align: left;
              color: #0a0a0a;
            }
            .para_second_b {
              font-family: "Inter";
              font-size: 14px;
              font-weight: 400;
              line-height: 22.8px;
              text-align: left;
              color: #39393f;
            }
            .para_secondbb {
              color: #39393f;
              font-family: "Inter";
              font-size: 14px;
              font-weight: 400;
              line-height: 22.8px;
              text-align: left;
            }
            .heading_work_speaks, .heading_webexp, .heading_key_matrix {
              font-size: 37px;
              line-height: 38.64px;
            }
            .heading_work_speaks_para, .Scalability_para, .paravalueink, .paravalueink1, .paravalueink2 {
              font-size: 12px;
              line-height: 16px;
            }
            .Scalability_heading { font-size: 20px; line-height: 24px; }
            .valueink, .valueink1, .valueink2 { font-size: 28px; }
            .card_div_web { height: 260px; }
          }
          @media only screen and (max-width: 991px) {
            .main_div_BusinesssGoal {
              width: 100%;
              height: auto;
              padding: 3%;
              background-color: white;
            }
            .orange_heading_b {
              font-family: "Inter";
              font-size: 20px;
              font-weight: 700;
              line-height: 22.2px;
              text-align: left;
              color: #ff6809;
            }
            .orange_heading_c {
              font-family: "Inter";
              font-size: 20px;
              font-weight: 700;
              line-height: 22.2px;
              text-align: left;
              color: #0a0a0a;
            }
            .para_second_b {
              font-family: "Inter";
              font-size: 12px;
              font-weight: 400;
              line-height: 18.8px;
              text-align: left;
              color: #39393f;
            }
            .para_secondbb {
              color: #39393f;
              font-family: "Inter";
              font-size: 12px;
              font-weight: 400;
              line-height: 18.8px;
              text-align: left;
            }
            .heading_work_speaks, .heading_webexp, .heading_key_matrix {
              font-size: 22px;
              line-height: 32.64px;
            }
            .heading_work_speaks_para, .Scalability_para, .paravalueink, .paravalueink1, .paravalueink2 {
              font-size: 12px;
              line-height: 14px;
            }
            .Scalability_heading { font-size: 18px; line-height: 22px; }
            .valueink, .valueink1, .valueink2 { font-size: 24px; }
            .card_div_web { height: 240px; }
          }
          @media only screen and (max-width: 440px) {
            .main_div_BusinesssGoal {
              width: 100%;
              height: auto;
              padding: 3%;
              background-color: white;
            }
            .orange_heading_b {
              font-family: "Inter";
              font-size: 16px;
              font-weight: 700;
              line-height: 18.2px;
              text-align: left;
              color: #ff6809;
            }
            .orange_heading_c {
              font-family: "Inter";
              font-size: 16px;
              font-weight: 700;
              line-height: 18.2px;
              text-align: left;
              color: #0a0a0a;
            }
            .para_second_b {
              font-family: "Inter";
              font-size: 10px;
              font-weight: 400;
              line-height: 13.8px;
              text-align: left;
              color: #39393f;
            }
            .para_secondbb {
              color: #39393f;
              font-family: "Inter";
              font-size: 10px;
              font-weight: 400;
              line-height: 13.8px;
              text-align: left;
            }
            .heading_work_speaks, .heading_webexp, .heading_key_matrix {
              font-size: 18px;
              line-height: 28.64px;
            }
            .heading_work_speaks_para, .Scalability_para, .paravalueink, .paravalueink1, .paravalueink2 {
              font-size: 12px;
              line-height: 14px;
            }
            .Scalability_heading { font-size: 16px; line-height: 20px; }
            .valueink, .valueink1, .valueink2 { font-size: 20px; }
            .card_div_web { height: 200px; }
          }
        `}
      </style>
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="row m-0 p-0">
            <div className="col-lg-10 col-md-9 col-sm-9 col-8">
              <p className="heading_work_speaks">
                AI Solutions for Reaching Your Business Goals
              </p>
              <p className="heading_work_speaks_para">
                360Synergytech is an AI Solutions Company that provides precisely
                tailored and coherent AI development solutions for your needs at
                an affordable rate. Our experienced data scientists and engineers
                create intelligent systems that set industry standards.
              </p>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-3 col-4">
              <div className="d-flex justify-content-end align-items-center">
                <button
                  className="btn_lets_talk"
                  onClick={scrollToAppointment}
                >
                  Talk to an Expert
                </button>
              </div>
            </div>
          </div>
          <div className="main_div_WebPageExperience">
            <p className="heading_webexp">
              Explore Our Range of Advanced AI Development Services
            </p>
            <div className="d-flex justify-content-center">
              <div className="hr_line_blue_web" />
            </div>
            <div className="row m-0 p-0">
              <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                <div className="card_div_web">
                  <div className="card_icon">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ff9999"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                  </div>
                  <p className="Scalability_heading">Machine Learning</p>
                  <p className="Scalability_para">
                    Leverage machine learning expertise to analyze data, automate
                    tasks, and enhance decision-making. We build models that give
                    your business a competitive edge.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                <div className="card_div_web">
                  <div className="card_icon">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#99ccff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                    </svg>
                  </div>
                  <p className="Scalability_heading">Predictive Analytics</p>
                  <p className="Scalability_para">
                    Enhance your AI applications with data-driven predictions,
                    optimize risks, and stay ahead with actionable insights.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                <div className="card_div_web">
                  <div className="card_icon">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#99ff99"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  </div>
                  <p className="Scalability_heading">Computer Vision</p>
                  <p className="Scalability_para">
                    Integrate computer vision capabilities into your apps with
                    image and video analysis for real-time detection, anomaly
                    detection, and facial recognition.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                <div className="card_div_web">
                  <div className="card_icon">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ffcc99"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 12.79A9 9 0 0 0 12 3.5c-3.33 0-6.26 1.8-7.79 4.5"></path>
                      <path d="M3 12c0 1.66.67 3.26 1.87 4.43"></path>
                      <path d="M12 20.5c3.33 0 6.26-1.8 7.79-4.5"></path>
                      <path d="M12 13.5c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"></path>
                    </svg>
                  </div>
                  <p className="Scalability_heading">Natural Language Processing</p>
                  <p className="Scalability_para">
                    Our language processing expertise enhances user experiences
                    with personalized interactions, sentiment analysis, and
                    efficient text translation for your app.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                <div className="card_div_web">
                  <div className="card_icon">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ccccff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                      <path d="M2 17l10 5 10-5"></path>
                      <path d="M2 12l10 5 10-5"></path>
                    </svg>
                  </div>
                  <p className="Scalability_heading">Custom AI Solutions</p>
                  <p className="Scalability_para">
                    We offer bespoke AI solutions tailored to your unique business
                    needs, leveraging cutting-edge technology to transform your
                    operations and achieve your goals.
                  </p>
                </div>
              </div>
            </div>
            <div className="blue_div_KeyMatrics">
              <p className="heading_key_matrix">
                Solving real-world problems with powerful AI solutions
              </p>
              <div className="row m-0 p-2">
                <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                  <p className="valueink">52%</p>
                  <p className="paravalueink">Faster time-to-market</p>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                  <p className="valueink1">2X</p>
                  <p className="paravalueink1">Year-on-year project growth</p>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                  <p className="valueink2">98%</p>
                  <p className="paravalueink2">Project completion success rate</p>
                </div>
              </div>
            </div>
            <div className="main_div_BusinesssGoal">
              <div className="row m-0 p-0">
                <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                  <p className="orange_heading_b">Define & Discover</p>
                  <p className="orange_heading_c">Model & Develop</p>
                  <p className="orange_heading_c">Train & Validate</p>
                  <p className="orange_heading_c">Test & Refine</p>
                  <p className="orange_heading_c">Deploy & Maintain</p>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                  <p className="para_second_b">
                    Collaboratively define your business challenge, understand your industry, and prepare data for your custom AI solution.
                  </p>
                  <p className="para_secondbb">
                    <svg className="checkmark_icon" viewBox="0 0 24 24" fill="#2866DC">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    Clearly define the business challenge and goals.
                  </p>
                  <p className="para_secondbb">
                    <svg className="checkmark_icon" viewBox="0 0 24 24" fill="#2866DC">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    Understand your industry landscape and requirements.
                  </p>
                  <p className="para_secondbb">
                    <svg className="checkmark_icon" viewBox="0 0 24 24" fill="#2866DC">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    Gather, clean, and prepare relevant data for analysis.
                  </p>
                  <p className="para_secondbb">
                    <svg className="checkmark_icon" viewBox="0 0 24 24" fill="#2866DC">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    Refine your vision with our AI experts.
                  </p>
                  <p className="para_secondbb">
                    <svg className="checkmark_icon" viewBox="0 0 24 24" fill="#2866DC">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    Ensure your project aligns with technical and resource constraints.
                  </p>
                </div>
              </div>
            </div>
            <div className="main_div_WebPageExperience">
              <p className="heading_webexp">Our 'secret' behind your success</p>
              <div className="row m-0 p-0">
                <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                  <div className="card_div_web">
                    <div className="card_icon">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ff9999"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                        <line x1="9" y1="9" x2="9.01" y2="9"></line>
                        <line x1="15" y1="9" x2="15.01" y2="9"></line>
                      </svg>
                    </div>
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
                    <div className="card_icon">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#99ccff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 16s-3-2-3-4 3-4 3-4m0 8s3-2 3-4-3-4-3-4"></path>
                        <line x1="12" y1="8" x2="12" y2="8"></line>
                        <line x1="12" y1="16" x2="12" y2="16"></line>
                      </svg>
                    </div>
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
                    <div className="card_icon">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#99ff99"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <path d="M3.27 6.96L12 12.01l8.73-5.05"></path>
                        <path d="M12 22.08V12"></path>
                      </svg>
                    </div>
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
                    <div className="card_icon">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffcc99"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
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
                    <div className="card_icon">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ccccff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
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
                    <div className="card_icon">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#99ffcc"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
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
          </div>
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
      </div>
    </div>
  );
}

export default BusinessAIGoal;