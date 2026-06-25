import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/index";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const res = await API.post("/api/auth/login", { email, password });
        localStorage.setItem("token", res.data.token);
        navigate("/");
      } else {
        await API.post("/api/auth/register", { email, password });
        setIsLogin(true);
      }
    } catch (e) {
      alert(e.response?.data?.message || "Error");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="card" style={{ width: "320px" }}>
        <h2
          style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}
        >
          {isLogin ? "Login" : "Register"}
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "8px 12px",
            marginBottom: "10px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.05)",
            color: "white",
            fontSize: "13px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "8px 12px",
            marginBottom: "16px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.05)",
            color: "white",
            fontSize: "13px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
        <button
          className="btn btn-green"
          style={{ width: "100%", justifyContent: "center" }}
          onClick={handleSubmit}
        >
          {isLogin ? "Login" : "Register"}
        </button>
        <p
          style={{
            textAlign: "center",
            marginTop: "12px",
            fontSize: "12px",
            color: "rgba(255,255,255,0.4)",
            cursor: "pointer",
          }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "No account? Register" : "Have account? Login"}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
