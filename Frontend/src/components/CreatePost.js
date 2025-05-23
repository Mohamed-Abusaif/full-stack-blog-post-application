import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { postsAPI, authorsAPI } from "../services/api";

const CreatePost = () => {
  const navigate = useNavigate();
  const [authors, setAuthors] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await authorsAPI.getAll();
        setAuthors(response.data);
      } catch (err) {
        setError("Failed to fetch authors. Please try again later.");
        console.error("Error fetching authors:", err);
      }
    };

    fetchAuthors();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await postsAPI.create(formData);
      setSuccess("Post created successfully!");
      setTimeout(() => {
        navigate(`/posts/${response.data.id}`);
      }, 1500);
    } catch (err) {
      setError("Failed to create post. Please check your input and try again.");
      console.error("Error creating post:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h2>Create New Post</h2>
          <Link to="/posts" className="btn btn-secondary">
            ← Back to Posts
          </Link>
        </div>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
              required
              placeholder="Enter post title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author *</label>
            <select
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select an author</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.first_name} {author.last_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="content">Content *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="form-control textarea"
              required
              placeholder="Write your post content here..."
              rows="10"
            />
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Post"}
            </button>
            <Link to="/posts" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>

        {authors.length === 0 && (
          <div
            style={{
              marginTop: "20px",
              padding: "16px",
              background: "#fff3cd",
              border: "1px solid #ffeaa7",
              borderRadius: "6px",
            }}
          >
            <p>
              No authors found.{" "}
              <Link to="/authors/create">Create an author first</Link> before
              creating a post.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
