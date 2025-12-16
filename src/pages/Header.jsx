import { useNavigate } from "react-router-dom";
import { logout } from "../api/authApi";

export default function Header() {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("userId"));
  const username = localStorage.getItem("username");

  const logoutbutton = async () => {
    try {
      await logout(userId);
      alert("Logout successfully");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
      navigate("/");
    } catch {
      alert("Failed logout");
    }
  };

  return (
    <div style={styles.header}>
      <h3>💬 Q&A Dashboard</h3>

      {userId ? (
        <div style={styles.right}>
          <span>{username}</span>
          <button onClick={logoutbutton} style={styles.logout}>
            Logout
          </button>
        </div>
      ) : (
        <div style={styles.right}>
          <span>Guest</span>
          <button style={styles.login} onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 16px",
    background: "#343a40",
    color: "white",
    alignItems: "center",
  },
  right: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  logout: {
    background: "#dc3545",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  login: {
    background: "#1aeb0fff",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
