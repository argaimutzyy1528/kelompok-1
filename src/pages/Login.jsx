import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import "./Login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!email || !password) {
      alert("Email dan password harus diisi!");
      return;
    }

    try {
      // Ambil data user dari json-server
      const response = await fetch("http://localhost:3002/users");

      if (!response.ok) {
        throw new Error("Gagal mengambil data user");
      }

      const users = await response.json();

      // Cari user berdasarkan email dan password
      const user = users.find(
        (item) =>
          item.email === email &&
          item.password === password
      );

      // Jika user tidak ditemukan
      if (!user) {
        alert("Email atau password salah!");
        return;
      }

      // Simpan data user ke localStorage
      localStorage.setItem(
        "fintrack_user",
        JSON.stringify(user)
      );

      // Masuk ke dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error("Error login:", error);

      alert(
        "Tidak dapat terhubung ke server. Pastikan json-server sedang berjalan!"
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h2>Login</h2>

        <p className="login-subtitle">
          Silakan masuk ke akun Anda
        </p>

        <form onSubmit={handleLogin}>

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
              onChange={(e) => setEmail(e.target.value)}
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
                  <IoEyeSharp />
                ) : (
                  <FaEyeSlash />
                )}
              </button>

            </div>
          </div>

          {/* Tombol Login */}
          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>

        </form>

        {/* Register */}
        <p className="register-text">
          Belum punya akun?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
