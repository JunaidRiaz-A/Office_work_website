import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance"; 
import "./../EventGallery/EventGallery.css";

function EventGallery() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetchImages();
  }, [currentPage]);

  const fetchImages = async () => {
    try {
      const response = await axiosInstance.get(`/api/gallery?page=${currentPage}`);
      const { data, links, current_page, last_page } = response.data;
      setImages(Array.isArray(data) ? data.map(item => ({
        ...item,
        image_url: item.image_url || `${process.env.REACT_APP_BASE_URL}/storage/${item.image}?t=${new Date().getTime()}`,
      })) : []);
      setLinks(links || []); // Ensure links is an array
      setCurrentPage(current_page || 1);
      setLastPage(last_page || 1);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
      setImages([]);
    }
  };

  const handlePageChange = async (url) => {
    if (url) {
      try {
        const response = await axiosInstance.get(url);
        const { data, links, current_page, last_page } = response.data;
        setImages(Array.isArray(data) ? data.map(item => ({
          ...item,
          image_url: item.image_url || `${process.env.REACT_APP_BASE_URL}/storage/${item.image}?t=${new Date().getTime()}`,
        })) : []);
        setLinks(links || []);
        setCurrentPage(current_page || 1);
        setLastPage(last_page || 1);
      } catch (error) {
        console.error("Error fetching gallery page:", error);
        setImages([]);
      }
    }
  };

  const buttonStyle = {
    color: "#051d71",
    borderColor: "#051d71",
    margin: "0 4px",
    padding: "5px 10px",
    borderRadius: "4px",
    border: "1px solid #051d71",
    backgroundColor: "transparent",
    cursor: "pointer",
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#051d71",
    color: "white",
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    opacity: 0.5,
    cursor: "not-allowed",
  };

  const hoverButtonStyle = {
    backgroundColor: "#051d71",
    color: "white",
  };

  return (
    <div className="main_div_EventGallery">
      <p className="culture_para">Culture</p>
      <p className="our_event_gallery_para">Our Event Gallery</p>
      <div className="d-flex justify-content-center">
        <div className="hr_line_blue_gallery" />
      </div>

      <div className="row p-0 m-0">
        <div className="col-lg-2 col-md-1 col-12"></div>
        <div className="col-lg-8 col-md-10 col-12">
          <div className="row p-0 m-0">
            {images.length > 0 ? (
              images.map((image, index) => (
                <div className="col-lg-4 col-md-4 col-sm-6 col-12 p-2" key={index}>
                  <img
                    src={image.image_url}
                    className="gallery_img"
                    alt={`Gallery ${index + 1}`}
                    onError={(e) => { e.target.src = `${process.env.REACT_APP_BASE_URL}/images/default-image.jpg`; }}
                  />
                </div>
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
        </div>
        <div className="col-lg-2 col-md-1 col-12"></div>
      </div>

      <div className="d-flex justify-content-center mt-4">
        {links.length > 0 && links.map((link, index) => {
          if (link.label === '« Previous' || link.label === 'Next »') {
            return (
              <button
                key={index}
                style={link.url ? buttonStyle : disabledButtonStyle}
                onClick={() => handlePageChange(link.url)}
                disabled={!link.url}
                onMouseEnter={(e) => { if (link.url) { e.target.style.backgroundColor = hoverButtonStyle.backgroundColor; e.target.style.color = hoverButtonStyle.color; } }}
                onMouseLeave={(e) => { if (link.url) { e.target.style.backgroundColor = buttonStyle.backgroundColor; e.target.style.color = buttonStyle.color; } }}
              >
                {link.label}
              </button>
            );
          } else if (!isNaN(link.label)) {
            return (
              <button
                key={index}
                style={link.active ? activeButtonStyle : buttonStyle}
                onClick={() => handlePageChange(link.url)}
                onMouseEnter={(e) => { e.target.style.backgroundColor = hoverButtonStyle.backgroundColor; e.target.style.color = hoverButtonStyle.color; }}
                onMouseLeave={(e) => { if (link.active) { e.target.style.backgroundColor = activeButtonStyle.backgroundColor; e.target.style.color = activeButtonStyle.color; } else { e.target.style.backgroundColor = buttonStyle.backgroundColor; e.target.style.color = buttonStyle.color; } }}
              >
                {link.label}
              </button>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default EventGallery;