
import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DashboardView from "./components/DashboardView";
import MasterDataView from "./components/MasterDataView";
import TransaksiFormView from "./components/TransaksiFormView";

import Login from "./pages/Login";
import Register from "./pages/Register";

import "./App.css";

// ===============================
// MAIN DASHBOARD
// ===============================
function MainDashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const [categories, setCategories] = useState([
    {
      id: 1,
      nama: "Gaji",
      jenis: "Pemasukan",
    },
    {
      id: 2,
      nama: "Bonus",
      jenis: "Pemasukan",
    },
    {
      id: 3,
      nama: "Belanja",
      jenis: "Pengeluaran",
    },
  ]);

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      tanggal: "04/11/2026",
      jenis: "Pemasukan",
      kategori: "Gaji",
      jumlah: 2500000,
      keterangan: "Gaji Bulanan",
    },
    {
      id: 2,
      tanggal: "03/11/2026",
      jenis: "Pengeluaran",
      kategori: "Belanja",
      jumlah: 200000,
      keterangan: "Belanja Mingguan",
    },
    {
      id: 3,
      tanggal: "02/11/2026",
      jenis: "Pemasukan",
      kategori: "Bonus",
      jumlah: 500000,
      keterangan: "Bonus Project",
    },
  ]);

  const handleAddTransaction = (newTx) => {
    setTransactions((prev) => [newTx, ...prev]);
    setActiveMenu("dashboard");
  };

  return (
    <div className="app-container">
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      <div className="main-content">
        <Header />

        <div className="content-body">
          {activeMenu === "dashboard" && (
            <DashboardView transactions={transactions} />
          )}

          {activeMenu === "masterData" && (
            <MasterDataView
              categories={categories}
              setCategories={setCategories}
              onNavigateToAddCategory={() =>
                alert(
                  "Fitur Tambah Kategori dapat dikembangkan serupa dengan Form Transaksi."
                )
              }
            />
          )}

          {activeMenu === "transaksi" && (
            <TransaksiFormView
              categories={categories}
              onSave={handleAddTransaction}
              onCancel={() => setActiveMenu("dashboard")}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ===============================
// PROTECTED ROUTE
// ===============================
function ProtectedRoute({ children }) {
  const user = localStorage.getItem("fintrack_user");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// ===============================
// APP
// ===============================
export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainDashboard />
            </ProtectedRoute>
          }
        />

        {/* ROOT */}
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        {/* ROUTE TIDAK DITEMUKAN */}
        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}
