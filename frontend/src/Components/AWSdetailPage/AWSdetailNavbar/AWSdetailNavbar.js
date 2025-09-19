import React from 'react'
import "./../AWSdetailNavbar/AWSdetailNavbar.css"
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
function AWSdetailNavbar() {
  return (
    <div className="main_div_awsnavbar">
    <p className="Heading_aws_navbar">AWS Development Services & Solutions</p>
    <div className="d-flex justify-content-center">
      <>
        <p className="para_aws_navbar_white">Home </p>
        <p className="para_aws_navbar_white">
          <MdOutlineKeyboardArrowRight />
        </p>
        <p className="para_aws_navbar_orange">AWS </p>
      </>
    </div>
  </div>
  )
}

export default AWSdetailNavbar
