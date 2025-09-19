"use client"

import "./AddTestimonial.css"
import { useState, useEffect } from "react"
import axiosInstance from "../../api/axiosInstance"
import { MdOutlineKeyboardArrowRight, MdDelete, MdImage, MdCloudUpload, MdEdit, MdSave } from "react-icons/md"
import DashboardLayout from "../DashboardLayout/DashboardLayout"

function AddTestimonial() {
  const [author, setAuthor] = useState("")
  const [text, setText] = useState("")
  const [photo, setPhoto] = useState(null)
  const [photoFileName, setPhotoFileName] = useState("")
  const [authorRole, setAuthorRole] = useState("")
  const [testimonials, setTestimonials] = useState([])
  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState({ message: "", type: "" })
  const [editingId, setEditingId] = useState(null)
  const [editAuthor, setEditAuthor] = useState("")
  const [editText, setEditText] = useState("")
  const [editPhoto, setEditPhoto] = useState(null)
  const [editPhotoFileName, setEditPhotoFileName] = useState("")
  const [editAuthorRole, setEditAuthorRole] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const getImageUrl = (imageUrl) => {
    const baseUrl = process.env.REACT_APP_BASE_URL
    if (!imageUrl) return `${baseUrl}/images/default-image.jpg`
    return `${baseUrl}${imageUrl.startsWith("/") ? imageUrl : "/" + imageUrl}`
  }

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axiosInstance.get("/api/testimonials")
        const sortedTestimonials = (response.data || []).sort((a, b) => b.id - a.id)
        setTestimonials(sortedTestimonials.map(item => ({
          id: item.id || item._id,
          author_name: item.author_name,
          text: item.text,
          image: item.image,
          author_role: item.author_role,
          updated_at: item.updated_at,
          created_at: item.created_at
        })))
      } catch (error) {
        console.error("There was an error fetching the testimonials!", error)
      }
    }
    fetchTestimonials()
  }, [])

  const validateForm = () => {
    const newErrors = {}
    if (!author) newErrors.author = "Author is required"
    if (!text) newErrors.text = "Text is required"
    if (!photo) newErrors.photo = "Photo is required"
    if (author.length > 100) newErrors.author = "Author name must not exceed 100 characters"
    if (authorRole && authorRole.length > 100) newErrors.authorRole = "Author role must not exceed 100 characters"
    const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length
    if (wordCount < 1 || wordCount > 70) newErrors.text = "Text must be between 1 and 70 words"
    return newErrors
  }

  const validateEditForm = () => {
    const newErrors = {}
    if (!editAuthor) newErrors.editAuthor = "Author is required"
    if (!editText) newErrors.editText = "Text is required"
    if (editAuthor.length > 150) newErrors.editAuthor = "Author name must not exceed 150 characters"
    if (editAuthorRole && editAuthorRole.length > 150) newErrors.editAuthorRole = "Author role must not exceed 150 characters"
    const wordCount = editText.trim().split(/\s+/).filter(word => word.length > 0).length
    if (wordCount < 1 || wordCount > 70) newErrors.editText = "Text must be between 1 and 70 words"
    return newErrors
  }

  const showToast = (message, type) => {
    setToast({ message, type })
    setTimeout(() => setToast({ message: "", type: "" }), 6000)
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPhoto(file)
      setPhotoFileName(file.name)
    } else {
      setPhoto(null)
      setPhotoFileName("")
    }
  }

  const handleEditPhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setEditPhoto(file)
      setEditPhotoFileName(file.name)
    } else {
      setEditPhoto(null)
      setEditPhotoFileName("")
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
    formData.append("author", author)
    formData.append("text", text)
    if (photo) formData.append("photo", photo)
    formData.append("author_role", authorRole)

    try {
      const response = await axiosInstance.post("/api/testimonials", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      const newTestimonial = {
        id: response.data.id || Date.now(),
        author_name: author,
        text: text,
        image: response.data.image || `/images/${photo.name}`,
        author_role: authorRole,
        updated_at: response.data.updated_at,
        created_at: response.data.created_at
      }
      setTestimonials([newTestimonial, ...testimonials].sort((a, b) => b.id - a.id))
      setAuthor("")
      setText("")
      setPhoto(null)
      setPhotoFileName("")
      setAuthorRole("")
      setErrors({})
      showToast("Testimonial added successfully!", "success")
      setCurrentPage(1)
    } catch (error) {
      console.error("There was an error adding the testimonial!", error.response ? error.response.data : error.message)
      setErrors({ submit: "Failed to add testimonial. Please check your input or server response." })
      showToast("Failed to add testimonial!", "error")
    }
  }

  const handleEdit = (item) => {
    setEditingId(item.id)
    setEditAuthor(item.author_name)
    setEditText(item.text)
    setEditAuthorRole(item.author_role)
    setEditPhoto(null)
    setEditPhotoFileName("")
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
    formData.append("author", editAuthor)
    formData.append("text", editText)
    if (editPhoto) formData.append("photo", editPhoto)
    else formData.append("photo", "")
    formData.append("author_role", editAuthorRole)

    try {
      const response = await axiosInstance.post(`/api/testimonials/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      const updatedTestimonial = {
        id: response.data.id || id,
        author_name: response.data.author_name || editAuthor,
        text: response.data.text || editText,
        image: response.data.image || testimonials.find(item => item.id === id).image,
        author_role: response.data.author_role || editAuthorRole,
        updated_at: response.data.updated_at,
        created_at: response.data.created_at
      }
      setTestimonials(testimonials.map((item) => (item.id === id ? updatedTestimonial : item)).sort((a, b) => b.id - a.id))
      setEditingId(null)
      setEditAuthor("")
      setEditText("")
      setEditPhoto(null)
      setEditPhotoFileName("")
      setEditAuthorRole("")
      setErrors({})
      showToast("Testimonial updated successfully!", "success")
    } catch (error) {
      console.error("There was an error updating the testimonial!", error)
      setErrors({ submit: "Failed to update testimonial. Please check your input or server response." })
      showToast("Failed to update testimonial!", "error")
    }
  }

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/testimonials/${id}`)
      setTestimonials(testimonials.filter((item) => item.id !== id).sort((a, b) => b.id - a.id))
      showToast("Testimonial deleted successfully!", "success")
      if (paginatedTestimonials.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1)
      }
    } catch (error) {
      console.error("There was an error deleting the testimonial!", error)
      showToast("Failed to delete testimonial!", "error")
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
  const paginatedTestimonials = testimonials.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(testimonials.length / itemsPerPage)

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
            .selected-file-info-small { display: flex; align-items: center; margin-top: 5px; }
            .file-icon-small { margin-right: 5px; }
            .file-name-small { font-size: 12px; color: #666; }
            .edit-photo-container { position: relative; z-index: 1; }
            .file-upload-wrapper-small { position: relative; overflow: visible; }
            .form-control-file.table-file { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; z-index: 2; }
            .upload-placeholder-small { display: flex; align-items: center; padding: 5px 10px; background: #f5f5f5; border: 1px dashed #ccc; border-radius: 4px; cursor: pointer; }
            .upload-icon-small { margin-right: 5px; }
            .upload-text-small { color: #666; }
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
            <p className="main_heading_blog">Add New Testimonial</p>

            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-10 col-sm-12 col-12">
                <div className="main_div_add_category">
                  <div className="form-header">
                    <h3 className="form-title">Testimonial Details</h3>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Author<span className="required-asterisk">*</span></label>
                        <input
                          type="text"
                          placeholder="Enter author name"
                          className={`input_add_category ${errors.author ? "error" : ""}`}
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
                        />
                        {errors.author && <div className="error-message">{errors.author}</div>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">Author Role</label>
                        <input
                          type="text"
                          placeholder="Enter author role"
                          className={`input_add_category ${errors.authorRole ? "error" : ""}`}
                          value={authorRole}
                          onChange={(e) => setAuthorRole(e.target.value)}
                        />
                        {errors.authorRole && <div className="error-message">{errors.authorRole}</div>}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Description<span className="required-asterisk">*</span></label>
                      <textarea
                        placeholder="Enter testimonial text"
                        className={`input_add_category textarea ${errors.text ? "error" : ""}`}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows="4"
                      />
                      {errors.text && <div className="error-message">{errors.text}</div>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <MdCloudUpload className="label-icon" /> Upload Photo<span className="required-asterisk">*</span>
                      </label>
                      <div className="file-upload-wrapper">
                        <input
                          type="file"
                          className="form-control-file"
                          onChange={handlePhotoChange}
                          accept="image/*"
                        />
                        <div className="upload-placeholder">
                          <MdCloudUpload className="upload-icon" />
                          <span className="upload-text">
                            {photoFileName ? `Selected: ${photoFileName}` : "Choose file or drag and drop"}
                          </span>
                        </div>
                      </div>
                      {photoFileName && (
                        <div className="selected-file-info">
                          <MdImage className="file-icon" />
                          <span className="file-name">{photoFileName}</span>
                        </div>
                      )}
                      {errors.photo && <div className="error-message">{errors.photo}</div>}
                    </div>

                    {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}

                    <button className="Add_Category_button" type="submit">
                      <MdImage className="btn-icon" /> Add Testimonial
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="main_div_table_job_show mt-5">
              <div className="table-header">
                <h3 className="table-title">Testimonials</h3>
                <div className="table-count">{testimonials.length} Testimonials</div>
              </div>
              <div className="table-wrapper">
                <table className="job-table">
                  <thead>
                    <tr>
                      <th>Sr No</th>
                      <th>Author</th>
                      <th>Description</th>
                      <th>Role</th>
                      <th>Image</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedTestimonials.map((item, index) => (
                      <tr key={item.id}>
                        <td>{indexOfFirstItem + index + 1}</td>
                        <td>
                          {editingId === item.id ? (
                            <div className="form-group">
                              <label className="form-label">Author<span className="required-asterisk">*</span></label>
                              <input
                                type="text"
                                value={editAuthor}
                                onChange={(e) => setEditAuthor(e.target.value)}
                                className={`table-input ${errors.editAuthor ? "error" : ""}`}
                              />
                              {errors.editAuthor && <div className="error-message">{errors.editAuthor}</div>}
                            </div>
                          ) : (
                            <div className="job-title">{item.author_name}</div>
                          )}
                        </td>
                        <td>
                          {editingId === item.id ? (
                            <div className="form-group">
                              <label className="form-label">Description<span className="required-asterisk">*</span></label>
                              <textarea
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className={`table-input textarea ${errors.editText ? "error" : ""}`}
                                rows="2"
                              />
                              {errors.editText && <div className="error-message">{errors.editText}</div>}
                            </div>
                          ) : (
                            <div className="job-title">{truncateText(item.text)}</div>
                          )}
                        </td>
                        <td>
                          {editingId === item.id ? (
                            <div className="form-group">
                              <label className="form-label">Author Role</label>
                              <input
                                type="text"
                                value={editAuthorRole}
                                onChange={(e) => setEditAuthorRole(e.target.value)}
                                className={`table-input ${errors.editAuthorRole ? "error" : ""}`}
                              />
                              {errors.editAuthorRole && <div className="error-message">{errors.editAuthorRole}</div>}
                            </div>
                          ) : (
                            <div className="job-category">{item.author_role}</div>
                          )}
                        </td>
                        <td>
                          {editingId === item.id ? (
                            <div className="edit-photo-container">
                              <div className="photo-container">
                                <img
                                  src={getImageUrl(item.image)}
                                  alt={item.author_name}
                                  className="member-photo"
                                  onError={(e) => {
                                    e.target.src = `${process.env.REACT_APP_BASE_URL}/images/default-image.jpg`
                                  }}
                                />
                              </div>
                              <label htmlFor={`edit-photo-${item.id}`} className="file-upload-wrapper-small">
                                <input
                                  type="file"
                                  id={`edit-photo-${item.id}`}
                                  onChange={handleEditPhotoChange}
                                  className="form-control-file table-file"
                                  accept="image/*"
                                />
                                <div className="upload-placeholder-small">
                                  <MdCloudUpload className="upload-icon-small" />
                                  <span className="upload-text-small">
                                    {editPhotoFileName ? `Selected: ${editPhotoFileName}` : "Choose file"}
                                  </span>
                                </div>
                              </label>
                              {editPhotoFileName && (
                                <div className="selected-file-info-small">
                                  <MdImage className="file-icon-small" />
                                  <span className="file-name-small">{editPhotoFileName}</span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="photo-container">
                              <img
                                src={getImageUrl(item.image)}
                                alt={item.author_name}
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
                                title="Edit Testimonial"
                              >
                                <MdEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="action-btn delete-btn"
                                title="Delete Testimonial"
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

export default AddTestimonial