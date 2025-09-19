"use client";
import { useEffect, useRef, useState } from "react";
import "./Dashboard.css";
import axiosInstance from "./../api/axiosInstance";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill/dist/quill.snow.css";
import "highlight.js/styles/monokai-sublime.css";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import synergytechlogo from "../../../src/Assets/synergy-logo-3 1.png";
import {
  Search,
  Plus,
  Trash2,
  EyeOff,
  Check,
  Upload,
  ChevronDown,
  MessageSquare,
  Settings,
  Users,
  Calendar,
  Briefcase,
  ArrowUp,
  Tag,
  Folder,
  PenTool,
  Grid3X3,
  User,
  ChevronRight,
  ChevronLeft,
  Lightbulb,
  Edit,
  LogOut,
  Home as HomeIcon,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [blogdescription, setBlogDescription] = useState("");
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const editorRef = useRef(null);
  const formRef = useRef(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [deleteItemType, setDeleteItemType] = useState(null);

  const handleCKEditorChange = (event, editor) => {
    const data = editor.getData();
    setBlogDescription(data);
  };

  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const isAuthenticated = localStorage.getItem("token");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    navigate("/login");
  };

  const handleHome = () => {
    navigate("/");
  };

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

  // GET tags
  const [tagsname, setTagsname] = useState([]);
  const [storetag, setStoretag] = useState(null);
  const [selectedOptiontag, setSelectedOptiontag] = useState(null);

  useEffect(() => {
    getTagsData();
  }, []);

  const getTagsData = () => {
    axiosInstance
      .get("/api/tags")
      .then((res) => {
        console.log("Tags fetched:", res.data.tags);
        setTagsname(res.data.tags || []);
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
      });
  };

  const [dropdownOpentags, setDropdownOpentags] = useState(false);
  const [filtertags, setFiltertags] = useState("");
  const dropdownReftags = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClicktags);
    window.addEventListener("scroll", handleScrolltags);
    return () => {
      document.removeEventListener("click", handleOutsideClicktags);
      window.removeEventListener("scroll", handleScrolltags);
    };
  }, []);

  const toggleDropdowntags = () => {
    setDropdownOpentags(!dropdownOpentags);
  };

  const handleFilterChangetags = (event) => {
    const filterText = event.target.value.toLowerCase();
    setFiltertags(filterText);
  };

  const handleOptionChangetags = (option) => {
    const selectedTag = tagsname.find((item) => item.name === option);
    if (selectedTag) {
      setSelectedOptiontag(option);
      setStoretag(selectedTag.id);
      setDropdownOpentags(false);
      console.log("Selected tag:", selectedTag.id);
    }
  };

  const handleOutsideClicktags = (event) => {
    if (dropdownReftags.current && !dropdownReftags.current.contains(event.target)) {
      setDropdownOpentags(false);
    }
  };

  const handleScrolltags = () => {
    setDropdownOpentags(false);
  };

  // GET categories
  const [categoryname, setCategoryname] = useState([]);
  const [storecategory, setStorecategory] = useState(null);
  const [selectedOptioncategory, setSelectedOptioncategory] = useState(null);

  useEffect(() => {
    getCategoryData();
  }, []);

  const getCategoryData = () => {
    axiosInstance
      .get("/api/categories")
      .then((res) => {
        console.log("Categories fetched:", res.data.categories);
        setCategoryname(res.data.categories || []);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const [dropdownOpencategory, setDropdownOpencategory] = useState(false);
  const [filtercategory, setFiltercategory] = useState("");
  const dropdownRefcategory = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClickcategory);
    window.addEventListener("scroll", handleScrollcategory);
    return () => {
      document.removeEventListener("click", handleOutsideClickcategory);
      window.removeEventListener("scroll", handleScrollcategory);
    };
  }, []);

  const toggleDropdowncategory = () => {
    setDropdownOpencategory(!dropdownOpencategory);
  };

  const handleFilterChangecategory = (event) => {
    const filterText = event.target.value.toLowerCase();
    setFiltercategory(filterText);
  };

  const handleOptionChangecategory = (option) => {
    const selectedCategory = categoryname.find((item) => item.name === option);
    if (selectedCategory) {
      setSelectedOptioncategory(option);
      setStorecategory(selectedCategory.id);
      setDropdownOpencategory(false);
      console.log("Selected category:", selectedCategory.id);
    }
  };

  const handleOutsideClickcategory = (event) => {
    if (dropdownRefcategory.current && !dropdownRefcategory.current.contains(event.target)) {
      setDropdownOpencategory(false);
    }
  };

  const handleScrollcategory = () => {
    setDropdownOpencategory(false);
  };

  const [blogtitle, setBlogtitle] = useState("");
  const TITLE_MIN_LENGTH = 1;
  const TITLE_MAX_LENGTH = 150;

  const handleBlogtitleChange = (event) => {
    const value = event.target.value;
    if (value.length <= TITLE_MAX_LENGTH) {
      setBlogtitle(value);
    }
  };

  const [blogImage, setBlogImage] = useState(null);
  const handleBlogImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBlogImage(file);
      console.log("Blog image selected:", file.name);
    }
  };

  const [blogquote, setBlogquote] = useState("");
  const handleBlogquoteChange = (value) => {
    setBlogquote(value);
  };

  const validateBlogTitle = (title) => {
    if (title.length < TITLE_MIN_LENGTH) {
      toast.error(`Blog title must be at least ${TITLE_MIN_LENGTH} character`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return false;
    }
    if (title.length > TITLE_MAX_LENGTH) {
      toast.error(`Blog title must not exceed ${TITLE_MAX_LENGTH} characters`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return false;
    }
    return true;
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    console.log("handleBlogSubmit function triggered");

    if (!validateBlogTitle(blogtitle)) {
      console.log("Validation failed: Invalid blog title");
      return;
    }

    if (!blogtitle || !blogdescription || !blogquote || !storecategory || !storetag) {
      console.log("Validation failed. Missing fields:", {
        blogtitle,
        blogdescription,
        blogquote,
        storecategory,
        storetag,
      });
      toast.error("All fields are required.", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", blogtitle);
    formData.append("body", blogdescription || "");
    formData.append("quote", blogquote || "");
    formData.append("category_id[]", storecategory);
    formData.append("tag_id[]", storetag);
    if (blogImage) {
      formData.append("image", blogImage);
    }
    formData.append("user_id", "1");

    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value instanceof File ? value.name : value}`);
    }

    const url = editingBlogId ? `/api/posts/${editingBlogId}?_method=PUT` : "/api/posts";
    const method = "post";

    try {
      const response = await axiosInstance[method](url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });
      console.log("Blog submission success:", response.data);
      setBlogquote("");
      setBlogDescription("");
      setBlogImage(null);
      setBlogtitle("");
      setSelectedOptiontag(null);
      setSelectedOptioncategory(null);
      setStorecategory(null);
      setStoretag(null);
      setEditingBlogId(null);
      setCurrentImageUrl(null);
      toast.success(response.data.message || (editingBlogId ? "Blog updated successfully!" : "Blog created successfully!"), {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      await getBlogsDetail();
    } catch (e) {
      console.error("Blog submission error:", e);
      if (e.response) {
        console.log("Error response:", e.response.data);
        const errorMessage = e.response.status === 422 
          ? Object.values(e.response.data.error || {}).flat().join(", ") 
          : e.response.data.error || "Failed to submit blog post.";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else if (e.request) {
        console.log("No response received:", e.request);
        toast.error("No response from server. Please check your network.", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        console.log("Error setting up request:", e.message);
        toast.error("Error: " + e.message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  const [addcategoryname, setAddcategoryname] = useState("");
  const handleAddcategorynameChange = (event) => {
    setAddcategoryname(event.target.value);
  };

  const CreateCategory = (e) => {
    e.preventDefault();
    const payload = {
      name: addcategoryname,
    };
    axiosInstance
      .post("/api/categories", payload)
      .then((r) => {
        setAddcategoryname("");
        getCategoryData();
        toast.success(r.data.message || "Category added successfully!", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((e) => {
        if (e.response?.data?.errors) {
          toast.error(e.response.data.message, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      });
  };

  const deleteCategory = (id) => {
    setDeleteItemId(id);
    setDeleteItemType("category");
    setShowDeleteModal(true);
  };

  const [addtagname, setAddtagname] = useState("");
  const handleAddtagnameChange = (event) => {
    setAddtagname(event.target.value);
  };

  const CreateTag = (e) => {
    e.preventDefault();
    const payload = {
      name: addtagname,
    };
    axiosInstance
      .post("/api/tags", payload)
      .then((r) => {
        setAddtagname("");
        getTagsData();
        toast.success(r.data.message || "Tag added successfully!", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((e) => {
        if (e.response?.data?.errors) {
          toast.error(e.response.data.message, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      });
  };

  const deleteTag = (id) => {
    setDeleteItemId(id);
    setDeleteItemType("tag");
    setShowDeleteModal(true);
  };

  const [blogsdetail, setBlogsdetail] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    getBlogsDetail();
  }, []);

  const getBlogsDetail = async () => {
    axiosInstance
      .get("/api/get-all-post")
      .then((res) => {
        console.log("Blogs fetched:", res.data);
        setBlogsdetail(res.data);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  };

  const [activeMenuItem, setActiveMenuItem] = useState("");
  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  const [posttitle, setPosttitle] = useState("");
  const handleSetPosttitle = (title) => {
    setPosttitle(title);
  };

  useEffect(() => {
    handleMenuItemClick("");
    handleSetPosttitle("");
    handleSetStatusPosttoggle("");
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredModules = Array.isArray(blogsdetail.posts)
    ? blogsdetail.posts.filter((sidebarMenu) => {
        const menuData = sidebarMenu?.title?.toLowerCase();
        return menuData && menuData.includes(searchQuery.toLowerCase());
      })
    : [];

  useEffect(() => {
    getCommentsDetail();
  }, [activeMenuItem]);

  const [commentsdetail, setCommentsdetail] = useState("");
  const getCommentsDetail = async () => {
    if (activeMenuItem) {
      axiosInstance
        .get(`/api/posts/${activeMenuItem}/comments`)
        .then((res) => {
          console.log("Comments fetched:", res.data);
          setCommentsdetail(res.data);
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
        });
    }
  };

  useEffect(() => {
    getRepliesDetail();
  }, [activeMenuItem]);

  const [repliesdetail, setRepliesdetail] = useState("");
  const getRepliesDetail = async () => {
    if (activeMenuItem) {
      axiosInstance
        .get(`/api/posts/${activeMenuItem}/comments`)
        .then((res) => {
          console.log("Replies fetched:", res.data);
          setRepliesdetail(res.data);
        })
        .catch((error) => {
          console.error("Error fetching replies:", error);
        });
    }
  };

  const handleApproveComment = (id) => {
    axiosInstance
      .put(`/api/comments/${id}/update-approval-status`, {
        is_approved: "1",
      })
      .then((response) => {
        getCommentsDetail();
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((error) => {
        console.error("Error updating comment status:", error);
      });
  };

  const handleHideComment = (id) => {
    axiosInstance
      .put(`/api/comments/${id}/update-approval-status`, {
        is_approved: "0",
      })
      .then((response) => {
        getCommentsDetail();
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((error) => {
        console.error("Error updating comment status:", error);
      });
  };

  const handleApproveReply = (id) => {
    axiosInstance
      .put(`/api/comments/replies/${id}`, {
        is_approved: "1",
      })
      .then((response) => {
        getCommentsDetail();
        getRepliesDetail();
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((error) => {
        console.error("Error updating reply status:", error);
      });
  };

  const handleHideReply = (id) => {
    axiosInstance
      .put(`/api/comments/replies/${id}`, {
        is_approved: "0",
      })
      .then((response) => {
        getCommentsDetail();
        getRepliesDetail();
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((error) => {
        console.error("Error updating reply status:", error);
      });
  };

  const handleDeleteComment = async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/blog/posts/comments/${id}`);
      getCommentsDetail();
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const [posttoggle, setPosttoggle] = useState(0);
  const handleSetStatusPosttoggle = (status) => {
    setPosttoggle(status);
  };

  const handleToggle = async () => {
    const newStatus = posttoggle === 0 ? 1 : 0;
    setPosttoggle(newStatus);
    const payload = {
      is_commentable: newStatus,
    };
    try {
      const response = await axiosInstance.put(`/api/posts/${activeMenuItem}/update-comments-status`, payload);
      getBlogsDetail();
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error updating comment status:", error);
    }
  };

  const quillModules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "script",
    "indent",
    "direction",
    "color",
    "background",
    "align",
  ];

  const [idsetfordelete, setIdsetfordelete] = useState("");
  const handleSetIdfordeleteblog = (id) => {
    setIdsetfordelete(id);
  };

  const handleDeleteBlog = (id) => {
    setDeleteItemId(id);
    setDeleteItemType("blog");
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      let response;
      switch (deleteItemType) {
        case "category":
          response = await axiosInstance.delete(`/api/categories/${deleteItemId}`);
          getCategoryData();
          break;
        case "tag":
          response = await axiosInstance.delete(`/api/tags/${deleteItemId}`);
          getTagsData();
          break;
        case "blog":
          response = await axiosInstance.delete(`/api/posts/${deleteItemId}`);
          getBlogsDetail();
          break;
        default:
          return;
      }
      toast.success(response.data.message || `${deleteItemType.charAt(0).toUpperCase() + deleteItemType.slice(1)} deleted successfully!`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error(`Error deleting ${deleteItemType}:`, error);
      toast.error(error.response?.data?.message || `Failed to delete ${deleteItemType}.`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setShowDeleteModal(false);
      setDeleteItemId(null);
      setDeleteItemType(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteItemId(null);
    setDeleteItemType(null);
  };

  const sidebarItems = [
    { id: "home", label: "Home", icon: HomeIcon },
    { id: "overview", label: "Overview", icon: Grid3X3 },
  ];

  const truncateText = (text, maxWords = 6, maxWordLength = 10, isList = false) => {
    if (!text) return "";

    if (!isList) {
      const words = text.split(" ").map(word => 
        word.length > maxWordLength ? word.substring(0, maxWordLength) + "..." : word
      );
      if (words.length > maxWords) {
        return words.slice(0, maxWords).join(" ") + "...";
      }
      return words.join(" ");
    }

    if (isList) {
      const items = text.split(/[\n\r]+/).filter(item => item.trim());
      if (items.length > 3) {
        return items.slice(0, 3).join("\n") + "...";
      }
      return text;
    }

    const words = text.split(" ");
    return words.length > 10 ? words.slice(0, 10).join(" ") + "..." : text;
  };

  const renderOverview = () => (
    <div className="overview-content">
      <div className="welcome-section">
        <h1 className="welcome-title">Welcome back, Admin!</h1>
      </div>

      <div className="quick-actions-overview">
        <h2 className="section-title">Quick Actions</h2>
        <div className="action-cards">
          <div className="action-card" onClick={() => navigate("/dashboard/add-job-post")}>
            <div className="action-icon">
              <Briefcase size={32} />
            </div>
            <h3>Post a Job</h3>
            <p>Create new job opportunities</p>
          </div>
          <div className="action-card" onClick={() => navigate("/dashboard/add-team-member")}>
            <div className="action-icon">
              <Users size={32} />
            </div>
            <h3>Add Team Member</h3>
            <p>Expand your team roster</p>
          </div>
          <div className="action-card" onClick={() => navigate("/dashboard/add-event-gallery")}>
            <div className="action-icon">
              <Calendar size={32} />
            </div>
            <h3>Add Event Gallery</h3>
            <p>Showcase your events</p>
          </div>
          <div className="action-card" onClick={() => navigate("/dashboard/add-case-study")}>
            <div className="action-icon">
              <Settings size={32} />
            </div>
            <h3>Add Case Study</h3>
            <p>Document success stories</p>
          </div>
          <div className="action-card" onClick={() => navigate("/dashboard/add-portfolio")}>
            <div className="action-icon">
              <Settings size={32} />
            </div>
            <h3>Add Portfolio</h3>
            <p>Showcase your portfolio projects</p>
          </div>
          <div className="action-card" onClick={() => setActiveTab("create-blog")}>
            <div className="action-icon">
              <PenTool size={32} />
            </div>
            <h3>Create Blog</h3>
            <p>Write and publish content</p>
          </div>
          <div className="action-card" onClick={() => navigate("/dashboard/add-testimonial")}>
            <div className="action-icon">
              <Users size={32} />
            </div>
            <h3>Add Testimonial</h3>
            <p>Showcase customer feedback</p>
          </div>
          <div className="action-card" onClick={() => navigate("/dashboard/add-tips")}>
            <div className="action-icon">
              <Lightbulb size={32} />
            </div>
            <h3>Add Tips</h3>
            <p>Share helpful tips and insights</p>
          </div>
          <div className="action-card" onClick={() => navigate("/dashboard/appointments-received")}>
            <div className="action-icon">
              <Calendar size={32} /> {/* Using Calendar icon as an example; replace with a suitable icon if desired */}
            </div>
            <h3>Appointments Received</h3>
            <p>Manage received appointments</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCreateBlog = () => {
    const sortedPosts = blogsdetail?.posts?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) || [];
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

    return (
      <div className="create-blog-content">
        <div className="page-header">
          <h1 className="page-title">{editingBlogId ? "Edit Blog Post" : "Create New Blog Post"}</h1>
          <p className="page-subtitle">Share your thoughts and insights with your audience</p>
        </div>

        <form onSubmit={handleBlogSubmit} className="blog-form" ref={formRef}>
          <div className="form-grid">
            <div className="form-column">
              <div className="form-group">
                <label className="form-label">
                  Blog Title <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter your blog title"
                  value={blogtitle}
                  onChange={handleBlogtitleChange}
                  maxLength={TITLE_MAX_LENGTH}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Tag <span className="required">*</span>
                </label>
                <div className="custom-dropdown" ref={dropdownReftags}>
                  <div className="dropdown-trigger" onClick={toggleDropdowntags}>
                    <span className="dropdown-text">
                      {selectedOptiontag || "Select a tag"}
                    </span>
                    <ChevronDown size={20} className="dropdown-icon" />
                  </div>
                  {dropdownOpentags && (
                    <div className="dropdown-content">
                      <div className="dropdown-search">
                        <Search size={16} />
                        <input
                          type="text"
                          placeholder="Search tags..."
                          value={filtertags}
                          onChange={handleFilterChangetags}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      <div className="dropdown-options">
                        {tagsname.length > 0 ? (
                          tagsname
                            .filter((item) => item.name.toLowerCase().includes(filtertags))
                            .map((item) => (
                              <div
                                key={item.id}
                                className={`dropdown-option ${selectedOptiontag === item.name ? "selected" : ""}`}
                                onClick={() => handleOptionChangetags(item.name)}
                              >
                                {item.name}
                              </div>
                            ))
                        ) : (
                          <div className="dropdown-loading">
                            <Loader />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Blog Content <span className="required">*</span>
                </label>
                <div className="editor-wrapper">
                  <CKEditor
                    editor={ClassicEditor}
                    data={blogdescription}
                    onReady={(editor) => {
                      editorRef.current = editor;
                    }}
                    onChange={handleCKEditorChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-column">
              <div className="form-group">
                <label className="form-label">
                  Featured Image <span className="required">*</span>
                </label>
                {currentImageUrl && (
                  <div className="current-image">
                    <img src={currentImageUrl} alt="Current Featured Image" style={{ maxWidth: "200px" }} />
                    <p>Current Image</p>
                  </div>
                )}
                <div className="file-upload">
                  <input type="file" accept="image/*" onChange={handleBlogImageChange} id="blog-image" />
                  <label htmlFor="blog-image" className="file-upload-label">
                    <Upload size={24} />
                    <span>Choose Image</span>
                    {blogImage && <span className="file-name">{blogImage.name}</span>}
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Category <span className="required">*</span>
                </label>
                <div className="custom-dropdown" ref={dropdownRefcategory}>
                  <div className="dropdown-trigger" onClick={toggleDropdowncategory}>
                    <span className="dropdown-text">
                      {selectedOptioncategory || "Select a category"}
                    </span>
                    <ChevronDown size={20} className="dropdown-icon" />
                  </div>
                  {dropdownOpencategory && (
                    <div className="dropdown-content">
                      <div className="dropdown-search">
                        <Search size={16} />
                        <input
                          type="text"
                          placeholder="Search categories..."
                          value={filtercategory}
                          onChange={handleFilterChangecategory}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      <div className="dropdown-options">
                        {categoryname.length > 0 ? (
                          categoryname
                            .filter((item) => item.name.toLowerCase().includes(filtercategory))
                            .map((item) => (
                              <div
                                key={item.id}
                                className={`dropdown-option ${selectedOptioncategory === item.name ? "selected" : ""}`}
                                onClick={() => handleOptionChangecategory(item.name)}
                              >
                                {item.name}
                              </div>
                            ))
                        ) : (
                          <div className="dropdown-loading">
                            <Loader />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Quote <span className="required">*</span>
                </label>
                <div className="editor-wrapper">
                  <ReactQuill
                    placeholder="Enter a compelling quote"
                    value={blogquote}
                    onChange={handleBlogquoteChange}
                    modules={quillModules}
                    formats={quillFormats}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              <Plus size={20} />
              {editingBlogId ? "Update Blog" : "Publish Blog"}
            </button>
            {editingBlogId && (
              <button type="button" className="btn-cancel" onClick={() => setEditingBlogId(null)}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        <div className="content-management-section">
          <h2>Content Management</h2>
          <p className="page-subtitle">Organize your content with categories and tags</p>
          <div className="management-grid">
            <div className="management-card">
              <div className="card-header">
                <Folder size={24} />
                <h3>Categories</h3>
              </div>
              <form onSubmit={CreateCategory} className="management-form">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Category name"
                    className="form-input"
                    value={addcategoryname}
                    onChange={handleAddcategorynameChange}
                    required
                  />
                  <button type="submit" className="btn-secondary">
                    <Plus size={16} />
                    Add
                  </button>
                </div>
              </form>
              <div className="category-list">
                {categoryname.map((category) => (
                  <div key={category.id} className="category-item">
                    <span>{category.name}</span>
                    <button
                      className="btn-delete"
                      onClick={() => deleteCategory(category.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="management-card">
              <div className="card-header">
                <Tag size={24} />
                <h3>Tags</h3>
              </div>
              <form onSubmit={CreateTag} className="management-form">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Tag name"
                    className="form-input"
                    value={addtagname}
                    onChange={handleAddtagnameChange}
                    required
                  />
                  <button type="submit" className="btn-secondary">
                    <Plus size={16} />
                    Add
                  </button>
                </div>
              </form>
              <div className="tag-list">
                {tagsname.map((tag) => (
                  <div key={tag.id} className="tag-item">
                    <span>{tag.name}</span>
                    <button
                      className="btn-delete"
                      onClick={() => deleteTag(tag.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="blog-posts-section">
          <h2>Blog Posts</h2>
          <div className="blog-posts-list">
            {currentPosts.length > 0 ? (
              currentPosts.map((post) => (
                <div key={post.id} className="blog-post-item">
                  <img
                    src={post.image_url || "/path/to/default-icon.png"}
                    className="blog-post-img"
                    alt={post.title}
                  />
                  <div className="blog-post-details">
                    <h4>{truncateText(post.title, 6, 10)}</h4>
                    <p>{new Date(post.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}</p>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: truncateText(post.body, 10, 10, /[\d.]+\s/.test(post.body)),
                      }}
                    />
                    <div className="blog-post-actions">
                      <button
                        className="btn-edit"
                        onClick={() => {
                          setEditingBlogId(post.id);
                          formRef.current?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        <Edit size={16} />
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteBlog(post.id)}
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No blog posts available.</p>
            )}
          </div>
          {totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`pagination-btn ${currentPage === page ? "active" : ""}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderComments = () => (
    <div className="comments-content">
      <div className="page-header">
        <h1 className="page-title">Comment Management</h1>
        <p className="page-subtitle">Moderate and manage user comments</p>
      </div>

      <div className="comment-management">
        <div className="blog-sidebar">
          <div className="search-container">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search blog posts..."
              className="search-input"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          <div className="blog-list">
            {filteredModules.length > 0 ? (
              filteredModules.map((blog, index) => (
                <div
                  key={index}
                  className={`blog-item ${blog.id === activeMenuItem ? "active" : ""}`}
                  onClick={() => {
                    handleSetStatusPosttoggle(blog?.is_commentable);
                    handleMenuItemClick(blog?.id);
                    handleSetPosttitle(blog?.title);
                  }}
                >
                  <div
                    className="blog-item-image"
                    style={{
                      backgroundImage: `url(${blog?.image_url})`,
                    }}
                  />
                  <div className="blog-item-content">
                    <h4 className="blog-item-title">
                      {blog?.title && blog?.title.length > 30 ? `${blog?.title.slice(0, 30)}...` : blog?.title}
                    </h4>
                    <button
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteBlog(blog?.id);
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-data">
                <Loader />
                <p>No blog posts available</p>
              </div>
            )}
          </div>
        </div>

        <div className="comment-content">
          {posttitle ? (
            <div className="comment-section">
              <div className="comment-header">
                <div className="comment-title">
                  <MessageSquare size={24} />
                  <h3>{posttitle && posttitle.length > 40 ? `${posttitle.slice(0, 40)}...` : posttitle}</h3>
                </div>
                <div className="comment-toggle">
                  <span>Enable Comments</span>
                  <label className="toggle-switch">
                    <input type="checkbox" checked={posttoggle === 1} onChange={handleToggle} />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="comments-list">
                {commentsdetail?.comments?.length > 0 ? (
                  commentsdetail.comments.map((comment, index) => (
                    <div key={index} className="comment-item">
                      <div className="comment-card">
                        <div className="comment-meta">
                          <span className="comment-author">{comment?.user?.first_name}</span>
                          <span className="comment-number">#{comment?.order}</span>
                          {comment?.is_approved === "1" && (
                            <span className="status-badge approved">
                              <Check size={14} />
                              Approved
                            </span>
                          )}
                        </div>
                        <p className="comment-text">{comment?.body}</p>
                        <div className="comment-actions">
                          {comment?.is_approved === "0" ? (
                            <button
                              className="btn-approve"
                              onClick={() => handleApproveComment(comment?.id)}
                              title="Approve comment"
                            >
                              <Check size={16} />
                              Approve
                            </button>
                          ) : (
                            <button
                              className="btn-hide"
                              onClick={() => handleHideComment(comment?.id)}
                              title="Hide comment"
                            >
                              <EyeOff size={16} />
                              Hide
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-comments">
                    <MessageSquare size={48} />
                    <p>No comments available for this post</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <MessageSquare size={64} />
              <h3>Select a Blog Post</h3>
              <p>Choose a blog post from the sidebar to view and manage its comments</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "create-blog":
        return renderCreateBlog();
      case "comments":
        return renderComments();
      default:
        return renderOverview();
    }
  };

  useEffect(() => {
    if (editingBlogId) {
      const blog = blogsdetail.posts.find((post) => post.id === editingBlogId);
      if (blog) {
        setBlogtitle(blog.title);
        setBlogDescription(blog.body);
        if (editorRef.current) {
          editorRef.current.setData(blog.body);
        }
        setBlogquote(blog.quote);
        const tagId = blog.tag_ids?.[0] || blog.tag_id;
        const categoryId = blog.category_ids?.[0] || blog.category_id;
        setStoretag(tagId);
        setStorecategory(categoryId);
        const tag = tagsname.find((t) => t.id === tagId)?.name;
        setSelectedOptiontag(tag || null);
        const category = categoryname.find((c) => c.id === categoryId)?.name;
        setSelectedOptioncategory(category || null);
        setCurrentImageUrl(blog.image_url);
        formRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setBlogtitle("");
      setBlogDescription("");
      if (editorRef.current) {
        editorRef.current.setData("");
      }
      setBlogquote("");
      setStoretag(null);
      setStorecategory(null);
      setSelectedOptiontag(null);
      setSelectedOptioncategory(null);
      setCurrentImageUrl(null);
    }
  }, [editingBlogId, blogsdetail, tagsname, categoryname]);

  return (
    <div className="dashboard-layout">
      <div className="dashboard-wrapper">
        <div className={`sidebar ${sidebarExpanded ? "expanded" : "collapsed"}`}>
          <nav className="sidebar-nav">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${activeTab === item.id ? "active" : ""}`}
                onClick={() => {
                  if (item.id === "home") {
                    handleHome();
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                title={item.label}
              >
                <item.icon size={20} />
                {sidebarExpanded && <span>{item.label}</span>}
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="user-profile">
              <div className="user-avatar">
                <User size={20} />
              </div>
              {sidebarExpanded && (
                <div className="user-info">
                  <span className="user-name">Admin User</span>
                  <span className="user-role">Administrator</span>
                </div>
              )}
            </div>
            <button className="logout-btn" onClick={handleLogout} title="Logout">
              <LogOut size={16} />
              {sidebarExpanded && <span>Logout</span>}
            </button>
          </div>

          <button
            className="sidebar-toggle-arrow"
            onClick={() => setSidebarExpanded(!sidebarExpanded)}
            title={sidebarExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            {sidebarExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>

        <div className="main-content">
          <div className="dashboard-header">
            <div className="header-content">
              <div className="company-logo">
                <img
                  src={synergytechlogo}
                  alt="360° SynergyTech - Let's Talk about Technology"
                  className="logo-image"
                />
              </div>
              <div className="header-text"></div>
            </div>
          </div>

          <div className="content-body">{renderContent()}</div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this {deleteItemType}?</p>
            <div className="modal-actions">
              <button className="btn-primary" onClick={confirmDelete}>
                Yes
              </button>
              <button className="btn-cancel" onClick={cancelDelete}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {isVisible && (
        <button onClick={scrollToTop} className="scroll-to-top">
          <ArrowUp size={20} />
        </button>
      )}

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <style>{`
        .create-blog-content { padding: 20px; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
        .form-column { display: flex; flex-direction: column; gap: 15px; }
        .form-group { margin-bottom: 15px; }
        .form-label { font-weight: bold; margin-bottom: 5px; }
        .form-input { width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
        .editor-wrapper { border: 1px solid #ccc; border-radius: 4px; }
        .file-upload-label { display: flex; align-items: center; gap: 10px; padding: 8px; border: 1px solid #ccc; border-radius: 4px; cursor: pointer; }
        .file-upload input { display: none; }
        .form-actions { margin-top: 20px; display: flex; gap: 10px; }
        .btn-primary { background-color: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; }
        .btn-primary:hover { background-color: #0056b3; }
        .btn-cancel { background-color: #6c757d; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; }
        .btn-cancel:hover { background-color: #5a6268; }
        .content-management-section { margin-top: 30px; padding: 20px; border-top: 1px solid #e0e0e0; }
        .management-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 15px; }
        .management-card { border: 1px solid #e0e0e0; padding: 15px; border-radius: 5px; }
        .card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 15px; }
        .input-group { display: flex; gap: 10px; }
        .btn-secondary { background-color: #ff6200; color: white; border: none; padding: 8px; border-radius: 4px; cursor: pointer; }
        .btn-secondary:hover { background-color: #e65c00; }
        .category-list, .tag-list { margin-top: 10px; }
        .category-item, .tag-item { padding: 5px 0; display: flex; justify-content: space-between; align-items: center; }
        .btn-delete { background-color: #dc3545; color: white; border: none; padding: 2px 6px; border-radius: 4px; cursor: pointer; }
        .btn-delete:hover { background-color: #c82333; }
        .blog-posts-section { margin-top: 30px; padding: 20px; border-top: 1px solid #e0e0e0; }
        .blog-posts-list { display: flex; flex-direction: column; gap: 15px; }
        .blog-post-item { display: flex; align-items: center; border: 1px solid #e0e0e0; padding: 10px; border-radius: 5px; }
        .blog-post-img { width: 100px; height: 100px; object-fit: cover; margin-right: 15px; }
        .blog-post-details { flex: 1; }
        .blog-post-actions { display: flex; gap: 10px; margin-top: 10px; }
        .btn-edit, .btn-delete { display: flex; align-items: center; gap: 5px; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer; }
        .btn-edit { background-color: #28a745; color: white; }
        .btn-edit:hover { background-color: #218838; }
        .btn-delete { background-color: #dc3545; color: white; }
        .btn-delete:hover { background-color: #c82333; }
        .pagination { display: flex; gap: 5px; margin-top: 15px; justify-content: center; }
        .pagination-btn { padding: 5px 10px; border: 1px solid #ccc; background-color: #fff; border-radius: 4px; cursor: pointer; }
        .pagination-btn.active { background-color: #007bff; color: white; }
        .pagination-btn:hover { background-color: #0056b3; color: white; }
        .current-image { margin-bottom: 10px; }
        .current-image img { max-width: 200px; border-radius: 4px; }
        .logout-btn { display: flex; align-items: center; gap: 5px; background: none; border: none; color: #dc3545; cursor: pointer; padding: 5px; }
        .logout-btn:hover { color: #c82333; }
        .dropdown-option.selected { background-color: #e0e0e0; }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10000;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 300px;
        }
        .modal-actions {
          margin-top: 20px;
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .overview-content { padding: 20px; }
        .welcome-section { margin-bottom: 30px; }
        .welcome-title { font-size: 2rem; font-weight: 600; color: #333; }
        .quick-actions-overview { margin-top: 30px; }
        .section-title { font-size: 1.5rem; font-weight: 600; color: #333; margin-bottom: 15px; }
        .action-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; }
        .action-card { border: 1px solid #e0e0e0; border-radius: 8px; padding: 15px; text-align: center; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
        .action-card:hover { transform: translateY(-5px); box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); }
        .action-icon { margin-bottom: 10px; }
        .action-card h3 { font-size: 1.1rem; font-weight: 500; color: #333; margin-bottom: 5px; }
        .action-card p { font-size: 0.9rem; color: #666; }
      `}</style>
    </div>
  );
}

export default Dashboard;