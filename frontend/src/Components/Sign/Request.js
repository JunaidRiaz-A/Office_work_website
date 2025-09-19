import { useState } from "react";
// import "./../ContactUsForm/ContactUsForm.css";
function Request() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://b2a2-139-135-34-34.ngrok-free.app/Podio_extension(integrated_with_podio)/test2.php", {
      method: "POST",
      mode:'no-cors',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Handle success response
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error
      });
  };

  return (
    <div className="main_div_form_contactus">
      <div className="container">
        <div className="d-flex justify-content-center">
          <div className="form_main_div">
            <p className="send_message_para">Send us a Message</p>
            <p className="send_message_desp">
              We're available 9:00 AM – 5:00 PM PST
            </p>
            <form onSubmit={handleSubmit}>
              <div className="row p-0 m-0">
                <div className="col-lg-6 col-md-6 col-12">
                  <input
                    className="input_firstname_contactus"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <input
                    className="input_firstname_contactus"
                    placeholder="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-lg-12 col-md-12 col-12">
                  <textarea
                    className="textarea_contactus_form"
                    placeholder="New Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="col-lg-12 col-md-12 col-12">
                  <button className="btn_contactus_form" type="submit">
                    SEND MESSAGE
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Request;
