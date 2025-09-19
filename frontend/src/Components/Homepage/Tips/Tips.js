import "./Tips.css";
import Tips1 from "../../../Assets/Tips1.png";
import Tips3 from "../../../Assets/Tips3.png";
import Tips4 from "../../../Assets/Tips4.png";
import Tips5 from "../../../Assets/Tips5.png";
import Tips6 from "../../../Assets/Tips6.png";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

// Helper function to create a URL-friendly slug from the title
const createSlug = (title) => {
  if (!title) return "";
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen
};

function Tips() {
  // TODO: Optimize images for better performance
  // Consider compressing images or converting to WebP format to reduce load times
  const [tips, setTips] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tipsPerPage = 3;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTips = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get("api/tips");
        const sortedTips = (response.data || []).sort(
          (a, b) => new Date(b.posted_date) - new Date(a.posted_date) || b.id - a.id
        );
        setTips(sortedTips);
      } catch (error) {
        setError("Failed to load tips. Please try again later.");
        console.error("Error fetching tips:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTips();
  }, []);

  // Add meta tags for SEO
  useEffect(() => {
    // document.title = "Latest Tips & Tricks | Our Blog";
    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Explore our latest tips and tricks to enhance your knowledge. Read expert advice and stay updated with our blog.";
    document.head.appendChild(metaDescription);

    // Add JSON-LD structured data for SEO
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Tips & Tricks Blog",
      description: "A collection of expert tips and tricks to help you stay informed and improve your skills.",
      url: window.location.href,
      publisher: {
        "@type": "Organization",
        name: "Your Organization Name",
      },
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(metaDescription);
      document.head.removeChild(script);
    };
  }, []);

  const truncateText = (text, maxWords = 20, isTitle = false) => {
    const words = text.split(/\s+/);
    const limit = isTitle ? 6 : 8; // 6 words for title, 8 words for description
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  };

  const totalPages = Math.ceil(tips.length / tipsPerPage);
  const indexOfLastTip = currentPage * tipsPerPage;
  const indexOfFirstTip = indexOfLastTip - tipsPerPage;
  const currentTips = tips.slice(indexOfFirstTip, indexOfLastTip);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getPaginationItems = () => {
    const paginationItems = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationItems.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination_line ${currentPage === i ? "active" : ""}`}
          aria-label={`Go to page ${i}`}
        >
          <span className="visually-hidden">Page {i}</span>
        </button>
      );
    }
    return paginationItems;
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="error_message">{error}</div>;
  if (!tips.length) return <div>No tips available.</div>;

  return (
    <div className="tips-layout1">
      <div className="tips-layout2">
        <div className="tips-layout3">
          <h1 className="tips-content1">BLOGS</h1>
        </div>
        <div className="tips-layout4">
          <h2 className="tips-content2">Read Our Latest Tips & Tricks</h2>
        </div>
        <div className="tips-layout5"></div>
        <div className="tips-layout6">
          {currentTips.length === 1 ? (
            <article className="tips-layout7 single-tip" style={{ margin: "0 auto" }}>
              <div className="tips-layout8">
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/${currentTips[0].image || ""}`}
                  alt={`Image for ${currentTips[0].title || "tip"}`}
                  className="tips3"
                  style={{ width: "400px", height: "330px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src = Tips3;
                  }}
                  loading="lazy"
                />
                <div className="tips-service-button">
                  <p className="tips-content3">{currentTips[0].service_name || "Example Service"}</p>
                </div>
              </div>
              <div className="tips-layout9">
                <div className="tips-layout10">
                  <div className="date-layout">
                    <img src={Tips4} alt="Date icon" className="tips4" loading="lazy" />
                    <p className="tips-content7">
                      {new Date(currentTips[0].posted_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="tips-layout17">
                    <img src={Tips5} alt="Author icon" className="tips5" loading="lazy" />
                    <p className="tips-content8">{currentTips[0].posted_name}</p>
                  </div>
                </div>
                <div className="tips-layout11">
                  <h3 className="tips-content4">{truncateText(currentTips[0].title, 20, true)}</h3>
                </div>
                <div className="tips-layout12">
                  <p className="tips-content5">{truncateText(currentTips[0].text, 20, false)}</p>
                </div>
                <div className="tips-layout13">
                  <Link
                    to={`/tips/${currentTips[0].id}/${createSlug(currentTips[0].title)}`}
                    className="tips-content6"
                    aria-label={`Read more about ${currentTips[0].title}`}
                  >
                    Read more about {currentTips[0].title}
                    <img src={Tips6} alt="Arrow icon" className="tips6" loading="lazy" />
                  </Link>
                </div>
              </div>
            </article>
          ) : (
            currentTips.map((tip, index) => (
              <article className="tips-layout7" key={index}>
                <div className="tips-layout8">
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}/${tip.image || ""}`}
                    alt={`Image for ${tip.title || "tip"}`}
                    className="tips3"
                    style={{ width: "400px", height: "330px", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.src = Tips3;
                    }}
                    loading="lazy"
                  />
                  <div className={`tips-layout${index === 0 ? 14 : index === 1 ? 15 : 16}`}>
                    <p className="tips-content3">{tip.service_name}</p>
                  </div>
                </div>
                <div className="tips-layout9">
                  <div className="tips-layout10">
                    <div className="date-layout">
                      <img src={Tips4} alt="Date icon" className="tips4" loading="lazy" />
                      <p className="tips-content7">{new Date(tip.posted_date).toLocaleDateString()}</p>
                    </div>
                    <div className="tips-layout17">
                      <img src={Tips5} alt="Author icon" className="tips5" loading="lazy" />
                      <p className="tips-content8">{tip.posted_name}</p>
                    </div>
                  </div>
                  <div className="tips-layout11">
                    <h3 className="tips-content4">{truncateText(tip.title, 20, true)}</h3>
                  </div>
                  <div className="tips-layout12">
                    <p className="tips-content5">{truncateText(tip.text, 20, false)}</p>
                  </div>
                  <div className="tips-layout13">
                    <Link
                      to={`/tips/${tip.id}/${createSlug(tip.title)}`}
                      className="tips-content6"
                      aria-label={`Read more about ${tip.title}`}
                    >
                      Read more about {tip.title}
                      <img src={Tips6} alt="Arrow icon" className="tips6" loading="lazy" />
                    </Link>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
        {totalPages > 1 && (
          <nav className="pagination_div" aria-label="Pagination">
            {getPaginationItems()}
          </nav>
        )}
      </div>
    </div>
  );
}

export default Tips;