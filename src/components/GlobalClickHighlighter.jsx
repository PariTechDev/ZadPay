// components/GlobalClickHighlighter.jsx
import React from "react";
import { highlightClickableElements } from "../utils/highlightClickable";

const GlobalClickHighlighter = ({ children }) => {
  const handleGlobalClick = (e) => {
    if (!e.target.closest("[data-clickable='true']")) {
      highlightClickableElements();
    }
  };

  return (
    <div onClick={handleGlobalClick}>
      {children}
    </div>
  );
};

export default GlobalClickHighlighter;