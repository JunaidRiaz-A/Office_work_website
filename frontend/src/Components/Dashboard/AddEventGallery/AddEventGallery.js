"use client"

import "./../AddEventGallery/AddEventGallery.css"
import { useState, useEffect } from "react"
import axiosInstance from "../../api/axiosInstance"
import { MdOutlineKeyboardArrowRight, MdDelete, MdImage, MdCloudUpload, MdEdit, MdSave } from "react-icons/md"
import DashboardLayout from "./../DashboardLayout/DashboardLayout"

function AddEventGallery() {
  const [images, setImages] = useState([]) // Changed to single image to match AddTips behavior
  const [editImage, setEditImage] = useState(null)
  const [editImageFileName, setEditImageFileName] = useState("")
  const [eventGallery, setEventGallery] = useState([])
  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState({ message: "", type: "" })
  const [currentPage, setCurrentPage] = useState(1)
  const [editingId, setEditingId] = useState(null)
  const itemsPerPage = 8 // Aligned with typical UI for image galleries

  useEffect(() => {
    fetchEventGallery()
  }, [currentPage])

  const fetchEventGallery = async () => {
    try {
      const response = await axiosInstance.get(`/api/gallery?page=${currentPage}`)
      const { data, current_page, last_page } = response.data
      const sortedGallery = (Array.isArray(data) ? data.map(item => ({
        id: item.id || item._id || Date.now(),
        image_path: item.image_url || item.image_path,
      })) : []).sort((a, b) => b.id - a.id)
      setEventGallery(sortedGallery)
      setCurrentPage(current_page || 1)
    } catch (error) {
      console.error("Error fetching gallery images:", error)
      setEventGallery([])
      showToast("Failed to fetch gallery images!", "error")
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (images.length === 0 && !editImage) newErrors.images = "At least one image is required"
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
      setErrors({})
    } else {
      setImages([])
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
    images.forEach((image) => formData.append("image", image))

    try {
      const response = await axiosInstance.post("/api/gallery", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      const newImage = {
        id: response.data.id || Date.now(),
        image_path: response.data.image_url,
      }
      setEventGallery([newImage, ...eventGallery].sort((a, b) => b.id - a.id))
      setImages([])
      setErrors({})
      setCurrentPage(1)
      showToast("Image uploaded successfully!", "success")
    } catch (error) {
      console.error("Error uploading image:", error.response ? error.response.data : error.message)
      setErrors({ submit: "Failed to upload image. Please check your input or server response." })
      showToast("Failed to upload image!", "error")
    }
  }

  const handleEdit = (item) => {
    setEditingId(item.id)
    setEditImage(null)
    setEditImageFileName("")
  }

  const handleUpdate = async (e, id) => {
    e.preventDefault()

    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      showToast("Please select an image to update!", "error")
      return
    }

    const formData = new FormData()
    formData.append("_method", "PUT")
    if (editImage) formData.append("image", editImage)

    try {
      const response = await axiosInstance.post(`/api/gallery/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      await fetchEventGallery()
      setEditingId(null)
      setEditImage(null)
      setEditImageFileName("")
      showToast("Image updated successfully!", "success")
    } catch (error) {
      console.error("Error updating image:", error)
      setErrors({ submit: "Failed to update image. Please check your input or server response." })
      showToast("Failed to update image!", "error")
    }
  }

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/gallery/${id}`)
      setEventGallery(eventGallery.filter((item) => item.id !== id))
      showToast("Image deleted successfully!", "success")
      if (paginatedGallery.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1)
      }
    } catch (error) {
      console.error("Error deleting image:", error)
      showToast("Failed to delete image!", "error")
    }
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const paginatedGallery = eventGallery.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(eventGallery.length / itemsPerPage)

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
            .edit-photo-container label { display: block; width: 100%; height: 40px; cursor: pointer; }
          `}
        </style>
        {toast.message && (
          <div className={`toast ${toast.type}`}>
            <div className="toast-content">{toast.message}</div>
          </div>
        )}
        
        <div className="row m-0 p-0 justify-content-center">
          <div className="col-lg-10 col-md-10 col-sm-12 col-12">
            <p className="main_heading_blog">Add New Event Gallery</p>

            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-8 col-sm-12 col-12">
                <div className="main_div_add_team_member">
                  <div className="form-header">
                    <MdImage className="form-icon" />
                    <h3 className="form-title">Upload Images</h3>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="form-label"><MdCloudUpload className="label-icon" /> Upload Image</label>
                      <div className="file-upload-wrapper">
                        <input type="file" className="form-control-file" onChange={handleImageChange} accept="image/*" />
                        <div className="upload-placeholder"><MdCloudUpload className="upload-icon" /><span className="upload-text">{images.length > 0 ? `Selected: ${images[0].name}` : "Choose file or drag and drop"}</span></div>
                      </div>
                      {errors.images && <div className="error-message">{errors.images}</div>}
                    </div>

                    {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}

                    <button type="submit" className="add-team-member-btn"><MdImage className="btn-icon" /> Upload Image</button>
                  </form>
                </div>
              </div>
            </div>

            <div className="main_div_table_team_members mt-5">
              <div className="table-header"><h3 className="table-title">Event Gallery</h3><div className="table-count">{eventGallery.length} Images</div></div>
              <div className="table-wrapper">
                <table className="team-table">
                  <thead><tr><th>Sr No</th><th>Image</th><th>Actions</th></tr></thead>
                  <tbody>
                    {paginatedGallery.map((item, index) => (
                      <tr key={item.id}>
                        <td><div className="sr-number">{indexOfFirstItem + index + 1}</div></td>
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
                                    {editImageFileName ? `Selected: ${editImageFileName}` : "Choose file"}
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
                              <img src={item.image_path} alt="Gallery" className="gallery-image-small" onError={(e) => { e.target.src = `${process.env.REACT_APP_BASE_URL}/images/default-image.jpg` }} />
                            </div>
                          )}
                        </td>
                        <td className="action-column">
                          {editingId === item.id ? (
                            <button onClick={(e) => handleUpdate(e, item.id)} className="action-btn save-btn" title="Save Changes"><MdSave /></button>
                          ) : (
                            <div className="action-buttons">
                              <button onClick={() => handleEdit(item)} className="action-btn edit-btn" title="Edit Image"><MdEdit /></button>
                              <button onClick={() => handleDelete(item.id)} className="action-btn delete-btn" title="Delete Image"><MdDelete /></button>
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
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}><button className="page-link arrow" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>«</button></li>
                  {[...Array(totalPages).keys()].map((number) => (
                    <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}><button className="page-link" onClick={() => handlePageChange(number + 1)}>{number + 1}</button></li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}><button className="page-link arrow" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>»</button></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default AddEventGallery