import React, { useState } from 'react';

const TransaksiFormView = ({ categories, onSave, onCancel }) => {
  const [jenis, setJenis] = useState('');
  const [kategori, setKategori] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [keterangan, setKeterangan] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jenis || !kategori || !jumlah) {
      alert('Mohon isi bidang bertanda bintang!');
      return;
    }

    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

    onSave({
      id: Date.now(),
      tanggal: formattedDate,
      jenis,
      kategori,
      jumlah: parseFloat(jumlah),
      keterangan
    });
  };

  const filteredCategories = categories.filter(c => c.jenis === jenis);

  return (
    <div>
      <div className="page-title-container">
        <h2 className="page-title">Tambah Transaksi</h2>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Jenis Transaksi <span>*</span></label>
            <select 
              className="form-control" 
              value={jenis} 
              onChange={(e) => {
                setJenis(e.target.value);
                setKategori('');
              }}
            >
              <option value="">Pilih Jenis</option>
              <option value="Pemasukan">Pemasukan</option>
              <option value="Pengeluaran">Pengeluaran</option>
            </select>
          </div>

          <div className="form-group">
            <label>Kategori <span>*</span></label>
            <select 
              className="form-control" 
              value={kategori} 
              onChange={(e) => setKategori(e.target.value)}
              disabled={!jenis}
            >
              <option value="">Pilih Kategori</option>
              {filteredCategories.map((c) => (
                <option key={c.id} value={c.nama}>{c.nama}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Jumlah <span>*</span></label>
            <input 
              type="number" 
              className="form-control" 
              placeholder="Masukkan jumlah" 
              value={jumlah}
              onChange={(e) => setJumlah(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Keterangan</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Masukkan keterangan" 
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Simpan</button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Batal</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransaksiFormView;