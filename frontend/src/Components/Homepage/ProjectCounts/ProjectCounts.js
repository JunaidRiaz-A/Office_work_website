import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import "./ProjectCounts.css";

function ProjectCounts() {
  const [counters, setCounters] = useState({
    projects_completed: 0,
    it_specialists: 0,
    satisfied_clients: 0,
    smart_solutions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCounters = async () => {
      try {
        const response = await axiosInstance.get("api/counters", {
          headers: {
            "Accept": "application/json",
          },
        });
        if (response.data.data && response.data.data.length > 0) {
          setCounters({
            projects_completed: response.data.data[0].projects_completed,
            it_specialists: response.data.data[0].it_specialists,
            satisfied_clients: response.data.data[0].satisfied_clients,
            smart_solutions: response.data.data[0].smart_solutions,
          });
        } else {
          setError("No counters data available");
        }
      } catch (err) {
        setError("Failed to fetch counters: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCounters();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="PC-layout1">
      <div className="PC-layout2">
        <div className="PC-layout3">
          <p className="PC-content1">{counters.projects_completed || 0}+</p>
          <p className="PC-content2">Projects completed</p>
        </div>
        <div className="PC-layout4">
          <p className="PC-content1">{counters.it_specialists || 0}+</p>
          <p className="PC-content2">IT specialists</p>
        </div>
        <div className="PC-layout5">
          <p className="PC-content1">{counters.satisfied_clients || 0}+</p>
          <p className="PC-content2">Satisfied clients</p>
        </div>
        <div className="PC-layout6">
          <p className="PC-content1">{counters.smart_solutions || 0}</p>
          <p className="PC-content2">Smart solutions</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectCounts;