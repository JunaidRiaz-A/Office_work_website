import React from "react";
import { Helmet } from "react-helmet";
// import "./../ProductDesignSolution/ProductDesignSolution.css";

function ProductDesignSolution({ scrollToAppointment }) {
  return (
    <div className="main_div_work_speaks">
      <Helmet>
        <title>Transform Your Ideas into Market-Ready Products | 360synergytech Product & Design</title>
        <meta name="description" content="Turn your ideas into market-ready solutions with 360synergytech. We offer meticulous planning and cutting-edge design services." />
        <meta name="keywords" content="product design, UI/UX design, market-ready solutions, 360synergytech, innovative design" />
        <link rel="canonical" href="https://360synergytech.com/product-design" />
      </Helmet>
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="row m-0 p-0">
            <div className="col-lg-10 col-md-9 col-sm-9 col-8">
              <p className="heading_work_speaks">
                Product & Design solutions for bringing your ideas to life
              </p>
              <p className="heading_work_speaks_para">
                At 360synergytech, we transform your ideas into market-ready solutions through meticulous planning, innovative design, and cutting-edge technology. Whether you need UI/UX design, prototyping, or product development, we have got you covered.
              </p>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-3 col-4">
              <div className="d-flex justify-content-end">
                <button
                  className="btn_lets_talk"
                  onClick={scrollToAppointment}
                >
                  Talk to an Expert
                </button>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '100px' }}></div>
          <div className="blue_div_KeyMatrics" style={{ borderRadius: '15px', backgroundColor: '#051d71', padding: '30px 20px', color: 'white', textAlign: 'center', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <p style={{ fontFamily: '"Poppins", sans-serif', fontSize: '24px', fontWeight: '700', lineHeight: '32px', marginBottom: '20px' }}>
              Crafting innovative designs with impactful solutions
            </p>
            <div className="row m-0 p-2">
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <p style={{ fontFamily: '"Poppins", sans-serif', fontSize: '48px', fontWeight: '700', marginBottom: '5px', color: '#e0e0ff' }}>45%</p>
                <p style={{ fontFamily: '"Poppins", sans-serif', fontSize: '16px', fontWeight: '500', lineHeight: '20px' }}>Faster design-to-market</p>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <p style={{ fontFamily: '"Poppins", sans-serif', fontSize: '48px', fontWeight: '700', marginBottom: '5px', color: '#e0e0ff' }}>1.5X</p>
                <p style={{ fontFamily: '"Poppins", sans-serif', fontSize: '16px', fontWeight: '500', lineHeight: '20px' }}>Increased user satisfaction</p>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <p style={{ fontFamily: '"Poppins", sans-serif', fontSize: '48px', fontWeight: '700', marginBottom: '5px', color: '#e0e0ff' }}>95%</p>
                <p style={{ fontFamily: '"Poppins", sans-serif', fontSize: '16px', fontWeight: '500', lineHeight: '20px' }}>Client satisfaction rate</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
      </div>
    </div>
  );
}

export default ProductDesignSolution;