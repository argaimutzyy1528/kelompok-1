
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import "./Register.css";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validasi input kosong
    if (!name || !email || !password || !confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Data belum lengkap",
        text: "Silakan isi semua data terlebih dahulu.",
        confirmButtonText: "OK",
      });

      return;
    }

    // Validasi password
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password tidak sama",
        text: "Password dan konfirmasi password harus sama.",
        confirmButtonText: "OK",
      });

      return;
    }

    // Validasi panjang password
    if (password.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Password terlalu pendek",
        text: "Password minimal 6 karakter.",
        confirmButtonText: "OK",
      });

      return;
    }

    try {
      // Ambil semua user dari json-server
      const response = await fetch(
        "http://localhost:3002/users"
      );

      if (!response.ok) {
        throw new Error("Gagal mengambil data user");
      }

      const users = await response.json();

      // Cek apakah email sudah digunakan
      const emailSudahAda = users.some(
        (user) =>
          user.email.toLowerCase() === email.toLowerCase()
      );

      if (emailSudahAda) {
        Swal.fire({
          icon: "warning",
          title: "Email sudah terdaftar",
          text: "Silakan gunakan email yang lain.",
          confirmButtonText: "OK",
        });

        return;
      }

      // Data user baru
      const newUser = {
        nama: name,
        email: email,
        password: password,
      };

      // Simpan user ke json-server
      const registerResponse = await fetch(
        "http://localhost:3002/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      if (!registerResponse.ok) {
        throw new Error("Gagal membuat akun");
      }

      // SweetAlert berhasil
      await Swal.fire({
        icon: "success",
        title: "Registrasi Berhasil!",
        text: "Akun berhasil dibuat. Silakan login.",
        confirmButtonText: "Login Sekarang",
      });

      // Setelah klik tombol SweetAlert
      // langsung pindah ke halaman login
      navigate("/login");

    } catch (error) {
      console.error("Error register:", error);

      Swal.fire({
        icon: "error",
        title: "Registrasi Gagal",
        text: "Tidak dapat terhubung ke server. Pastikan json-server sedang berjalan!",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">

        <h2>Register</h2>

        <p className="register-subtitle">
          Silakan buat akun Anda
        </p>

        <form onSubmit={handleRegister}>

          {/* Nama */}
          <div className="form-group">
            <label htmlFor="name">
              Nama
            </label>

            <input
              type="text"
              id="name"
              placeholder="Masukkan nama"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              type="email"
              id="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <div className="password-input">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                id="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                type="button"
                className="show-password"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                aria-label={
                  showPassword
                    ? "Sembunyikan password"
                    : "Tampilkan password"
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <IoEyeSharp />
                )}
              </button>

            </div>
          </div>

          {/* Konfirmasi Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword">
              Konfirmasi Password
            </label>

            <div className="password-input">

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                id="confirmPassword"
                placeholder="Masukkan ulang password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
              />

              <button
                type="button"
                className="show-password"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                aria-label={
                  showConfirmPassword
                    ? "Sembunyikan konfirmasi password"
                    : "Tampilkan konfirmasi password"
                }
              >
                {showConfirmPassword ? (
                  <IoEyeSharp />
                ) : (
                  <FaEyeSlash />
                )}
              </button>

            </div>
          </div>

          {/* Tombol Register */}
          <button
            type="submit"
            className="register-button"
          >
            Register
          </button>

        </form>

        {/* Link Login */}
        <p className="login-text">
          Sudah punya akun?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;
