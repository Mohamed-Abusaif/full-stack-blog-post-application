import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postsAPI, authorsAPI } from "../services/api";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsResponse, authorsResponse] = await Promise.all([
          postsAPI.getAll(),
          authorsAPI.getAll(),
        ]);
        setPosts(postsResponse.data);
        setAuthors(authorsResponse.data);
      } catch (err) {
        setError("Failed to fetch posts. Please try again later.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getAuthorName = (authorId) => {
    const author = authors.find((a) => a.id === authorId);
    return author
      ? `${author.first_name} ${author.last_name}`
      : "Unknown Author";
  };

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await postsAPI.delete(postId);
        setPosts(posts.filter((post) => post.id !== postId));
      } catch (err) {
        setError("Failed to delete post. Please try again.");
        console.error("Error deleting post:", err);
      }
    }
  };

  if (loading) return <div className="loading">Loading posts...</div>;
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
        <h2>All Blog Posts</h2>
        <Link to="/posts/create" className="btn btn-primary">
          Create New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="card">
          <p>
            No posts found.{" "}
            <Link to="/posts/create">Create your first post!</Link>
          </p>
        </div>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="card">
            <h3 className="post-title">
              <Link
                to={`/posts/${post.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {post.title}
              </Link>
            </h3>
            <div className="post-meta">By {getAuthorName(post.author)}</div>
            <div className="post-content">
              {post.content.length > 200
                ? `${post.content.substring(0, 200)}...`
                : post.content}
            </div>
            <div className="post-actions">
              <Link
                to={`/posts/${post.id}`}
                className="btn btn-primary btn-small"
              >
                Read More
              </Link>
              <Link
                to={`/posts/${post.id}/edit`}
                className="btn btn-secondary btn-small"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(post.id)}
                className="btn btn-danger btn-small"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
