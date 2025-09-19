import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BlogsDetailPage.css";
import { IoPerson, IoTimeOutline } from "react-icons/io5";
import { MdDateRange, MdKeyboardArrowRight, MdArrowBack } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import axiosInstance from "../../api/axiosInstance";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import icon from "./../../../Assets/case study detail.png";

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

// Helper function to truncate text
const truncateText = (text, maxWords = 10, maxChars = 15) => {
  if (!text) return "";
  const words = text.split(" ");

  // Handle single-word titles
  if (words.length === 1) {
    if (words[0].length > maxChars) {
      return words[0].slice(0, maxChars) + "...";
    }
    return words[0];
  }

  // Handle multi-word titles
  const truncatedWords = words.slice(0, maxWords).map(word => {
    if (word.length > maxChars) {
      return word.slice(0, maxChars) + "...";
    }
    return word;
  });

  return truncatedWords.join(" ") + (words.length > maxWords ? "..." : "");
};

function BlogsDetailPage() {
  const { postId, title } = useParams(); // Extract both postId and title from URL
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, [postId]);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [postResult, tagsResult, categoriesResult, recentPostsResult] = await Promise.allSettled([
        getPostData(),
        getTagsData(),
        getCategoriesData(),
        getRecentPostsData(),
      ]);

      if (postResult.status === "fulfilled") {
        setPost(postResult.value.data);
      } else if (postResult.reason.response?.status === 404) {
        setError("Post not found. Please check the URL or try again later.");
      } else {
        console.error("Error fetching post:", postResult.reason);
      }

      if (tagsResult.status === "fulfilled") {
        setTags(tagsResult.value.data.tags || []);
      } else {
        console.error("Error fetching tags:", tagsResult.reason);
        setTags([]);
      }

      if (categoriesResult.status === "fulfilled") {
        setCategories(categoriesResult.value.data.categories || []);
      } else {
        console.error("Error fetching categories:", categoriesResult.reason);
        setCategories([]);
      }

      if (recentPostsResult.status === "fulfilled") {
        setRecentPosts(recentPostsResult.value.data.data || []);
      } else {
        console.error("Error fetching recent posts:", recentPostsResult.reason);
        setRecentPosts([]);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
      console.error("Fetch data error:", err);
      setRecentPosts([]);
      setTags([]);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getPostData = async () => {
    try {
      const response = await axiosInstance.get(`/api/posts/${postId}`);
      return response;
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error;
    }
  };

  const getTagsData = async () => {
    try {
      const response = await axiosInstance.get("/api/tags");
      return response;
    } catch (error) {
      console.error("Error fetching tags:", error);
      throw error;
    }
  };

  const getCategoriesData = async () => {
    try {
      const response = await axiosInstance.get("/api/categories");
      return response;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  };

  const getRecentPostsData = async () => {
    try {
      const response = await axiosInstance.get(`/api/posts?page=1&per_page=5`);
      return response;
    } catch (error) {
      console.error("Error fetching recent posts:", error);
      throw error;
    }
  };

  const handleBackClick = () => {
    navigate("/blogs");
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/blogs?category=${categoryId}`);
  };

  const handleTagClick = (tagId) => {
    navigate(`/blogs?tag=${tagId}`);
  };

  // Function to convert headings to a hierarchical structure
  const convertHeadingsToHierarchy = (html) => {
    if (!html) return "";

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    // Track the occurrence of each heading level
    const headingCount = { h1: 0, h2: 0, h3: 0, h4: 0, h5: 0, h6: 0, h7: 0, h8: 0, h9: 0, h10: 0 };

    const traverse = (node) => {
      for (let child of node.childNodes) {
        if (child.nodeType === Node.ELEMENT_NODE) {
          if (/^h[1-9]$|^h10$/.test(child.tagName.toLowerCase())) {
            const level = child.tagName.toLowerCase();
            headingCount[level]++;
            if (headingCount[level] > 1) {
              let newLevel = parseInt(level.replace("h", ""), 10) + 1;
              while (newLevel <= 10 && headingCount[`h${newLevel}`] > 0) newLevel++;
              if (newLevel > 10) {
                const p = document.createElement("p");
                p.className = "black_para_detail_one_blog";
                p.innerHTML = child.innerHTML;
                node.replaceChild(p, child);
                traverse(p);
              } else {
                const newTag = document.createElement(`h${newLevel}`);
                newTag.innerHTML = child.innerHTML;
                node.replaceChild(newTag, child);
                traverse(newTag);
              }
            } else {
              traverse(child);
            }
          } else if (child.tagName.toLowerCase() === "a") {
            // Ensure <a> tags retain their attributes and open in a new tab
            child.setAttribute("target", "_blank");
            child.setAttribute("rel", "noopener noreferrer");
          } else {
            traverse(child);
          }
        } else if (child.nodeType === Node.TEXT_NODE) {
          continue;
        }
      }
    };

    traverse(tempDiv);
    return tempDiv.innerHTML;
  };

  if (isLoading) {
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

  if (error) {
    return (
      <div className="error_message">
        {error}
        {error.includes("Post not found") && (
          <button className="btn_back_blog" onClick={handleBackClick}>
            <MdArrowBack /> Go back to Blogs
          </button>
        )}
      </div>
    );
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div className="main_div_blogpage">
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="row m-0 p-0">
            <div className="col-lg-8 col-md-8 col-sm-12 col-12">
              <img
                src={`${baseUrl}/images/${post.image}`}
                className="icon_blog_img"
                alt={post.title}
                onError={(e) => (e.target.src = icon)}
              />
              <div className="grey_detail_div_blog">
                <div className="d-flex flex-row">
                  <IoPerson className="orange_blog_icon" />
                  <p className="admin_para_blog">Admin</p>
                  <MdDateRange className="orange_blog_icon" />
                  <p className="admin_para_blog">
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <p className="orange_heading_blog">{post.title}</p>
                <div
                  className="black_para_detail_one_blog"
                  dangerouslySetInnerHTML={{ __html: convertHeadingsToHierarchy(post.body) }}
                />
                <div className="white_div_quote">
                  <p
                    className="quote_para"
                    dangerouslySetInnerHTML={{ __html: convertHeadingsToHierarchy(post.quote || "") }}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <p className="related_tags_heading">Related Tags:</p>
                  {Array.isArray(tags) ? tags.slice(0, 3).map((tag) => (
                    <button
                      key={tag.id}
                      className="btn_tags_related"
                      onClick={() => handleTagClick(tag.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {tag.name}
                    </button>
                  )) : null}
                </div>
                <div>
                  <p className="related_tags_heading">Social Share:</p>
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social_link"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href="https://www.twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social_link"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social_link"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social_link"
                  >
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="category_div_blog">
                <div className="d-flex flex-row">
                  <div className="blue_div_category" />
                  <p className="category_heading_blog">Categories</p>
                </div>
                <div className="scroll_div_blog">
                  {Array.isArray(categories) ? categories.map((category) => (
                    <div key={category.id}>
                      <div
                        className="d-flex flex-row"
                        onClick={() => handleCategoryClick(category.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <MdKeyboardArrowRight className="arrow_right_cat" />
                        <p
                          className="category_business_para"
                          style={{ color: post.category_id === category.id ? "#ff6200" : "inherit" }}
                        >
                          {category.name}
                        </p>
                      </div>
                      <div className="hr_line_dotted" />
                    </div>
                  )) : null}
                </div>
              </div>
              <div className="recent_post_div_blog">
                <div className="d-flex flex-row">
                  <div className="blue_div_recent_post" />
                  <p className="recent_post_heading_blog">Recent Posts</p>
                </div>
                <div className="scroll_div_blog">
                  {Array.isArray(recentPosts) ? recentPosts.map((recentPost) => (
                    <div
                      className="d-flex flex-row"
                      key={recentPost.id}
                      onClick={() => navigate(`/blog/detail/${recentPost.id}/${createSlug(recentPost.title)}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={recentPost.image_url || icon}
                        className="recent_img_blog"
                        alt={recentPost.title}
                        onError={(e) => (e.target.src = icon)}
                      />
                      <div>
                        <div className="d-flex flex-row">
                          <IoTimeOutline className="icon_time_blog" />
                          <p className="recent_time_blog">
                            {new Date(recentPost.created_at).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <p className="recent_heading_blog">{truncateText(recentPost.title, 10, 15)}</p>
                      </div>
                    </div>
                  )) : null}
                </div>
              </div>
              <div className="tags_div_blog">
                <div className="d-flex flex-row">
                  <div className="blue_div_tags" />
                  <p className="tags_heading_blog">Tags</p>
                </div>
                <div className="scroll_div_blog">
                  <div className="d-flex flex-wrap">
                    {Array.isArray(tags) ? tags.map((tag) => (
                      <button
                        key={tag.id}
                        className="tag_btn_blog"
                        onClick={() => handleTagClick(tag.id)}
                        style={{
                          cursor: "pointer",
                          backgroundColor: post.tags?.some((t) => t.id === tag.id) ? "#ff6200" : "inherit",
                          color: post.tags?.some((t) => t.id === tag.id) ? "#fff" : "inherit"
                        }}
                      >
                        {tag.name}
                      </button>
                    )) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
      </div>
    </div>
  );
}

export default BlogsDetailPage;