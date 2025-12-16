import { useEffect, useState } from "react";
import { getQuestions, answerQuestion, markAnswered } from "../api/questionApi";
import { connectSocket } from "../websocket/socket";
import AskQuestion from "./AskQuestion";
import LogoutButton from "./Header";
import Header from "./Header";

export default function Dashboard() {
  const [notify, setNotify] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answerText, setAnswerText] = useState({});
  const isAdmin = localStorage.getItem("role") === "ADMIN";

  const loadQuestions = async () => {
    const data = await getQuestions();
    setQuestions(data);
  };

  useEffect(() => {
    loadQuestions();

    connectSocket((event) => {
      if (event.event === "NEW_QUESTION") {
        loadQuestions();

        // 🔔 Notify admin only
        if (localStorage.getItem("role") === "ADMIN") {
          setNotify("📢 New question submitted!");
          setTimeout(() => setNotify(""), 3000);
        }
      }

      if (
        event.event === "ANSWERED" ||
        event.event === "ESCALATED" ||
        event.event === "NEW_ANSWER"
      ) {
        loadQuestions();
      }
    });
  }, []);

  const submitAnswer = async (id) => {
    if (!answerText[id]?.trim()) return;
    await answerQuestion(id, answerText[id]);
    setAnswerText({ ...answerText, [id]: "" });
  };

  return (
    <div style={styles.container}>
      <Header />
      {notify && (
        <div
          style={{
            background: "#007bff",
            color: "white",
            padding: "10px",
            textAlign: "center",
            borderRadius: "6px",
            marginBottom: "10px",
          }}
        >
          {notify}
        </div>
      )}

      <AskQuestion />
      <h2 style={styles.title}>📢 Q&A Forum</h2>

      {questions.map((q) => (
        <div
          key={q.id}
          style={{
            ...styles.card,
            ...(q.status === "ESCALATED" && styles.escalated),
            ...(q.status === "ANSWERED" && styles.answered),
          }}
        >
          <div style={styles.header}>
            <p style={styles.question}>{q.message}</p>
            <span
              style={{
                ...styles.badge,
                ...(q.status === "ESCALATED" && styles.badgeEscalated),
                ...(q.status === "ANSWERED" && styles.badgeAnswered),
                ...(q.status === "PENDING" && styles.badgePending),
              }}
            >
              {q.status}
            </span>
          </div>

          <small style={styles.time}>
            {new Date(q.created_at).toLocaleString()}
          </small>

          {/* Answers */}
          {q.answers?.length > 0 && (
            <div style={styles.answers}>
              {q.answers.map((a) => (
                <div key={a.id} style={styles.answer}>
                  {a.answer}
                </div>
              ))}
            </div>
          )}

          {/* Answer box */}
          <textarea
            placeholder="Write your answer..."
            value={answerText[q.id] || ""}
            onChange={(e) =>
              setAnswerText({ ...answerText, [q.id]: e.target.value })
            }
            style={styles.textarea}
          />

          <div style={styles.actions}>
            <button onClick={() => submitAnswer(q.id)} style={styles.answerBtn}>
              Submit Answer
            </button>

            {isAdmin && q.status !== "ANSWERED" && (
              <button onClick={() => markAnswered(q.id)} style={styles.markBtn}>
                Mark Answered
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 800,
    margin: "40px auto",
    padding: 20,
    fontFamily: "Arial",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    background: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    borderLeft: "5px solid #ccc",
  },
  escalated: {
    borderLeft: "5px solid #d9534f",
    background: "#fff5f5",
  },
  answered: {
    borderLeft: "5px solid #5cb85c",
    background: "#f6fff6",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  question: {
    fontSize: 16,
    fontWeight: 500,
  },
  badge: {
    padding: "4px 10px",
    borderRadius: 12,
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  badgePending: { background: "#f0ad4e" },
  badgeEscalated: { background: "#d9534f" },
  badgeAnswered: { background: "#5cb85c" },
  time: {
    fontSize: 12,
    color: "#777",
  },
  answers: {
    marginTop: 10,
    background: "#f9f9f9",
    padding: 10,
    borderRadius: 6,
  },
  answer: {
    padding: "6px 0",
    borderBottom: "1px solid #ddd",
  },
  textarea: {
    width: "100%",
    marginTop: 10,
    padding: 8,
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  actions: {
    display: "flex",
    gap: 10,
    marginTop: 10,
  },
  answerBtn: {
    background: "#0275d8",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: 4,
    cursor: "pointer",
  },
  markBtn: {
    background: "#5cb85c",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: 4,
    cursor: "pointer",
  },

  auto: {
    color: "#6c63ff",
    fontSize: 12,
    marginRight: 6,
  },
};
