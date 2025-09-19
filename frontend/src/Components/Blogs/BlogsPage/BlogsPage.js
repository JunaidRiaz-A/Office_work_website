"use client"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./../BlogsPage/BlogsPage.css"
import icon from "./../../../Assets/case study detail.png"
import { IoPerson, IoTimeOutline } from "react-icons/io5"
import { MdDateRange, MdKeyboardArrowRight } from "react-icons/md"
import { Link } from "react-router-dom"
import axiosInstance from "../../api/axiosInstance"
import { Helmet } from "react-helmet"

// Helper function to create a URL-friendly slug from the title
const createSlug = (title) => {
  if (!title) return ""
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
}

function BlogsPage() {
  const [posts, setPosts] = useState([])
  const [tags, setTags] = useState([])
  const [categories, setCategories] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedTag, setSelectedTag] = useState(null)
  const postsPerPage = 5
  const location = useLocation()
  const navigate = useNavigate()

  // Handle initial query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const categoryId = queryParams.get("category")
    const tagId = queryParams.get("tag")
    if (categoryId) {
      setSelectedCategory(Number.parseInt(categoryId))
      setSelectedTag(null)
    } else if (tagId) {
      setSelectedTag(Number.parseInt(tagId))
      setSelectedCategory(null)
    } else {
      setSelectedCategory(null)
      setSelectedTag(null)
    }
  }, [location.search])

  // Fetch data when selectedCategory, selectedTag, or currentPage changes
  useEffect(() => {
    fetchData()
  }, [selectedCategory, selectedTag, currentPage])

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      await Promise.all([getPostsData(), getTagsData(), getCategoriesData()])
    } catch (err) {
      setError("Failed to load data. Please try again later.")
      console.error("Fetch data error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const getPostsData = async () => {
    try {
      let url = `/api/posts?page=${currentPage}&per_page=${postsPerPage}`
      if (selectedCategory) {
        url = `/api/posts/categories/${selectedCategory}?page=${currentPage}&per_page=${postsPerPage}`
      } else if (selectedTag) {
        url = `/api/posts/tags/${selectedTag}?page=${currentPage}&per_page=${postsPerPage}`
      }
      const response = await axiosInstance.get(url)
      const { data, last_page } = response.data
      setPosts(data || [])
      setTotalPages(last_page || 1)
    } catch (error) {
      console.error("Error fetching posts:", error)
      throw error
    }
  }

  const getTagsData = async () => {
    try {
      const response = await axiosInstance.get("/api/tags")
      setTags(response.data.tags || [])
    } catch (error) {
      console.error("Error fetching tags:", error)
      throw error
    }
  }

  const getCategoriesData = async () => {
    try {
      const response = await axiosInstance.get("/api/categories")
      setCategories(response.data.categories || [])
    } catch (error) {
      console.error("Error fetching categories:", error)
      throw error
    }
  }

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId)
    setSelectedTag(null) // Reset tag selection
    setCurrentPage(1) // Reset to first page
    navigate(`/blogs?category=${categoryId}`) // Update URL
  }

  const handleTagClick = (tagId) => {
    setSelectedTag(tagId)
    setSelectedCategory(null) // Reset category selection
    setCurrentPage(1) // Reset to first page
    navigate(`/blogs?tag=${tagId}`) // Update URL
  }

  const handleResetFilters = () => {
    setSelectedCategory(null)
    setSelectedTag(null)
    setCurrentPage(1)
    navigate("/blogs") // Clear query parameters
  }

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
      window.scrollTo(0, 0)
    }
  }

  const truncateText = (text, maxWords = 20, maxChars = 20) => {
    if (!text) return ""
    const words = text.split(" ")
    if (words.length === 1) {
      if (words[0].length > maxChars) {
        return words[0].slice(0, maxChars) + "..."
      }
      return words[0]
    }
    const truncatedWords = words.slice(0, maxWords).map((word) => {
      if (word.length > maxChars) {
        return word.slice(0, maxChars) + "..."
      }
      return word
    })
    return truncatedWords.join(" ") + (words.length > maxWords ? "..." : "")
  }

  const truncateHtmlToTwoPoints = (html) => {
    if (!html) return "<p>No preview available...</p>"
    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = html
    const headingCount = { h1: 0, h2: 0, h3: 0, h4: 0, h5: 0, h6: 0, h7: 0, h8: 0, h9: 0, h10: 0 }
    const hasListItems = tempDiv.querySelector("li") !== null
    if (!hasListItems) {
      const textContent = tempDiv.textContent || ""
      return `<p>${truncateText(textContent, 30)}</p>`
    }
    let pointCount = 0
    const truncated = document.createElement("div")
    const traverse = (node) => {
      for (const child of node.childNodes) {
        if (pointCount >= 2) {
          truncated.appendChild(document.createTextNode(" ..."))
          break
        }
        if (child.nodeType === Node.ELEMENT_NODE) {
          if (/^h[1-9]$|^h10$/.test(child.tagName.toLowerCase())) {
            const level = child.tagName.toLowerCase()
            headingCount[level]++
            if (headingCount[level] > 1) {
              let newLevel = Number.parseInt(level.replace("h", ""), 10) + 1
              while (newLevel <= 10 && headingCount[`h${newLevel}`] > 0) newLevel++
              if (newLevel > 10) {
                const p = document.createElement("p")
                p.innerHTML = child.innerHTML
                truncated.appendChild(p)
              } else {
                const newTag = document.createElement(`h${newLevel}`)
                newTag.innerHTML = child.innerHTML
                truncated.appendChild(newTag)
              }
            } else {
              truncated.appendChild(child.cloneNode(true))
            }
          } else if (child.tagName.toLowerCase() === "li") {
            if (pointCount < 2) {
              const liClone = child.cloneNode(true)
              truncated.appendChild(liClone)
              pointCount++
            }
          } else {
            const cloned = child.cloneNode(false)
            truncated.appendChild(cloned)
            traverse(child)
          }
        } else if (child.nodeType === Node.TEXT_NODE) {
          truncated.appendChild(child.cloneNode(true))
        }
        if (pointCount >= 2) {
          break
        }
      }
    }
    traverse(tempDiv)
    const listItems = truncated.querySelectorAll("li")
    if (listItems.length > 0) {
      const listType = tempDiv.querySelector("ul") ? "ul" : "ol"
      const listContainer = document.createElement(listType)
      listItems.forEach((item) => listContainer.appendChild(item))
      truncated.innerHTML = listContainer.outerHTML + " ..."
    }
    return truncated.innerHTML || "<p>Preview unavailable...</p>"
  }

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Latest Tech Trends & AI Innovations Explained | 360synergytech Blog</title>
        <meta
          name="description"
          content="Stay updated with the latest tech trends, AI advancements, and software insights on the 360synergytech blog"
        />
        <meta name="keywords" content="tech trends, AI innovations, 360synergytech blog, software insights" />
        <link rel="canonical" href="https://360synergytech.com/blogs" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "360synergytech Blog",
              "url": "https://360synergytech.com/blogs",
              "description": "Read the latest insights on AI, software development, cloud services, and automation from 360synergytech experts."
            }
          `}
        </script>
      </Helmet>
      <h1
        style={{ position: "absolute", left: "-9999px", top: "auto", width: "1px", height: "1px", overflow: "hidden" }}
      >
        360 SynergyTech Blogs
      </h1>
      <div className="main_div_blogpage">
        <div className="row m-0 p-0">
          <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
          <div className="col-lg-8 col-md-10 col-sm-12 col-12">
            <div className="row m-0 p-0">
              <div className="col-lg-8 col-md-8 col-sm-12 col-12">
                <h2 className="blog_section_heading" style={{ fontWeight: 700, fontSize: 32, marginBottom: 24 }}>
                  {selectedCategory
                    ? `Posts in Category: ${categories.find((c) => c.id === selectedCategory)?.name || "Category"}`
                    : selectedTag
                      ? `Posts with Tag: ${tags.find((t) => t.id === selectedTag)?.name || "Tag"}`
                      : "Latest Blog Posts"}
                </h2>
                {(selectedCategory || selectedTag) && (
                  <button
                    className="btn_reset_filters_enhanced"
                    onClick={handleResetFilters}
                    style={{ marginBottom: 16 }}
                  >
                    <MdKeyboardArrowRight className="btn_icon" />
                    View All Posts
                  </button>
                )}
                {error ? (
                  <p className="error_message">{error}</p>
                ) : posts.length === 0 ? (
                  <div className="no_posts_container">
                    <div className="no_posts_icon">
                      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                          stroke="#023496"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 9H15"
                          stroke="#023496"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 13H15"
                          stroke="#023496"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 17H13"
                          stroke="#023496"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3 className="no_posts_title">No Posts Available</h3>
                    <p className="no_posts_description">
                      {selectedCategory || selectedTag
                        ? "We couldn't find any posts matching your current filter. Try exploring other categories or tags."
                        : "We're working on creating amazing content for you. Check back soon for the latest updates and insights!"}
                    </p>
                    <button className="btn_view_all_posts_enhanced" onClick={handleResetFilters}>
                      <MdKeyboardArrowRight className="btn_icon" />
                      Explore All Posts
                    </button>
                  </div>
                ) : (
                  posts.map((post) => (
                    <Link to={`/blog/detail/${post.id}/${createSlug(post.title)}`} key={post.id}>
                      <img
                        src={post.image_url || icon}
                        className="icon_blog_img"
                        alt={post.title}
                        style={{ width: "100%", height: "300px", objectFit: "cover" }}
                      />
                      <div className="white_detail_div_blog">
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
                        <h3 className="orange_heading_blog" style={{ margin: 0 }}>
                          {truncateText(post.title, 20, 20)}
                        </h3>
                        <div
                          className="black_para_blog"
                          dangerouslySetInnerHTML={{ __html: truncateHtmlToTwoPoints(post.body) }}
                        />
                        <button className="btn_read_more_blog">
                          Read more <MdKeyboardArrowRight className="mr-2" />
                        </button>
                      </div>
                    </Link>
                  ))
                )}
                {totalPages > 1 && !error && (
                  <div className="pagination_div" style={paginationStyles.container}>
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1
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
                          <span style={{ fontWeight: 600 }}>
                            <h4 style={{ margin: 0, fontSize: 16, fontWeight: 600, display: "inline" }}>
                              {pageNumber}
                            </h4>
                          </span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <div className="category_div_blog">
                  <div className="d-flex flex-row">
                    <div className="blue_div_category" />
                    <h2 className="category_heading_blog" style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>
                      Categories
                    </h2>
                  </div>
                  <div className="scroll_div_blog">
                    {categories.length === 0 ? (
                      <p>No categories available.</p>
                    ) : (
                      categories.map((category) => (
                        <div key={category.id}>
                          <div
                            className="category_item_clickable"
                            onClick={() => handleCategoryClick(category.id)}
                          >
                            <MdKeyboardArrowRight className="arrow_right_cat" />
                            <h4
                              className="category_business_para"
                              style={{
                                fontSize: 16,
                                fontWeight: 500,
                                margin: 0,
                                color: selectedCategory === category.id ? "#023496" : "inherit",
                              }}
                            >
                              {category.name}
                            </h4>
                          </div>
                          <div className="hr_line_dotted" />
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <div className="recent_post_div_blog">
                  <div className="d-flex flex-row">
                    <div className="blue_div_recent_post" />
                    <h2 className="recent_post_heading_blog" style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>
                      Recent Posts
                    </h2>
                  </div>
                  <div className="scroll_div_blog">
                    {posts.length === 0 ? (
                      <p>No recent posts available.</p>
                    ) : (
                      posts.slice(0, 5).map((post) => (
                        <Link
                          to={`/blog/detail/${post.id}/${createSlug(post.title)}`}
                          key={post.id}
                          className="recent_post_link"
                        >
                          <div className="recent_post_item">
                            <img
                              src={post.image_url || icon}
                              className="recent_img_blog"
                              alt={post.title}
                              style={{ width: "50px", height: "50px", objectFit: "cover" }}
                            />
                            <div>
                              <div className="d-flex flex-row">
                                <IoTimeOutline className="icon_time_blog" />
                                <p className="recent_time_blog">
                                  {new Date(post.created_at).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </p>
                              </div>
                              <h5 className="recent_heading_blog" style={{ fontSize: 15, fontWeight: 500, margin: 0 }}>
                                {truncateText(post.title, 20, 20)}
                              </h5>
                            </div>
                          </div>
                        </Link>
                      ))
                    )}
                  </div>
                </div>
                <div className="tags_div_blog">
                  <div className="d-flex flex-row">
                    <div className="blue_div_tags" />
                    <h2 className="tags_heading_blog" style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>
                      Tags
                    </h2>
                  </div>
                  <div className="scroll_div_blog">
                    {tags.length === 0 ? (
                      <p>No tags available.</p>
                    ) : (
                      <div className="d-flex flex-wrap">
                        {tags.map((tag) => (
                          <button
                            key={tag.id}
                            className="tag_btn_blog"
                            onClick={() => handleTagClick(tag.id)}
                            style={{
                              backgroundColor: selectedTag === tag.id ? "#023496" : "inherit",
                              color: selectedTag === tag.id ? "#fff" : "inherit",
                            }}
                          >
                            <h4 style={{ fontSize: 14, fontWeight: 500, margin: 0, display: "inline" }}>{tag.name}</h4>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        </div>
      </div>
    </>
  )
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
    backgroundColor: "#023496",
    color: "#fff",
  },
}

export default BlogsPage