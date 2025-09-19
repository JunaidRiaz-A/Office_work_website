import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import './GlobalStakeholder.css';

function GlobalStakeholder() {
  const [content, setContent] = useState(
    "At 360synergytech, we transform businesses with custom software solutions, AI integrations, and cloud development services. Our expert team delivers <a href='https://360synergytech.com/webdevelopement' target='_blank' rel='noopener noreferrer'>web development</a>, <a href='https://360synergytech.com/app/developement' target='_blank' rel='noopener noreferrer'>mobile apps</a>, CRM solutions, and RPA automation to scale your operations efficiently. We help startups, enterprises, and real estate businesses automate, grow, and innovate."
  );
  const [activeItem, setActiveItem] = useState("about");

  const handleItemClick = (item) => {
    setActiveItem(item);
    if (item === "about") {
      setContent(
        "At 360synergytech, we transform businesses with custom software solutions, AI integrations, and cloud development services. Our expert team delivers <a href='https://360synergytech.com/webdevelopement' target='_blank' rel='noopener noreferrer'>web development</a>, <a href='https://360synergytech.com/app/developement' target='_blank' rel='noopener noreferrer'>mobile apps</a>, CRM solutions, and RPA automation to scale your operations efficiently. We help startups, enterprises, and real estate businesses automate, grow, and innovate."
      );
    } else if (item === "mission") {
      setContent(
        "At 360synergytech, our mission is to help businesses innovate with AI-powered solutions, custom <a href='https://360synergytech.com/webdevelopement' target='_blank' rel='noopener noreferrer'>web development</a>, <a href='https://360synergytech.com/app/developement' target='_blank' rel='noopener noreferrer'>mobile apps</a>, cloud application development, and automation services. We enable startups, enterprises, and real estate companies to automate processes, enhance digital experiences, and scale smarter. Partner with us today to future-proof your business."
      );
    } else if (item === "vision") {
      setContent(
        "At 360synergytech, our vision is to be a global leader in AI solutions, <a href='https://360synergytech.com/webdevelopement' target='_blank' rel='noopener noreferrer'>web development</a>, <a href='https://360synergytech.com/app/developement' target='_blank' rel='noopener noreferrer'>mobile apps</a>, and cloud innovation. We aim to empower businesses with intelligent automation, seamless digital transformation, and scalable technologies that shape the future of industries. Discover how we drive innovation."
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>Who Is 360synergytech? Meet Your Future Tech Partners & Innovators</title>
        <meta name="description" content="Learn who we are, what drives us, and how 360synergytech helps companies grow with technology, AI, and cloud expertise." />
        <meta name="keywords" content="360synergytech, technology, AI solutions, cloud expertise, tech partners, business innovation" />
        <link rel="canonical" href="https://360synergytech.com/aboutus" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "AboutPage",
              "name": "About 360synergytech",
              "url": "https://360synergytech.com/aboutus",
              "description": "Learn more about 360synergytech, our mission, vision, and the expert team behind our custom software solutions."
            }
          `}
        </script>
      </Helmet>
      <div className="main_div_GlobalStakeholder">
        <div className="container">
          <div className="row m-0 p-0 align-items-start">
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <h1 style={{marginBottom: 0, textAlign: 'left'}}>
                <span className="globalheading_black">We Are Global Stakeholder Over 2000+</span>
                <span className="globalheading_blue"> Companies</span>
              </h1>
              <h2 className="para_global_heading" style={{marginTop: 16, fontWeight: 400, textAlign: 'left'}}>
                Appropriately enhance principle-centered innovation rather than high standards in platforms. Credibly orchestrate functional.
              </h2>
              <ul style={{listStyle: 'none', padding: 0, marginTop: 24}}>
                <li style={{display: 'flex', alignItems: 'center', marginBottom: 16}}>
                  <div className="blue_round_div"><i className="fa fa-bullseye"></i></div>
                  <span className="circle_para_round">Communicate orthogonal process</span>
                </li>
                <li style={{display: 'flex', alignItems: 'center', marginBottom: 16}}>
                  <div className="blue_round_div"><i className="fa fa-bullseye"></i></div>
                  <span className="circle_para_round">Professionally grow cutting-edge paradigms</span>
                </li>
                <li style={{display: 'flex', alignItems: 'center'}}>
                  <div className="blue_round_div"><i className="fa fa-bullseye"></i></div>
                  <span className="circle_para_round">Professionally grow cutting-edge paradigms</span>
                </li>
              </ul>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="main_div_aboutus_mission_vision joined-tabs">
                <div
                  className={activeItem === "about" ? "orange_div_active joined_tab" : "blue_div_active joined_tab"}
                  onClick={() => handleItemClick("about")}
                >
                  About Us
                </div>
                <div
                  className={activeItem === "mission" ? "orange_div_active joined_tab" : "blue_div_active joined_tab"}
                  onClick={() => handleItemClick("mission")}
                >
                  Mission
                </div>
                <div
                  className={activeItem === "vision" ? "orange_div_active joined_tab" : "blue_div_active joined_tab"}
                  onClick={() => handleItemClick("vision")}
                >
                  Vision
                </div>
              </div>
              <div className="show_content" style={{marginTop: 24, textAlign: 'left'}}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GlobalStakeholder;