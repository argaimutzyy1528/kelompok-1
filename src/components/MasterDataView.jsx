import React, { useState } from "react";
import Swal from "sweetalert2";

const MasterDataView = ({
  categories,
  setCategories,
  onNavigateToAddCategory,
}) => {
  const [showForm, setShowForm] = useState(false);

  const [nama, setNama] = useState("");
  const [jenis, setJenis] = useState("Pemasukan");

  const [editId, setEditId] = useState(null);

  // =========================
  // TAMBAH / EDIT KATEGORI
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nama.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Nama kategori kosong",
        text: "Silakan masukkan nama kategori.",
        confirmButtonText: "OK",
      });

      return;
    }

    // EDIT
    if (editId !== null) {
      setCategories(
        categories.map((item) =>
          item.id === editId
            ? {
                ...item,
                nama: nama,
                jenis: jenis,
              }
            : item
        )
      );

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Kategori berhasil diperbarui.",
        confirmButtonText: "OK",
      });
    }

    // TAMBAH
    else {
      const newCategory = {
        id: Date.now(),
        nama: nama,
        jenis: jenis,
      };

      setCategories([
        ...categories,
        newCategory,
      ]);

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Kategori berhasil ditambahkan.",
        confirmButtonText: "OK",
      });
    }

    // Reset form
    setNama("");
    setJenis("Pemasukan");
    setEditId(null);
    setShowForm(false);
  };

  // =========================
  // BUKA FORM TAMBAH
  // =========================
  const handleAdd = () => {
    setNama("");
    setJenis("Pemasukan");
    setEditId(null);
    setShowForm(true);

    // Tetap jalankan callback jika diperlukan
    if (onNavigateToAddCategory) {
      onNavigateToAddCategory();
    }
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (item) => {
    setNama(item.nama);
    setJenis(item.jenis);
    setEditId(item.id);
    setShowForm(true);
  };

  // =========================
  // HAPUS
  // =========================
  const handleDelete = (id) => {
    const item = categories.find(
      (category) => category.id === id
    );

    Swal.fire({
      title: "Hapus kategori?",
      text: `Kategori "${item?.nama}" akan dihapus.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setCategories(
          categories.filter(
            (category) => category.id !== id
          )
        );

        Swal.fire({
          icon: "success",
          title: "Terhapus!",
          text: "Kategori berhasil dihapus.",
          confirmButtonText: "OK",
        });
      }
    });
  };

  // =========================
  // BATAL FORM
  // =========================
  const handleCancel = () => {
    setNama("");
    setJenis("Pemasukan");
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div>

      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}
      <div className="page-title-container">

        <div>
          <h2 className="page-title">
            Data Kategori
          </h2>

          <p className="page-subtitle">
            Kelola kategori keuangan
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={handleAdd}
        >
          + Tambah Kategori
        </button>

      </div>

      {/* ========================= */}
      {/* FORM TAMBAH / EDIT */}
      {/* ========================= */}
      {showForm && (
        <div className="table-card">

          <h4>
            {editId !== null
              ? "Edit Kategori"
              : "Tambah Kategori"}
          </h4>

          <form onSubmit={handleSubmit}>

            {/* Nama */}
            <div className="form-group">
              <label htmlFor="namaKategori">
                Nama Kategori
              </label>

              <input
                type="text"
                id="namaKategori"
                placeholder="Masukkan nama kategori"
                value={nama}
                onChange={(e) =>
                  setNama(e.target.value)
                }
              />
            </div>

            {/* Jenis */}
            <div className="form-group">
              <label htmlFor="jenisKategori">
                Jenis
              </label>

              <select
                id="jenisKategori"
                value={jenis}
                onChange={(e) =>
                  setJenis(e.target.value)
                }
              >
                <option value="Pemasukan">
                  Pemasukan
                </option>

                <option value="Pengeluaran">
                  Pengeluaran
                </option>
              </select>
            </div>

            {/* Tombol */}
            <div className="action-buttons">

              <button
                type="submit"
                className="btn btn-primary"
              >
                {editId !== null
                  ? "Simpan Perubahan"
                  : "Tambah Kategori"}
              </button>

              <button
                type="button"
                className="btn btn-danger"
                onClick={handleCancel}
              >
                Batal
              </button>

            </div>

          </form>

        </div>
      )}

      {/* ========================= */}
      {/* TABLE */}
      {/* ========================= */}
      <div className="table-card">

        <table className="custom-table">

          <thead>
            <tr>
              <th style={{ width: "60px" }}>
                No
              </th>

              <th>
                Nama Kategori
              </th>

              <th>
                Jenis
              </th>

              <th style={{ width: "140px" }}>
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>

            {categories.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "center",
                  }}
                >
                  Belum ada kategori.
                </td>
              </tr>
            ) : (
              categories.map((item, index) => (
                <tr key={item.id}>

                  <td>
                    {index + 1}
                  </td>

                  <td>
                    {item.nama}
                  </td>

                  <td>
                    {item.jenis}
                  </td>

                  <td>

                    <div className="action-buttons">

                      {/* EDIT */}
                      <button
                        type="button"
                        className="btn btn-edit"
                        onClick={() =>
                          handleEdit(item)
                        }
                      >
                        Edit
                      </button>

                      {/* HAPUS */}
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() =>
                          handleDelete(item.id)
                        }
                      >
                        Hapus
                      </button>

                    </div>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default MasterDataView;
