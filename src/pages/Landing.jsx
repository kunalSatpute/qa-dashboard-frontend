import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>💬 Q&A Dashboard</h1>
      <p style={styles.subtitle}>
        Ask questions, get answers in real time
      </p>

      <div style={styles.buttonGroup}>
        <button
          style={{ ...styles.button, ...styles.adminRegister }}
          onClick={() => navigate("/register")}
        >
          📝 Register as Admin
        </button>

        <button
          style={{ ...styles.button, ...styles.adminLogin }}
          onClick={() => navigate("/login")}
        >
          🔐 Login as Admin
        </button>

        <button
          style={{ ...styles.button, ...styles.guest }}
          onClick={() => navigate("/dashboard")}
        >
          👤 Continue as Guest
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    textAlign: "center",
  },

  title: {
    fontSize: "36px",
    marginBottom: "10px",
  },

  subtitle: {
    fontSize: "16px",
    marginBottom: "30px",
    opacity: 0.9,
  },

  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "260px",
  },

  button: {
    padding: "14px",
    fontSize: "15px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "transform 0.2s",
  },

  adminRegister: {
    background: "#28a745",
    color: "white",
  },

  adminLogin: {
    background: "#007bff",
    color: "white",
  },

  guest: {
    background: "#f8f9fa",
    color: "#333",
  },
};

