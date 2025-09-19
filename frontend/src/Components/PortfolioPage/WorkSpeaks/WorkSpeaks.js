import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { Link } from "react-router-dom";
import "./WorkSpeaks.css";
import { Helmet } from 'react-helmet';

// Helper function to create a URL-friendly slug from the title
const createSlug = (title) => {
  if (!title) return "";
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

function WorkSpeaks({ scrollToAppointment }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const postsPerPage = 6;

  const getImageUrl = (imageUrl) => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    if (!imageUrl || typeof imageUrl !== 'string' || imageUrl === '{}') {
      return `${baseUrl}/images/default-image.jpg`;
    }
    return `${baseUrl}${imageUrl.startsWith("/") ? imageUrl : "/" + imageUrl}`;
  };

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("api/portfolios");
        const sortedPortfolioItems = response.data.sort((a, b) =>
          new Date(b.created_at) - new Date(a.created_at)
        );
        setPortfolioItems(sortedPortfolioItems);
      } catch (error) {
        console.error("Error fetching portfolio items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  const filteredItems = selectedCategory === "All"
    ? portfolioItems
    : portfolioItems.filter((item) =>
        item.portfolio_category && JSON.parse(item.portfolio_category).includes(selectedCategory)
      );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredItems.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0);
    }
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  return (
    <div className="main_div_work_speaks">
      <Helmet>
        <title>See What We Have Built | Software Development Success Stories at 360synergytech</title>
        <meta name="description" content="See our success stories at 360synergytech — from custom software to AI integrations, we’ve delivered solutions that scale" />
        <meta name="keywords" content="URL optimization, https://360synergytech.com/portfolio" />
        <link rel="canonical" href="https://360synergytech.com/portfolio" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "360synergytech Portfolio",
              "url": "https://360synergytech.com/portfolio",
              "description": "Explore projects and case studies delivered by 360synergytech in AI, web, and cloud solutions."
            }
          `}
        </script>
      </Helmet>
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="row m-0 p-0 align-items-center">
            <div className="col-lg-10 col-md-9 col-sm-9 col-12">
              <h1 className="heading_work_speaks">
                Explore Our Work: AI, Cloud, and Custom Software Projects
              </h1>
              <h2 className="heading_work_speaks_para">
                Let’s build something amazing together. Empower your brand and products with modern designs backed with clean codes. We offer top-tier functionality through personalized website design and development solutions. We don’t believe in imitation, rather succeeding in meaningful originality.
              </h2>
              <p className="heading_work_speaks_para">
                Our designing masters, development geeks, and SEO wizards are well-versed with contemporary tools and tactics to make your online presence powerful.
              </p>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-3 col-12 text-center mb-3">
              <button className="btn_lets_talk" type="button" onClick={scrollToAppointment}>
                Let's Talk
              </button>
            </div>
          </div>

          <div className="main_btns_stacks">
            <div className="row m-0 p-0">
              {["Web Development", "Mobile Apps", "CRMS", "UI UX Design", "Marketing", "All"].map((category) => (
                <div className="col-lg-2 col-md-2 col-sm-6 col-6" key={category}>
                  <div className="d-flex justify-content-center">
                    <button
                      className={`btn_web_developement ${selectedCategory === category ? 'btn_web_developement_selected' : ''}`}
                      onClick={() => {
                        setSelectedCategory(category);
                        setCurrentPage(1);
                      }}
                    >
                      {category}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="row">
            {currentItems.map((item) => (
              <div key={item.id} className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="card_case_study">
                  <img
                    className="card_image"
                    src={getImageUrl(item.image)}
                    alt={item.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `${process.env.REACT_APP_BASE_URL}/images/default-image.jpg`;
                    }}
                  />
                  <div className="card_hover_content">
                    <div className="row m-0 p-0">
                      <div className="col-lg-8 col-md-8 col-sm-8 col-8">
                        <h3 className="heading_card_usecase">{truncateText(item.title, 25)}</h3>
                        <p className="para_card_usecase">
                          {truncateText(item.description, 25)}
                        </p>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                        <Link to={`/portfolio/detail/${item.id}/${createSlug(item.title)}`}>
                          <button className="read_more_btn">Read more</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination_div" style={paginationStyles.container}>
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    style={
                      currentPage === pageNumber
                        ? { ...paginationStyles.dot, ...paginationStyles.activeDot }
                        : paginationStyles.dot
                    }
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
      </div>
    </div>
  );
}

const paginationStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    marginBottom: "20px",
  },
  dot: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#e0e0e0",
    margin: "0 5px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    color: "#333",
    transition: "background-color 0.3s",
  },
  activeDot: {
    backgroundColor: "#ff6200",
    color: "#fff",
  },
};

export default WorkSpeaks;