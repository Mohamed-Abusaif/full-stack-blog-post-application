import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { authorsAPI } from "../services/api";

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await authorsAPI.getAll();
        setAuthors(response.data);
      } catch (err) {
        setError("Failed to fetch authors. Please try again later.");
        console.error("Error fetching authors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  const handleDelete = async (authorId) => {
    if (window.confirm("Are you sure you want to delete this author?")) {
      try {
        await authorsAPI.delete(authorId);
        setAuthors(authors.filter((author) => author.id !== authorId));
      } catch (err) {
        setError("Failed to delete author. Please try again.");
        console.error("Error deleting author:", err);
      }
    }
  };

  if (loading) return <div className="loading">Loading authors...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h2>All Authors</h2>
        <Link to="/authors/create" className="btn btn-primary">
          Create New Author
        </Link>
      </div>

      {authors.length === 0 ? (
        <div className="card">
          <p>
            No authors found.{" "}
            <Link to="/authors/create">Create your first author!</Link>
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {authors.map((author) => (
            <div key={author.id} className="card">
              <h3 style={{ marginBottom: "12px", color: "#333" }}>
                <Link
                  to={`/authors/${author.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {author.first_name} {author.last_name}
                </Link>
              </h3>
              <div style={{ marginBottom: "16px" }}>
                <p style={{ margin: "4px 0", color: "#666" }}>
                  <strong>Email:</strong> {author.email}
                </p>
                <p style={{ margin: "4px 0", color: "#666" }}>
                  <strong>Phone:</strong> {author.phone_number}
                </p>
              </div>
              <div className="post-actions">
                <Link
                  to={`/authors/${author.id}`}
                  className="btn btn-primary btn-small"
                >
                  View Details
                </Link>
                <Link
                  to={`/authors/${author.id}/edit`}
                  className="btn btn-secondary btn-small"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(author.id)}
                  className="btn btn-danger btn-small"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuthorList;
