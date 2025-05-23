import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { postsAPI, authorsAPI } from "../services/api";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [authors, setAuthors] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postResponse, authorsResponse] = await Promise.all([
          postsAPI.getById(id),
          authorsAPI.getAll(),
        ]);

        setFormData({
          title: postResponse.data.title,
          content: postResponse.data.content,
          author: postResponse.data.author,
        });
        setAuthors(authorsResponse.data);
      } catch (err) {
        setError("Failed to fetch post data. Please try again later.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await postsAPI.update(id, formData);
      setSuccess("Post updated successfully!");
      setTimeout(() => {
        navigate(`/posts/${id}`);
      }, 1500);
    } catch (err) {
      setError("Failed to update post. Please check your input and try again.");
      console.error("Error updating post:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading">Loading post...</div>;

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
          <h2>Edit Post</h2>
          <Link to={`/posts/${id}`} className="btn btn-secondary">
            ← Back to Post
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
              disabled={submitting}
            >
              {submitting ? "Updating..." : "Update Post"}
            </button>
            <Link to={`/posts/${id}`} className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
