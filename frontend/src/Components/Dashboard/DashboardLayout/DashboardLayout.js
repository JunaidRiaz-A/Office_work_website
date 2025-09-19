"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Grid3X3, PenTool, Folder, MessageSquare, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import synergytechlogo from "../../../../src/Assets/synergy-logo-3 1.png"; 
import "./DashboardLayout.css";

const DashboardLayout = ({ children }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: Grid3X3 },
    // { id: "create-blog", label: "Create Blog", icon: PenTool },
    // { id: "manage-content", label: "Manage Content", icon: Folder },
    // { id: "comments", label: "Comments", icon: MessageSquare },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "overview") {
      navigate("/dashboard");
    }
  };

  const renderDefaultContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="overview-content">
            <div className="welcome-section">
              <h1>Welcome back, Admin!</h1>
              <p>Here's what's happening with your content today.</p>
            </div>
          </div>
        );
      case "create-blog":
        return (
          <div className="create-blog-content">
            <h1>Create New Blog Post</h1>
            <p>Share your thoughts and insights with your audience.</p>
            {/* Placeholder for Create Blog form */}
          </div>
        );
      case "manage-content":
        return (
          <div className="manage-content">
            <h1>Content Management</h1>
            <p>Organize your content with categories and tags.</p>
            {/* Placeholder for Manage Content section */}
          </div>
        );
      case "comments":
        return (
          <div className="comments-content">
            <h1>Comment Management</h1>
            <p>Moderate and manage user comments.</p>
            {/* Placeholder for Comments section */}
          </div>
        );
      default:
        return (
          <div className="overview-content">
            <div className="welcome-section">
              <h1>Welcome back, Admin!</h1>
              <p>Here's what's happening with your content today.</p>
            </div>
          </div>
        );
    }
  };

  const contentToRender = children || renderDefaultContent();

  return (
    <div className="dashboard-layout">
      <div className="dashboard-wrapper">
        {/* Sidebar */}
        <div className={`sidebar ${sidebarExpanded ? "expanded" : "collapsed"}`}>
          <nav className="sidebar-nav">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${activeTab === item.id ? "active" : ""}`}
                onClick={() => handleTabClick(item.id)}
                title={item.label}
              >
                <item.icon size={20} />
                {sidebarExpanded && <span>{item.label}</span>}
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="user-profile">
              <div className="user-avatar">
                <User size={20} />
              </div>
              {sidebarExpanded && (
                <div className="user-info">
                  <span className="user-name">Admin User</span>
                  <span className="user-role">Administrator</span>
                </div>
              )}
            </div>
          </div>

          {/* Toggle Arrow Button */}
          <button
            className="sidebar-toggle-arrow"
            onClick={() => setSidebarExpanded(!sidebarExpanded)}
            title={sidebarExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            {sidebarExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Dashboard Header with Logo */}
          <div className="dashboard-header">
            <div className="header-content">
              <div className="company-logo">
                <img
                  src={synergytechlogo}
                  alt="360° SynergyTech - Let's Talk about Technology"
                  className="logo-image"
                />
              </div>
              <div className="header-text"></div>
            </div>
          </div>

          <div className="content-body">{contentToRender}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;