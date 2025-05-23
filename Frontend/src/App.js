import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import AuthorList from "./components/AuthorList";
import AuthorDetail from "./components/AuthorDetail";
import CreateAuthor from "./components/CreateAuthor";
import EditAuthor from "./components/EditAuthor";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/posts/create" element={<CreatePost />} />
          <Route path="/posts/:id/edit" element={<EditPost />} />
          <Route path="/authors" element={<AuthorList />} />
          <Route path="/authors/:id" element={<AuthorDetail />} />
          <Route path="/authors/create" element={<CreateAuthor />} />
          <Route path="/authors/:id/edit" element={<EditAuthor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
