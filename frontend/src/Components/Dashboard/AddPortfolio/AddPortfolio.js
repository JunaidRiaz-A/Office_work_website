"use client"

import "./AddPortfolio.css"
import { useState, useEffect } from "react"
import axiosInstance from "../../api/axiosInstance"
import { MdOutlineKeyboardArrowRight, MdDelete, MdImage, MdCloudUpload, MdEdit, MdSave } from "react-icons/md"
import DashboardLayout from "./../DashboardLayout/DashboardLayout"

function AddPortfolio() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [portfolioCategory, setPortfolioCategory] = useState("")
  const [images, setImages] = useState([])
  const [imageFileNames, setImageFileNames] = useState([])
  const [portfolios, setPortfolios] = useState([])
  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState({ message: "", type: "" })
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editPortfolioCategory, setEditPortfolioCategory] = useState("")
  const [editImages, setEditImages] = useState([])
  const [editImageFileNames, setEditImageFileNames] = useState([])
  const [editImagePreviews, setEditImagePreviews] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const getImageUrl = (imageUrl) => {
    const baseUrl = process.env.REACT_APP_BASE_URL
    if (!imageUrl || typeof imageUrl !== 'string' || imageUrl === '{}') {
      return `${baseUrl}/images/default-image.jpg`
    }
    return `${baseUrl}${imageUrl.startsWith("/") ? imageUrl : "/" + imageUrl}`
  }

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await axiosInstance.get("/api/portfolios")
        const sortedPortfolios = (response.data || []).sort((a, b) => b.id - a.id)
        setPortfolios(sortedPortfolios.map(item => ({
          id: item.id || item._id,
          title: item.title,
          description: item.description,
          portfolio_category: Array.isArray(item.portfolio_category) ? item.portfolio_category[0] : item.portfolio_category || "",
          image: typeof item.image === 'string' ? item.image : (item.image_url || '')
        })))
      } catch (error) {
        console.error("There was an error fetching the portfolios!", error)
      }
    }
    fetchPortfolios()
  }, [])

  const validateForm = () => {
    const newErrors = {}
    if (!title) {
      newErrors.title = "Title is required"
    } else if (title.length < 1 || title.length > 150) {
      newErrors.title = "Title must be between 1 and 150 characters"
    }
    if (!description) {
      newErrors.description = "Description is required"
    } else if (description.length < 1) {
      newErrors.description = "Description must be at least 1 character"
    }
    if (!portfolioCategory) newErrors.portfolioCategory = "Portfolio Category is required"
    if (images.length === 0) newErrors.images = "At least one image is required"
    return newErrors
  }

  const validateEditForm = () => {
    const newErrors = {}
    if (!editTitle) {
      newErrors.editTitle = "Title is required"
    } else if (editTitle.length < 1 || editTitle.length > 150) {
      newErrors.editTitle = "Title must be between 1 and 150 characters"
    }
    if (!editDescription) {
      newErrors.editDescription = "Description is required"
    } else if (editDescription.length < 1) {
      newErrors.editDescription = "Description must be at least 1 character"
    }
    if (!editPortfolioCategory) newErrors.editPortfolioCategory = "Portfolio Category is required"
    return newErrors
  }

  const showToast = (message, type) => {
    setToast({ message, type })
    setTimeout(() => setToast({ message: "", type: "" }), 6000)
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      setImages(files)
      setImageFileNames(files.map(file => file.name))
    } else {
      setImages([])
      setImageFileNames([])
    }
  }

  const handleEditImageChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      setEditImages(files)
      setEditImageFileNames(files.map(file => file.name))
      const previews = files.map(file => URL.createObjectURL(file))
      setEditImagePreviews(previews)
    } else {
      setEditImages([])
      setEditImageFileNames([])
      setEditImagePreviews([])
    }
  }

  useEffect(() => {
    return () => {
      editImagePreviews.forEach(preview => URL.revokeObjectURL(preview))
    }
  }, [editImagePreviews])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      showToast("Please fix the form errors before submitting!", "error")
      return
    }

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("portfolio_category[]", portfolioCategory)
    images.forEach((image) => formData.append("image", image))

    try {
      const response = await axiosInstance.post("/api/portfolios", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      const newPortfolio = {
        id: response.data.id || Date.now(),
        title,
        description,
        portfolio_category: response.data.portfolio_category[0] || portfolioCategory,
        image: typeof response.data.image === 'string' ? response.data.image : (response.data.image_url || `/images/${images[0].name}`),
      }
      setPortfolios([newPortfolio, ...portfolios].sort((a, b) => b.id - a.id))
      setTitle("")
      setDescription("")
      setPortfolioCategory("")
      setImages([])
      setImageFileNames([])
      setErrors({})
      showToast("Portfolio added successfully!", "success")
      setCurrentPage(1)
    } catch (error) {
      console.error("There was an error adding the portfolio!", error.response ? error.response.data : error.message)
      setErrors({ submit: "Failed to add portfolio. Please check your input or server response." })
      showToast("Failed to add portfolio!", "error")
    }
  }

  const handleEdit = (item) => {
    setEditingId(item.id)
    setEditTitle(item.title)
    setEditDescription(item.description)
    setEditPortfolioCategory(item.portfolio_category || "")
    setEditImages([])
    setEditImageFileNames([])
    setEditImagePreviews([])
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
    formData.append("title", editTitle)
    formData.append("description", editDescription)
    formData.append("portfolio_category[]", editPortfolioCategory)
    if (editImages.length > 0) {
      editImages.forEach((image) => formData.append("image", image))
    }

    try {
      const response = await axiosInstance.post(`/api/portfolios/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      const updatedPortfolio = {
        id: response.data.id || id,
        title: response.data.title || editTitle,
        description: response.data.description || editDescription,
        portfolio_category: response.data.portfolio_category[0] || editPortfolioCategory,
        image: typeof response.data.image === 'string' ? response.data.image : (response.data.image_url || portfolios.find(p => p.id === id).image),
      }
      setPortfolios(portfolios.map((item) => (item.id === id ? updatedPortfolio : item)).sort((a, b) => b.id - a.id))
      setEditingId(null)
      setEditTitle("")
      setEditDescription("")
      setEditPortfolioCategory("")
      setEditImages([])
      setEditImageFileNames([])
      setEditImagePreviews([])
      setErrors({})
      showToast("Portfolio updated successfully!", "success")
    } catch (error) {
      console.error("There was an error updating the portfolio!", error)
      setErrors({ submit: "Failed to update portfolio. Please check your input or server response." })
      showToast("Failed to update portfolio!", "error")
    }
  }

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/portfolios/${id}`)
      setPortfolios(portfolios.filter((item) => item.id !== id).sort((a, b) => b.id - a.id))
      showToast("Portfolio deleted successfully!", "success")
      if (paginatedPortfolios.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1)
      }
    } catch (error) {
      console.error("There was an error deleting the portfolio!", error)
      showToast("Failed to delete portfolio!", "error")
    }
  }

  const truncateText = (text) => {
    const words = text.split(" ")
    if (words.length > 15) return words.slice(0, 15).join(" ") + "..."
    return text
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const paginatedPortfolios = portfolios.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(portfolios.length / itemsPerPage)

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
            .selected-file-info { display: flex; flex-direction: column; margin-top: 8px; font-size: 12px; color: #666; }
            .image-preview { display: flex; flex-direction: column; margin-top: 8px; }
            .image-preview .file-icon-small { color: #00796b; }
            .image-preview .file-name-small { color: #00796b; }
            .file-icon { margin-right: 4px; font-size: 16px; }
            .file-icon-small { margin-right: 4px; font-size: 16px; }
            .file-name { font-size: 12px; }
            .file-name-small { font-size: 12px; }
            .edit-photo-container { position: relative; z-index: 1; }
            .edit-photo-container label { display: block; width: 100%; height: 40px; cursor: pointer; }
            .preview-image { width: 100px; height: 100px; object-fit: cover; margin: 5px; border-radius: 4px; border: 1px solid #e0e0e0; }
            .preview-container { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 8px; }
            .required-asterisk { color: #ff0000; margin-left: 4px; }
          `}
        </style>
        {toast.message && (
          <div className={`toast ${toast.type}`}>
            <div className="toast-content">{toast.message}</div>
          </div>
        )}

        <div className="row m-0 p-0 justify-content-center">
          <div className="col-lg-10 col-md-10 col-sm-12 col-12">
            <p className="main_heading_blog">Add New Portfolio</p>

            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-10 col-sm-12 col-12">
                <div className="main_div_add_category">
                  <div className="form-header">
                    <h3 className="form-title">Portfolio Details</h3>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="form-label">Title<span className="required-asterisk">*</span></label>
                      <input
                        type="text"
                        placeholder="Enter portfolio title"
                        className={`input_add_category ${errors.title ? "error" : ""}`}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      {errors.title && <div className="error-message">{errors.title}</div>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Description<span className="required-asterisk">*</span></label>
                      <textarea
                        placeholder="Enter description"
                        className={`input_add_category textarea ${errors.description ? "error" : ""}`}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                      />
                      {errors.description && <div className="error-message">{errors.description}</div>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Portfolio Category<span className="required-asterisk">*</span></label>
                      <select
                        className={`input_add_category ${errors.portfolioCategory ? "error" : ""}`}
                        value={portfolioCategory}
                        onChange={(e) => setPortfolioCategory(e.target.value)}
                      >
                        <option value="">Select category</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Mobile Apps">Mobile Apps</option>
                        <option value="CRMS">CRMS</option>
                        <option value="UI UX Design">UI UX Design</option>
                        <option value="Marketing">Marketing</option>
                      </select>
                      {errors.portfolioCategory && <div className="error-message">{errors.portfolioCategory}</div>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <MdCloudUpload className="label-icon" /> Upload Images<span className="required-asterisk">*</span>
                      </label>
                      <div className="file-upload-wrapper">
                        <input
                          type="file"
                          multiple
                          className="form-control-file"
                          onChange={handleImageChange}
                          accept="image/*"
                        />
                        <div className="upload-placeholder">
                          <MdCloudUpload className="upload-icon" />
                          <span className="upload-text">
                            {imageFileNames.length > 0 ? `Selected: ${imageFileNames.length} file(s)` : "Choose files or drag and drop"}
                          </span>
                        </div>
                      </div>
                      {imageFileNames.length > 0 && (
                        <div className="selected-file-info">
                          {imageFileNames.map((name, idx) => (
                            <div key={idx} className="selected-file-info-small">
                              <MdImage className="file-icon-small" />
                              <span className="file-name-small">{name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {errors.images && <div className="error-message">{errors.images}</div>}
                    </div>

                    {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}

                    <button className="Add_Category_button" type="submit">
                      <MdImage className="btn-icon" /> Add Portfolio
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="main_div_table_job_show mt-5">
              <div className="table-header">
                <h3 className="table-title">Portfolios</h3>
                <div className="table-count">{portfolios.length} Portfolios</div>
              </div>
              <div className="table-wrapper">
                <table className="job-table">
                  <thead>
                    <tr>
                      <th>Sr No</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Categories</th>
                      <th>Image</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedPortfolios.map((item, index) => (
                      <tr key={item.id}>
                        <td>{indexOfFirstItem + index + 1}</td>
                        <td>
                          {editingId === item.id ? (
                            <div className="form-group">
                              <label className="form-label">Title<span className="required-asterisk">*</span></label>
                              <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className={`table-input ${errors.editTitle ? "error" : ""}`}
                              />
                              {errors.editTitle && <div className="error-message">{errors.editTitle}</div>}
                            </div>
                          ) : (
                            <div className="job-title">{item.title}</div>
                          )}
                        </td>
                        <td>
                          {editingId === item.id ? (
                            <div className="form-group">
                              <label className="form-label">Description<span className="required-asterisk">*</span></label>
                              <textarea
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                className={`table-textarea ${errors.editDescription ? "error" : ""}`}
                                rows="2"
                              />
                              {errors.editDescription && <div className="error-message">{errors.editDescription}</div>}
                            </div>
                          ) : (
                            <div className="job-description">{truncateText(item.description)}</div>
                          )}
                        </td>
                        <td>
                          {editingId === item.id ? (
                            <div className="form-group">
                              <label className="form-label">Portfolio Category<span className="required-asterisk">*</span></label>
                              <select
                                value={editPortfolioCategory}
                                onChange={(e) => setEditPortfolioCategory(e.target.value)}
                                className={`table-input ${errors.editPortfolioCategory ? "error" : ""}`}
                              >
                                <option value="">Select category</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Mobile Apps">Mobile Apps</option>
                                <option value="CRMS">CRMS</option>
                                <option value="UI UX Design">UI UX Design</option>
                                <option value="Marketing">Marketing</option>
                              </select>
                              {errors.editPortfolioCategory && <div className="error-message">{errors.editPortfolioCategory}</div>}
                            </div>
                          ) : (
                            <div className="job-category">{item.portfolio_category || ""}</div>
                          )}
                        </td>
                        <td>
                          {editingId === item.id ? (
                            <div className="edit-photo-container">
                              <div className="photo-container">
                                <img
                                  src={getImageUrl(item.image)}
                                  alt={item.title}
                                  className="member-photo"
                                  onError={(e) => {
                                    console.log(`Image failed to load for ${item.title}:`, e.target.src)
                                    e.target.src = `${process.env.REACT_APP_BASE_URL}/images/default-image.jpg`
                                  }}
                                />
                              </div>
                              <label htmlFor={`edit-image-${item.id}`} className="file-upload-wrapper-small">
                                <input
                                  type="file"
                                  multiple
                                  id={`edit-image-${item.id}`}
                                  onChange={handleEditImageChange}
                                  className="form-control-file table-file"
                                  accept="image/*"
                                />
                                <div className="upload-placeholder-small">
                                  <MdCloudUpload className="upload-icon-small" />
                                  <span className="upload-text-small">
                                    {editImageFileNames.length > 0 ? `Selected: ${editImageFileNames.length} file(s)` : "Choose files"}
                                  </span>
                                </div>
                              </label>
                              {editImagePreviews.length > 0 && (
                                <div className="preview-container">
                                  {editImagePreviews.map((preview, idx) => (
                                    <img
                                      key={idx}
                                      src={preview}
                                      alt={`Preview ${idx + 1}`}
                                      className="preview-image"
                                    />
                                  ))}
                                </div>
                              )}
                              {editImageFileNames.length > 0 && (
                                <div className="image-preview">
                                  {editImageFileNames.map((name, idx) => (
                                    <div key={idx} className="selected-file-info-small">
                                      <MdImage className="file-icon-small" />
                                      <span className="file-name-small">{name}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="photo-container">
                              <img
                                src={getImageUrl(item.image)}
                                alt={item.title}
                                className="member-photo"
                                onError={(e) => {
                                  console.log(`Image failed to load for ${item.title}:`, e.target.src)
                                  e.target.src = `${process.env.REACT_APP_BASE_URL}/images/default-image.jpg`
                                }}
                              />
                            </div>
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
                                title="Edit Portfolio"
                              >
                                <MdEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="action-btn delete-btn"
                                title="Delete Portfolio"
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

export default AddPortfolio