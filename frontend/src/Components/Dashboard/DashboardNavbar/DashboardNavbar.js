import React, { useState } from "react";
import "./../DashboardNavbar/DashboardNavbar.css";
import Blogs from "../Blogs/Blogs";
import AddTeamMember from "../AddTeamMember/AddTeamMember";
import AddJobPost from "../AddJobPost/AddJobPost";
function DashboardNavbar() {
  const [currentView, setCurrentView] = useState("none");

  const renderComponent = () => {
    switch (currentView) {
      case "jobPost":
        return (
          <div>
            <AddJobPost />
          </div>
        );
      case "teamMember":
        return (
          <div>
            <AddTeamMember />
          </div>
        );
      case "blogs":
        return (
          <div>
            <Blogs />
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div>
      <div className="main_div_DashboardNavbar">
        <div className="row m-0 p-0">
          <div className="col-lg-3 col-md-3 col-sm-4 col-6">
            <button
              className="main_div_dashboard_card"
              onClick={() => setCurrentView("jobPost")}
            >
              Add Job Post
            </button>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-4 col-6">
            <button
              className="main_div_dashboard_card"
              onClick={() => setCurrentView("teamMember")}
            >
              Add Team member
            </button>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-4 col-6">
            <button
              className="main_div_dashboard_card"
              onClick={() => setCurrentView("blogs")}
            >
              Blogs
            </button>
          </div>
        </div>
      </div>
      <div className="showcomponent">{renderComponent()}</div>
    </div>
  );
}

export default DashboardNavbar;
