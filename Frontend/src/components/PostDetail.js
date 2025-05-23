import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { postsAPI, authorsAPI } from "../services/api";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postResponse = await postsAPI.getById(id);
        const postData = postResponse.data;
        setPost(postData);

        // Fetch author details
        const authorResponse = await authorsAPI.getById(postData.author);
        setAuthor(authorResponse.data);
      } catch (err) {
        setError("Failed to fetch post. Please try again later.");
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await postsAPI.delete(id);
        navigate("/posts");
      } catch (err) {
        setError("Failed to delete post. Please try again.");
        console.error("Error deleting post:", err);
      }
    }
  };

  if (loading) return <div className="loading">Loading post...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!post) return <div className="error">Post not found.</div>;

  return (
    <div className="container">
      <div className="card">
        <h1 className="post-title">{post.title}</h1>

        {author && (
          <div className="author-info">
            <h3>About the Author</h3>
            <p>
              <strong>
                {author.first_name} {author.last_name}
              </strong>
            </p>
            <p>Email: {author.email}</p>
            <p>Phone: {author.phone_number}</p>
          </div>
        )}

        <div className="post-content">
          {post.content.split("\n").map((paragraph, index) => (
            <p key={index} style={{ marginBottom: "16px" }}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className="post-actions">
          <Link to="/posts" className="btn btn-secondary">
            ← Back to Posts
          </Link>
          <Link to={`/posts/${post.id}/edit`} className="btn btn-primary">
            Edit Post
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            Delete Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
