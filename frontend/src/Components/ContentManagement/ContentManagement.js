import React, { useState } from "react";
import axiosInstance from "./../api/axiosInstance";
import { Folder, Tag, Plus } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Sign/Dashboard.css";

const ContentManagement = () => {
  const [addcategoryname, setAddcategoryname] = useState("");
  const [addtagname, setAddtagname] = useState("");
  const [categoryname, setCategoryname] = useState([]);
  const [tagsname, setTagsname] = useState([]);

  // Validation constants
  const MIN_LENGTH = 1;
  const MAX_LENGTH = 30;

  // Fetch categories
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

  // Fetch tags
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

  // Validate input length
  const validateInput = (input, type) => {
    if (input.length < MIN_LENGTH) {
      toast.error(`${type} must be at least ${MIN_LENGTH} character`, {
        position: "top-right",
        autoClose: 4000,
      });
      return false;
    }
    if (input.length > MAX_LENGTH) {
      toast.error(`${type} must not exceed ${MAX_LENGTH} characters`, {
        position: "top-right",
        autoClose: 4000,
      });
      return false;
    }
    return true;
  };

  // Handle category name input change
  const handleAddcategorynameChange = (event) => {
    const value = event.target.value;
    setAddcategoryname(value);
  };

  // Handle tag name input change
  const handleAddtagnameChange = (event) => {
    const value = event.target.value;
    setAddtagname(value);
  };

  // Create new category
  const CreateCategory = (e) => {
    e.preventDefault();
    
    if (!validateInput(addcategoryname, "Category")) {
      return;
    }

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

  // Create new tag
  const CreateTag = (e) => {
    e.preventDefault();
    
    if (!validateInput(addtagname, "Tag")) {
      return;
    }

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

  // Fetch initial data
  React.useEffect(() => {
    getCategoryData();
    getTagsData();
  }, []);

  return (
    <div className="manage-content mt-12">
      <div className="page-header">
        <h1 className="page-title">Content Management</h1>
        <p className="page-subtitle">Organize your content with categories and tags</p>
      </div>

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
                maxLength={MAX_LENGTH}
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
                maxLength={MAX_LENGTH}
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
              </div>
            ))}
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default ContentManagement;