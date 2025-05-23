import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { authorsAPI, postsAPI } from "../services/api";

const AuthorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [authorResponse, postsResponse] = await Promise.all([
          authorsAPI.getById(id),
          postsAPI.getAll(),
        ]);

        setAuthor(authorResponse.data);
        // Filter posts by this author
        const authorPosts = postsResponse.data.filter(
          (post) => post.author === parseInt(id)
        );
        setPosts(authorPosts);
      } catch (err) {
        setError("Failed to fetch author data. Please try again later.");
        console.error("Error fetching author:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this author? This will also delete all their posts."
      )
    ) {
      try {
        await authorsAPI.delete(id);
        navigate("/authors");
      } catch (err) {
        setError("Failed to delete author. Please try again.");
        console.error("Error deleting author:", err);
      }
    }
  };

  if (loading) return <div className="loading">Loading author...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!author) return <div className="error">Author not found.</div>;

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
          <h1>
            {author.first_name} {author.last_name}
          </h1>
          <Link to="/authors" className="btn btn-secondary">
            ← Back to Authors
          </Link>
        </div>

        <div className="author-info">
          <h3>Contact Information</h3>
          <p>
            <strong>Email:</strong> {author.email}
          </p>
          <p>
            <strong>Phone:</strong> {author.phone_number}
          </p>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <h3>
            Posts by {author.first_name} ({posts.length})
          </h3>
          {posts.length === 0 ? (
            <p>No posts found by this author.</p>
          ) : (
            <div style={{ marginTop: "20px" }}>
              {posts.map((post) => (
                <div
                  key={post.id}
                  style={{
                    padding: "16px",
                    border: "1px solid #eee",
                    borderRadius: "6px",
                    marginBottom: "12px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <h4 style={{ margin: "0 0 8px 0" }}>
                    <Link
                      to={`/posts/${post.id}`}
                      style={{ textDecoration: "none", color: "#667eea" }}
                    >
                      {post.title}
                    </Link>
                  </h4>
                  <p style={{ margin: "0", color: "#666", fontSize: "14px" }}>
                    {post.content.length > 150
                      ? `${post.content.substring(0, 150)}...`
                      : post.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="post-actions">
          <Link to={`/authors/${author.id}/edit`} className="btn btn-primary">
            Edit Author
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            Delete Author
          </button>
          <Link to="/posts/create" className="btn btn-secondary">
            Create Post for {author.first_name}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthorDetail;
