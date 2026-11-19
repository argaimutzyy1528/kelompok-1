
import React from "react";

import {
  FaMoneyBillWave,
  FaArrowDown,
  FaWallet,
  FaCalendarAlt,
  FaTags,
  FaMoneyCheckAlt,
} from "react-icons/fa";

const DashboardView = ({ transactions }) => {
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(number);
  };

  const totalPemasukan = transactions
    .filter((t) => t.jenis === "Pemasukan")
    .reduce((acc, curr) => acc + Number(curr.jumlah), 0);

  const totalPengeluaran = transactions
    .filter((t) => t.jenis === "Pengeluaran")
    .reduce((acc, curr) => acc + Number(curr.jumlah), 0);

  const saldoAkhir = totalPemasukan - totalPengeluaran;

  return (
    <div>

      {/* TITLE */}
      <div className="page-title-container">
        <h2 className="page-title">
          Dashboard
        </h2>
      </div>

      {/* SUMMARY CARDS */}
      <div className="cards-grid">

        {/* PEMASUKAN */}
        <div className="summary-card pemasukan">
          <div className="card-icon">
            <FaMoneyBillWave />
          </div>

          <div className="card-info">
            <span>Total Pemasukan</span>
            <h3>
              {formatRupiah(totalPemasukan)}
            </h3>
          </div>
        </div>

        {/* PENGELUARAN */}
        <div className="summary-card pengeluaran">
          <div className="card-icon">
            <FaArrowDown />
          </div>

          <div className="card-info">
            <span>Total Pengeluaran</span>
            <h3>
              {formatRupiah(totalPengeluaran)}
            </h3>
          </div>
        </div>

        {/* SALDO */}
        <div className="summary-card saldo">
          <div className="card-icon">
            <FaWallet />
          </div>

          <div className="card-info">
            <span>Saldo Akhir</span>
            <h3>
              {formatRupiah(saldoAkhir)}
            </h3>
          </div>
        </div>

      </div>

      {/* TRANSAKSI TERBARU */}
      <div className="table-card">

        <h4>
          <FaMoneyCheckAlt />
          {" "}Transaksi Terbaru
        </h4>

        <table className="custom-table">

          <thead>
            <tr>
              <th>
                <FaCalendarAlt /> Tanggal
              </th>

              <th>
                Jenis
              </th>

              <th>
                <FaTags /> Kategori
              </th>

              <th>
                <FaMoneyBillWave /> Jumlah
              </th>
            </tr>
          </thead>

          <tbody>

            {transactions.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  Belum ada transaksi
                </td>
              </tr>
            ) : (
              transactions.slice(0, 5).map((item) => (
                <tr key={item.id}>

                  <td>
                    {item.tanggal}
                  </td>

                  <td>
                    {item.jenis}
                  </td>

                  <td>
                    {item.kategori}
                  </td>

                  <td>
                    {formatRupiah(item.jumlah)}
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

export default DashboardView;
