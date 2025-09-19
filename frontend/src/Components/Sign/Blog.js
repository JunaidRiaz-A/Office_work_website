import React, { useEffect, useState } from "react";
import "./Blog.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "react-js-pagination";
// import Footer from "../FooterStop/Footer";
import slugify from "slugify";

import Loader from "./Loader.js";
import FooterAll from "../Homepage/FooterAll/FooterAll.js";
import Navbarsynergtech from "../Homepage/Navbarsynergtech/Navbarsynergtech.js";
import BlogsNavbar from "../Blogs/BlogsNavbar/BlogsNavbar.js";
import BringIdeas from "../PortfolioPage/BringIdeas/BringIdeas.js";
import Banner1 from "../Homepage/Banner1/Banner1.js";
import Appointment from "../Homepage/Appointment/Appointment.js";
// import NavbarMain from "../NavbarUpper/NavbarMain.js";

function Blog() {
  const [isVisible, setIsVisible] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    scrollToTop();
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsCountPerPages, setitemsCountPerPages] = useState(0);
  const [lastpage, setlastpage] = useState(0);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRelatedPostData, setFilteredRelatedPostData] = useState(null);

  const [blogsdata, setblogsdata] = useState("");
  useEffect(() => {
    getblogsdata();
  }, [currentPage]);

  const getblogsdata = () => {
    axios
      .get(`/api/posts?page=${currentPage}`)
      .then((res) => {
        const sortedData = res.data.data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });

        setblogsdata(res.data);
        setFilteredRelatedPostData(res.data.data);
        setTotalPages(res?.data?.total);
        setitemsCountPerPages(res?.data?.per_page);
        setlastpage(res?.data?.last_page);
      })
      .catch((error) => {
        console.error("Error fetching blog data:", error);
      });
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filteredData = blogsdata.data.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRelatedPostData(filteredData);
  };

  const extractDateFromUpdatedAt = (updated_at) => {
    if (updated_at) {
      const datePart = updated_at.split("T")[0];
      return datePart;
    }
    return null;
  };

  const [tagsdata, settagsdata] = useState("");
  useEffect(() => {
    gettagsdata();
  }, []);

  const gettagsdata = () => {
    axios
      .get(`/api/tags`)
      .then((res) => {
        settagsdata(res.data.tags);
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
      });
  };

  const [Categorydata, setCategorydata] = useState("");
  useEffect(() => {
    getCategorydata();
  }, []);

  const getCategorydata = () => {
    axios
      .get(`/api/categories`)
      .then((res) => {
        setCategorydata(res.data.categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  return (
    <>
      <>
      <Navbarsynergtech/>
      <BlogsNavbar/>
        {/* <NavbarMain /> */}
     
      </>
      <div className="main_div_blog_new">
        <div className="container">
          <div className="row">
            {blogsdata ? (
              blogsdata?.data?.map((data, index) => (
                <>
                  <div className="col-lg-4 col-md-6 col-12">
                    <div className="blog_picture_div">
                      <img
                        src={data?.image_url}
                        className="blog_image_new"
                        alt="continuelogo"
                      />
                    </div>
                    <p className="para_heading_in_blog_new">{data?.title}</p>
                    <p className="date_in_blog_new">
                      {" "}
                      {data?.created_at
                        ? extractDateFromUpdatedAt(data?.created_at)
                        : null}
                    </p>

                    <p
                      className="para_in_blog_new"
                      dangerouslySetInnerHTML={{
                        __html: data?.body
                          ? data.body.split(" ").slice(0, 20).join(" ") +
                            (data.body.split(" ").length > 20 ? "..." : "")
                          : "",
                      }}
                    ></p>

                    <Link
                      to={`/blogs/${data.id}/${slugify(data.title, {
                        lower: true,
                      })}`}
                    >
                      <p className="read_more_para">Read More</p>
                    </Link>
                  </div>
                </>
              ))
            ) : (
              <div className="loader_div">
                <Loader />
              </div>
            )}
          </div>
        </div>
      </div>
      <>
        {" "}
        {totalPages > 0 && (
          <div className="container">
            <div className="d-flex justify-content-end">
              <div className="pagination_blogs">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={itemsCountPerPages}
                  totalItemsCount={totalPages}
                  pageRangeDisplayed={lastpage}
                  onChange={handlePageChange}
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </div>
            </div>
          </div>
        )}
      </>
      <BringIdeas/>
      <Banner1/>
      <Appointment/>
      <>
        {isVisible && (
          <button onClick={scrollToTop} className="scroll-to-top-button">
            <span>&uarr;</span>
          </button>
        )}
      </>
      <FooterAll/>
      {/* <Footer /> */}
    </>
  );
}

export default Blog;
