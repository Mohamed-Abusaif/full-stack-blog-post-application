import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1>📝 Blog Application</h1>
        <nav className="nav">
          <Link to="/posts">Posts</Link>
          <Link to="/posts/create">Create Post</Link>
          <Link to="/authors">Authors</Link>
          <Link to="/authors/create">Create Author</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
