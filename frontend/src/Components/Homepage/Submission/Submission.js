import "./Submission.css";

import group from "./../../../Assets/group.png";

function Submission() {
  return (
    <div className="color-c2">
      <div className="row align-items-center">
        <div className="col-lg-5 col-md-12 col-sm-12 col-12">
          <img src={group} alt="Group" className="group_screen img-fluid" />
        </div>
        <div className="col-lg-7 col-md-12 col-sm-12 col-12">
          <p className="para_touch_style">Get in touch</p>
          <p className="description-text">
            Vestibulum lectus mauris ultrices eros in. Cursus sit amet dictum
            sit.
          </p>
          <div className="container-c">
            <form>
              <div className="row mb-3  ">
                <div className="col-md-6 mb-3 p-0 m-0">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your name"
                  />
                </div>
                <div className=" col-md-6  mb-3 p-0 m-0">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="row mb-3 p-0 m-0">
                <div className=" col-md-6  mb-3 p-0 m-0">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone Number"
                  />
                </div>
                <div className="col-md-6  mb-3 p-0 m-0">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Website Link"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <textarea
                    type="text"
                    className="form-control1"
                    placeholder="Message"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 text-center">
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="Submit"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Submission;
