"use client"

import "./AddTips.css"
import { useState, useEffect } from "react"
import axiosInstance from "../../api/axiosInstance"
import { MdOutlineKeyboardArrowRight, MdDelete, MdImage, MdCloudUpload, MdEdit, MdSave } from "react-icons/md"
import DashboardLayout from "../DashboardLayout/DashboardLayout"

function AddTips() {
  const [serviceName, setServiceName] = useState("")
  const [postedName, setPostedName] = useState("")
  const [postedDate, setPostedDate] = useState("")
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const [image, setImage] = useState(null)
  const [imageFileName, setImageFileName] = useState("")
  const [tips, setTips] = useState([])
  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState({ message: "", type: "" })
  const [editingId, setEditingId] = useState(null)
  const [editServiceName, setEditServiceName] = useState("")
  const [editPostedName, setEditPostedName] = useState("")
  const [editPostedDate, setEditPostedDate] = useState("")
  const [editTitle, setEditTitle] = useState("")
  const [editText, setEditText] = useState("")
  const [editImage, setEditImage] = useState(null)
  const [editImageFileName, setEditImageFileName] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const getImageUrl = (imageUrl) => {
    const baseUrl = process.env.REACT_APP_BASE_URL
    if (!imageUrl) return `${baseUrl}/images/default-image.jpg`
    return `${baseUrl}${imageUrl.startsWith("/") ? imageUrl : "/" + imageUrl}`
  }

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await axiosInstance.get("/api/tips")
        const sortedTips = (response.data || []).sort((a, b) => b.id - a.id)
        setTips(sortedTips.map(item => ({
          id: item.id || item._id,
          service_name: item.service_name,
          posted_name: item.posted_name,
          posted_date: item.posted_date,
          title: item.title,
          text: item.text,
          image: item.image
        })))
      } catch (error) {
        console.error("There was an error fetching the tips!", error)
      }
    }
    fetchTips()
  }, [])

  const validateForm = () => {
    const newErrors = {}
    if (!serviceName) {
      newErrors.serviceName = "Service Name is required"
    } else if (serviceName.length < 1 || serviceName.length > 150) {
      newErrors.serviceName = "Service Name must be 1 to 150 characters"
    }
    if (!postedName) {
      newErrors.postedName = "Posted Name is required"
    } else if (postedName.length < 1 || postedName.length > 150) {
      newErrors.postedName = "Posted Name must be 1 to 150 characters"
    }
    if (!postedDate) {
      newErrors.postedDate = "Posted Date is required"
    }
    if (!title) {
      newErrors.title = "Title is required"
    } else if (title.length < 1 || title.length > 150) {
      newErrors.title = "Title must be 1 to 150 characters"
    }
    if (!text) {
      newErrors.text = "Description is required"
    } else if (text.length < 1) {
      newErrors.text = "Description must be at least 1 character"
    }
    if (!image) {
      newErrors.image = "Image is required"
    }
    return newErrors
  }

  const validateEditForm = () => {
    const newErrors = {}
    if (!editServiceName) {
      newErrors.editServiceName = "Service Name is required"
    } else if (editServiceName.length < 1 || editServiceName.length > 150) {
      newErrors.editServiceName = "Service Name must be 1 to 150 characters"
    }
    if (!editPostedName) {
      newErrors.editPostedName = "Posted Name is required"
    } else if (editPostedName.length < 1 || editPostedName.length > 150) {
      newErrors.editPostedName = "Posted Name must be 1 to 150 characters"
    }
    if (!editPostedDate) {
      newErrors.editPostedDate = "Posted Date is required"
    }
    if (!editTitle) {
      newErrors.editTitle = "Title is required"
    } else if (editTitle.length < 1 || editTitle.length > 150) {
      newErrors.editTitle = "Title must be 1 to 150 characters"
    }
    if (!editText) {
      newErrors.editText = "Description is required"
    } else if (editText.length < 1) {
      newErrors.editText = "Description must be at least 1 character"
    }
    return newErrors
  }

  const showToast = (message, type) => {
    setToast({ message, type })
    setTimeout(() => setToast({ message: "", type: "" }), 6000)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setImageFileName(file.name)
    } else {
      setImage(null)
      setImageFileName("")
    }
  }

  const handleEditImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setEditImage(file)
      setEditImageFileName(file.name)
    } else {
      setEditImage(null)
      setEditImageFileName("")
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
    formData.append("service_name", serviceName)
    formData.append("posted_name", postedName)
    formData.append("posted_date", postedDate)
    formData.append("title", title)
    formData.append("text", text)
    if (image) formData.append("image", image)

    try {
      const response = await axiosInstance.post("/api/tips", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      const newTip = {
        id: response.data.id || Date.now(),
        service_name: serviceName,
        posted_name: postedName,
        posted_date: postedDate,
        title: title,
        text: text,
        image: response.data.image || `/images/${image.name}`,
      }
      setTips([newTip, ...tips].sort((a, b) => b.id - a.id))
      setServiceName("")
      setPostedName("")
      setPostedDate("")
      setTitle("")
      setText("")
      setImage(null)
      setImageFileName("")
      setErrors({})
      showToast("Tip added successfully!", "success")
      setCurrentPage(1)
    } catch (error) {
      console.error("There was an error adding the tip!", error.response ? error.response.data : error.message)
      setErrors({ submit: "Failed to add tip. Please check your input or server response." })
      showToast("Failed to add tip!", "error")
    }
  }

  const handleEdit = (item) => {
    setEditingId(item.id)
    setEditServiceName(item.service_name)
    setEditPostedName(item.posted_name)
    setEditPostedDate(item.posted_date)
    setEditTitle(item.title)
    setEditText(item.text)
    setEditImage(null)
    setEditImageFileName("")
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
    formData.append("service_name", editServiceName)
    formData.append("posted_name", editPostedName)
    formData.append("posted_date", editPostedDate)
    formData.append("title", editTitle)
    formData.append("text", editText)
    if (editImage) formData.append("image", editImage)
    else formData.append("image", "")

    try {
      const response = await axiosInstance.post(`/api/tips/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      const updatedTip = {
        id: response.data.id || id,
        service_name: response.data.service_name || editServiceName,
        posted_name: response.data.posted_name || editPostedName,
        posted_date: response.data.posted_date || editPostedDate,
        title: response.data.title || editTitle,
        text: response.data.text || editText,
        image: response.data.image || tips.find(item => item.id === id).image,
      }
      setTips(tips.map((item) => (item.id === id ? updatedTip : item)).sort((a, b) => b.id - a.id))
      setEditingId(null)
      setEditServiceName("")
      setEditPostedName("")
      setEditPostedDate("")
      setEditTitle("")
      setEditText("")
      setEditImage(null)
      setEditImageFileName("")
      setErrors({})
      showToast("Tip updated successfully!", "success")
    } catch (error) {
      console.error("There was an error updating the tip!", error)
      setErrors({ submit: "Failed to update tip. Please check your input or server response." })
      showToast("Failed to update tip!", "error")
    }
  }

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/tips/${id}`)
      setTips(tips.filter((item) => item.id !== id).sort((a, b) => b.id - a.id))
      showToast("Tip deleted successfully!", "success")
      if (paginatedTips.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1)
      }
    } catch (error) {
      console.error("There was an error deleting the tip!", error)
      showToast("Failed to delete tip!", "error")
    }
  }

  const truncateText = (text) => {
    const words = text.split(" ")
    if (words.length > 5) {
      return words.slice(0, 5).join(" ") + "..."
    }
    return text
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const paginatedTips = tips.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(tips.length / itemsPerPage)

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
            .selected-file-info { display: flex; align-items: center; margin-top: 8px; font-size: 12px; color: #666; }
            .image-preview { display: flex; align-items: center; background-color: #e0f7fa; padding: 5px 10px; border-radius: 4px; margin-top: 8px; }
            .image-preview .file-icon-small { color: #00796b; }
            .image-preview .file-name-small { color: #00796b; }
            .file-icon { margin-right: 4px; font-size: 16px; }
            .file-icon-small { margin-right: 4px; font-size: 16px; }
            .file-name { font-size: 12px; }
            .file-name-small { font-size: 12px; }
            .edit-photo-container { position: relative; z-index: 1; }
            .edit-photo-container label { display: block; width: 100%; height: 40px; cursor: auto; }
            .required-icon { color: #ff0000; margin-left: 4px; }
          `}
        </style>
        {toast.message && (
          <div className={`toast ${toast.type}`}>
            <div className="toast-content">{toast.message}</div>
          </div>
        )}
        
        <div className="row m-0 p-0 justify-content-center">
          <div className="col-lg-10 col-md-10 col-sm-12 col-12">
            <p className="main_heading_blog">Add New Tip</p>

            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-10 col-sm-12 col-12">
                <div className="main_div_add_category">
                  <div className="form-header">
                    <h3 className="form-title">Tip Details</h3>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Service Name<span className="required-icon">*</span></label>
                        <input
                          type="text"
                          placeholder="Enter service name"
                          className={`input_add_category ${errors.serviceName ? "error" : ""}`}
                          value={serviceName}
                          onChange={(e) => setServiceName(e.target.value)}
                        />
                        {errors.serviceName && <div className="error-message">{errors.serviceName}</div>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">Posted Name<span className="required-icon">*</span></label>
                        <input
                          type="text"
                          placeholder="Enter posted name"
                          className={`input_add_category ${errors.postedName ? "error" : ""}`}
                          value={postedName}
                          onChange={(e) => setPostedName(e.target.value)}
                        />
                        {errors.postedName && <div className="error-message">{errors.postedName}</div>}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Posted Date<span className="required-icon">*</span></label>
                        <input
                          type="date"
                          className={`input_add_category ${errors.postedDate ? "error" : ""}`}
                          value={postedDate}
                          onChange={(e) => setPostedDate(e.target.value)}
                        />
                        {errors.postedDate && <div className="error-message">{errors.postedDate}</div>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">Title<span className="required-icon">*</span></label>
                        <input
                          type="text"
                          placeholder="Enter tip title"
                          className={`input_add_category ${errors.title ? "error" : ""}`}
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        {errors.title && <div className="error-message">{errors.title}</div>}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Description<span className="required-icon">*</span></label>
                      <textarea
                        placeholder="Enter tip description"
                        className={`input_add_category textarea ${errors.text ? "error" : ""}`}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows="5"
                      />
                      {errors.text && <div className="error-message">{errors.text}</div>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <MdCloudUpload className="label-icon" /> Upload Image<span className="required-icon">*</span>
                      </label>
                      <div className="file-upload-wrapper">
                        <input
                          type="file"
                          className="form-control-file"
                          onChange={handleImageChange}
                          accept="image/*"
                        />
                        <div className="upload-placeholder">
                          <MdCloudUpload className="upload-icon" />
                          <span className="upload-text">
                            {imageFileName ? `Selected: ${imageFileName}` : "Choose file or drag and drop"}
                          </span>
                        </div>
                      </div>
                      {imageFileName && (
                        <div className="selected-file-info">
                          <MdImage className="file-icon" />
                          <span className="file-name">{imageFileName}</span>
                        </div>
                      )}
                      {errors.image && <div className="error-message">{errors.image}</div>}
                    </div>

                    {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}

                    <button className="Add_Category_button" type="submit">
                      <MdImage className="btn-icon" /> Add Tip
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="main_div_table_job_show mt-5">
              <div className="table-header">
                <h3 className="table-title">Tips</h3>
                <div className="table-count">{tips.length} Tips</div>
              </div>
              <div className="table-wrapper">
                <table className="job-table">
                  <thead>
                    <tr>
                      <th>Sr No</th>
                      <th>Title</th>
                      <th>Posted Name</th>
                      <th>Service Name</th>
                      <th>Description</th>
                      <th>Image</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedTips.map((item, index) => (
                      <tr key={item.id}>
                        <td>{indexOfFirstItem + index + 1}</td>
                        <td>
                          {editingId === item.id ? (
                            <div className="form-group">
                              <label className="form-label">Title<span className="required-icon">*</span></label>
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
                              <label className="form-label">Posted Name<span className="required-icon">*</span></label>
                              <input
                                type="text"
                                value={editPostedName}
                                onChange={(e) => setEditPostedName(e.target.value)}
                                className={`table-input ${errors.editPostedName ? "error" : ""}`}
                              />
                              {errors.editPostedName && <div className="error-message">{errors.editPostedName}</div>}
                            </div>
                          ) : (
                            <div className="job-client">{item.posted_name}</div>
                          )}
                        </td>
                        <td>
                          {editingId === item.id ? (
                            <div className="form-group">
                              <label className="form-label">Service Name<span className="required-icon">*</span></label>
                              <input
                                type="text"
                                value={editServiceName}
                                onChange={(e) => setEditServiceName(e.target.value)}
                                className={`table-input ${errors.editServiceName ? "error" : ""}`}
                              />
                              {errors.editServiceName && <div className="error-message">{errors.editServiceName}</div>}
                            </div>
                          ) : (
                            <div className="job-category">{item.service_name}</div>
                          )}
                        </td>
                        <td>
                          {editingId === item.id ? (
                            <div className="form-group">
                              <label className="form-label">Description<span className="required-icon">*</span></label>
                              <textarea
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className={`table-input textarea ${errors.editText ? "error" : ""}`}
                                rows="2"
                              />
                              {errors.editText && <div className="error-message">{errors.editText}</div>}
                            </div>
                          ) : (
                            <div className="job-description">{truncateText(item.text)}</div>
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
                                    e.target.src = `${process.env.REACT_APP_BASE_URL}/images/default-image.jpg`
                                  }}
                                />
                              </div>
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
                                    {editImageFileName ? "Image Selected" : "Choose file"}
                                  </span>
                                </div>
                              </label>
                              {editImageFileName && (
                                <div className="image-preview">
                                  <MdImage className="file-icon-small" />
                                  <span className="file-name-small">{editImageFileName}</span>
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
                                title="Edit Tip"
                              >
                                <MdEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="action-btn delete-btn"
                                title="Delete Tip"
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

export default AddTips