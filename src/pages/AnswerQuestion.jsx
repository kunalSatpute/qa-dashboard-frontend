import { useState } from "react";
import { answerQuestion } from "../api/questionApi";

export default function AnswerQuestion({ questionId }) {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const submitAnswer = async () => {
    if (!answer.trim()) return alert("Answer cannot be empty");

    setLoading(true);
    await answerQuestion(questionId, { answer });
    setAnswer("");
    setLoading(false);
  };

  return (
    <div style={styles.box}>
      <h3 style={styles.heading}>✍️ Answer Question</h3>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Write your answer..."
        style={styles.textarea}
      />

      <button onClick={submitAnswer} style={styles.button} disabled={loading}>
        {loading ? "Submitting..." : "Submit Answer"}
      </button>
    </div>
  );
}

const styles = {
  box: {
    marginTop: "15px",
    padding: "15px",
    borderRadius: "8px",
    background: "#f8f9fa",
  },

  heading: {
    marginBottom: "10px",
  },

  textarea: {
    width: "100%",
    minHeight: "80px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },

  button: {
    background: "#007bff",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
