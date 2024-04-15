import "./Sidebar.css";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ show }) => {
  return (
    <div className={show ? "sidebar active" : "sidebar"}>
      <ul>
        <li>browse</li>
        <li>about</li>
        <li>sources</li>
      </ul>
    </div>
  );
};

export default Sidebar;
