import React from "react";
import { FaHouse } from "react-icons/fa6";
import { FaDatabase, FaArrowRightArrowLeft, FaRightFromBracket } from "react-icons/fa6";

const Sidebar = ({ activeMenu, setActiveMenu }) => {

  // Fungsi logout
  const handleLogout = () => {
    localStorage.removeItem("fintrack_user");

    window.location.href = "/login";
  };

  return (
    <div className="sidebar">

      <div>

        {/* BRAND */}
        <div className="brand">
          <div className="brand-icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
              <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
              <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
            </svg>
          </div>

          <span>FinTrack</span>
        </div>

        {/* MENU */}
        <ul className="sidebar-menu">

          {/* DASHBOARD / BERANDA */}
          <li
            className={`menu-item ${
              activeMenu === "dashboard" ? "active" : ""
            }`}
            onClick={() => setActiveMenu("dashboard")}
            style={{ cursor: "pointer" }}
          >
            <span className="menu-icon">
              <FaHouse />
            </span>

            <span>Dashboard</span>
          </li>

          {/* MASTER DATA */}
          <li
            className={`menu-item ${
              activeMenu === "masterData" ? "active" : ""
            }`}
            onClick={() => setActiveMenu("masterData")}
            style={{ cursor: "pointer" }}
          >
            <span className="menu-icon">
              <FaDatabase />
            </span>

            <span>Master Data</span>
          </li>

          {/* TRANSAKSI */}
          <li
            className={`menu-item ${
              activeMenu === "transaksi" ? "active" : ""
            }`}
            onClick={() => setActiveMenu("transaksi")}
            style={{ cursor: "pointer" }}
          >
            <span className="menu-icon">
              <FaArrowRightArrowLeft  />
            </span>

            <span>Transaksi Keuangan</span>
          </li>

        </ul>
      </div>

      {/* FOOTER */}
      <div className="sidebar-footer">

        <button
          className="logout-btn"
          onClick={handleLogout}
          type="button"
        >
          <span>
            <FaRightFromBracket />
          </span>

          Logout
        </button>

      </div>

    </div>
  );
};

export default Sidebar;
