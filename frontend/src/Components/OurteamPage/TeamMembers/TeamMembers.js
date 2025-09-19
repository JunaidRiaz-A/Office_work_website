"use client"

import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import "./../TeamMembers/TeamMembers.css"
import axiosInstance from "../../api/axiosInstance"

function TeamMembers() {
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axiosInstance.get("api/team-members")
        setTeamMembers(response.data)
      } catch (err) {
        setError("Failed to fetch team members")
      } finally {
        setLoading(false)
      }
    }

    fetchTeamMembers()
  }, [])

  // Display loader while fetching data
  if (loading) {
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
    return <p>{error}</p>
  }

  // Split team members into featured (first 3) and regular (rest)
  const featuredMembers = teamMembers.slice(0, 3)
  const regularMembers = teamMembers.slice(3)

  return (
    <div className="main_div_TeamMembers">
      <Helmet>
        <title>Meet the 360synergytech Team | Experts in AI, Cloud & Web Development</title>
        <meta name="description" content="Meet the passionate experts behind 360synergytech, delivering innovative solutions in AI, cloud, and web development." />
        <meta name="keywords" content="360synergytech, AI experts, cloud architects, web development, tech innovators, team" />
        <link rel="canonical" href="https://360synergytech.com/team" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "360synergytech",
              "url": "https://360synergytech.com/team",
              "employee": [
                {
                  "@type": "Person",
                  "name": "Junaid Khan",
                  "jobTitle": "Developer",
                  "sameAs": "https://www.linkedin.com/in/junaidkhan"
                }
              ]
            }
          `}
        </script>
      </Helmet>
     
      <div className="d-flex justify-content-center">
        <div className="hr_line_black" />
      </div>
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <h1 className="new_opening_para">Meet the Experts Powering 360synergytech</h1>
          <div className="spacer"></div> {/* Added spacer for vertical space */}
          <h2 className="new_opening_heading">Skilled Developers, AI Specialists, Cloud Architects & More</h2>
          {/* Featured Team Members (First 3 - Large) */}
          <div className="row p-0 m-0 featured-members" style={{ marginBottom: '20px' }}> {/* Added margin-bottom for space between images */}
            {featuredMembers.map((member) => (
              <div key={member.id} className="col-lg-4 col-md-4 col-sm-12 col-12">
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/images/${member.photo}`}
                  alt={member.name}
                  className="team_member_pic_b"
                />
                <div className="description_team_member_b">
                  <h4 className="name_member_b">{member.name}</h4>
                  <h5 className="desp_member_b">{member.role}</h5>
                </div>
              </div>
            ))}
          </div>

          {/* Regular Team Members (Rest - Small) */}
          {regularMembers.length > 0 && (
            <div className="row p-0 m-0 regular-members" style={{ marginBottom: '20px' }}> {/* Added margin-bottom for space between images */}
              {regularMembers.map((member) => (
                <div key={member.id} className="col-lg-2 col-md-3 col-sm-4 col-6">
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}/images/${member.photo}`}
                    alt={member.name}
                    className="team_member_s_pic"
                  />
                  <div className="description_team_member_s">
                    <h4 className="name_member_s">{member.name}</h4>
                    <h5 className="desp_member_s">{member.role}</h5>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
      </div>
    </div>
  )
}

export default TeamMembers