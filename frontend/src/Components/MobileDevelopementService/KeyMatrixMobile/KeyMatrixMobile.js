import React from 'react';

function KeyMatrixMobile() {
  return (
    <div className="main_div_KeyMatrics">
      <style>
        {`
          .main_div_KeyMatrics {
            width: 100%;
            height: auto;
            padding: 5% 0;
            background-color: #fff;
          }
          .blue_div_KeyMatrics {
            background-color: #051d71;
            border-radius: 15px;
            padding: 30px 20px;
            color: white;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .heading_key_matrix {
            font-family: "Poppins", sans-serif;
            font-size: 24px;
            font-weight: 700;
            line-height: 32px;
            margin-bottom: 20px;
            color: #fff;
          }
          .valueink, .valueink1, .valueink2 {
            font-family: "Poppins", sans-serif;
            font-size: 48px;
            font-weight: 700;
            margin-bottom: 5px;
            color: #e0e0ff;
          }
          .paravalueink, .paravalueink1, .paravalueink2 {
            font-family: "Poppins", sans-serif;
            font-size: 16px;
            font-weight: 500;
            line-height: 20px;
            color: #fff;
          }
          @media only screen and (max-width: 991px) {
            .blue_div_KeyMatrics {
              padding: 20px 10px;
            }
            .heading_key_matrix {
              font-size: 20px;
              line-height: 28px;
            }
            .valueink, .valueink1, .valueink2 {
              font-size: 36px;
            }
            .paravalueink, .paravalueink1, .paravalueink2 {
              font-size: 14px;
              line-height: 18px;
            }
          }
          @media only screen and (max-width: 440px) {
            .blue_div_KeyMatrics {
              padding: 15px 5px;
            }
            .heading_key_matrix {
              font-size: 18px;
              line-height: 24px;
            }
            .valueink, .valueink1, .valueink2 {
              font-size: 28px;
            }
            .paravalueink, .paravalueink1, .paravalueink2 {
              font-size: 12px;
              line-height: 16px;
            }
          }
        `}
      </style>
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="blue_div_KeyMatrics">
            <p className="heading_key_matrix">
              Solving real-world problems with powerful mobile apps
            </p>
            <div className="row m-0 p-2">
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <p className="valueink">52%</p>
                <p className="paravalueink">Faster time-to-market</p>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <p className="valueink1">2X</p>
                <p className="paravalueink1">Year-on-year project growth</p>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <p className="valueink2">98%</p>
                <p className="paravalueink2">Project completion success rate</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
      </div>
    </div>
  )
}

export default KeyMatrixMobile