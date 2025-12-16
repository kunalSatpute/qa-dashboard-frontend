import api from "./axios";

export const getQuestions = async () => {
  const res = await api.get("/questions/getAllQuestions");
  return res.data;
};

export const createQuestion = async (message) => {
  const res = await api.post("/questions/submitQuestion", { message });
  return res.data;
};

export const answerQuestion = async (id, answer) => {
  const res = await api.post(`/questions/${id}/answer`, {
    answer,
  });
  return res.data;
};

export const markAnswered = async (id, token) => {
  const res = await api.put(
    `/questions/${id}/mark-answered`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
