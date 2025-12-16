import { useState } from "react";
import { createQuestion } from "../api/questionApi";
import { useNavigate } from "react-router-dom";

export default function AskQuestion() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitQuestion = async () => {
    if (!message.trim()) {
      alert("Question cannot be empty");
      return;
    }

    try {
      setLoading(true);
      await createQuestion(message);
      navigate("/dashboard");
      setMessage("");
      alert("Question submitted");
    } catch {
      alert("Failed to submit question");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>❓ Ask a Question</h2>

        <textarea
          placeholder="Type your question here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.textarea}
        />

        <button
          onClick={submitQuestion}
          disabled={loading}
          style={styles.button}
        >
          {loading ? "Submitting..." : "Submit Question"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "30vh",
    background: "#f5f7fa",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  textarea: {
    width: "100%",
    minHeight: "120px",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "15px",
    resize: "none",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
};
