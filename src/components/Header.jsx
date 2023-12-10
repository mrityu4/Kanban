import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import settinglogo from "../assets/setting.png";
import angle from "../assets/angle.png";
import "./Header.css";

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const {
    groupingOption,
    orderingOption,
    setGroupingOption,
    setOrderingOption,
  } = useAuth();

  const handleGroupingChange = (event) => {
    const newGroupingOption = event.target.value;
    setGroupingOption(newGroupingOption);
    // console.log('Selected Grouping Option:', newGroupingOption);
  };

  const handleOrderingChange = (event) => {
    const newOrderingOption = event.target.value;
    setOrderingOption(newOrderingOption);
    console.log("Selected Ordering Option:", newOrderingOption);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="head">
      <button
        className="butt"
        onClick={toggleDropdown}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={settinglogo}
          alt="Icon"
          style={{ width: "15px", height: "15px", marginRight: "5px" }}
        />
        Display{" "}
        <img
          src={angle}
          style={{ width: "15px", height: "15px", marginLeft: "5px" }}
        />
      </button>
      {dropdownVisible && (
        <div className="options">
          <label>Grouping</label>
          <select value={groupingOption} onChange={handleGroupingChange}>
            <option value="statuses">Status</option>
            <option value="uniqueUsers">User</option>
            <option value="priorities">Priority</option>
          </select>
          <br />
          <br />
          <label>Ordering</label>
          <select value={orderingOption} onChange={handleOrderingChange}>
            <option value="Priority">Priority</option>
            <option value="Title">Title</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default Header;
