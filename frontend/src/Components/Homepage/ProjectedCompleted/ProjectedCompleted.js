import "./ProjectedCompleted.css";

import React, { useEffect, useState } from "react";

import background1 from "./../../../Assets/background1.png";

function ProjectedCompleted() {
      const [projectCompleted, setProjectCompleted] = useState(0);
      const [itSpecialists, setItSpecialists] = useState(0);
      const [satisfiedClients, setSatisfiedClients] = useState(0);
      const [smartSolutions, setSmartSolutions] = useState(0);


  useEffect(() => {
    const projectCompletedInterval = setInterval(() => {
      if (projectCompleted < 2383) {
        setProjectCompleted(projectCompleted + 1);
      }
    }, 20);
    return () => clearInterval(projectCompletedInterval);
  }, [projectCompleted]);

  useEffect(() => {
    const itSpecialistsInterval = setInterval(() => {
      if (itSpecialists < 171) {
        setItSpecialists(itSpecialists + 1);
      }
    }, 50); 
    return () => clearInterval(itSpecialistsInterval);
  }, [itSpecialists]);

  useEffect(() => {
    const satisfiedClientsInterval = setInterval(() => {
      if (satisfiedClients < 715) {
        setSatisfiedClients(satisfiedClients + 1);
      }
    }, 40); 
    return () => clearInterval(satisfiedClientsInterval);
  }, [satisfiedClients]);

  useEffect(() => {
    const smartSolutionsInterval = setInterval(() => {
      if (smartSolutions < 125) {
        setSmartSolutions(smartSolutions + 1);
      }
    }, 60); 
    return () => clearInterval(smartSolutionsInterval);
  }, [smartSolutions]);

  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12 col-12">
        <img src={background1} className="background1" alt="Background" />

        <div className="col-lg-6 col-md-8 col-sm-12 col-12">
          <div className="containerPC">
            <div className="col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="box1">
                <h2 className="number">{projectCompleted}</h2>
                <p className="text">Project Completed</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="box2">
                <h2 className="number">{itSpecialists}</h2>
                <p className="text">IT Specialists</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="box3">
                <h2 className="number">{satisfiedClients}</h2>
                <p className="text">Satisfied Clients</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="box4">
                <h2 className="number">{smartSolutions}</h2>
                <p className="text">Smart Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectedCompleted
