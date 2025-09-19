"use client"

import "./AddCaseStudy.css"
import { useState, useEffect } from "react"
import axiosInstance from "../../api/axiosInstance"
import { MdOutlineKeyboardArrowRight, MdDelete, MdImage, MdCloudUpload, MdEdit, MdSave } from "react-icons/md"
import DashboardLayout from "./../DashboardLayout/DashboardLayout"

function AddCaseStudy() {
  const [category, setCategory] = useState("")
  const [client, setClient] = useState("")
  const [location, setLocation] = useState("")
  const [completedDate, setCompletedDate] = useState("")
  const [projectValue, setProjectValue] = useState("")
  const [manner, setManner] = useState("")
  const [designer, setDesigner] = useState("")
  const [title, setTitle] = useState("")
  const [caseExplanation, setCaseExplanation] = useState("")
  const [caseHeading, setCaseHeading] = useState("")
  const [caseParagraph, setCaseParagraph] = useState("")
  const [images, setImages] = useState([])
  const [caseStudies, setCaseStudies] = useState([])
  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState({ message: "", type: "" })
  const [editingId, setEditingId] = useState(null)
  const [editCategory, setEditCategory] = useState("")
  const [editClient, setEditClient] = useState("")
  const [editLocation, setEditLocation] = useState("")
  const [editCompletedDate, setEditCompletedDate] = useState("")
  const [editProjectValue, setEditProjectValue] = useState("")
  const [editManner, setEditManner] = useState("")
  const [editDesigner, setEditDesigner] = useState("")
  const [editTitle, setEditTitle] = useState("")
  const [editCaseExplanation, setEditCaseExplanation] = useState("")
  const [editCaseHeading, setEditCaseHeading] = useState("")
  const [editCaseParagraph, setEditCaseParagraph] = useState("")
  const [editImages, setEditImages] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const getImageUrl = (imageUrl) => {
    const baseUrl = process.env.REACT_APP_BASE_URL
    if (!imageUrl) return ""
    return `${baseUrl}${imageUrl.startsWith("/") ? imageUrl : "/" + imageUrl}`
  }

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const response = await axiosInstance.get("/api/case-studies")
        const sortedCaseStudies = (response.data || []).sort((a, b) => b.id - a.id)
        setCaseStudies(sortedCaseStudies.map(item => ({
          id: item.id || item._id,
          category: item.category,
          client: item.client,
          location: item.location,
          completed_date: item.completed_date,
          project_value: item.project_value,
          manner: item.manner,
          designer: item.designer,
          title: item.title,
          case_explanation: item.case_explanation,
          case_heading: item.case_heading,
          case_paragraph: item.case_paragraph,
          image_url: item.image_path || item.image_url
        })))
      } catch (error) {
        console.error("There was an error fetching the case studies!", error)
      }
    }
    fetchCaseStudies()
  }, [])

  const validateForm = () => {
    const newErrors = {}
    if (!category || category.trim().length < 1 || category.trim().length > 100)
      newErrors.category = "Category is required (1-100 characters)"
    if (!client || client.trim().length < 1 || client.trim().length > 100)
      newErrors.client = "Client is required (1-100 characters)"
    if (!location || location.trim().length < 1 || location.trim().length > 100)
      newErrors.location = "Location is required (1-100 characters)"
    if (!completedDate) newErrors.completedDate = "Completed Date is required"
    if (!projectValue || isNaN(projectValue) || projectValue <= 0)
      newErrors.projectValue = "Project Value must be a positive number"
    if (!manner || manner.trim().length < 1 || manner.trim().length > 100)
      newErrors.manner = "Manner is required (1-100 characters)"
    if (!designer || designer.trim().length < 1 || designer.trim().length > 100)
      newErrors.designer = "Designer is required (1-100 characters)"
    if (!title || title.trim().length < 1 || title.trim().length > 100)
      newErrors.title = "Title is required (1-100 characters)"
    if (!caseExplanation || caseExplanation.trim().length < 1)
      newErrors.caseExplanation = "Case Explanation is required (min 1 character)"
    if (!caseHeading || caseHeading.trim().length < 1 || caseHeading.trim().length > 100)
      newErrors.caseHeading = "Case Heading is required (1-100 characters)"
    if (!caseParagraph || caseParagraph.trim().length < 1)
      newErrors.caseParagraph = "Case Paragraph is required (min 1 character)"
    if (images.length === 0) newErrors.images = "At least one image is required"
    return newErrors
  }

  const validateEditForm = () => {
    const newErrors = {}
    if (!editCategory || editCategory.trim().length < 1 || editCategory.trim().length > 100)
      newErrors.editCategory = "Category is required (1-100 characters)"
    if (!editClient || editClient.trim().length < 1 || editClient.trim().length > 100)
      newErrors.editClient = "Client is required (1-100 characters)"
    if (!editLocation || editLocation.trim().length < 1 || editLocation.trim().length > 100)
      newErrors.editLocation = "Location is required (1-100 characters)"
    if (!editCompletedDate) newErrors.editCompletedDate = "Completed Date is required"
    if (!editProjectValue || isNaN(editProjectValue) || editProjectValue <= 0)
      newErrors.editProjectValue = "Project Value must be a positive number"
    if (!editManner || editManner.trim().length < 1 || editManner.trim().length > 100)
      newErrors.editManner = "Manner is required (1-100 characters)"
    if (!editDesigner || editDesigner.trim().length < 1 || editDesigner.trim().length > 100)
      newErrors.editDesigner = "Designer is required (1-100 characters)"
    if (!editTitle || editTitle.trim().length < 1 || editTitle.trim().length > 100)
      newErrors.editTitle = "Title is required (1-100 characters)"
    if (!editCaseExplanation || editCaseExplanation.trim().length < 1)
      newErrors.editCaseExplanation = "Case Explanation is required (min 1 character)"
    if (!editCaseHeading || editCaseHeading.trim().length < 1 || editCaseHeading.trim().length > 100)
      newErrors.editCaseHeading = "Case Heading is required (1-100 characters)"
    if (!editCaseParagraph || editCaseParagraph.trim().length < 1)
      newErrors.editCaseParagraph = "Case Paragraph is required (min 1 character)"
    return newErrors
  }

  const showToast = (message, type) => {
    setToast({ message, type })
    setTimeout(() => setToast({ message: "", type: "" }), 6000)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImages([file])
    } else {
      setImages([])
    }
  }

  const handleEditImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setEditImages([file])
    } else {
      setEditImages([])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      showToast("Please fix the form errors before submitting!", "error")
      return
    }

    const formData = new FormData()
    formData.append("category", category.trim())
    formData.append("client", client.trim())
    formData.append("location", location.trim())
    formData.append("completed_date", completedDate)
    formData.append("project_value", projectValue)
    formData.append("manner", manner.trim())
    formData.append("designer", designer.trim())
    formData.append("title", title.trim())
    formData.append("case_explanation", caseExplanation.trim())
    formData.append("case_heading", caseHeading.trim())
    formData.append("case_paragraph", caseParagraph.trim())
    images.forEach((image) => formData.append("image", image))

    try {
      const response = await axiosInstance.post("/api/case-studies", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      const newCaseStudy = {
        id: response.data.id || Date.now(),
        category: category.trim(),
        client: client.trim(),
        location: location.trim(),
        completed_date: completedDate,
        project_value: projectValue,
        manner: manner.trim(),
        designer: designer.trim(),
        title: title.trim(),
        case_explanation: caseExplanation.trim(),
        case_heading: caseHeading.trim(),
        case_paragraph: caseParagraph.trim(),
        image_url: response.data.image_path || `/images/${images[0].name}`,
      }
      setCaseStudies([newCaseStudy, ...caseStudies].sort((a, b) => b.id - a.id))
      setCategory("")
      setClient("")
      setLocation("")
      setCompletedDate("")
      setProjectValue("")
      setManner("")
      setDesigner("")
      setTitle("")
      setCaseExplanation("")
      setCaseHeading("")
      setCaseParagraph("")
      setImages([])
      setErrors({})
      showToast("Case study added successfully!", "success")
      setCurrentPage(1)
    } catch (error) {
      console.error("There was an error adding the case study!", error.response ? error.response.data : error.message)
      setErrors({ submit: "Failed to add case study. Please check your input or server response." })
      showToast("Failed to add case study!", "error")
    }
  }

  const handleEdit = (item) => {
    setEditingId(item.id)
    setEditCategory(item.category)
    setEditClient(item.client)
    setEditLocation(item.location)
    setEditCompletedDate(item.completed_date)
    setEditProjectValue(item.project_value)
    setEditManner(item.manner)
    setEditDesigner(item.designer)
    setEditTitle(item.title)
    setEditCaseExplanation(item.case_explanation)
    setEditCaseHeading(item.case_heading)
    setEditCaseParagraph(item.case_paragraph)
    setEditImages([])
  }

  const handleUpdate = async (e, id) => {
    e.preventDefault()
    const formErrors = validateEditForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      showToast("Please fix the form errors before updating!", "error")
      return
    }

    const formData = new FormData()
    formData.append("_method", "PUT")
    formData.append("category", editCategory.trim())
    formData.append("client", editClient.trim())
    formData.append("location", editLocation.trim())
    formData.append("completed_date", editCompletedDate)
    formData.append("project_value", editProjectValue)
    formData.append("manner", editManner.trim())
    formData.append("designer", editDesigner.trim())
    formData.append("title", editTitle.trim())
    formData.append("case_explanation", editCaseExplanation.trim())
    formData.append("case_heading", editCaseHeading.trim())
    formData.append("case_paragraph", editCaseParagraph.trim())
    editImages.forEach((image) => formData.append("image", image))

    try {
      const response = await axiosInstance.post(`/api/case-studies/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      const updatedCaseStudy = {
        id: response.data.id || id,
        category: response.data.category || editCategory.trim(),
        client: response.data.client || editClient.trim(),
        location: response.data.location || editLocation.trim(),
        completed_date: response.data.completed_date || editCompletedDate,
        project_value: response.data.project_value || editProjectValue,
        manner: response.data.manner || editManner.trim(),
        designer: response.data.designer || editDesigner.trim(),
        title: response.data.title || editTitle.trim(),
        case_explanation: response.data.case_explanation || editCaseExplanation.trim(),
        case_heading: response.data.case_heading || editCaseHeading.trim(),
        case_paragraph: response.data.case_paragraph || editCaseParagraph.trim(),
        image_url: response.data.image_path || caseStudies.find(item => item.id === id).image_url,
      }
      setCaseStudies(caseStudies.map((item) => (item.id === id ? updatedCaseStudy : item)).sort((a, b) => b.id - a.id))
      setEditingId(null)
      setEditCategory("")
      setEditClient("")
      setEditLocation("")
      setEditCompletedDate("")
      setEditProjectValue("")
      setEditManner("")
      setEditDesigner("")
      setEditTitle("")
      setEditCaseExplanation("")
      setEditCaseHeading("")
      setEditCaseParagraph("")
      setEditImages([])
      setErrors({})
      showToast("Case study updated successfully!", "success")
    } catch (error) {
      console.error("There was an error updating the case study!", error)
      setErrors({ submit: "Failed to update case study. Please check your input or server response." })
      showToast("Failed to update case study!", "error")
    }
  }

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/case-studies/${id}`)
      setCaseStudies(caseStudies.filter((item) => item.id !== id).sort((a, b) => b.id - a.id))
      showToast("Case study deleted successfully!", "success")
      if (paginatedCaseStudies.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1)
      }
    } catch (error) {
      console.error("There was an error deleting the case study!", error)
      showToast("Failed to delete case study!", "error")
    }
  }

  const truncateText = (text, maxLength = 30) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "..."
    }
    return text
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const paginatedCaseStudies = caseStudies.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(caseStudies.length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <DashboardLayout>
      <div>
        <style>
          {`
            .pagination-container { display: flex; justify-content: center; margin-top: 20px; margin-bottom: 30px; }
            .pagination { display: flex; list-style: none; padding: 0; gap: 8px; }
            .page-item { display: flex; align-items: center; }
            .page-link { padding: 8px 12px; border: 1px solid #e0e0e0; border-radius: 4px; color: #333; background-color: #fff; text-decoration: none; font-size: 14px; cursor: pointer; transition: all 0.3s ease; }
            .page-link:hover { background-color: #f5f5f5; border-color: #ccc; }
            .page-item.active .page-link { background-color: #ff6200; color: #fff; border-color: #ff6200; }
            .page-item.disabled .page-link { color: #ccc; cursor: not-allowed; border-color: #e0e0e0; background-color: #f9f9f9; }
            .page-link.arrow { font-size: 16px; padding: 8px 10px; }
            .table-input, .table-textarea { width: 100%; padding: 5px; }
            .table-textarea { resize: vertical; min-height: 60px; }
            .truncated-text {
              max-width: 200px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .table-wrapper {
              overflow-x: auto;
              width: 100%;
              max-width: 100%;
            }
            .job-table {
              width: 100%;
              min-width: 1400px;
              border-collapse: collapse;
              table-layout: fixed;
            }
            th {
              white-space: normal;
              overflow: visible;
              text-overflow: clip;
              padding: 12px;
              background-color: #f9fafb;
              font-weight: 600;
              position: sticky;
              top: 0;
              z-index: 1;
              background-color: #f5f5f5;
            }
            td {
              padding: 8px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            th, td {
              min-width: 120px;
              max-width: 200px;
              box-sizing: border-box;
            }
            .action-column {
              min-width: 100px;
              max-width: 100px;
            }
            .file-upload-wrapper { position: relative; width: 100%; height: 40px; border: 1px solid #e0e0e0; border-radius: 4px; overflow: hidden; cursor: pointer; }
            .file-upload-wrapper-small { position: relative; width: 100%; height: 40px; border: 1px solid #e0e0e0; border-radius: 4px; overflow: hidden; cursor: pointer; }
            .form-control-file { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; z-index: 10; }
            .form-control-file.table-file { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; z-index: 10; }
            .upload-placeholder { display: flex; align-items: center; justify-content: center; height: 100%; background-color: #f9f9f9; color: #666; }
            .upload-placeholder-small { display: flex; align-items: center; justify-content: center; height: 100%; background-color: #f9f9f9; color: #666; }
            .upload-icon { margin-right: 8px; font-size: 18px; }
            .upload-icon-small { margin-right: 8px; font-size: 18px; }
            .upload-text { font-size: 14px; }
            .upload-text-small { font-size: 14px; }
            .selected-file-info { display: flex; align-items: center; margin-top: 8px; font-size: 12px; color: #666; }
            .image-preview { display: flex; align-items: center; background-color: #e0f7fa; padding: 5px 10px; border-radius: 4px; margin-top: 8px; }
            .image-preview .file-icon-small { color: #00796b; }
            .image-preview .file-name-small { color: #00796b; }
            .file-icon { margin-right: 4px; font-size: 16px; }
            .file-icon-small { margin-right: 4px; font-size: 16px; }
            .file-name { font-size: 12px; }
            .file-name-small { font-size: 12px; }
            .edit-photo-container { position: relative; z-index: 1; }
            .edit-photo-container label { display: block; width: 100%; height: 40px; cursor: pointer; }
            @media (max-width: 1200px) {
              .job-table {
                min-width: 1000px;
              }
              th, td {
                min-width: 80px;
                max-width: 150px;
              }
              .action-column {
                min-width: 80px;
                max-width: 80px;
              }
            }
            @media (max-width: 768px) {
              .truncated-text {
                max-width: 100px;
              }
              .job-table {
                min-width: 700px;
              }
              th, td {
                min-width: 60px;
                max-width: 120px;
              }
              .action-column {
                min-width: 60px;
                max-width: 60px;
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
          <div className="col-lg-10 col-md-10 col-sm-12 col-12">
            <p className="main_heading_blog">Add New Case Study</p>

            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-10 col-sm-12 col-12">
                <div className="main_div_add_category">
                  <div className="form-header">
                    <h3 className="form-title">Case Study Details</h3>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Category *</label>
                        <input
                          placeholder="Enter category (1-100 characters)"
                          className={`input_add_category ${errors.category ? "error" : ""}`}
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          maxLength={100}
                          required
                        />
                        {errors.category && <div className="error-message">{errors.category}</div>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">Client *</label>
                        <input
                          placeholder="Enter client name (1-100 characters)"
                          className={`input_add_category ${errors.client ? "error" : ""}`}
                          value={client}
                          onChange={(e) => setClient(e.target.value)}
                          maxLength={100}
                          required
                        />
                        {errors.client && <div className="error-message">{errors.client}</div>}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Location *</label>
                        <input
                          placeholder="Enter location (1-100 characters)"
                          className={`input_add_category ${errors.location ? "error" : ""}`}
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          maxLength={100}
                          required
                        />
                        {errors.location && <div className="error-message">{errors.location}</div>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">Completed Date *</label>
                        <input
                          type="date"
                          className={`input_add_category ${errors.completedDate ? "error" : ""}`}
                          value={completedDate}
                          onChange={(e) => setCompletedDate(e.target.value)}
                          required
                        />
                        {errors.completedDate && <div className="error-message">{errors.completedDate}</div>}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Project Value *</label>
                        <input
                          type="number"
                          placeholder="Enter project value"
                          className={`input_add_category ${errors.projectValue ? "error" : ""}`}
                          value={projectValue}
                          onChange={(e) => setProjectValue(e.target.value)}
                          min="1"
                          required
                        />
                        {errors.projectValue && <div className="error-message">{errors.projectValue}</div>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">Manner *</label>
                        <input
                          placeholder="Enter manner (1-100 characters)"
                          className={`input_add_category ${errors.manner ? "error" : ""}`}
                          value={manner}
                          onChange={(e) => setManner(e.target.value)}
                          maxLength={100}
                          required
                        />
                        {errors.manner && <div className="error-message">{errors.manner}</div>}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Designer *</label>
                      <input
                        placeholder="Enter designer name (1-100 characters)"
                        className={`input_add_category ${errors.designer ? "error" : ""}`}
                        value={designer}
                        onChange={(e) => setDesigner(e.target.value)}
                        maxLength={100}
                        required
                      />
                      {errors.designer && <div className="error-message">{errors.designer}</div>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Title *</label>
                      <input
                        placeholder="Enter case study title (1-100 characters)"
                        className={`input_add_category ${errors.title ? "error" : ""}`}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={100}
                        required
                      />
                      {errors.title && <div className="error-message">{errors.title}</div>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Case Explanation *</label>
                      <textarea
                        placeholder="Enter case explanation (min 1 character)"
                        className={`input_add_category textarea ${errors.caseExplanation ? "error" : ""}`}
                        value={caseExplanation}
                        onChange={(e) => setCaseExplanation(e.target.value)}
                        rows="4"
                        required
                      />
                      {errors.caseExplanation && <div className="error-message">{errors.caseExplanation}</div>}
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Case Heading *</label>
                        <input
                          placeholder="Enter case heading (1-100 characters)"
                          className={`input_add_category ${errors.caseHeading ? "error" : ""}`}
                          value={caseHeading}
                          onChange={(e) => setCaseHeading(e.target.value)}
                          maxLength={100}
                          required
                        />
                        {errors.caseHeading && <div className="error-message">{errors.caseHeading}</div>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">Case Paragraph *</label>
                        <textarea
                          placeholder="Enter case paragraph (min 1 character)"
                          className={`input_add_category textarea ${errors.caseParagraph ? "error" : ""}`}
                          value={caseParagraph}
                          onChange={(e) => setCaseParagraph(e.target.value)}
                          rows="3"
                          required
                        />
                        {errors.caseParagraph && <div className="error-message">{errors.caseParagraph}</div>}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <MdCloudUpload className="label-icon" /> Upload Image *
                      </label>
                      <div className="file-upload-wrapper">
                        <input
                          type="file"
                          className="form-control-file"
                          onChange={handleImageChange}
                          accept="image/*"
                          required
                        />
                        <div className="upload-placeholder">
                          <MdCloudUpload className="upload-icon" />
                          <span className="upload-text">
                            {images.length > 0 ? `Selected: ${images[0].name}` : "Choose file or drag and drop"}
                          </span>
                        </div>
                      </div>
                      {errors.images && <div className="error-message">{errors.images}</div>}
                    </div>

                    {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}

                    <button className="Add_Category_button" type="submit">
                      <MdImage className="btn-icon" /> Add Case Study
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="main_div_table_job_show mt-5">
              <div className="table-header">
                <h3 className="table-title">Case Studies</h3>
                <div className="table-count">{caseStudies.length} Case Studies</div>
              </div>
              <div className="table-wrapper">
                <table className="job-table">
                  <thead>
                    <tr>
                      <th>Sr No</th>
                      <th>Title</th>
                      <th>Client</th>
                      <th>Category</th>
                      <th>Location</th>
                      <th>Completed Date</th>
                      <th>Project Value</th>
                      <th>Manner</th>
                      <th>Designer</th>
                      <th>Case Explanation</th>
                      <th>Case Heading</th>
                      <th>Case Paragraph</th>
                      <th>Image</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedCaseStudies.map((item, index) => (
                      <tr key={item.id}>
                        <td>{indexOfFirstItem + index + 1}</td>
                        <td>
                          {editingId === item.id ? (
                            <input
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className="table-input"
                              maxLength={100}
                              required
                            />
                          ) : (
                            <div className="truncated-text">{truncateText(item.title)}</div>
                          )}
                        </td>
                        <td>
                          {editingId === item.id ? (
                            <input
                              type="text"
                              value={editClient}
                              onChange={(e) => setEditClient(e.target.value)}
                              className="table-input"
                              maxLength={100}
                              required
                            />
                          ) : (
                            <div className="truncated-text">{truncateText(item.client)}</div>
                          )}
                        </td>
                        <td>
                          {editingId === item.id ? (
                            <input
                              type="text"
                              value={editCategory}
                              onChange={(e) => setEditCategory(e.target.value)}
                              className="table-input"
                              maxLength={100}
                              required
                            />
                          ) : (
                            <div className="truncated-text">{truncateText(item.category)}</div>
                          )}
                        </td>
                        <td>
                          {editingId === item.id ? (
                            <input
                              type="text"
                              value={editLocation}
                              onChange={(e) => setEditLocation(e.target.value)}
                              className="table-input"
                              maxLength={100}
                              required
                            />
                          ) : (
                            <div className="truncated-text">{truncateText(item.location)}</div>
                          )}
                        </td>
                        <td>
                          {editingId === item.id ? (
                            <input
                              type="date"
                              value={editCompletedDate}
                              onChange={(e) => setEditCompletedDate(e.target.value)}
                              className="table-input"
                              required
                            />
                          ) : (
                            <div className="truncated-text">{truncateText(item.completed_date)}</div>
                          )}
                        </td>
                        <td>
                          {editingId === item.id ? (
                            <input
                              type="number"
                              value={editProjectValue}
                              onChange={(e) => setEditProjectValue(e.target.value)}
                              className="table-input"
                              min="1"
                              required
                            />
                          ) : (
                            <div className="truncated-text">{truncateText(item.project_value.toString())}</div>
                          )}
                        </td>
                        <td>
                          {editingId === item.id ? (
                            <input
                              type="text"
                              value={editManner}
                              onChange={(e) => setEditManner(e.target.value)}
                              className="table-input"
                              maxLength={100}
                              required
                            />
                          ) : (
                            <div className="truncated-text">{truncateText(item.manner)}</div>
                          )}
                        </td>
                        <td>
                          {editingId === item.id ? (
                            <input
                              type="text"
                              value={editDesigner}
                              onChange={(e) => setEditDesigner(e.target.value)}
                              className="table-input"
                              maxLength={100}
                              required
                            />
                          ) : (
                            <div className="truncated-text">{truncateText(item.designer)}</div>
                          )}
                        </td>
                        <td>
                          {editingId === item.id ? (
                            <textarea
                              value={editCaseExplanation}
                              onChange={(e) => setEditCaseExplanation(e.target.value)}
                              className="table-textarea"
                              required
                            />
                          ) : (
                            <div className="truncated-text">{truncateText(item.case_explanation)}</div>
                          )}
                        </td>
                        <td>
                          {editingId === item.id ? (
                            <input
                              type="text"
                              value={editCaseHeading}
                              onChange={(e) => setEditCaseHeading(e.target.value)}
                              className="table-input"
                              maxLength={100}
                              required
                            />
                          ) : (
                            <div className="truncated-text">{truncateText(item.case_heading)}</div>
                          )}
                        </td>
                        <td>
                          {editingId === item.id ? (
                            <textarea
                              value={editCaseParagraph}
                              onChange={(e) => setEditCaseParagraph(e.target.value)}
                              className="table-textarea"
                              required
                            />
                          ) : (
                            <div className="truncated-text">{truncateText(item.case_paragraph)}</div>
                          )}
                        </td>
                        <td>
                          {editingId === item.id ? (
                            <div className="edit-photo-container">
                              <label htmlFor={`edit-image-${item.id}`} className="file-upload-wrapper-small">
                                <input
                                  type="file"
                                  id={`edit-image-${item.id}`}
                                  onChange={handleEditImageChange}
                                  className="form-control-file table-file"
                                  accept="image/*"
                                />
                                <div className="upload-placeholder-small">
                                  <MdCloudUpload className="upload-icon-small" />
                                  <span className="upload-text-small">
                                    {editImages.length > 0 ? `Selected: ${editImages[0].name}` : "Choose file"}
                                  </span>
                                </div>
                              </label>
                              {editImages.length > 0 && (
                                <div className="image-preview">
                                  <MdImage className="file-icon-small" />
                                  <span className="file-name-small">{editImages[0].name}</span>
                                </div>
                              )}
                            </div>
                          ) : (
                            item.image_url && (
                              <div className="photo-container">
                                <img
                                  src={getImageUrl(item.image_url)}
                                  alt={item.title}
                                  className="member-photo"
                                />
                              </div>
                            )
                          )}
                        </td>
                        <td className="action-column">
                          {editingId === item.id ? (
                            <button
                              onClick={(e) => handleUpdate(e, item.id)}
                              className="action-btn save-btn"
                              title="Save Changes"
                            >
                              <MdSave />
                            </button>
                          ) : (
                            <div className="action-buttons">
                              <button
                                onClick={() => handleEdit(item)}
                                className="action-btn edit-btn"
                                title="Edit Case Study"
                              >
                                <MdEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="action-btn delete-btn"
                                title="Delete Case Study"
                              >
                                <MdDelete />
                              </button>
                            </div>
                          )}
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
  )
}

export default AddCaseStudy