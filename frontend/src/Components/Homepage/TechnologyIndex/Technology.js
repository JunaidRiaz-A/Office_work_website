import React from "react";
import "./../TechnologyIndex/TechnologyIndex.css";
import java from "./../../../Assets/java.png";
import amazondynomodb from "./../../../Assets/amazon dynamodb.png";
import amazonredshift from "./../../../Assets/redshift.png";
import aws from "./../../../Assets/aws.png";
import storm from "./../../../Assets/storm.png";
import docker from "./../../../Assets/docker.png";
import tensor from "./../../../Assets/tensor flow.png";
import nodejs from "./../../../Assets/node js.png";
import oracle from "./../../../Assets/oracle icon.png";
import meter from "./../../../Assets/jmeter.png";
import mongodb from "./../../../Assets/mongodb.png";
import mysql from "./../../../Assets/mqsql.png";
import neo from "./../../../Assets/neo.png";
import spark from "./../../../Assets/spark.png";
import python from "./../../../Assets/python].png";
import kibana from "./../../../Assets/kibana.png";
import firbase from "./../../../Assets/firbase.png";
import cloudaera from "./../../../Assets/cloudaera.png";

function Technology() {
  return (
    <div className="technologyindex_main_div" role="region" aria-label="Technology Index Section">
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <p className="heading_technologyindex" role="heading" aria-level="1">Technology Index</p>
          <p className="para_heading_tindex" role="doc-subtitle">
            What Technology We Are Using For Our Valued Customers
          </p>

          <div className="row m-0 p-0" role="list">
            <div className="col-lg-2 col-md-2 col-sm-3 col-3" role="listitem">
              <img src={java} className="icon_company" alt="Java logo" />
            </div>
            <div className="col-lg-2 col-md-2 col-sm-3 col-3" role="listitem">
              <img src={amazondynomodb} className="icon_company" alt="Amazon DynamoDB logo" />
            </div>
            <div className="col-lg-2 col-md-2 col-sm-3 col-3" role="listitem">
              <img src={amazonredshift} className="icon_company" alt="Amazon Redshift logo" />
            </div>
            <div className="col-lg-2 col-md-2 col-sm-3 col-3" role="listitem">
              <img src={aws} className="icon_company" alt="AWS logo" />
            </div>
            <div className="col-lg-2 col-md-2 col-sm-3 col-3" role="listitem">
              <img src={storm} className="icon_company" alt="Apache Storm logo" />
            </div>
            <div className="col-lg-2 col-md-2 col-sm-3 col-3" role="listitem">
              <img src={docker} className="icon_company" alt="Docker logo" />
            </div>
            <div className="col-lg-2 col-md-2 col-sm-3 col-3" role="listitem">
              <img src={tensor} className="icon_company" alt="TensorFlow logo" />
            </div>
            <div className="col-lg-2 col-md-2 col-sm-3 col-3" role="listitem">
              <img src={nodejs} className="icon_company" alt="Node.js logo" />
            </div>
            <div className="col-lg-2 col-md-2 col-sm-3 col-3" role="listitem">
              <img src={oracle} className="icon_company" alt="Oracle logo" />
            </div>
            <div className="col-lg-2 col-md-2 col-sm-3 col-3" role="listitem">
              <img src={meter} className="icon_company" alt="JMeter logo" />
            </div>
            <div className="col-lg-2 col-md-2 col-sm-3 col-3" role="listitem">
              <img src={mongodb} className="icon_company" alt="MongoDB logo" />
            </div>
            <div className="col-lg-2 col-md-2 col-sm-3 col-3" role="listitem">
              <img src={mysql} className="icon_company" alt="MySQL logo" />
            </div>
            <div className="col-lg-2 col-md-2 col-sm-3 col-3" role="listitem">
              <img src={neo} className="icon_company" alt="Neo4j logo" />
            </div>
            <div className="col-lg-2 col-md-2 col-sm-3 col-3" role="listitem">
              <img src={spark} className="icon_company" alt="Apache Spark logo" />
            </div>
            <div className="col-lg-2 col-md-2 col-sm-3 col-3" role="listitem">
              <img src={python} className="icon_company" alt="Python logo" />
            </div>
            <div className="col-lg-2 col-md-2 col-sm-3 col-3" role="listitem">
              <img src={kibana} className="icon_company" alt="Kibana logo" />
            </div>
            <div className="col-lg-2 col-md-2 col-sm-3 col-3" role="listitem">
              <img src={firbase} className="icon_company" alt="Firebase logo" />
            </div>
            <div className="col-lg-2 col-md-2 col-sm-3 col-3" role="listitem">
              <img src={cloudaera} className="icon_company" alt="Cloudera logo" />
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
      </div>
    </div>
  );
}

export default Technology;