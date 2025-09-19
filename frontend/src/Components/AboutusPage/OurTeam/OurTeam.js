"use client";

import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import "./../OurTeam/OurTeam.css";

function OurTeam() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const membersPerPage = 6;

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axiosInstance.get("/api/team-members");
        setTeamMembers(response.data || []);
      } catch (err) {
        setError("Failed to fetch team members");
        console.error("Error fetching team members:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  if (loading) {
    return (
      <div className="main_div_ourteam">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main_div_ourteam">
        <p>{error}</p>
      </div>
    );
  }

  // Split team members into featured (first 3) and regular (rest)
  const featuredMembers = teamMembers.slice(0, 3);
  const regularMembers = teamMembers.slice(3);

  // Calculate pagination for regular members
  const totalPages = Math.ceil(regularMembers.length / membersPerPage);
  const startIndex = (currentPage - 1) * membersPerPage;
  const currentRegularMembers = regularMembers.slice(
    startIndex,
    startIndex + membersPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="main_div_ourteam">
      <p className="our_team_heading">OUR TEAM</p>
      <p className="our_team_heading_meet">Meet the Team</p>
      <div className="d-flex justify-content-center">
        <div className="hr_line_black" />
      </div>

      <div className="row m-0 p-0">
        <div className="col-lg-1 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-10 col-md-10 col-sm-12 col-12">
          {/* Featured Team Members (First 3 - Large) */}
          {featuredMembers.length > 0 && (
            <div className="row featured-members-section">
              {featuredMembers.map((member, index) => (
                <div
                  key={member.id}
                  className="col-lg-4 col-md-4 col-sm-6 col-12 p-2"
                >
                  <img
                    className="team_member_pic_b"
                    src={`${process.env.REACT_APP_BASE_URL}/images/${member.photo}`}
                    alt={member.name}
                  />
                  <div className="description_team_member_b">
                    <p className="name_member_b">{member.name}</p>
                    <p className="desp_member_b">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Regular Team Members (Rest - Large with Pagination) */}
          {regularMembers.length > 0 && (
            <>
              <div className="row regular-members-section">
                {currentRegularMembers.map((member, index) => (
                  <div
                    key={member.id}
                    className="col-lg-4 col-md-4 col-sm-6 col-12 p-2"
                  >
                    <img
                      className="team_member_pic_b"
                      src={`${process.env.REACT_APP_BASE_URL}/images/${member.photo}`}
                      alt={member.name}
                    />
                    <div className="description_team_member_b">
                      <p className="name_member_b">{member.name}</p>
                      <p className="desp_member_b">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination-container">
                  <div className="d-flex justify-content-center">
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index + 1}
                        className={`pagination-btn ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <div className="col-lg-1 col-md-1 col-sm-12 col-12"></div>
      </div>
    </div>
  );
}

export default OurTeam;