"use client"

import React, { useState, useEffect } from "react";
import "./AddJobPost.css"
import axiosInstance from "../../api/axiosInstance"
import { MdEdit, MdDelete, MdSave, MdWork, MdLocationOn, MdAttachMoney, MdDescription } from "react-icons/md"
import { MdCloudDownload, MdCheck } from "react-icons/md"
import DashboardLayout from "./../DashboardLayout/DashboardLayout"

function AddJobPost() {
  const [jobPostName, setJobPostName] = useState("")
  const [jobType, setJobType] = useState("")
  const [location, setLocation] = useState("")
  const [salary, setSalary] = useState("")
  const [description, setDescription] = useState("")
  const [requirement, setRequirement] = useState("")
  const [skillsExperience, setSkillsExperience] = useState("")
  const [category, setCategory] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [experienceForJob, setExperienceForJob] = useState("")
  const [gender, setGender] = useState("")
  const [qualification, setQualification] = useState("")
  const [datePosted, setDatePosted] = useState("")
  const [jobPosts, setJobPosts] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editJobPostName, setEditJobPostName] = useState("")
  const [editJobType, setEditJobType] = useState("")
  const [editLocation, setEditLocation] = useState("")
  const [editSalary, setEditSalary] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editRequirement, setEditRequirement] = useState("")
  const [editSkillsExperience, setEditSkillsExperience] = useState("")
  const [editCategory, setEditCategory] = useState("")
  const [editExpiryDate, setEditExpiryDate] = useState("")
  const [editExperienceForJob, setEditExperienceForJob] = useState("")
  const [editGender, setEditGender] = useState("")
  const [editQualification, setEditQualification] = useState("")
  const [editDatePosted, setEditDatePosted] = useState("")
  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState({ message: "", type: "" })
  const [currentPage, setCurrentPage] = useState(1)
  const [showTable, setShowTable] = useState(false)
  const [selectedJobId, setSelectedJobId] = useState(null)
  const [jobCandidatesByJobId, setJobCandidatesByJobId] = useState({})
  const [checkedJobCandidates, setCheckedJobCandidates] = useState({})
  const itemsPerPage = 10

  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const response = await axiosInstance.get("api/jobs")
        const sortedPosts = response.data.sort((a, b) => b.id - a.id)
        setJobPosts(sortedPosts)
        const jobIds = sortedPosts.map(post => post.id)
        if (jobIds.length > 0) {
          fetchJobCandidates(jobIds)
        }
      } catch (error) {
        console.error("There was an error fetching the job posts!", error)
        showToastMessage("Failed to fetch job posts!", "error")
      }
    }
    fetchJobPosts()
  }, [])

  const fetchJobCandidates = async (jobIds) => {
    try {
      const response = await axiosInstance.get("/api/apply-job")
      const candidatesByJobId = jobIds.reduce((acc, jobId) => {
        acc[jobId] = response.data
          .filter(item => item.job_id === jobId)
          .map(item => ({
            id: item.id,
            name: item.name || "",
            email: item.email || "",
            phone: item.phone || "",
            resume: item.resume || "",
            job_id: item.job_id || null,
            created_at: item.created_at || null,
            updated_at: item.updated_at || null,
            checked: item.checked || false,
          }))
          .sort((a, b) => {
            const dateA = a.created_at ? new Date(a.created_at) : new Date(0)
            const dateB = b.created_at ? new Date(b.created_at) : new Date(0)
            return dateB - dateA
          })
        return acc
      }, {})
      setJobCandidatesByJobId(candidatesByJobId)
      const initialChecked = Object.values(candidatesByJobId).flat().reduce((acc, candidate) => {
        acc[candidate.id] = candidate.checked
        return acc
      }, {})
      setCheckedJobCandidates(initialChecked)
    } catch (error) {
      console.error("There was an error fetching the job candidates!", error)
      showToastMessage("Failed to fetch job candidates!", "error")
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!jobPostName || jobPostName.length < 1 || jobPostName.length > 150) newErrors.jobPostName = "Job Post Name must be between 1 and 150 characters"
    if (!jobType) newErrors.jobType = "Job Type is required"
    if (!location || location.length < 1 || location.length > 150) newErrors.location = "Location must be between 1 and 150 characters"
    if (!description || description.length < 1) newErrors.description = "Description is required"
    if (!requirement || requirement.length < 1) newErrors.requirement = "Requirement is required"
    if (!category || category.length < 1 || category.length > 150) newErrors.category = "Category must be between 1 and 150 characters"
    if (!expiryDate) newErrors.expiryDate = "Expiry Date is required"
    else if (new Date(expiryDate) < new Date(datePosted)) newErrors.expiryDate = "Expiry Date cannot be before Date Posted"
    if (!experienceForJob) newErrors.experienceForJob = "Experience Required is required"
    if (!qualification || qualification.length < 1 || qualification.length > 150) newErrors.qualification = "Qualification must be between 1 and 150 characters"
    if (!datePosted) newErrors.datePosted = "Date Posted is required"
    if (salary === "") newErrors.salary = "Salary is required"
    else if (isNaN(salary) || salary < 0 || salary > 10000000)
      newErrors.salary = "Salary must be a number between 0 and 10,000,000"
    if (skillsExperience && skillsExperience.length > 150)
      newErrors.skillsExperience = "Skills & Experience must be 150 characters or less"
    if (gender && !["Male", "Female", "Other"].includes(gender))
      newErrors.gender = "Invalid gender selection"
    return newErrors
  }

  const validateEditForm = () => {
    const newErrors = {}
    if (!editJobPostName || editJobPostName.length < 1 || editJobPostName.length > 150) newErrors.jobPostName = "Job Post Name must be between 1 and 150 characters"
    if (!editJobType) newErrors.jobType = "Job Type is required"
    if (!editLocation || editLocation.length < 1 || editLocation.length > 150) newErrors.location = "Location must be between 1 and 150 characters"
    if (!editDescription || editDescription.length < 1) newErrors.description = "Description is required"
    if (!editRequirement || editRequirement.length < 1) newErrors.requirement = "Requirement is required"
    if (!editCategory || editCategory.length < 1 || editCategory.length > 150) newErrors.category = "Category must be between 1 and 150 characters"
    if (!editExpiryDate) newErrors.expiryDate = "Expiry Date is required"
    else if (new Date(editExpiryDate) < new Date(editDatePosted)) newErrors.expiryDate = "Expiry Date cannot be before Date Posted"
    if (!editExperienceForJob) newErrors.experienceForJob = "Experience Required is required"
    if (!editQualification || editQualification.length < 1 || editQualification.length > 150) newErrors.qualification = "Qualification must be between 1 and 150 characters"
    if (!editDatePosted) newErrors.datePosted = "Date Posted is required"
    if (editSalary === "") newErrors.salary = "Salary is required"
    else if (isNaN(editSalary) || editSalary < 0 || editSalary > 10000000)
      newErrors.salary = "Salary must be a number between 0 and 10,000,000"
    if (editSkillsExperience && editSkillsExperience.length > 150)
      newErrors.skillsExperience = "Skills & Experience must be 150 characters or less"
    if (editGender && !["Male", "Female", "Other"].includes(editGender))
      newErrors.gender = "Invalid gender selection"
    return newErrors
  }

  const showToastMessage = (message, type) => {
    setToast({ message, type })
    setTimeout(() => setToast({ message: "", type: "" }), 10000)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      showToastMessage("Please fix the form errors before submitting!", "error")
      return
    }

    const formData = new FormData()
    formData.append("jobPostName", jobPostName)
    formData.append("jobType", jobType)
    formData.append("location", location)
    formData.append("salary", salary)
    formData.append("description", description)
    formData.append("requirement", requirement)
    formData.append("skillsExperience", skillsExperience)
    formData.append("category", category)
    formData.append("expiryDate", expiryDate)
    formData.append("experienceForJob", experienceForJob)
    formData.append("gender", gender)
    formData.append("qualification", qualification)
    formData.append("date_posted", datePosted)

    try {
      const response = await axiosInstance.post("api/jobs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      setJobPosts([response.data, ...jobPosts].sort((a, b) => b.id - a.id))
      setJobCandidatesByJobId(prev => ({
        ...prev,
        [response.data.id]: []
      }))
      setJobPostName("")
      setJobType("")
      setLocation("")
      setSalary("")
      setDescription("")
      setRequirement("")
      setSkillsExperience("")
      setCategory("")
      setExpiryDate("")
      setExperienceForJob("")
      setGender("")
      setQualification("")
      setDatePosted("")
      setErrors({})
      showToastMessage("Job post added successfully!", "success")
      setCurrentPage(1)
    } catch (error) {
      console.error("There was an error adding the job post!", error.response ? error.response.data : error.message)
      setErrors({ submit: "Failed to add job post. Please check your input or server response." })
      showToastMessage("Failed to add job post!", "error")
    }
  }

  const handleEditJob = (post) => {
    setEditingId(post.id)
    setEditJobPostName(post.title)
    setEditJobType(post.mode)
    setEditLocation(post.location)
    setEditSalary(post.salary)
    setEditDescription(post.description)
    setEditRequirement(post.requirements)
    setEditSkillsExperience(post.skills)
    setEditCategory(post.category)
    setEditExpiryDate(post.expiry_date)
    setEditExperienceForJob(post.experience)
    setEditGender(post.gender)
    setEditQualification(post.qualification)
    setEditDatePosted(post.date_posted)
  }

  const handleUpdateJob = async (e, id) => {
    e.preventDefault()
    const formErrors = validateEditForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      showToastMessage("Please fix the form errors before updating!", "error")
      return
    }

    const formData = new FormData()
    formData.append("_method", "PUT")
    formData.append("jobPostName", editJobPostName)
    formData.append("jobType", editJobType)
    formData.append("location", editLocation)
    formData.append("salary", editSalary)
    formData.append("description", editDescription)
    formData.append("requirement", editRequirement)
    formData.append("skillsExperience", editSkillsExperience)
    formData.append("category", editCategory)
    formData.append("expiryDate", editExpiryDate)
    formData.append("experienceForJob", editExperienceForJob)
    formData.append("gender", editGender)
    formData.append("qualification", editQualification)
    formData.append("date_posted", editDatePosted)

    try {
      const response = await axiosInstance.post(`api/jobs/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      setJobPosts(jobPosts.map((post) => (post.id === id ? response.data : post)).sort((a, b) => b.id - a.id))
      setEditingId(null)
      setEditJobPostName("")
      setEditJobType("")
      setEditLocation("")
      setEditSalary("")
      setEditDescription("")
      setEditRequirement("")
      setEditSkillsExperience("")
      setEditCategory("")
      setEditExpiryDate("")
      setEditExperienceForJob("")
      setEditGender("")
      setEditQualification("")
      setEditDatePosted("")
      setErrors({})
      showToastMessage("Job post updated successfully!", "success")
    } catch (error) {
      console.error("There was an error updating the job post!", error)
      showToastMessage("Failed to update job post!", "error")
    }
  }

  const handleDeleteJob = async (id) => {
    try {
      await axiosInstance.delete(`api/jobs/${id}`)
      setJobPosts(jobPosts.filter((post) => post.id !== id))
      setJobCandidatesByJobId(prev => {
        const newCandidates = { ...prev }
        delete newCandidates[id]
        return newCandidates
      })
      if (selectedJobId === id) {
        setSelectedJobId(null)
      }
      showToastMessage("Job post deleted successfully!", "success")
      if (paginatedJobPosts.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1)
      }
    } catch (error) {
      console.error("There was an error deleting the job post!", error)
      showToastMessage("Failed to delete job post!", "error")
    }
  }

  const handleCheckCandidate = async (id) => {
    const newCheckedStatus = !checkedJobCandidates[id]
    try {
      const response = await axiosInstance.put(`/api/apply-job/${id}`, {
        checked: newCheckedStatus,
      })
      const updatedCandidate = response.data.data
      setJobCandidatesByJobId(prev => {
        const newCandidates = { ...prev }
        Object.keys(newCandidates).forEach(jobId => {
          newCandidates[jobId] = newCandidates[jobId].map(item =>
            item.id === id ? { ...item, checked: updatedCandidate.checked } : item
          ).sort((a, b) => {
            const dateA = a.created_at ? new Date(a.created_at) : new Date(0)
            const dateB = b.created_at ? new Date(b.created_at) : new Date(0)
            return dateB - dateA
          })
        })
        return newCandidates
      })
      setCheckedJobCandidates(prev => ({
        ...prev,
        [id]: newCheckedStatus,
      }))
      showToastMessage(`Job candidate ${id} ${newCheckedStatus ? "checked" : "unchecked"} successfully!`, "success")
    } catch (error) {
      console.error("There was an error updating the checked status!", error)
      setCheckedJobCandidates(prev => ({
        ...prev,
        [id]: !newCheckedStatus,
      }))
      showToastMessage("Failed to update checked status!", "error")
    }
  }

  const handleDeleteCandidate = async (id) => {
    try {
      await axiosInstance.delete(`/api/apply-job/${id}`)
      setJobCandidatesByJobId(prev => {
        const newCandidates = { ...prev }
        Object.keys(newCandidates).forEach(jobId => {
          newCandidates[jobId] = newCandidates[jobId].filter(item => item.id !== id).sort((a, b) => {
            const dateA = a.created_at ? new Date(a.created_at) : new Date(0)
            const dateB = b.created_at ? new Date(b.created_at) : new Date(0)
            return dateB - dateA
          })
        })
        return newCandidates
      })
      setCheckedJobCandidates(prev => {
        const newChecked = { ...prev }
        delete newChecked[id]
        return newChecked
      })
      showToastMessage("Job candidate deleted successfully!", "success")
    } catch (error) {
      console.error("There was an error deleting the job candidate!", error)
      showToastMessage("Failed to delete job candidate!", "error")
    }
  }

  const toggleApplicantsView = (jobId) => {
    if (selectedJobId === jobId) {
      setSelectedJobId(null)
    } else {
      setSelectedJobId(jobId)
    }
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const paginatedJobPosts = jobPosts.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(jobPosts.length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    setSelectedJobId(null)
  }

  const getResumeUrl = (resumePath) => {
    const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3000"
    return resumePath ? `${baseUrl}/storage/${resumePath}` : `${baseUrl}/images/default-image.jpg`
  }

  const formatDateTime = (dateTime) => {
    if (!dateTime || isNaN(new Date(dateTime))) {
      return "N/A"
    }
    return new Date(dateTime).toISOString().slice(0, 16).replace("T", " ")
  }

  const truncateText = (text, maxLength = 25) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  useEffect(() => {
    if (!datePosted) {
      const now = new Date().toISOString().slice(0, 10)
      setDatePosted(now)
    }
  }, [])

  return (
    <DashboardLayout>
      <div className="job-post-container">
        <div className="responsive-wrapper">
          <style>
            {`
            .pagination-container {
              display: flex;
              justify-content: center;
              margin-top: 20px;
              margin-bottom: 30px;
              padding: 0 16px;
            }
            .pagination {
              display: flex;
              list-style: none;
              padding: 0;
              gap: 8px;
              flex-wrap: wrap;
              justify-content: center;
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
              min-width: 40px;
              text-align: center;
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
            .applicants-table {
              width: 100%;
              border-collapse: collapse;
              background: #f8fafc;
            }
            .applicants-table th, .applicants-table td {
              padding: 12px;
              text-align: left;
              border-bottom: 1px solid #e0e0e0;
            }
            .applicants-table th {
              background-color: #e2e8f0;
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
              color: #dc3545;
            }
            .check-btn.checked {
              color: #28a745;
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
            .toggle-applicants-btn {
              background: none;
              border: none;
              cursor: pointer;
              font-size: 18px;
              color: #667eea;
              padding: 0;
              margin-right: 10px;
            }
            .toggle-applicants-btn:hover {
              color: #0162ca;
            }
            .applicants-table-wrapper {
              margin-top: 10px;
              overflow-x: auto;
            }
            .job-row {
              cursor: pointer;
            }
            .mandatory {
              color: #dc3545;
              margin-left: 4px;
            }
            .truncated-text {
              max-width: 200px; /* Adjusted for better visibility */
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            @media (max-width: 576px) {
              .pagination {
                gap: 4px;
              }
              .page-link {
                padding: 6px 8px;
                font-size: 12px;
                min-width: 32px;
              }
              .page-link.arrow {
                padding: 6px 8px;
                font-size: 14px;
              }
              .truncated-text {
                max-width: 100px; /* Further reduce on small screens */
              }
            }
          `}
          </style>
          {toast.message && (
            <div className={`toast ${toast.type}`}>
              <div className="toast-content">{toast.message}</div>
            </div>
          )}
          <div className="row m-0 p-0 justify-content-center">
            <div className="col-12">
              <p className="main_heading_blog">{showTable ? "Job Posts" : "Add New Job"}</p>
              <button onClick={() => setShowTable(!showTable)} className="toggle-button">
                {showTable ? "Add New Job" : "Show Posts"}
              </button>
              {!showTable ? (
                <div className="row justify-content-center">
                  <div className="col-12">
                    <div className="main_div_add_category">
                      <div className="form-header">
                        <MdWork className="form-icon" />
                        <h3 className="form-title">Job Post Details</h3>
                      </div>
                      <form onSubmit={handleFormSubmit}>
                        <div className="form-row">
                          <div className="form-group">
                            <label className="form-label">
                              <MdWork className="label-icon" />
                              Job Title<span className="mandatory">*</span>
                            </label>
                            <input
                              placeholder="Enter job title (1-150 chars)"
                              className={`input_add_category ${errors.jobPostName ? "error" : ""}`}
                              value={jobPostName}
                              onChange={(e) => setJobPostName(e.target.value.slice(0, 150))}
                              maxLength={150}
                            />
                            {errors.jobPostName && <div className="error-message">{errors.jobPostName}</div>}
                          </div>
                          <div className="form-group">
                            <label className="form-label">
                              <MdWork className="label-icon" />
                              Job Type<span className="mandatory">*</span>
                            </label>
                            <select
                              className={`input_add_category ${errors.jobType ? "error" : ""}`}
                              value={jobType}
                              onChange={(e) => setJobType(e.target.value)}
                            >
                              <option value="">Select job type</option>
                              <option value="Full-time">Full-time</option>
                              <option value="Part-time">Part-time</option>
                              <option value="Contract">Contract</option>
                              <option value="Remote">Remote</option>
                              <option value="Internship">Internship</option>
                            </select>
                            {errors.jobType && <div className="error-message">{errors.jobType}</div>}
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group">
                            <label className="form-label">
                              <MdLocationOn className="label-icon" />
                              Location<span className="mandatory">*</span>
                            </label>
                            <input
                              placeholder="Enter location (1-150 chars)"
                              className={`input_add_category ${errors.location ? "error" : ""}`}
                              value={location}
                              onChange={(e) => setLocation(e.target.value.slice(0, 150))}
                              maxLength={150}
                            />
                            {errors.location && <div className="error-message">{errors.location}</div>}
                          </div>
                          <div className="form-group">
                            <label className="form-label">
                              <MdAttachMoney className="label-icon" />
                              Salary<span className="mandatory">*</span>
                            </label>
                            <input
                              placeholder="Enter salary (0-10,000,000)"
                              className={`input_add_category ${errors.salary ? "error" : ""}`}
                              value={salary}
                              onChange={(e) => {
                                const value = e.target.value
                                if (value === "" || (Number(value) >= 0 && Number(value) <= 10000000)) {
                                  setSalary(value)
                                }
                              }}
                              type="number"
                              min="0"
                              max="10000000"
                            />
                            {errors.salary && <div className="error-message">{errors.salary}</div>}
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="form-label">
                            <MdDescription className="label-icon" />
                            Description<span className="mandatory">*</span>
                          </label>
                          <textarea
                            placeholder="Enter job description (min 1 char)"
                            className={`input_add_category textarea ${errors.description ? "error" : ""}`}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="6"
                          />
                          {errors.description && <div className="error-message">{errors.description}</div>}
                        </div>
                        <div className="form-group">
                          <label className="form-label">
                            Requirements<span className="mandatory">*</span>
                          </label>
                          <textarea
                            placeholder="Enter job requirements (min 1 char)"
                            className={`input_add_category textarea ${errors.requirement ? "error" : ""}`}
                            value={requirement}
                            onChange={(e) => setRequirement(e.target.value)}
                            rows="6"
                          />
                          {errors.requirement && <div className="error-message">{errors.requirement}</div>}
                        </div>
                        <div className="form-row">
                          <div className="form-group">
                            <label className="form-label">Skills & Experience</label>
                            <input
                              placeholder="Enter required skills (max 150 chars)"
                              className={`input_add_category ${errors.skillsExperience ? "error" : ""}`}
                              value={skillsExperience}
                              onChange={(e) => setSkillsExperience(e.target.value.slice(0, 150))}
                              maxLength={150}
                            />
                            {errors.skillsExperience && <div className="error-message">{errors.skillsExperience}</div>}
                          </div>
                          <div className="form-group">
                            <label className="form-label">
                              Category<span className="mandatory">*</span>
                            </label>
                            <input
                              placeholder="Enter job category (1-150 chars)"
                              className={`input_add_category ${errors.category ? "error" : ""}`}
                              value={category}
                              onChange={(e) => setCategory(e.target.value.slice(0, 150))}
                              maxLength={150}
                            />
                            {errors.category && <div className="error-message">{errors.category}</div>}
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group">
                            <label className="form-label">
                              Experience Required<span className="mandatory">*</span>
                            </label>
                            <select
                              className={`input_add_category ${errors.experienceForJob ? "error" : ""}`}
                              value={experienceForJob}
                              onChange={(e) => setExperienceForJob(e.target.value)}
                            >
                              <option value="">Select experience level</option>
                              <option value="Entry Level">Entry Level</option>
                              <option value="1-2 years">1-2 years</option>
                              <option value="3-5 years">3-5 years</option>
                              <option value="5+ years">5+ years</option>
                              <option value="Senior Level">Senior Level</option>
                            </select>
                            {errors.experienceForJob && <div className="error-message">{errors.experienceForJob}</div>}
                          </div>
                          <div className="form-group">
                            <label className="form-label">Gender Preference</label>
                            <select
                              className={`input_add_category ${errors.gender ? "error" : ""}`}
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                            >
                              <option value="">Any</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                            {errors.gender && <div className="error-message">{errors.gender}</div>}
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="form-label">
                            Qualification<span className="mandatory">*</span>
                          </label>
                          <input
                            placeholder="Enter required qualification (1-150 chars)"
                            className={`input_add_category ${errors.qualification ? "error" : ""}`}
                            value={qualification}
                            onChange={(e) => setQualification(e.target.value.slice(0, 150))}
                            maxLength={150}
                          />
                          {errors.qualification && <div className="error-message">{errors.qualification}</div>}
                        </div>
                        <div className="form-row">
                          <div className="form-group">
                            <label className="form-label">
                              Date Posted<span className="mandatory">*</span>
                            </label>
                            <input
                              type="date"
                              className={`input_add_category ${errors.datePosted ? "error" : ""}`}
                              value={datePosted}
                              onChange={(e) => setDatePosted(e.target.value)}
                            />
                            {errors.datePosted && <div className="error-message">{errors.datePosted}</div>}
                          </div>
                          <div className="form-group">
                            <label className="form-label">
                              Expiry Date<span className="mandatory">*</span>
                            </label>
                            <input
                              type="date"
                              className={`input_add_category ${errors.expiryDate ? "error" : ""}`}
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(e.target.value)}
                            />
                            {errors.expiryDate && <div className="error-message">{errors.expiryDate}</div>}
                          </div>
                        </div>
                        {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}
                        <button className="Add_Category_button" type="submit">
                          <MdWork className="btn-icon" />
                          Add Job Post
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="main_div_table_job_show">
                  <div className="table-header">
                    <h3 className="table-title">Job Posts</h3>
                    <div className="table-count">{jobPosts.length} Jobs</div>
                  </div>
                  <div className="table-container">
                    <div className="table-wrapper">
                      <table className="job-table">
                        <thead>
                          <tr>
                            <th>Sr No</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Location</th>
                            <th>Salary</th>
                            <th>Category</th>
                            <th>Experience</th>
                            <th>Posted</th>
                            <th>Expires</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedJobPosts.map((post, index) => (
                            <React.Fragment key={post.id}>
                              <tr className="job-row" onClick={() => toggleApplicantsView(post.id)}>
                                <td>
                                  <div className="sr-number">{indexOfFirstItem + index + 1}</div>
                                </td>
                                <td>
                                  {editingId === post.id ? (
                                    <input
                                      type="text"
                                      value={editJobPostName}
                                      onChange={(e) => setEditJobPostName(e.target.value.slice(0, 150))}
                                      className="table-input"
                                      maxLength={150}
                                    />
                                  ) : (
                                    <div className="truncated-text">{truncateText(post.title)}</div>
                                  )}
                                </td>
                                <td>
                                  {editingId === post.id ? (
                                    <select
                                      value={editJobType}
                                      onChange={(e) => setEditJobType(e.target.value)}
                                      className="table-input"
                                    >
                                      <option value="Full-time">Full-time</option>
                                      <option value="Part-time">Part-time</option>
                                      <option value="Contract">Contract</option>
                                      <option value="Remote">Remote</option>
                                      <option value="Internship">Internship</option>
                                    </select>
                                  ) : (
                                    <div className="truncated-text">{truncateText(post.mode)}</div>
                                  )}
                                </td>
                                <td>
                                  {editingId === post.id ? (
                                    <input
                                      type="text"
                                      value={editLocation}
                                      onChange={(e) => setEditLocation(e.target.value.slice(0, 150))}
                                      className="table-input"
                                      maxLength={150}
                                    />
                                  ) : (
                                    <div className="truncated-text">
                                      <MdLocationOn className="location-icon" />
                                      {truncateText(post.location)}
                                    </div>
                                  )}
                                </td>
                                <td>
                                  {editingId === post.id ? (
                                    <input
                                      type="number"
                                      value={editSalary}
                                      onChange={(e) => {
                                        const value = e.target.value
                                        if (value === "" || (Number(value) >= 0 && Number(value) <= 10000000)) {
                                          setEditSalary(value)
                                        }
                                      }}
                                      className="table-input"
                                      min="0"
                                      max="10000000"
                                    />
                                  ) : (
                                    <div className="truncated-text">
                                      <MdAttachMoney className="salary-icon" />
                                      {truncateText(post.salary.toString())}
                                    </div>
                                  )}
                                </td>
                                <td>
                                  {editingId === post.id ? (
                                    <input
                                      type="text"
                                      value={editCategory}
                                      onChange={(e) => setEditCategory(e.target.value.slice(0, 150))}
                                      className="table-input"
                                      maxLength={150}
                                    />
                                  ) : (
                                    <div className="truncated-text">{truncateText(post.category)}</div>
                                  )}
                                </td>
                                <td>
                                  {editingId === post.id ? (
                                    <select
                                      value={editExperienceForJob}
                                      onChange={(e) => setEditExperienceForJob(e.target.value)}
                                      className="table-input"
                                    >
                                      <option value="Entry Level">Entry Level</option>
                                      <option value="1-2 years">1-2 years</option>
                                      <option value="3-5 years">3-5 years</option>
                                      <option value="5+ years">5+ years</option>
                                      <option value="Senior Level">Senior Level</option>
                                    </select>
                                  ) : (
                                    <div className="truncated-text">{truncateText(post.experience)}</div>
                                  )}
                                </td>
                                <td>
                                  {editingId === post.id ? (
                                    <input
                                      type="date"
                                      value={editDatePosted}
                                      onChange={(e) => setEditDatePosted(e.target.value)}
                                      className="table-input"
                                    />
                                  ) : (
                                    <div className="truncated-text">{truncateText(post.date_posted)}</div>
                                  )}
                                </td>
                                <td>
                                  {editingId === post.id ? (
                                    <input
                                      type="date"
                                      value={editExpiryDate}
                                      onChange={(e) => setEditExpiryDate(e.target.value)}
                                      className="table-input"
                                    />
                                  ) : (
                                    <div className="truncated-text expiry">{truncateText(post.expiry_date)}</div>
                                  )}
                                </td>
                                <td className="action-column">
                                  {editingId === post.id ? (
                                    <button
                                      onClick={(e) => handleUpdateJob(e, post.id)}
                                      className="action-btn save-btn"
                                      title="Save Changes"
                                    >
                                      <MdSave />
                                    </button>
                                  ) : (
                                    <div className="action-buttons">
                                      <button
                                        onClick={() => handleEditJob(post)}
                                        className="action-btn edit-btn"
                                        title="Edit Job"
                                      >
                                        <MdEdit />
                                      </button>
                                      <button
                                        onClick={() => handleDeleteJob(post.id)}
                                        className="action-btn delete-btn"
                                        title="Delete Job"
                                      >
                                        <MdDelete />
                                      </button>
                                    </div>
                                  )}
                                </td>
                              </tr>
                              {selectedJobId === post.id && (
                                <tr>
                                  <td colSpan="10">
                                    <div className="applicants-table-wrapper">
                                      <table className="applicants-table">
                                        <thead>
                                          <tr>
                                            <th>Sr No</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Resume</th>
                                            <th>Received At</th>
                                            <th>Actions</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {(jobCandidatesByJobId[post.id] || []).length > 0 ? (
                                            jobCandidatesByJobId[post.id].map((candidate, idx) => (
                                              <tr key={candidate.id}>
                                                <td>{idx + 1}</td>
                                                <td><div className="truncated-text">{truncateText(candidate.name)}</div></td>
                                                <td><div className="truncated-text">{truncateText(candidate.email)}</div></td>
                                                <td><div className="truncated-text">{truncateText(candidate.phone)}</div></td>
                                                <td>
                                                  <a
                                                    href={getResumeUrl(candidate.resume)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="resume-link"
                                                  >
                                                    <MdCloudDownload /> Download
                                                  </a>
                                                </td>
                                                <td><div className="truncated-text">{truncateText(formatDateTime(candidate.created_at))}</div></td>
                                                <td className="action-column">
                                                  <div className="action-buttons">
                                                    <button
                                                      onClick={() => handleCheckCandidate(candidate.id)}
                                                      className={`action-btn check-btn ${checkedJobCandidates[candidate.id] ? "checked" : ""}`}
                                                      title="Mark as Checked"
                                                    >
                                                      <MdCheck />
                                                    </button>
                                                    <button
                                                      onClick={() => handleDeleteCandidate(candidate.id)}
                                                      className="action-btn delete-btn"
                                                      title="Delete Candidate"
                                                    >
                                                      <MdDelete />
                                                    </button>
                                                  </div>
                                                </td>
                                              </tr>
                                            ))
                                          ) : (
                                            <tr>
                                              <td colSpan="7">No applicants for this job.</td>
                                            </tr>
                                          )}
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="pagination-container">
                    <ul className="pagination">
                      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button
                          className="page-link arrow"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          «
                        </button>
                      </li>
                      {[...Array(totalPages).keys()].map((number) => (
                        <li key={number + 1} className={`page-item ${currentPage === number + 1 ? "active" : ""}`}>
                          <button className="page-link" onClick={() => handlePageChange(number + 1)}>
                            {number + 1}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
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
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default AddJobPost