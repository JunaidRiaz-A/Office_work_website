"use client"

import "./ResumeReceived.css"
import { useState, useEffect } from "react"
import axiosInstance from "../../api/axiosInstance"
import { MdOutlineKeyboardArrowRight, MdDelete, MdCheck, MdCloudDownload } from "react-icons/md"
import DashboardLayout from "./../DashboardLayout/DashboardLayout"

function ResumeReceived() {
  const [jobCandidates, setJobCandidates] = useState([])
  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState({ message: "", type: "" })
  const [checkedJobCandidates, setCheckedJobCandidates] = useState({}) // Track checked status per job candidate ID
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    const fetchJobCandidates = async () => {
      try {
        const response = await axiosInstance.get("/api/apply-job")
        const sortedJobCandidates = response.data
          .map(item => ({
            id: item.id,
            name: item.name || "",
            email: item.email || "",
            phone: item.phone || "",
            resume: item.resume || "",
            job_id: item.job_id || null, // Include job_id
            created_at: item.created_at || null,
            updated_at: item.updated_at || null,
            checked: item.checked || false, // Sync with backend checked status
          }))
          .sort((a, b) => {
            const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
            const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
            return dateB - dateA;
          });
        setJobCandidates(sortedJobCandidates);
        // Initialize checked status based on backend data
        const initialChecked = sortedJobCandidates.reduce((acc, candidate) => {
          acc[candidate.id] = candidate.checked; // Use backend value
          return acc;
        }, {});
        setCheckedJobCandidates(initialChecked);
      } catch (error) {
        console.error("There was an error fetching the job candidates!", error);
        showToast("Failed to fetch job candidates!", "error");
      }
    };
    fetchJobCandidates();
  }, []);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 6000);
  };

  const handleCheck = async (id) => {
    const newCheckedStatus = !checkedJobCandidates[id];
    try {
      const response = await axiosInstance.put(`/api/apply-job/${id}`, {
        checked: newCheckedStatus,
      });
      const updatedCandidate = response.data.data; // Assuming the response contains the updated job candidate
      setJobCandidates(prevCandidates =>
        prevCandidates.map(item =>
          item.id === id ? { ...item, checked: updatedCandidate.checked } : item
        ).sort((a, b) => {
          const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
          const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
          return dateB - dateA;
        })
      );
      setCheckedJobCandidates(prev => ({
        ...prev,
        [id]: newCheckedStatus,
      }));
      showToast(`Job candidate ${id} ${newCheckedStatus ? "checked" : "unchecked"} successfully!`, "success");
    } catch (error) {
      console.error("There was an error updating the checked status!", error);
      setCheckedJobCandidates(prev => ({
        ...prev,
        [id]: !newCheckedStatus, // Revert local state on failure
      }));
      showToast("Failed to update checked status!", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/apply-job/${id}`);
      setJobCandidates(jobCandidates.filter((item) => item.id !== id).sort((a, b) => {
        const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
        const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
        return dateB - dateA;
      }));
      // Remove checked status for deleted job candidate
      setCheckedJobCandidates(prev => {
        const newChecked = { ...prev };
        delete newChecked[id];
        return newChecked;
      });
      showToast("Job candidate deleted successfully!", "success");
      if (paginatedJobCandidates.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.error("There was an error deleting the job candidate!", error);
      showToast("Failed to delete job candidate!", "error");
    }
  };

  const truncateText = (text) => {
    const words = text.split(" ");
    if (words.length > 15) {
      return words.slice(0, 15).join(" ") + "...";
    }
    return text;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedJobCandidates = jobCandidates.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(jobCandidates.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getResumeUrl = (resumePath) => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    return resumePath ? `${baseUrl}/storage/${resumePath}` : `${baseUrl}/images/default-image.jpg`;
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime || isNaN(new Date(dateTime))) {
      return "N/A";
    }
    return new Date(dateTime).toISOString().slice(0, 16).replace("T", " ");
  };

  return (
    <DashboardLayout>
      <div>
        <style>
          {`
            .pagination-container {
              display: flex;
              justify-content: center;
              margin-top: 20px;
              margin-bottom: 30px;
            }
            .pagination {
              display: flex;
              list-style: none;
              padding: 0;
              gap: 8px;
            }
            .page-item {
              display: flex;
              align-items: center;
            }
            .page-link {
              padding: 8px 12px;
              border: 1px solid #e0e0e0;
              border-radius: 4px;
              color: #333;
              background-color: #fff;
              text-decoration: none;
              font-size: 14px;
              cursor: pointer;
              transition: all 0.3s ease;
            }
            .page-link:hover {
              background-color: #f5f5f5;
              border-color: #ccc;
            }
            .page-item.active .page-link {
              background-color: #ff6200;
              color: #fff;
              border-color: #ff6200;
            }
            .page-item.disabled .page-link {
              color: #ccc;
              cursor: not-allowed;
              border-color: #e0e0e0;
              background-color: #f9f9f9;
            }
            .page-link.arrow {
              font-size: 16px;
              padding: 8px 10px;
            }
            .job-table {
              width: 100%;
              border-collapse: collapse;
            }
            .job-table th, .job-table td {
              padding: 12px;
              text-align: left;
              border-bottom: 1px solid #e0e0e0;
            }
            .job-table th {
              background-color: #f8f9fa;
              font-weight: 600;
            }
            .action-btn {
              border: none;
              background: none;
              cursor: pointer;
              font-size: 18px;
              margin: 0 5px;
            }
            .check-btn {
              color: #dc3545; /* Red by default */
            }
            .check-btn.checked {
              color: #28a745; /* Green when checked */
            }
            .delete-btn {
              color: #dc3545;
            }
            .action-btn:hover {
              opacity: 0.8;
            }
            .resume-link {
              color: #28a745;
              text-decoration: none;
              display: flex;
              align-items: center;
              gap: 5px;
            }
            .resume-link:hover {
              text-decoration: underline;
            }
            .table-input {
              width: 100%;
              padding: 5px;
              border: 1px solid #e0e0e0;
              border-radius: 4px;
            }
          `}
        </style>
        {toast.message && (
          <div className={`toast ${toast.type}`}>
            <div className="toast-content">{toast.message}</div>
          </div>
        )}

        <div className="row m-0 p-0 justify-content-center">
          <div className="col-lg-10 col-md-10 col-sm-12 col-12">
            <p className="main_heading_blog">Job Candidates Received</p>

            <div className="main_div_table_job_show mt-5">
              <div className="table-header">
                <h3 className="table-title">Job Candidates</h3>
                <div className="table-count">{jobCandidates.length} Candidates</div>
              </div>
              <div className="table-wrapper">
                <table className="job-table">
                  <thead>
                    <tr>
                      <th>Sr No</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Job ID</th> {/* New column for job_id */}
                      <th>Resume</th>
                      <th>Received At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedJobCandidates.map((item, index) => (
                      <tr key={item.id}>
                        <td>{indexOfFirstItem + index + 1}</td>
                        <td><div className="job-title">{item.name}</div></td>
                        <td><div className="job-description">{item.email}</div></td>
                        <th><div className="job-category">{item.phone}</div></th>
                        <td>{item.job_id || "N/A"}</td> {/* Display job_id */}
                        <td>
                          <a
                            href={getResumeUrl(item.resume)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="resume-link"
                          >
                            <MdCloudDownload /> Download
                          </a>
                        </td>
                        <td>{formatDateTime(item.created_at)}</td>
                        <td className="action-column">
                          <div className="action-buttons">
                            <button
                              onClick={() => handleCheck(item.id)}
                              className={`action-btn check-btn ${checkedJobCandidates[item.id] ? "checked" : ""}`}
                              title="Mark as Checked"
                            >
                              <MdCheck />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="action-btn delete-btn"
                              title="Delete Job Candidate"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pagination-container">
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link arrow"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      «
                    </button>
                  </li>
                  {[...Array(totalPages).keys()].map(number => (
                    <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(number + 1)}
                      >
                        {number + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                      className="page-link arrow"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      »
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ResumeReceived;