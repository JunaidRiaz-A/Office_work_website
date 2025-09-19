"use client"

import "./../AddTeamMember/AddTeamMember.css"
import { useState, useEffect } from "react"
import axiosInstance from "../../api/axiosInstance"
import {
  MdOutlineKeyboardArrowRight,
  MdEdit,
  MdDelete,
  MdSave,
  MdPersonAdd,
  MdCloudUpload,
  MdPerson,
  MdWork,
  MdImage,
} from "react-icons/md"
import DashboardLayout from "./../DashboardLayout/DashboardLayout"

function AddTeamMember() {
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [customRole, setCustomRole] = useState("")
  const [photo, setPhoto] = useState(null)
  const [photoFileName, setPhotoFileName] = useState("")
  const [teamMembers, setTeamMembers] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState("")
  const [editRole, setEditRole] = useState("")
  const [editCustomRole, setEditCustomRole] = useState("")
  const [editPhoto, setEditPhoto] = useState(null)
  const [editPhotoFileName, setEditPhotoFileName] = useState("")
  const [toast, setToast] = useState({ message: "", type: "" })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axiosInstance.get("/api/team-members")
    
        const sortedMembers = (response.data || []).sort((a, b) => b.id - a.id)
        setTeamMembers(sortedMembers)
      } catch (error) {
        console.error("There was an error fetching the team members!", error)
      }
    }
    fetchTeamMembers()
  }, [])

  const showToast = (message, type) => {
    setToast({ message, type })
    setTimeout(() => setToast({ message: "", type: "" }), 6000)
  }

  const getRoleColor = (role) => {
    const roleColors = {
      CEO: { bg: "#fef3c7", color: "#d97706" },
      CTO: { bg: "#dbeafe", color: "#2563eb" },
      Manager: { bg: "#f3e8ff", color: "#7c3aed" },
      Developer: { bg: "#dcfce7", color: "#16a34a" },
      Designer: { bg: "#fce7f3", color: "#ec4899" },
      Marketing: { bg: "#fff7ed", color: "#ea580c" },
      HR: { bg: "#f0f9ff", color: "#0284c7" },
      Sales: { bg: "#f0fdf4", color: "#15803d" },
      Support: { bg: "#fef2f2", color: "#dc2626" },
      Intern: { bg: "#f8fafc", color: "#64748b" },
      "Senior Developer": { bg: "#ecfdf5", color: "#059669" },
      Lead: { bg: "#fffbeb", color: "#d97706" },
      Analyst: { bg: "#f0f9ff", color: "#0369a1" },
      Consultant: { bg: "#f5f3ff", color: "#8b5cf6" },
    }

    const defaultColor = { bg: "#f1f5f9", color: "#64748b" }

    const exactMatch = roleColors[role]
    if (exactMatch) return exactMatch

    for (const [key, value] of Object.entries(roleColors)) {
      if (role.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(role.toLowerCase())) {
        return value
      }
    }

    return defaultColor
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

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value
    setRole(selectedRole)
    if (selectedRole !== "Other") {
      setCustomRole("")
    }
  }

  const handleEditRoleChange = (e) => {
    const selectedRole = e.target.value
    setEditRole(selectedRole)
    if (selectedRole !== "Other") {
      setEditCustomRole("")
    }
  }

  const getFinalRole = () => {
    return role === "Other" ? customRole : role
  }

  const getFinalEditRole = () => {
    return editRole === "Other" ? editCustomRole : editRole
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const finalRole = getFinalRole()

    if (!finalRole.trim()) {
      showToast("Please enter a role for the team member!", "error")
      return
    }

    const formData = new FormData()
    formData.append("name", name)
    formData.append("role", finalRole)
    if (photo) formData.append("photo", photo)

    try {
      const response = await axiosInstance.post("/api/team-members", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      setTeamMembers([response.data, ...teamMembers].sort((a, b) => b.id - a.id))
      setName("")
      setRole("")
      setCustomRole("")
      setPhoto(null)
      setPhotoFileName("")
      showToast("Team member added successfully!", "success")
      setCurrentPage(1)
    } catch (error) {
      console.error("There was an error adding the team member!", error)
      showToast("Failed to add team member!", "error")
    }
  }

  const handleEdit = (member) => {
    setEditingId(member.id)
    setEditName(member.name)

    const predefinedRoles = [
      "CEO",
      "CTO",
      "Manager",
      "Senior Developer",
      "Developer",
      "Designer",
      "Marketing",
      "HR",
      "Sales",
      "Support",
      "Lead",
      "Analyst",
      "Consultant",
      "Intern",
    ]

    if (predefinedRoles.includes(member.role)) {
      setEditRole(member.role)
      setEditCustomRole("")
    } else {
      setEditRole("Other")
      setEditCustomRole(member.role)
    }

    setEditPhoto(null)
    setEditPhotoFileName("")
  }

  const handleUpdate = async (e, id) => {
    e.preventDefault()
    const finalRole = getFinalEditRole()

    if (!finalRole.trim()) {
      showToast("Please enter a role for the team member!", "error")
      return
    }

    const formData = new FormData()
    formData.append("_method", "PUT")
    formData.append("name", editName)
    formData.append("role", finalRole)
    if (editPhoto) formData.append("photo", editPhoto)
    else formData.append("photo", "")

    try {
      const response = await axiosInstance.post(`/api/team-members/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      setTeamMembers(teamMembers.map((member) => (member.id === id ? response.data : member)).sort((a, b) => b.id - a.id))
      setEditingId(null)
      setEditName("")
      setEditRole("")
      setEditCustomRole("")
      setEditPhoto(null)
      setEditPhotoFileName("")
      showToast("Team member updated successfully!", "success")
    } catch (error) {
      console.error("There was an error updating the team member!", error)
      showToast("Failed to update team member!", "error")
    }
  }

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/team-members/${id}`)
      setTeamMembers(teamMembers.filter((member) => member.id !== id))
      showToast("Team member deleted successfully!", "success")
      if (paginatedTeamMembers.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1)
      }
    } catch (error) {
      console.error("There was an error deleting the team member!", error)
      showToast("Failed to delete team member!", "error")
    }
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const paginatedTeamMembers = teamMembers.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(teamMembers.length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

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
            .selected-file-info-small { display: flex; align-items: center; margin-top: 8px; font-size: 12px; color: #666; }
            .image-preview { display: flex; align-items: center; background-color: #e0f7fa; padding: 5px 10px; border-radius: 4px; margin-top: 8px; }
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
            <p className="main_heading_blog">Add New Team Member</p>
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-8 col-sm-12 col-12">
                <div className="main_div_add_team_member">
                  <div className="form-header">
                    <MdPersonAdd className="form-icon" />
                    <h3 className="form-title">Team Member Details</h3>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="form-label">
                        <MdPerson className="label-icon" />
                        Employee Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter employee name"
                        className="form-control"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <MdWork className="label-icon" />
                        Employee Role
                      </label>
                      <select className="form-control" required value={role} onChange={handleRoleChange}>
                        <option value="">Select employee role</option>
                        <option value="CEO">CEO</option>
                        <option value="CTO">CTO</option>
                        <option value="Manager">Manager</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Developer">Developer</option>
                        <option value="Designer">Designer</option>
                        <option value="Marketing">Marketing</option>
                        <option value="HR">HR</option>
                        <option value="Sales">Sales</option>
                        <option value="Support">Support</option>
                        <option value="Lead">Lead</option>
                        <option value="Analyst">Analyst</option>
                        <option value="Consultant">Consultant</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other (Custom Role)</option>
                      </select>
                      <input
                        type="text"
                        className="form-control mt-2"
                        value={role !== "Other" ? role : customRole}
                        readOnly
                      />
                    </div>

                    {role === "Other" && (
                      <div className="form-group">
                        <label className="form-label">
                          <MdWork className="label-icon" />
                          Custom Role
                        </label>
                        <input
                          type="text"
                          placeholder="Enter custom role"
                          className="form-control custom-role-input"
                          required
                          value={customRole}
                          onChange={(e) => setCustomRole(e.target.value)}
                        />
                      </div>
                    )}

                    <div className="form-group">
                      <label className="form-label">
                        <MdCloudUpload className="label-icon" />
                        Profile Photo
                      </label>
                      <div className="file-upload-wrapper">
                        <input type="file" className="form-control-file" onChange={handlePhotoChange} accept="image/*" />
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
                    </div>

                    <button type="submit" className="add-team-member-btn">
                      <MdPersonAdd className="btn-icon" />
                      Add Team Member
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="main_div_table_team_members mt-5">
              <div className="table-header">
                <h3 className="table-title">Team Members</h3>
                <div className="table-count">{teamMembers.length} Members</div>
              </div>
              <div className="table-wrapper">
                <table className="team-table">
                  <thead>
                    <tr>
                      <th>Sr No</th>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Photo</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedTeamMembers.map((member, index) => (
                      <tr key={member.id}>
                        <td>
                          <div className="sr-number">{indexOfFirstItem + index + 1}</div>
                        </td>
                        <td>
                          {editingId === member.id ? (
                            <input
                              type="text"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="table-input"
                            />
                          ) : (
                            <div className="member-name">{member.name}</div>
                          )}
                        </td>
                        <td>
                          {editingId === member.id ? (
                            <div className="edit-role-container">
                              <select value={editRole} onChange={handleEditRoleChange} className="table-input">
                                <option value="">Select employee role</option>
                                <option value="CEO">CEO</option>
                                <option value="CTO">CTO</option>
                                <option value="Manager">Manager</option>
                                <option value="Senior Developer">Senior Developer</option>
                                <option value="Developer">Developer</option>
                                <option value="Designer">Designer</option>
                                <option value="Marketing">Marketing</option>
                                <option value="HR">HR</option>
                                <option value="Sales">Sales</option>
                                <option value="Support">Support</option>
                                <option value="Lead">Lead</option>
                                <option value="Analyst">Analyst</option>
                                <option value="Consultant">Consultant</option>
                                <option value="Intern">Intern</option>
                                <option value="Other">Other (Custom Role)</option>
                              </select>
                              {editRole === "Other" && (
                                <input
                                  type="text"
                                  placeholder="Enter custom role"
                                  value={editCustomRole}
                                  onChange={(e) => setEditCustomRole(e.target.value)}
                                  className="table-input custom-role-table-input"
                                />
                              )}
                              <div
                                className="member-role"
                                style={{
                                  backgroundColor: getRoleColor(getFinalEditRole()).bg,
                                  color: getRoleColor(getFinalEditRole()).color,
                                }}
                              >
                                {getFinalEditRole() || "Select a role"}
                              </div>
                            </div>
                          ) : (
                            <div
                              className="member-role"
                              style={{
                                backgroundColor: getRoleColor(member.role).bg,
                                color: getRoleColor(member.role).color,
                              }}
                            >
                              {member.role}
                            </div>
                          )}
                        </td>
                        <td>
                          {editingId === member.id ? (
                            <div className="edit-photo-container">
                              <label htmlFor={`edit-photo-${member.id}`} className="file-upload-wrapper-small">
                                <input
                                  type="file"
                                  id={`edit-photo-${member.id}`}
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
                                src={`${process.env.REACT_APP_BASE_URL}/images/${member.photo}`}
                                alt={member.name}
                                className="member-photo"
                                onError={(e) => {
                                  e.target.src = `${process.env.REACT_APP_BASE_URL}/images/default-image.jpg`
                                }}
                              />
                            </div>
                          )}
                        </td>
                        <td className="action-column">
                          {editingId === member.id ? (
                            <button
                              onClick={(e) => handleUpdate(e, member.id)}
                              className="action-btn save-btn"
                              title="Save Changes"
                            >
                              <MdSave />
                            </button>
                          ) : (
                            <div className="action-buttons">
                              <button
                                onClick={() => handleEdit(member)}
                                className="action-btn edit-btn"
                                title="Edit Member"
                              >
                                <MdEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(member.id)}
                                className="action-btn delete-btn"
                                title="Delete Member"
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

export default AddTeamMember