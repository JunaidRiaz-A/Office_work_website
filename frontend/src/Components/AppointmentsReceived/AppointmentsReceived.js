"use client"

import "./AppointmentsReceived.css"
import { useState, useEffect } from "react"
import axiosInstance from "../api/axiosInstance"
import { MdOutlineKeyboardArrowRight, MdCheckCircle, MdRefresh } from "react-icons/md"
import DashboardLayout from "../../Components/Dashboard/DashboardLayout/DashboardLayout"

function AppointmentsReceived() {
  const [appointments, setAppointments] = useState([])
  const [toast, setToast] = useState({ message: "", type: "", showRetry: false })
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const itemsPerPage = 10

  useEffect(() => {
    fetchAppointments()
  }, [currentPage]) // Add currentPage to dependencies for pagination

  const fetchAppointments = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(`/api/appointments?page=${currentPage}`)
      const { data: appointmentsData } = response.data // Extract the data array from the paginated response
      setAppointments(appointmentsData.map(item => ({
        id: item.id,
        name: item.name,
        email: item.email,
        phone_number: item.phone_number,
        date_selected: item.date_selected,
        check: item.check || false // Use check from API response
      })))
    } catch (error) {
      console.error("Error fetching appointments:", error)
      setToast({ message: "Failed to fetch appointments. Click to retry.", type: "error", showRetry: true })
    } finally {
      setLoading(false)
    }
  }

  const showToast = (message, type, showRetry = false) => {
    setToast({ message, type, showRetry })
    setTimeout(() => setToast(prev => ({ ...prev, message: "", showRetry: false })), 6000)
  }

  const handleMarkAsRead = async (id) => {
    try {
      await axiosInstance.put(`/api/appointments/${id}`, { check: true }) // Use check instead of is_read
      setAppointments(appointments.map(item => 
        item.id === id ? { ...item, check: true } : item 
      ))
      showToast("Appointment marked as read!", "success")
    } catch (error) {
      console.error("Error marking as read:", error)
      showToast("Failed to mark as read!", "error")
    }
  }

  const handleRetry = () => {
    setToast({ message: "", type: "", showRetry: false })
    fetchAppointments()
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const paginatedAppointments = appointments.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(appointments.length / itemsPerPage) // This will need API total pages later for accuracy

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <DashboardLayout>
      <div>
        <style>
          {`
            .main_div_table_job_show { margin-top: 30px; position: relative; }
            .table-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; color: #f7f5f5; }
            .table-title { font-size: 1.5rem; font-weight: 600; color: #f7f5f5; }
            .table-count { font-size: 14px; color: #f7f5f5; }
            .table-wrapper { overflow-x: auto; }
            .job-table { width: 100%; border-collapse: collapse; color: ;}
            .job-table th, .job-table td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
            .job-table th { background-color: #f5f5f5; font-weight: 600; color: #f7f5f5; }
            .action-btn { background: none; border: none; cursor: pointer; margin-right: 10px; font-size: 18px; }
            .read-btn { color: #dc3545; }
            .read-btn.read { color: #28a745; }
            .read-btn:hover { opacity: 0.8; }
            .toast { position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background: #ff4444; color: #fff; padding: 10px 20px; border-radius: 5px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); z-index: 1000; display: flex; justify-content: space-between; align-items: center; max-width: 400px; width: 90%; }
            .toast.success { background: #28a745; }
            .toast-content { margin: 0; font-size: 14px; }
            .toast .retry-btn { background: none; border: none; color: #fff; font-size: 16px; cursor: pointer; padding-left: 10px; }
            .loading { text-align: center; font-size: 16px; color: #666; padding: 20px; }
            .pagination-container { display: flex; justify-content: center; margin: 20px 0; }
            .pagination { display: flex; list-style: none; padding: 0; gap: 8px; }
            .page-item { display: flex; align-items: center; }
            .page-link { padding: 8px 12px; border: 1px solid #e0e0e0; border-radius: 4px; color: #333; background-color: #fff; text-decoration: none; font-size: 14px; cursor: pointer; transition: all 0.3s ease; }
            .page-link:hover { background-color: #f5f5f5; border-color: #ccc; }
            .page-item.active .page-link { background-color: #ff6200; color: #fff; border-color: #ff6200; }
            .page-item.disabled .page-link { color: #ccc; cursor: not-allowed; border-color: #e0e0e0; background-color: #f9f9f9; }
            .page-link.arrow { font-size: 16px; padding: 8px 10px; }
          `}
        </style>
        {toast.message && (
          <div className={`toast ${toast.type === "success" ? "success" : ""}`}>
            <div className="toast-content">{toast.message}</div>
            {toast.showRetry && (
              <button onClick={handleRetry} className="retry-btn">
                <MdRefresh />
              </button>
            )}
          </div>
        )}
        
        {loading ? (
          <div className="loading">Loading appointments...</div>
        ) : (
          <div className="main_div_table_job_show">
            <div className="table-header">
              <h3 className="table-title">Appointments Received</h3>
              <div className="table-count">{appointments.length} Appointments</div>
            </div>
            <div className="table-wrapper">
              <table className="job-table">
                <thead>
                  <tr>
                    <th>Sr No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Date Selected</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedAppointments.map((item, index) => (
                    <tr key={item.id}>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone_number}</td>
                      <td>{new Date(item.date_selected).toLocaleDateString()}</td>
                      <td className="action-column">
                        <button
                          onClick={() => handleMarkAsRead(item.id)}
                          className={`action-btn read-btn ${item.check ? 'read' : ''}`} // Use check instead of isRead
                          title={item.check ? "Marked as Read" : "Mark as Read"}
                        >
                          <MdCheckCircle />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {appointments.length > 0 && (
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
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default AppointmentsReceived