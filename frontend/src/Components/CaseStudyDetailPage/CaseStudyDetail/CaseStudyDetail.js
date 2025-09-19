"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./CaseStudyDetail.css" // Import the CSS file
import { IoIosCall, IoMdArrowDropright } from "react-icons/io"
import axiosInstance from "../../api/axiosInstance" // Keep original axiosInstance import

function CaseStudyDetail() {
  const { id, title } = useParams() // Extract both id and title from URL
  const navigate = useNavigate()
  const [caseStudy, setCaseStudy] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const baseUrl = process.env.REACT_APP_BASE_URL // Keep original baseUrl

  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        const response = await axiosInstance.get(`/api/case-studies/${id}`)
        if (!response.data) throw new Error("Case study not found")
        console.log("Detail API Response:", response.data)
        setCaseStudy(response.data)
      } catch (error) {
        setError("Failed to load case study details. Please try again later.")
        console.error("Error fetching case study:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCaseStudy()
  }, [id, baseUrl])

  // Display loader while fetching data
  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-message">
        {error}
        <button className="btn-back-case-studies" onClick={() => navigate("/case/studies")}>
          <IoMdArrowDropright /> Go back to Case Studies
        </button>
      </div>
    )
  }

  if (!caseStudy) return <div className="case-study-not-found">Case study not found.</div>

  // Normalize image URL
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return `${baseUrl}/images/default-image.jpg`
    return `${baseUrl}${imageUrl.startsWith("/") ? imageUrl : "/" + imageUrl}`
  }

  return (
    <div className="case-study-detail-container">
      <div className="case-study-content-wrapper">
        {/* Main Content Area */}
        <div className="main-content-area">
          <img
            src={getImageUrl(caseStudy.image_url) || "/placeholder.svg"}
            className="main-image fade-in"
            alt={caseStudy.title}
            onError={(e) => {
              console.log(`Image failed to load for ${caseStudy.title}:`, e.target.src)
              e.target.src = `${baseUrl}/images/default-image.jpg`
            }}
          />
          <div className="detail-section fade-in delay-1">
            <p className="title-orange">{caseStudy.title}</p>
            <p className="paragraph-black">{caseStudy.case_explanation}</p>
            <p className="title-orange">{caseStudy.case_heading}</p>
            <p className="paragraph-black">{caseStudy.case_paragraph}</p>
          </div>
          <div className="additional-images-grid">
            <img
              src={getImageUrl(caseStudy.image_url) || "/placeholder.svg"}
              className="additional-image fade-in delay-2"
              alt="Additional Image 1"
              onError={(e) => {
                console.log(`Additional Image 1 failed to load for ${caseStudy.title}:`, e.target.src)
                e.target.src = `${baseUrl}/images/default-image.jpg`
              }}
            />
            <img
              src={getImageUrl(caseStudy.image_url) || "/placeholder.svg"}
              className="additional-image fade-in delay-3"
              alt="Additional Image 2"
              onError={(e) => {
                console.log(`Additional Image 2 failed to load for ${caseStudy.title}:`, e.target.src)
                e.target.src = `${baseUrl}/images/default-image.jpg`
              }}
            />
          </div>
        </div>

        {/* Sidebar Area */}
        <div className="sidebar-area">
          <div className="project-info-card slide-in-right delay-4">
            <p className="project-info-heading">Project Info</p>
            <div className="info-row">
              <p className="info-label">Category:</p>
              <p className="info-value">{caseStudy.category}</p>
            </div>
            <div className="info-row">
              <p className="info-label">Client:</p>
              <p className="info-value">{caseStudy.client}</p>
            </div>
            <div className="info-row">
              <p className="info-label">Location:</p>
              <p className="info-value">{caseStudy.location}</p>
            </div>
            <div className="info-row">
              <p className="info-label">Completed Date:</p>
              <p className="info-value">{caseStudy.completed_date}</p>
            </div>
            <div className="info-row">
              <p className="info-label">Project Value:</p>
              <p className="info-value">{caseStudy.project_value}</p>
            </div>
            <div className="info-row">
              <p className="info-label">Manner:</p>
              <p className="info-value">{caseStudy.manner}</p>
            </div>
            <div className="info-row">
              <p className="info-label">Designer:</p>
              <p className="info-value">{caseStudy.designer}</p>
            </div>
          </div>

          <div className="call-to-action-card slide-in-right delay-5">
            <button className="call-button">
              <IoIosCall />
            </button>
            <p className="call-heading">Have any Questions? Call us Today!</p>
            <p className="call-phone">(123) 222-8888</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaseStudyDetail
